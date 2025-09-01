import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { getClients, addClient } from "../controllers/client.js";
import { validateBody } from "../middleware/validator.js";
import z from "zod";
import validator from "validator";

export const clientRouter = Router();
const { isMobilePhone } = validator;
const clientSchema = z.object({
  name: z.string(),
  email: z.email().optional(),
  phone: z.string().refine(isMobilePhone, { message: "invalid" }).optional(),
  company: z.string(),
});
clientRouter
  .get("/", authenticate, getClients)
  .post("/", authenticate, validateBody(clientSchema), addClient);
