import mongoose, { InferSchemaType } from "mongoose";

export const scheduleSchema = new mongoose.Schema({
  mon: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
  },
  tue: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
  },
  wed: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
  },
  thu: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
  },
  fri: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
  },
  sat: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
  },
  sun: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
  },
});



function validate(v: string) {
  let individualNumber = v.split(":");

  return true;
}

export type scheduleModel = InferSchemaType<typeof scheduleSchema>;
