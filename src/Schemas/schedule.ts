import mongoose, { InferSchemaType } from "mongoose";

const scheduleSchema = new mongoose.Schema({
  mon: {
    type: [String, String],
    require: true,
    validate: {
      validator: function (v: string): boolean {
        return validate(v);
      },
    },
  },
  tue: {
    type: [String, String],
    require: true,
    validate: {
      validator: function (v: string): boolean {
        return validate(v);
      },
    },
  },
  wed: {
    type: [String, String],
    require: true,
    validate: {
      validator: function (v: string): boolean {
        return validate(v);
      },
    },
  },
  thu: {
    type: [String, String],
    require: true,
    validate: {
      validator: function (v: string): boolean {
        return validate(v);
      },
    },
  },
  fri: {
    type: [String, String],
    require: true,
    validate: {
      validator: function (v: string): boolean {
        return validate(v);
      },
    },
  },
  sat: {
    type: [String, String],
    require: true,
    validate: {
      validator: function (v: string): boolean {
        return validate(v);
      },
    },
  },
  sun: {
    type: [String, String],
    require: true,
    validate: {
      validator: function (v: string): boolean {
        return validate(v);
      },
    },
  },
});

function validate(v: string) {
  let day = v.split("-");
  if (day.length >= 3) return false;
  if (validformat(day[0]) && validformat(day[1])) return true;
  return false;
}

function validformat(day: string): boolean {
  let split = day.split(":");
  if (split.length >= 3) return false;
  if (split[0].length === 2 && split[1].length === 2) return true;
  return false;
}

export type shippmentModel = InferSchemaType<typeof scheduleSchema>;

export default mongoose.model("sheduleSchema", scheduleSchema);
