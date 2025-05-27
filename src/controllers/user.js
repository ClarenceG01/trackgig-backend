import bcrypt from "bcrypt";
import crypto from "crypto";
import { userModel } from "../models/user.js";
import { sendVerificationMail } from "../utils/sendEmail.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    // check if user exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already used",
      });
    }
    // create hashed pwd
    const hashedPwd = await bcrypt.hash(password, 10);
    // create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newUser = new userModel({
      name,
      email,
      password: hashedPwd,
      isVerified: false,
      verificationToken,
    });
    await newUser.save();

    // send verification email
    const url = `${process.env.BASE_URL}users/verify?token=${verificationToken}`;
    await sendVerificationMail(email, url);
    res.status(200).json({ message: "registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}
export async function verifyEmail(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }

    const user = await userModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Account verified successfully!" });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
