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
      trim: true,
    },

    testerName: {
      type: String,
      required: true,
      trim: true,
    },

    platform: {
      type: String,
      enum: ["Android", "iOS"],
      required: true,
    },

    deviceName: {
      type: String,
      trim: true,
    },

    osVersion: {
      type: String,
      trim: true,
    },

    // Date used to allow only one check-in per day
    checkInDate: {
      type: String,
      required: true,
    },

    createdAt: { 
       type: Date,
       default: Date.now,
  
       }

  },
  {
    timestamps: true,
  }
);

// One device can check in only once per day for a particular app
checkInSchema.index(
  {
    app: 1,
    deviceId: 1,
    checkInDate: 1,
  },
  {
    unique: true,
  }
);

const CheckIn = mongoose.model("CheckIn", checkInSchema);

export default CheckIn;