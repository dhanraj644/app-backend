import App from "../models/app.model.js";
import CheckIn from "../models/checkIn.model.js";

export const createCheckIn = async (req, res) => {
  try {
    const {
      appCode,
      deviceId,
      platform,
      deviceName,
      osVersion,
      timezone,
    } = req.body;

    // Find app by appCode
    const app = await App.findOne({
      appCode,
      isActive: true,
    });

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found.",
      });
    }

    // Today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Check if already checked in today
    const existingCheckIn = await CheckIn.findOne({
      app: app._id,
      deviceId,
      checkedAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (existingCheckIn) {
      return res.status(409).json({
        success: false,
        message: "Already checked in today.",
      });
    }

    // Create check-in
    const checkIn = await CheckIn.create({
      app: app._id,
      deviceId,
      platform,
      deviceName,
      osVersion,
      timezone,
      ipAddress: req.ip,
    });

    return res.status(201).json({
      success: true,
      message: "Check-in successful.",
      data: checkIn,
    });

  } catch (error) {
    console.error("Create Check-In Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};