import { Router } from "express";
import { Types } from "mongoose";
import { createItem } from "../controllers/itemController.js";

const router = Router();

router.post("/", (req, res) => {
  createItem(req.body.name, req.body.price)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

export default router;
