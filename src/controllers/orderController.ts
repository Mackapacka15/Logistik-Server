import mongoose from "mongoose";
import item, { itemModel } from "../Schemas/item.js";
import order, { orderSchema } from "../Schemas/order.js";
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

    let orderValue = 0;

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
        indItemValue: result.price,
      };
      console.log(newOrderItem);

      if (!newOrderItem.ammount || !newOrderItem.indItemValue) {
        reject("Incorrect Pricing");
        return;
      }

      orderValue += newOrderItem.ammount.valueOf() * newOrderItem.indItemValue;
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
    if (!orderId) reject("Not a valid order id");
    if (!pickerId) reject("Not a valid picker id");
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

export function markOrderAsSent(
  orderId: mongoose.Types.ObjectId,
  senderId: mongoose.Types.ObjectId
) {
  return new Promise<void>((resolve, reject) => {
    if (!orderId) reject("Not a valid order id");
    if (!senderId) reject("Not a valid sender id");
    order
      .findByIdAndUpdate(orderId, {
        sentBy: senderId,
        sendDate: Date.now(),
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

export function totalValue(month: number) {
  return new Promise<number>(async (resolve, reject) => {
    let totalValue = 0;
    let orders = await order.find({ sendDate: { $ne: null } });

    orders.forEach((indOrder: orderSchema) => {
      console.log(indOrder.pickedDate.getMonth());

      if (indOrder.sendDate.getMonth() === month) {
        indOrder.items.forEach((indItem: orderItemSchema) => {
          if (!indItem.indItemValue || !indItem.ammount) {
            return;
          }
          totalValue += indItem.indItemValue * indItem.ammount;
        });
      }
    });
    resolve(totalValue);
  });
}

export function mostExpensive(month: number) {
  return new Promise<orderSchema>(async (resolve, reject) => {
    let orders = await order.find().sort({ totalValue: "asc" });

    orders.forEach((indOrder) => {
      if (indOrder.date.getMonth() === month) {
        resolve(indOrder);
      }
    });
    reject("No orders found");
  });
}
