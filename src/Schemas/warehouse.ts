import mongoose, { InferSchemaType } from "mongoose";
import { itemSchema } from "./item.js";

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: { type: [itemSchema] },
});

export type warehouseModel = InferSchemaType<typeof warehouseSchema>;

export default mongoose.model("warhouseSchema", warehouseSchema);
