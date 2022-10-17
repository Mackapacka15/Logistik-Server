import mongoose, { InferSchemaType } from "mongoose";

export const itemSchema = new mongoose.Schema({
  name: { type: String },
  balance: { type: Number },
  place: { type: String },
});

export type itemModel = InferSchemaType<typeof itemSchema>;
