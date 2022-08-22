const express = require('express');
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

let mensaje = '';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// 'smtp.office365.com'

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

app.post('/send', (req, res) => {
  //1.
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    //2. You can configure the object however you want
    const mail = {
      from: process.env.EMAIL,
      to: process.env.MAIL_TO,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Something went wrong.');
      } else {
        res.status(200).send({ message: 'Mensaje enviado correctamente!' });
      }
    });
  });
});
app.get('/send', (req, res) => {
  res.send({ mensaje: 'hola' });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor http corriendo en el puerto ${server.address().port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

server.on('error', (error) => console.log(`Error en el servidor: ${error}`));
