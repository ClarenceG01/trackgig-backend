import { Router } from "express";
import { register, verifyOtp, resendOtp } from "../controllers/user.js";

export const userRoute = Router();

userRoute.post("/register", register);
userRoute.post("/verify", verifyOtp);
userRoute.post('/resend-otp', resendOtp);
userRoute.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route is working!" });
});
