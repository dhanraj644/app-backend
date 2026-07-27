import mongoose from "mongoose";

const appSchema = new mongoose.Schema(
  {
    appCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    appName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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

const App= mongoose.model("App", appSchema);

export default App;