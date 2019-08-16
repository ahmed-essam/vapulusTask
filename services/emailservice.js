const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '@gmail.com',
        pass: ''
    }
});


module.exports = function sendEmail(options) {
    var mailOptions = {
        from: '@gmail.com',
        to: options.to,
        subject:"GOT BLOG Mention",
        text: options.body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
