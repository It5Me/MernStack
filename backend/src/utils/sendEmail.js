const nodemailer = require('nodemailer');
const config = require('../config');
const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: config.email_service,
        auth: {
            user: config.email_username,
            pass: config.email_password,
        },
    });
    const mailOptions = {
        from: config.email_from,
        to: options.to,
        subject: options.subject,
        html: options.text,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};
module.exports = sendEmail;
