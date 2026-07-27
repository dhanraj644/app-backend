import mongoose from "mongoose";

const appSchema = new mongoose.Schema(
  {
    appCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    appName: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("App", appSchema);