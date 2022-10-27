import mongoose, { InferSchemaType } from "mongoose";

export const warehouseItemSchema = new mongoose.Schema({
  parentItemId: { type: mongoose.Types.ObjectId, ref: "itemSchemas" },
  balance: { type: Number },
  place: { type: String },
});

export type warehouseItemModel = InferSchemaType<typeof warehouseItemSchema>;
