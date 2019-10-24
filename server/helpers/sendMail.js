const nodemailer = require("nodemailer");

module.exports = (reciever, msg) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_MAIL,
      pass: process.env.GMAIL_PASS
    }
  });
  
  let mailOptions = {
    from: process.env.GMAIL_MAIL,
    to: reciever,
    subject: `Not a GDPR update ;)`,
    text: msg
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
}