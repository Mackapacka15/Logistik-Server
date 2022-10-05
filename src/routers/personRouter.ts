import { Router } from "express";
import person from "../Schemas/person.js";

const router = Router();

router.get("/", async (req, res) => {
  res.send(await person.find({})).status(200);
});

export default router;
