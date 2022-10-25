import { Router } from "express";
import person from "../Schemas/person.js";
import {
  addPerson,
  avalableWorkers,
  changeWarehouse,
  deletePerson,
  getWorkingWorkers,
  setWorkingOrder,
} from "../controllers/personController.js";
import { scheduleModel, scheduleSchema } from "../Schemas/schedule.js";
import { Types } from "mongoose";

const router = Router();

router.get("/", (req, res) => {
  res.send(person.find({})).status(200);
});

router.get("/working/:day", (req, res) => {
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

router.post("/add", (req, res) => {
  addPerson(req.body.person.name, req.body.person.role, req.body.schedule)
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.put("/changewarehouse", (req, res) => {
  changeWarehouse(req.body.personId, req.body.newWarehouse)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.delete("/removeperson", (req, res) => {
  deletePerson(req.body.personID)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.put("/setorder", async (req, res) => {
  console.log(req.body);

  setWorkingOrder(req.body.orderId, req.body.personId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/avalable/:role", (req, res) => {
  if (!req.params.role) res.status(400).send("No role provided");

  avalableWorkers(req.params.role)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

export default router;
