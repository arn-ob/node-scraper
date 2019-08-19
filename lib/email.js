const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function send(to, subject, message_title, message_brif) {

    let account = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'meessagefromnode@gmail.com',
            pass: '01746110246'
        }
    });

    let mailOptions = {
        from: '"Hello From Node" <mobipath.online@gmail.com>',
        to: to,
        subject: subject,
        html: message_brif
    }
    
    let info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}


module.exports = {
    send
}