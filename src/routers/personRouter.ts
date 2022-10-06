import { Router } from "express";
import person from "../Schemas/person.js";
import { addPerson } from "../controllers/personController.js";
import { scheduleModel, scheduleSchema } from "../Schemas/schedule.js";

const router = Router();

router.get("/", async (req, res) => {
  res.send(await person.find({})).status(200);
});

router.post("/add", async (req, res) => {
  addPerson(req.body.person.name, req.body.person.role, req.body.schedule)
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

export default router;
