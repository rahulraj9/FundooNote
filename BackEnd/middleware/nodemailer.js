const nodemailer = require("nodemailer");
require('dotenv').config()

const mailer = (email, token) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        }
    });

    const link = `<a href="https://notes-3704f.web.app/resetPassword/${token}">Click Here</a>`
    console.log("toen" + token);
    var mailOption = {
        from: process.env.MAIL,
        to: email,
        subject: "Reset Password",
        html: `<h3 style="color:red",font-family="Comic Sans, Comic Sans MS, cursive">You are receiving this mail because you (or someone else) have requested the reset
            password for your account.Please click on following link, or paste this into your
            browser to complete the proccess.
           </h3>
            Please click on the following link for reset password   ` + link

    }

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log("Message sent: %s", info.messageId);

    });
}

module.exports = { mailer }