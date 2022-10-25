import mongoose, { InferSchemaType } from "mongoose";
import { scheduleSchema } from "./schedule.js";

const personSchema = new mongoose.Schema({
  name: { type: String, require: true },
  warehouse: mongoose.Types.ObjectId,
  role: { type: String, require: true },
  currentOrder: { type: mongoose.Types.ObjectId, default: null },
  schedule: scheduleSchema,
});

export type personModel = InferSchemaType<typeof personSchema>;

export default mongoose.model("personSchema", personSchema);
