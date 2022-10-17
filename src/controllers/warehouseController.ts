import mongoose from "mongoose";
import { itemModel, itemSchema } from "../Schemas/item.js";
import warehouse, { warehouseModel } from "../Schemas/warehouse.js";

type returnInfo = {
  name: String;
  data: { item: itemModel };
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
  namein: String,
  balanceIn: Number,
  placeIn: String
) {
  return new Promise<void>((resolve, reject) => {
    let newItem = {
      name: namein,
      balance: balanceIn,
      place: placeIn,
    };

    if (!warehouseId) reject("Invalid Warehouse");
    if (
      newItem.balance === undefined ||
      newItem.name === undefined ||
      newItem.place === undefined
    ) {
      reject("No Inputs");
    }

    warehouse.findById(warehouseId, function (err: any, result: any) {
      if (!err) {
        if (!result) {
          reject("Warehouse was not found");
        } else {
          result.items.push(newItem);
          result.save(function (saveerr: any, saveresult: any) {
            if (!saveerr) {
              resolve();
            } else {
              reject(saveerr.message);
            }
          });
        }
      } else {
        reject(err.message);
      }
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
