import { Router } from "express";
import { register, verifyOtp, resendOtp, login } from "../controllers/user.js";
import { authenticate } from "../middleware/authenticate.js";

export const userRoute = Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/verify", verifyOtp);
userRoute.post("/resend-otp", resendOtp);
userRoute.get("/test", authenticate, (req, res) => {
  res.status(200).json({ message: "Test route is working!" });
});
