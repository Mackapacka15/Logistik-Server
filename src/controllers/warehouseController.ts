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
    let returnItems: returnInfo[] = [];
    warehouse
      .find({})
      .then((result) => {
        result.forEach((wh) => {
          wh.items.forEach((item: any) => {
            if (item.name === itemName) {
              returnItems.push({ name: wh.name, data: { item } });
            }
          });
        });
        if (returnItems.length !== 0) {
          resolve(returnItems);
        }
        reject("No items found");
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function warehouseIdFind(id: string, name: string) {
  return new Promise<returnInfo>((resolve, reject) => {
    warehouse.findById(id, function (result: warehouseModel, err: string) {
      if (err) reject("No warehouse width that id");
      result.items.forEach((item: any) => {
        if (item.name === name) {
          resolve({ name: item.name, data: { item } });
        }
      });
    });
  });
}
function warehouseNameFind(warehouseName: string, name: string) {
  return new Promise<returnInfo>((resolve, reject) => {
    warehouse.find(
      { name: warehouseName },
      function (result: warehouseModel, err: string) {
        if (err) reject("No warehouse width that name");
        result.items.forEach((item: any) => {
          if (item.name === name) {
            resolve({ name: item.name, data: { item } });
          }
        });
      }
    );
  });
}
