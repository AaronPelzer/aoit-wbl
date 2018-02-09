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
        from: '"webmaster" <jkelly@aoiths.org>',
        to: email,
        subject: 'Verify your Email Address',
        text: 'Hello',
        //html: `<div class="message"><p>Hello ${name}, </p><p>Thank you for registering for <strong>CTE Highschool Path</strong>. More info about it...</p><p>Please verify your email <a href="${tokenUrl}">here</a>.</p></div>`
        html: `<table style="border: solid 1px black; width: 200px; border-radius:5px;"><tr><td><img src="https://www.graphicsprings.com/filestorage/stencils/aea126a28feb00b996ef0ccf47171221.svg" />&nbsp;</td></tr>
        <tr>
          <td style="padding: 5px;">
            Hey ${name},
            <br />
    We're ready to activate your account. All you need to do is make sure this is your email address.
            <br />
            <a style="border-radius:3px;background:#3aa54c;color:#fff;display:block;font-weight:700;font-size:16px;line-height:1.25em;margin:24px auto 24px;padding:10px 18px;text-decoration:none;width:180px;text-align:center" href="${tokenUrl}">Verify E-Mail</a>
          </td>
        </tr>
      </table>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        } else {
            console.log("Message sent.");
        }
    })
}