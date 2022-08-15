export default async function handler(req, res) {
  require('dotenv').config()

  const email = 'contatos.sites@hotmail.com';

  const body = JSON.parse(req.body)

  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    service: 'Hotmail',
    secureConnection: false,
    auth: {
      user: email,
      pass: process.env.password,
    },
    tls: {
        ciphers:'SSLv3'
    },
  })
  const mailData = {
    from: email,
    to: body.recipientMail,
    subject: body.subject,
    text: body.message + " | Sent from: " + email,
    html: `<div>${body.message}</div>`
  }

  try {
    await transporter.sendMail(mailData)
    res.status(200).end();
  } catch(error) {
    console.log(error)
    res.json(error);
    res.status(405).end();
  }
}