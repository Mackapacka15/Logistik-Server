import { Router } from "express";
import {
  createWarehouse,
  removeWarehouse,
  addItem,
  itemInfo,
} from "../controllers/warehouseController.js";

const router = Router();

router.post("/", (req, res) => {
  createWarehouse(req.body.name)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/", (req, res) => {
  removeWarehouse(req.body.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.put("/item", (req, res) => {
  addItem(req.body.warehouseId, req.body.itemName, req.body.balance, req.body.place)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/item", (req, res) => {
  itemInfo({
    itemName: req.body.itemName,
    warehouseId: req.body.warehouseId,
    warehouseName: req.body.warehouseName,
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      if (err === "Could not connect to database") {
        res.status(500).send(err);
      }
      res.status(400).send(err);
    });
});

export default router;
