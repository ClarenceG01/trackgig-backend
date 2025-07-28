import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  isVerified: { type: Boolean, default: false },
  otpCode: { type: String, default: null },
});

export const userModel = mongoose.model("userModel", userSchema);
