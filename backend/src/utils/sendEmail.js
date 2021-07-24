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
};
module.exports = sendEmail;
