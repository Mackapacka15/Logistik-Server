import mongoose from "mongoose";
import item from "../Schemas/item.js";
import warehouse, { warehouseModel } from "../Schemas/warehouse.js";
import {
  warehouseItemSchema,
  warehouseItemModel,
} from "../Schemas/warehouseItem.js";

type returnInfo = {
  name: String;
  data: { item: warehouseItemModel };
};

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

export function addItem(
  warehouseId: mongoose.Types.ObjectId,
  itemNameIn: String,
  balanceIn: Number,
  placeIn: String
) {
  return new Promise<void>(async (resolve, reject) => {
    if (!warehouseId || !itemNameIn || !balanceIn || !placeIn) {
      reject("Invalid Inputs");
    }

    let wh = await warehouse.findById(warehouseId);
    if (!wh) {
      reject("No warehouse found");
      return;
    }
    let addItem = await item.findOne({ name: itemNameIn });

    if (!addItem) {
      reject("No item found. Try creating one first");
      return;
    }

    let newItem = {
      parentItemId: addItem._id,
      balance: balanceIn,
      place: placeIn,
    };
    wh.items.push(newItem);
    wh.save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function itemInfo(data: {
  warehouseId?: string;
  warehouseName?: string;
  itemName?: string;
}) {
  return new Promise<returnInfo[]>((resolve, reject) => {
    let sendData: returnInfo[] = [];
    if (data.warehouseId !== undefined && data.itemName !== undefined) {
      warehouseIdFind(data.warehouseId, data.itemName)
        .then((result) => {
          sendData.push(result);
          resolve(sendData);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (
      data.warehouseName !== undefined &&
      data.itemName !== undefined
    ) {
      warehouseNameFind(data.warehouseName, data.itemName)
        .then((result) => {
          sendData.push(result);
          resolve(sendData);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (data.itemName !== undefined) {
      findItemsByName(data.itemName)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    } else reject("No bad inputs");
  });
}

function findItemsByName(itemName: string) {
  return new Promise<returnInfo[]>(async (resolve, reject) => {
    console.log("ItemsByName");

    let returnItems: returnInfo[] = [];

    let warehouses: any = await warehouse.find().populate("items.parentItemId");

    console.log("query");
    console.log(warehouses[0].items[0]);

    warehouses.forEach((wh: any) => {
      wh.items.forEach((tempItem: any) => {
        if (tempItem.parentItemId.name === itemName) {
          returnItems.push({ name: wh.name, data: { item: tempItem } });
          console.log("Success");
        }
      });
    });

    if (returnItems.length !== 0) {
      resolve(returnItems);
    }
    reject("No items found");
  });
}
function warehouseIdFind(id: string, name: string) {
  return new Promise<returnInfo>(async (resolve, reject) => {
    let wh = await warehouse.findById(id).populate("items.parentItemId");
    if (!wh) {
      reject("No warehouse with provided id");
      return;
    }

    wh.items.forEach((tempItem: any) => {
      if (tempItem.parentItemId.name === name) {
        resolve({ name: (wh as any).name, data: { item: tempItem } });
      }
    });
    reject("No items found");
  });
}
function warehouseNameFind(warehouseName: string, name: string) {
  return new Promise<returnInfo>(async (resolve, reject) => {
    let wh = await warehouse
      .findOne({ name: warehouseName })
      .populate("items.parentItemId");
    if (!wh) {
      reject("No warehouse with provided name");
      return;
    }

    wh.items.forEach((tempItem: any) => {
      if (tempItem.parentItemId.name === name) {
        resolve({ name: (wh as any).name, data: { item: tempItem } });
      }
    });
    reject("No items found");
  });
}
