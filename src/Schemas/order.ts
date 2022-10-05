import mongoose, { InferSchemaType } from "mongoose";
import orderItem from "./orderItem";

const orderSchema = new mongoose.Schema({
  items: { type: [orderItem] },
});

export type shippmentModel = InferSchemaType<typeof orderSchema>;

export default mongoose.model("orderSchema", orderSchema);
