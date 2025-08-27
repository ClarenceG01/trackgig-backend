import { Router } from "express";
import { z } from "zod";
import { register, verifyOtp, resendOtp, login } from "../controllers/user.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateBody } from "../middleware/validator.js";

export const userRoute = Router();

const registerSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.coerce.string().min(5, "Password must be at least 5 characters long"),
});
const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
userRoute.post("/register", validateBody(registerSchema), register);
userRoute.post("/login", validateBody(loginSchema), login);
userRoute.post("/verify", verifyOtp);
userRoute.post("/resend-otp", resendOtp);
userRoute.get("/test", authenticate, (req, res) => {
  res.status(200).json({ message: "Test route is working!" });
});
