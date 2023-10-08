const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, META_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

/* const email = {
  to: "cijic86227@finghy.com",
  from: "shkilnai.1995@meta.ua",
  subject: "Test email",
  html: "<p>Test email from localhost:3000</p>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((err) => console.log(err)); */

const sendEmail = async (data) => {
  const email = { ...data, from: META_EMAIL };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
