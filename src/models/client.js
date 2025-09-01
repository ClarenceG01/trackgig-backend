import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  company: {
    type: String,
    required: true,
  },
});
export const ClientModel = new model("ClientModel", clientSchema);
