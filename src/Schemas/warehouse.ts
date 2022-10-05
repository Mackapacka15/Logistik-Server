import mongoose, { InferSchemaType } from "mongoose";
import item from "./item.js";

const warehouseSchema = new mongoose.Schema({
  items: { type: item },
});

export type warehouseModel = InferSchemaType<typeof warehouseSchema>;

export default mongoose.model("warhouseSchema", warehouseSchema);
