import mongoose, { InferSchemaType } from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  place: { type: String, required: true },
});

export type itemModel = InferSchemaType<typeof itemSchema>;

export default mongoose.model("itemSchema", itemSchema);
