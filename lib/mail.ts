import { createTransport } from "nodemailer";
import "dotenv/config";

const transport = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string) {
  return `
    <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
    ">
    <h2>Hello</h2>
    <p>${text}</p>
    <p>Mariusz</p>
    </div>
    `;
}

interface MailResponse {
  message: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  console.log("dzila!");

  const info = (await transport.sendMail({
    to,
    from: "mariusz@mariusz.pl",
    subject: "your password reset Token",
    html: makeANiceEmail(`your Passoword reset link: 
    
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}" >Click here!</a>
    `),
  })) as MailResponse;
  console.log(info);
}
