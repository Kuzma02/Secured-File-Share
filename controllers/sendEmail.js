const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail')
const Mailjet = require('node-mailjet');
var SibApiV3Sdk = require('sib-api-v3-sdk');



const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
    {
      config: {},
      options: {}
    } 
);

const sendEmailEthereal = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jamar.hodkiewicz61@ethereal.email',
            pass: 'vWjxnQ9QryVBm7GtJD'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Kuzma02" <aleksandarkuzmanovic02@gmail.com>',
        to: 'jamar.hodkiewicz61@ethereal.email',
        subject: 'Hello',
        html: '<h2>Sending Emails With Node.js</h2>'
    });

    res.json(info);
}

const sendEmailSendGrid = async (req,res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'izradaposlovnihsajtova@gmail.com', // Change to your recipient
        from: 'aleksandarkuzmanovic02@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }

      const info = await sgMail.send(msg);
      res.json(info);
}

const sendEmailMailjet = async (receiverEmail, fileID, senderName = "Encrypt Share") => {
    const mailjet = Mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );
  
    try {
      const request = await mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: "aleksandarkuzmanovic02@gmail.com",
                Name: senderName
              },
              To: [
                {
                  Email: receiverEmail,
                  Name: "Recipient"
                }
              ],
              Subject: "Here is your File ID!",
              TextPart: `Dear user, here is your File ID: ${fileID}`,
              HTMLPart: `<h3>Dear user,</h3><br/> Download page: <a href='http://localhost:5173/download'>download page link</a> <br />Here is your File ID: <strong>${fileID}</strong><br /><br /><b>Because of our security policy we don't share passwords. You need to ask the sender for it.</b>`
            }
          ]
        });
  
      if (request && request.body) {
        // Ako je zahtev uspeo, šaljemo odgovor sa statusom 200
        return { success: true, data: request.body };
      } else {
        // Ako zahtev nije uspeo, šaljemo odgovor sa statusom 500 i porukom o grešci
        return { success: false, error: "Email sending failed" };
      }
    } catch (err) {
      // Uhvaćena greška pri slanju emaila
      return { success: false, error: err.message };
    }
  };

  const sendEmailBrevo = async () => {
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "kuzmanovica22@gmail.com", // generated brevo user
    pass: "", // generated brevo password
  },
});

// send mail with defined transport object
let info = await transporter.sendMail({
  from: "kuzmanovica22@gmail.com", // sender address
  to: "izradaposlovnihsajtova@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello Kuzma , This is an SMTP message with customizations", // plain text body
});

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  };
  



module.exports = sendEmailMailjet;