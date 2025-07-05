import bcrypt from "bcrypt";
import crypto from "crypto";
import { userModel } from "../models/user.js";
import { sendVerificationMail } from "../utils/sendEmail.js";
import generateOtp from "../utils/generateOtp.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    // check if user exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already used",
      });
    }
    // create hashed pwd
    const hashedPwd = await bcrypt.hash(password, 10);

    const { otp, signedOtp } = generateOtp();
    // send verification email with OTP
    await sendVerificationMail(email, otp);
    const newUser = new userModel({
      name: username,
      email,
      password: hashedPwd,
      isVerified: false,
      otpCode: signedOtp,
    });
    await newUser.save();
    res.status(200).json({ message: "registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}
export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const foundUser = await userModel.findOne({ email });
    const decryptedOtp = jwt.verify(foundUser.otpCode, process.env.JWT_SECRET);
    if (
      decryptedOtp.otp !== Number(otp.trim()) ||
      decryptedOtp.exp * 1000 < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    foundUser.isVerified = true;
    foundUser.otpCode = null;
    await foundUser.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    if (error.message.includes("jwt expired")) {
      return res
        .status(400)
        .json({ message: "OTP has expired, please request a new one" });
    }
    return res.status(500).json({ message: "Server error" });
  }
}
export async function resendOtp(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const foundUser = await userModel.findOne({ email });
    if (!foundUser || foundUser.isVerified) {
      return res
        .status(400)
        .json({ message: "User not found or already verified" });
    }
    const { otp, signedOtp } = generateOtp();
    await sendVerificationMail(email, otp);
    foundUser.otpCode = signedOtp;
    await foundUser.save();
    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
      return res.status(400).send({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(400).send({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        name: foundUser.name,
        email: foundUser.email,
      },
      process.env.JWT_SECRET
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .send({ message: "Login successfull" });
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
}
