// jshint esversion:6
require("dotenv").config();
const nodemailer = require("nodemailer");
const SMTPTransport = require("nodemailer/lib/smtp-transport");


const sendMail = (req, res, next) => {

  console.log("Send mail called");

  const userDetails = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  };

  console.log("user details", userDetails);

  if (userDetails.name == "" || userDetails.email == "" || userDetails.message == "") {
    return res.status(400).send("Please complete the form below");
  }

  // Create reusable transporter using the SMTP transport
  const transporter = nodemailer.createTransport(new SMTPTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  }));

  let mailOptions = {
    from: `${userDetails.email}`,
    to: "onyejemeemmanuel65@gmail.com",
    subject: "User Details",
    text: `User: ${userDetails.name}, userEmail: ${userDetails.email}, userMessage: ${userDetails.message}`
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Can't send mail", err);
      return res.status(401).send("Couldn.t send email");
    }
    else {
      console.log("Email sent successfully");
      next();
    }
  });
};

module.exports = sendMail;