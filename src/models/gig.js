import mongoose from "mongoose";
const GigSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientModel",
    required: true,
  },
  title: { type: String, required: true },
  desc: { type: String },
  dueDate: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["not-paid", "fully", "cancelled"],
    default: "not-paid",
  },
  status: {
    type: String,
    required: true,
    default: "in-progress",
    enum: ["in-progress", "completed", "not-started"],
  },
  createdAt: { type: Date, default: Date.now },
});

export const GigModel = mongoose.model("GigModel", GigSchema);
