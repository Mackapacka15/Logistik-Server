import { Router } from "express";
import person from "../Schemas/person.js";
import {
  addPerson,
  changeWarehouse,
  deletePerson,
} from "../controllers/personController.js";
import { scheduleModel, scheduleSchema } from "../Schemas/schedule.js";
import { Types } from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  res.send(await person.find({})).status(200);
});

router.post("/add", async (req, res) => {
  await addPerson(req.body.person.name, req.body.person.role, req.body.schedule)
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.put("/changewarehouse", async (req, res) => {
  let id = new Types.ObjectId(req.body.newWarehouse);

  await changeWarehouse(req.body.personId, id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.delete("/removeperson", async (req, res) => {
  await deletePerson(req.body.personID)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

export default router;
