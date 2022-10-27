import { Router } from "express";
import {
  addOrder,
  findOldestNotSent,
  markOrderAsPicked,
  markOrderAsSent,
  mostExpensive,
  notPickedOrders,
  totalValue,
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

router.put("/picked", (req, res) => {
  markOrderAsPicked(req.body.orderId, req.body.pickerId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.put("/sent", (req, res) => {
  markOrderAsSent(req.body.orderId, req.body.senderId)
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

router.get("/totalvalue/:month", (req, res) => {
  let month: number = 0;
  try {
    month = Number.parseInt(req.params.month);
    if (month > 11) {
      throw new Error();
    }
  } catch {
    res.status(400).send("Not a valid number");
    return;
  }

  totalValue(month)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/expensive/:month", (req, res) => {
  let month: number = 0;
  try {
    month = Number.parseInt(req.params.month);
    if (month > 11) {
      throw new Error();
    }
  } catch {
    res.status(400).send("Not a valid number");
    return;
  }
  mostExpensive(month)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(200).send;
    });
});
export default router;
