import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_USERNAME,
      pass: process.env.NODE_MAILER_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: "TienLevi",
    to: email,
    subject: "Đặt hàng thành công",
    text: "Đặt hàng thành công",
    html: `<h1>Đặt hàng thành công</h1><a href='http://localhost:5173/invoice'>Link hóa đơn</a>`,
  });
}

export default sendEmail;
