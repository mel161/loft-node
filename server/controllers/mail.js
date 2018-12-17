const nodemailer = require('nodemailer');
const config = require('../config/mail.json');

const controller = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    res.redirect('?msgemail=Все поля нужно заполнить!');
  }
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      req.body.message.trim().slice(0, 500) +
      `\n Отправлено с: <${req.body.email}>`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.redirect('?msgemail=При отправке письма произошла ошибка!');
    }
    res.redirect('?msgemail=Письмо успешно отправлено!');
  });
}

module.exports = controller;
