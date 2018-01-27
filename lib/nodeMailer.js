const nodeMailer = require('nodemailer'),
      config = require('../config').nodemail;

let email = config.email,
pass = config.pass;

let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass: pass
    }
});

module.exports.sendConfirmationLink = function(email, name, tokenUrl){

    let mailOptions = {
        from: '"Jovan Kelly" <jkelly@aoiths.org>',
        to: email,
        subject: 'Verify your Email Address',
        text: 'Hello',
        html: `<div class="message"><p>Hello ${name}, </p><p>Thank you for registering for <strong>CTE Highschool Path</strong>. More info about it...</p><p>Please verify your email <a href="${tokenUrl}">here</a>.</p></div>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        } else {
            console.log("Message sent.");
        }
    })
}