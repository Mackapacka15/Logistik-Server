import mongoose, { Types } from "mongoose";
import person, { personModel } from "../Schemas/person.js";
import { scheduleModel } from "../Schemas/schedule.js";

export function addPerson(
  namein: String,
  rolein: String,
  schedulein: scheduleModel,
  warehousein?: mongoose.Types.ObjectId
) {
  return new Promise<void>((resolve, reject) => {
    let newSchedule = fixSchedule(schedulein);
    if (validSchedule(newSchedule)) {
      let newperson = {
        name: namein,
        role: rolein,
        warehouse: warehousein,
        schedule: newSchedule,
      };

      person
        .create(newperson)
        .then(() => {
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

export function getWorkingWorkers(dayin: string) {
  return new Promise<any>((resolve, reject) => {
    let day = dayConvert(dayin);

    person
      .find()
      .then((people) => {
        let sendPeople = [] as Array<any>;

        people.forEach((element) => {
          if (element.schedule) {
            switch (day) {
              case "mon":
                if (element.schedule.mon?.working === true) {
                  sendPeople.push(element);
                }
                break;
              case "tue":
                if (element.schedule.tue?.working === true) {
                  sendPeople.push(element);
                }
                break;
              case "wed":
                if (element.schedule.wed?.working === true) {
                  sendPeople.push(element);
                }
                break;
              case "thu":
                if (element.schedule.thu?.working === true) {
                  sendPeople.push(element);
                }
                break;
              case "fri":
                if (element.schedule.fri?.working === true) {
                  sendPeople.push(element);
                }
                break;
              case "sat":
                if (element.schedule.sat?.working === true) {
                  sendPeople.push(element);
                }
                break;
              case "sun":
                if (element.schedule.sun?.working === true) {
                  sendPeople.push(element);
                }

                break;
              default:
                break;
            }
          }
        });

        if (sendPeople.length !== 0) {
          resolve(sendPeople);
        }
        reject("No Match");
      })
      .catch((error) => {
        reject(error);
      });
  });
  function dayConvert(dayin: string): string {
    let day = dayin.substring(1).toLowerCase();
    if (day.length === 3) return dayin;

    switch (day) {
      case "monday":
        return "mon";
      case "tueseday":
        return "tue";
      case "wednesday":
        return "wed";
      case "thursday":
        return "thu";
      case "friday":
        return "fri";
      case "saturday":
        return "sat";
      case "sunday":
        return "sun";
      default:
        return "";
    }
  }
}

export function changeWarehouse(
  personId: mongoose.Types.ObjectId,
  newWarehouse: mongoose.Types.ObjectId
) {
  return new Promise<void>((resolve, reject) => {
    person
      .findByIdAndUpdate(personId, { warehouse: newWarehouse })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function deletePerson(personId: mongoose.Types.ObjectId) {
  return new Promise<void>((resolve, reject) => {
    person
      .findByIdAndDelete(personId)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject("Person not found!" + error);
      });
  });
}

function fixSchedule(schedule: scheduleModel): scheduleModel {
  if (schedule.mon) {
    if (!schedule.mon.working) {
      schedule.mon.start = "00:00";
      schedule.mon.end = "00:00";
    }
  }
  if (schedule.tue) {
    if (!schedule.tue.working) {
      schedule.tue.start = "00:00";
      schedule.tue.end = "00:00";
    }
  }
  if (schedule.wed) {
    if (!schedule.wed.working) {
      schedule.wed.start = "00:00";
      schedule.wed.end = "00:00";
    }
  }
  if (schedule.thu) {
    if (!schedule.thu.working) {
      schedule.thu.start = "00:00";
      schedule.thu.end = "00:00";
    }
  }
  if (schedule.fri) {
    if (!schedule.fri.working) {
      schedule.fri.start = "00:00";
      schedule.fri.end = "00:00";
    }
  }
  if (schedule.sat) {
    if (!schedule.sat.working) {
      schedule.sat.start = "00:00";
      schedule.sat.end = "00:00";
    }
  }
  if (schedule.sun) {
    if (!schedule.sun.working) {
      schedule.sun.start = "00:00";
      schedule.sun.end = "00:00";
    }
  }

  return schedule;
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
  if (day.working === "") return false;
  let working = day.working;

  if (working === false) return true;

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
