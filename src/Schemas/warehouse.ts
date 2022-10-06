import mongoose, { InferSchemaType } from "mongoose";
import item from "./item.js";

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: { type: item.schema },
});

export type warehouseModel = InferSchemaType<typeof warehouseSchema>;

export default mongoose.model("warhouseSchema", warehouseSchema);
