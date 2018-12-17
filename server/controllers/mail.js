const nodemailer = require('nodemailer');
const config = require('../config/mail.json');

const controller = async (ctx, next) => {
  if (!ctx.request.body.name || !ctx.request.body.email || !ctx.request.body.message) {
    return ctx.redirect('?msgemail=Все поля нужно заполнить!');
  }

  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${ctx.request.body.name}" <${ctx.request.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      ctx.request.body.message.trim().slice(0, 500) +
      `\n Отправлено с: <${ctx.request.body.email}>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return ctx.redirect('?msgemail=Письмо успешно отправлено!');
  } catch (error) {
    console.log('An error occurred while sending the email!', error);
    return ctx.redirect('?msgemail=При отправке письма произошла ошибка!');
  }
};

module.exports = controller;
