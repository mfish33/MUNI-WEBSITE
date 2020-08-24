import * as functions from 'firebase-functions';
import gmailConfig from './gmailConfig'
import * as nodemailer from 'nodemailer'
import config from './config'

const mailTransport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:gmailConfig.email,
        pass:gmailConfig.password
    }
})


export const sendFeedback = functions.https.onRequest(async (req,res) => {

    if(config.prod) {
        res.set('Access-Control-Allow-Origin', 'https://ripe-website-40a9a.web.app');
    } else {
        res.set('Access-Control-Allow-Origin', '*');
    }
    

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return
      }

    if(req.headers["content-type"] !== 'application/json') {
        res.sendStatus(400)
        return
    }
    const {name, email, reason, body} = req.body
    if(!name || !email || !reason || !body) {
        res.sendStatus(400)
        return
    }

    const mailOptions = {
        from: gmailConfig.email,
        to: 'RIPEwebsite@gmail.com',
        subject: `${reason} Feedback from ${name} at ${email}`,
        text: body
    };

    await mailTransport.sendMail(mailOptions)

    res.sendStatus(200)
})
