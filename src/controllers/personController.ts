import mongoose, { Types } from "mongoose";
import person from "../Schemas/person.js";
import { scheduleModel } from "../Schemas/schedule.js";

export function addPerson(
  namein: String,
  rolein: String,
  schedulein: scheduleModel,
  warehousein?: mongoose.Types.ObjectId
) {
  return new Promise<void>((resolve, reject) => {
    let newperson = {
      name: namein,
      role: rolein,
      warehouse: warehousein,
      schedule: schedulein,
    };
    if (validSchedule(schedulein)) {
      console.log("Create");

      person
        .create(newperson)
        .then((person) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject();
    }
  });
}

function validSchedule(schedule: any): boolean {
  console.log(schedule);

  if (
    validDay(schedule.mon) &&
    validDay(schedule.tue) &&
    validDay(schedule.wed) &&
    validDay(schedule.thu) &&
    validDay(schedule.fri) &&
    validDay(schedule.sat) &&
    validDay(schedule.sun)
  )
    return true;
  else {
    console.log("False");
    return false;
  }
}

function validDay(day: any): boolean {
  let startSplit = day.start.split(":");
  let endSplit = day.end.split(":");
  console.log(startSplit);
  console.log(endSplit);

  if (startSplit.length > 2 || endSplit > 2) return false;
  if (
    parseInt(startSplit[0]) >= 24 ||
    parseInt(startSplit[1]) > 60 ||
    parseInt(endSplit[0]) >= 24 ||
    parseInt(endSplit[1]) > 60
  ) {
    return false;
  }

  return true;
}
