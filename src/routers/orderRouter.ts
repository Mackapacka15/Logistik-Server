import { Router } from "express";
import {
  addOrder,
  findOldestNotSent,
  markOrderAsPicked,
  notPickedOrders,
} from "../controllers/orderController.js";

const router = Router();

router.post("/", (req, res) => {
  addOrder(req.body.customer, req.body.orderItems)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/", (req, res) => {
  notPickedOrders()
    .then((result) => {
      res.status(200).send(result);
    })
    .then((err) => {
      res.status(400).send(err);
    });
});

router.put("/", (req, res) => {
  markOrderAsPicked(req.body.orderId, req.body.pickerId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/notsent", (req, res) => {
  findOldestNotSent()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

export default router;
