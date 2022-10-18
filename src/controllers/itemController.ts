import item from "../Schemas/item.js";

export function createItem(name: string, price?: number) {
  return new Promise<void>((resolve, reject) => {
    item
      .find({ name: name })
      .then((result) => {
        if (!result) reject("An item with that name already exists");
        item
          .create({ name, price })
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject("Could not create item" + err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
