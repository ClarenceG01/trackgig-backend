import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { getUserGigs, addGig, deleteGig } from "../controllers/gig.js";

export const gigRouter = Router();
gigRouter
  .get("/", authenticate, getUserGigs)
  .post("/", authenticate, addGig)
  .delete("/:id", authenticate, deleteGig);
