const nodemailer = require("nodemailer");
const emailConfig=async(email, otp)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });
      // Looking to send emails in production? Check out our Email API/SMTP product!
// var transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST ,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS
//     }
//   });
      await transporter.sendMail({
        from: process.env.email, // sender address
        to: email, // list of receivers
        subject: "verify your account", // Subject line  
        
        html: `<p> Your Otp ${otp}</p>. this otp is only valid for 5 mintues`, // HTML body  
        
      });
}

module.exports={emailConfig};