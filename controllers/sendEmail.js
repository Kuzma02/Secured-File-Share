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

        return { success: true, data: request.body };
      } else {

        return { success: false, error: "Email sending failed" };
      }
    } catch (err) {

      return { success: false, error: err.message };
    }
  };

module.exports = sendEmailMailjet;