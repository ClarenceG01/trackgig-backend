import nodemailer from "nodemailer";
// create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export async function sendVerificationMail(user_email, url) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user_email,
      subject: "Verify your email",
      html: `<h1>Verify your email</h1>
		   <p>Click <a href="${url}">here</a> to verify your email</p>`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
}
