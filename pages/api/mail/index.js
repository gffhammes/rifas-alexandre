const mail = require('@sendgrid/mail');

const handler = (req, res) => {
  mail.setApiKey(process.env.SENDGRID_API_KEY)

  const body = JSON.parse(req.body);

  const quotasString = body.quotasData.numbers.join(', ')
  
  const message = `
    Nome: ${body.userData.name}\r\n
    Email: ${body.userData.email}\r\n
    Telefone: ${body.userData.phone}\r\n

    Cotas reservadas: ${quotasString}\r\n
  `

  const data = {
    to: body.userData.email,
    from: 'a.d.sanches@gmail.com',
    subject: 'Confirmação | Cotas reservadas',
    text: message,
    html: message.replace(/\r\n/g, '<br>')
  }

  mail.send(data);

  res.status(200).json({ status: 'Ok' })
}

export default handler