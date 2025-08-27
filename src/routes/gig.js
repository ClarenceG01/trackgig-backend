import { Router } from "express";
import { z } from "zod";
import { authenticate } from "../middleware/authenticate.js";
import { getUserGigs, addGig, deleteGig } from "../controllers/gig.js";
import { validateBody } from "../middleware/validator.js";

const gigSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().optional(),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
});
export const gigRouter = Router();
gigRouter
  .get("/", authenticate, getUserGigs)
  .post("/", validateBody(gigSchema), authenticate, addGig)
  .delete("/:id", authenticate, deleteGig);
