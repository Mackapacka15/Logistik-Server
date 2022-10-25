import mongoose from "mongoose";
import item, { itemModel } from "../Schemas/item.js";
import order from "../Schemas/order.js";
import { orderItemSchema } from "../Schemas/orderItem.js";

/* {parentId: "", ammount: 2} */

export function addOrder(
  customerIn: String,
  orderItems: { itemName: String; ammount: Number }[]
) {
  return new Promise<void>(async (resolve, reject) => {
    if (!customerIn) reject("No custommer name provided");
    if (!orderItems) reject("No items provided");

    let newOrderItems: {
      parentId: mongoose.Types.ObjectId;
      ammount: Number;
    }[] = [];

    for (const orderItem of orderItems) {
      console.log(orderItem.itemName);

      const result = await item.findOne({ name: orderItem.itemName });
      if (!result) {
        reject("No item found with name: " + orderItem.itemName);
        return;
      }
      let newOrderItem = {
        parentId: result._id,
        name: orderItem.itemName,
        ammount: orderItem.ammount,
      };
      console.log(newOrderItem);

      newOrderItems.push(newOrderItem);
    }

    order
      .create({ customer: customerIn, items: newOrderItems })
      .then(() => {
        console.log("Create");

        resolve();
      })
      .catch((err) => {
        console.log("error");

        reject(err);
      });
  });
}

export function notPickedOrders() {
  return new Promise<any>((resolve, reject) => {
    order
      .find({ pickedBy: null || undefined })
      .then((result) => {
        if (!result) reject("No unpicked orders");
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function markOrderAsPicked(
  orderId: mongoose.Types.ObjectId,
  pickerId: mongoose.Types.ObjectId
) {
  return new Promise<void>((resolve, reject) => {
    console.log(pickerId);
    console.log(orderId);
    order
      .findByIdAndUpdate(orderId, {
        pickedBy: pickerId,
        pickedDate: Date.now(),
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function findOldestNotSent() {
  return new Promise<any>((resolve, reject) => {
    let orders = order.find({ sendDate: null }).sort({ date: "asc" }).limit(1);
    if (!orders) reject("No orders found");
    resolve(orders);
  });
}
