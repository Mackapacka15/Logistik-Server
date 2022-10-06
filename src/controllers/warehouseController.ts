import mongoose from "mongoose";
import warehouse from "../Schemas/warehouse.js";

export function createWarehouse(name: string) {
  return new Promise<void>((resolve, reject) => {
    warehouse
      .create({ name: name })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function removeWarehouse(id: mongoose.Types.ObjectId) {
  return new Promise<void>((resolve, reject) => {
    warehouse
      .findByIdAndRemove(id)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
