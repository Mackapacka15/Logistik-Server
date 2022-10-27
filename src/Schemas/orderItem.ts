import mongoose, { InferSchemaType } from "mongoose";

export const orderItemSchema = new mongoose.Schema({
  parentId: { type: mongoose.Types.ObjectId, require: true },
  name: String,
  ammount: { type: Number, require: true },
  indItemValue: { type: Number, require: true },
});

export type orderItemSchema = InferSchemaType<typeof orderItemSchema>;
