import * as functions from "firebase-functions";
import gmailConfig from "./gmailConfig";
import * as nodemailer from "nodemailer";
import config from "./config";
import * as admin from "firebase-admin";
admin.initializeApp();
import PromisePool from "es6-promise-pool";

const MAX_CONCURRENT = 3;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailConfig.email,
    pass: gmailConfig.password,
  },
});

console.log(process.env.FIREBASE_CONFIG);
export const delOldUnverifiedAccs = functions.pubsub
  .schedule("* * * * *")
  .onRun(async (context) => {
    console.log("deleting old unverified users");
    let unverifiedUsers = await getUnverifiedUsers();
    let pool = new PromisePool(
      () => deleteUnverifiedUser(unverifiedUsers),
      MAX_CONCURRENT
    );
    await pool.start();
    console.log(`Cleaned old unverified users`);
  });

async function getUnverifiedUsers(
  users: admin.auth.UserRecord[] = [],
  nextPageToken: string | undefined = undefined
): Promise<admin.auth.UserRecord[]> {
  let result = await admin.auth().listUsers(1000, nextPageToken);

  let filteredUsers = result.users
    .filter((user) => user.providerData.length == 1)
    .filter((user) => user.providerData[0].providerId == "password")
    .filter((user) => user.emailVerified == false)
    .filter(
      (user) =>
        Date.parse(user.metadata.lastSignInTime) <
        Date.now() - 7 * 24 * 60 * 60 * 1000
    );

  users = users.concat(filteredUsers);

  if (result.pageToken) {
    return getUnverifiedUsers(users, result.pageToken);
  }
  return users;
}

async function deleteUnverifiedUser(unverifiedUsers: admin.auth.UserRecord[]) {
  const userToDelete = unverifiedUsers.pop();
  if (userToDelete) {
    // Delete the inactive user.
    return admin
      .auth()
      .deleteUser(userToDelete.uid)
      .then(() => {
        return console.log(
          "Deleted user account",
          userToDelete.email,
          "for not verifying their email within a week"
        );
      })
      .catch((error) => {
        return console.error(
          "Deletion of inactive user account",
          userToDelete.uid,
          "failed:",
          error
        );
      });
  } else {
    return null;
  }
}

export const sendFeedback = functions.https.onRequest(async (req, res) => {
  if (config.prod) {
    res.set(
      "Access-Control-Allow-Origin",
      "https://ripe-website-40a9a.web.app"
    );
  } else {
    res.set("Access-Control-Allow-Origin", "*");
  }

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  if (req.headers["content-type"] !== "application/json") {
    res.sendStatus(400);
    return;
  }
  const { name, email, reason, body } = req.body;
  if (!name || !email || !reason || !body) {
    res.sendStatus(400);
    return;
  }

  const mailOptions = {
    from: gmailConfig.email,
    to: "RIPEwebsite@gmail.com",
    subject: `${reason} Feedback from ${name} at ${email}`,
    text: body,
  };

  res.sendStatus(200);
  await mailTransport.sendMail(mailOptions);
});
