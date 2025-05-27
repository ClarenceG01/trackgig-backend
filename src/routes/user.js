import { Router } from "express";
import { register, verifyEmail } from "../controllers/user.js";

export const userRoute = Router();

userRoute.post("/register", register);
userRoute.get("/verify", verifyEmail);
