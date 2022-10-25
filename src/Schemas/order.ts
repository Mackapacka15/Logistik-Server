import mongoose, { InferSchemaType } from "mongoose";
import { orderItemSchema } from "./orderItem.js";

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  items: { type: [orderItemSchema] },
  date: { type: Date, default: Date.now() },
  pickedBy: { type: mongoose.Types.ObjectId, default: null },
  pickedDate: { type: Date, default: null },
  sendDate: { type: Date, default: null },
  orderNumber: { type: Number, default: null },
});

export type orderSchema = InferSchemaType<typeof orderSchema>;

export default mongoose.model("orderSchema", orderSchema);
