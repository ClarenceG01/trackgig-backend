import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { userRoute } from "./src/routes/user.js";
import { gigRouter } from "./src/routes/gig.js";
import { clientRouter } from "./src/routes/client.js";

const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome to the User Management API");
});
app.use("/users", userRoute);
app.use("/gigs", gigRouter);
app.use("/clients", clientRouter);
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}
start();
