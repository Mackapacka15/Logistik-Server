import mongoose, { InferSchemaType } from "mongoose";

export const scheduleSchema = new mongoose.Schema({
  mon: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    working: {
      type: Boolean,
    },
  },
  tue: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    working: {
      type: Boolean,
    },
  },
  wed: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    working: {
      type: Boolean,
    },
  },
  thu: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    working: {
      type: Boolean,
    },
  },
  fri: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    working: {
      type: Boolean,
    },
  },
  sat: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    working: {
      type: Boolean,
    },
  },
  sun: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    working: {
      type: Boolean,
    },
  },
});

export type scheduleModel = InferSchemaType<typeof scheduleSchema>;
