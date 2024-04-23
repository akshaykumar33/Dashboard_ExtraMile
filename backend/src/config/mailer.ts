import { mailerType } from "@/types/type";
import  { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";
const  nodemailer = require("nodemailer");
// Define the transporter
const transporter: Transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.MAILPORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// Define the sendEmail function with async keyword
async function sendEmail(email: mailerType): Promise<SentMessageInfo> {
  try {
    // Construct the mail options from the email parameter
    const mailOptions: SendMailOptions = {
      from: process.env.FROM, // sender address
      to: email.toMail, // list of receivers
      subject: email.subject, // Subject line
      text: email.text, // plain text body
      html: email.body, // html body
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    return info; // Return the info object
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; // Throw the error for handling in the calling function
  }
}

// Export the transporter and sendEmail function
export { transporter, sendEmail };