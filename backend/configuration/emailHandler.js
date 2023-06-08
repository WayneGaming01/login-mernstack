const NodeMailer = require("nodemailer");
const config = require("./config.json");

const emailInformation = NodeMailer.createTransport({
  host: config.MAIL_CREDENTIALS.MAIL_HOST,
  port: 465, //Put your mail server port
  secure: true, //Use true or false if it's secured or not.
  auth: {
    user: config.MAIL_CREDENTIALS.MAIL_USER,
    pass: config.MAIL_CREDENTIALS.MAIL_PASSWORD,
  },
});

const mailOptions = async ({ from, to, subject, html }) => {
  const x = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };

  emailInformation.sendMail(x, function (error, info) {
    if (error) {
      return console.log(error);
    }
  });
};

module.exports = { mailOptions };
