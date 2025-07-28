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
export async function sendVerificationMail(user_email, otp) {
  try {
    await transporter.sendMail({
      from: `"TrackGigs" <${process.env.EMAIL}>`,
      to: user_email,
      subject: "TrackGigs Email Verification",
      html: `
      <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 32px;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px;">
        <div style="text-align: center;">
          <img src="http://localhost:3000/TrackGigs.png" alt="TrackGigs Logo" style="width: 64px; margin-bottom: 16px;" />
          <h1 style="color: #54bd95; margin-bottom: 8px;">Welcome to TrackGigs!</h1>
        </div>
        <h2 style="color: #333; margin-bottom: 16px;">Verify your email address</h2>
        <p style="font-size: 16px; color: #555; margin-bottom: 24px;">
          Thank you for signing up. Please use the OTP below to verify your email address:
        </p>
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="display: inline-block; background: #54bd95; color: #fff; font-size: 24px; letter-spacing: 4px; padding: 12px 32px; border-radius: 6px; font-weight: bold;">
          ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #888;">
          If you did not request this, please ignore this email.
        </p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
        <div style="text-align: center; color: #bbb; font-size: 12px;">
          &copy; ${new Date().getFullYear()} TrackGigs. All rights reserved.
        </div>
        </div>
      </div>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
}
export async function resendOtpEmail(user_email, otp) {
  try {
    await transporter.sendMail({
      from: `"TrackGigs" <${process.env.EMAIL}>`,
      to: user_email,
      subject: "TrackGigs OTP Resend",
      html: `
      <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 32px;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px;">
        <h2 style="color: #333; margin-bottom: 16px;">Your OTP has been resent</h2>
        <p style="font-size: 16px; color: #555; margin-bottom: 24px;">
          Please use the following OTP to verify your email address:
        </p>
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="display: inline-block; background: #54bd95; color: #fff; font-size: 24px; letter-spacing: 4px; padding: 12px 32px; border-radius: 6px; font-weight: bold;">
          ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #888;">
          If you did not request this, please ignore this email.
        </p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
        <div style="text-align: center; color: #bbb; font-size: 12px;">
          &copy; ${new Date().getFullYear()} TrackGigs. All rights reserved.
        </div>
        </div>
      </div>
      `,
    });
  } catch (error) {
    console.error("Error resending OTP email:", error);
    throw new Error("Failed to resend OTP email");
  }
}