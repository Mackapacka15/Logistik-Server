import mongoose, { InferSchemaType } from "mongoose";

const orderItemSchema = new mongoose.Schema({
  item: { type: [mongoose.Types.ObjectId], require: true },
  ammount: { type: Number, require: true },
});

export type orderModel = InferSchemaType<typeof orderItemSchema>;

export default mongoose.model("orderItemSchema", orderItemSchema);
