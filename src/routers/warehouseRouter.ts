import { Router } from "express";
import { createWarehouse } from "../controllers/warehouseController.js";

const router = Router();

router.post("/add", async (req, res) => {
  createWarehouse(req.body.name)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

export default router;