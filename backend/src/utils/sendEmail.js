const nodemailer = require('nodemailer');
const config = require('../config');
const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox359d099d080043c1837c44554c868d62.mailgun.org';
const mg = mailgun({ apiKey: config.apiKey, domain: DOMAIN });
const sendEmail = (options) => {
    const data = {
        from: config.email_from,
        to: options.to,
        subject: 'Hello',
        html: options.text,
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
    // const transporter = nodemailer.createTransport({
    //     service: config.email_service,
    //     auth: {
    //         user: config.email_username,
    //         pass: config.email_password,
    //     },
    // });
    // const mailOptions = {
    //     from: config.email_from,
    //     to: options.to,
    //     subject: options.subject,
    //     html: options.text,
    // };

    // transporter.sendMail(mailOptions, function (err, info) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(info);
    //     }
    // });
};
module.exports = sendEmail;
