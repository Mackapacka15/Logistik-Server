import { Router } from "express";
import person from "../Schemas/person.js";
import {
  addPerson,
  changeWarehouse,
  deletePerson,
  getWorkingWorkers,
} from "../controllers/personController.js";
import { scheduleModel, scheduleSchema } from "../Schemas/schedule.js";
import { Types } from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  res.send(await person.find({})).status(200);
});

router.get("/working:day", async (req, res) => {
  if (!req.params.day) {
    res.sendStatus(400);
  }
  getWorkingWorkers(req.params.day)
    .then((people) => {
      res.status(200).send(people);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
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
  await changeWarehouse(req.body.personId, req.body.newWarehouse)
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
