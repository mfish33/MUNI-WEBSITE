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

export const delOldUnverifiedAccs = functions.pubsub
  .schedule("0 0 * * 0") //run at 00:00 every sunday
  .onRun(async (context) => {
    const unverifiedUsers = await getUnverifiedUsers();
    const pool = new PromisePool(
      () => deleteUnverifiedUser(unverifiedUsers),
      MAX_CONCURRENT
    );
    await pool.start();
  }
);

async function getUnverifiedUsers(
  users: admin.auth.UserRecord[] = [],
  nextPageToken: string | undefined = undefined
): Promise<admin.auth.UserRecord[]> {
  const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

  const result = await admin.auth().listUsers(1000, nextPageToken);

  const filteredUsers = result.users.filter(
    (user) =>
      user.providerData.length === 1 &&
      user.providerData[0].providerId === "password" &&
      user.emailVerified === false &&
      Date.parse(user.metadata.lastSignInTime) < Date.now() - weekInMilliseconds
  );

  if (result.pageToken) {
    return getUnverifiedUsers([...users, ...filteredUsers], result.pageToken);
  }
  return [...users, ...filteredUsers];
}

function deleteUnverifiedUser(
  unverifiedUsers: admin.auth.UserRecord[]
): Promise<unknown> | void {
  const userToDelete = unverifiedUsers.pop();
  if (userToDelete) {
    // Creates a new async function, calls it, and returns the result
    return (async () => {
      try {
        await admin.auth().deleteUser(userToDelete.uid);
        console.log(
          "Deleted user account",
          userToDelete.email,
          "for not verifying their email within a week"
        );
      } catch (e) {
        console.error(
          "Deletion of inactive user account",
          userToDelete.uid,
          "failed:",
          e
        );
      }
    })();
  }
  // Stop promise pool
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
