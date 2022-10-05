import mongoose, { InferSchemaType } from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  place: String,
});

export type itemModel = InferSchemaType<typeof itemSchema>;

export default mongoose.model("itemSchema", itemSchema);
