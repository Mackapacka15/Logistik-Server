import mongoose, { InferSchemaType } from "mongoose";
import order from "./orderItem.js";
import schedule from "./schedule.js";

const personSchema = new mongoose.Schema({
  warehouse: mongoose.Types.ObjectId,
  role: { type: String, require: true },
  curentOrder: order.schema,
  shedule: schedule.schema,
});

export type personModel = InferSchemaType<typeof personSchema>;

export default mongoose.model("personSchema", personSchema);
