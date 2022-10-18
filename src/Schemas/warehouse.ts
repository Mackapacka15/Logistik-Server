import mongoose, { InferSchemaType } from "mongoose";
import { warehouseItemSchema } from "./warehouseItem.js";

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: { type: [warehouseItemSchema] },
});

export type warehouseModel = InferSchemaType<typeof warehouseSchema>;

export default mongoose.model("warehouseSchema", warehouseSchema);
