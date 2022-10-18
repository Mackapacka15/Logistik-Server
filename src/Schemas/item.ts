import mongoose, { InferSchemaType } from "mongoose";

export const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number },
});

export type itemModel = InferSchemaType<typeof itemSchema>;

export default mongoose.model("itemSchemas", itemSchema);
