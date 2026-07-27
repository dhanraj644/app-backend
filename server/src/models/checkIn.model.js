import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema(
  {
    app: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "App",
      required: true,
    },

    deviceId: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      enum: ["Android", "iOS"],
      required: true,
    },

    deviceName: String,

    osVersion: String,

    timezone: String,

    checkedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const CheckIn= mongoose.model("CheckIn", checkInSchema);

export default CheckIn;