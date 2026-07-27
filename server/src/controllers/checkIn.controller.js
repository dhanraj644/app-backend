import CheckIn from "../models/checkIn.model.js";
import App from "../models/app.models.js";


// Create Check-In
export const createCheckIn = async (req, res) => {
  try {
    const {
      appId,
      deviceId,
      platform,
      deviceName,
      osVersion,
    } = req.body;

    // Check App
    const app = await App.findById(appId);

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found.",
      });
    }

    // Get today's date in IST
    const checkInDate = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    // Check if already checked in today
    const alreadyCheckedIn = await CheckIn.findOne({
      app: appId,
      deviceId,
      checkInDate,
    });

    if (alreadyCheckedIn) {
      return res.status(400).json({
        success: false,
        message: "Device already checked in today.",
      });
    }

    // Create Check-In
    const checkIn = await CheckIn.create({
      app: appId,
      deviceId,
      platform,
      deviceName,
      osVersion,
      checkInDate,
    });

    res.status(201).json({
      success: true,
      message: "Check-In successful.",
      data: checkIn,
    });

  } catch (error) {

    // Handle duplicate index error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Device already checked in today.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Check-Ins
export const getCheckIns = async (req, res) => {
  try {

    const checkIns = await CheckIn.find()
      .populate("app", "appName appCode")
      .sort({ checkedAt: -1 })

    res.status(200).json({
      success: true,
      data: checkIns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Check-In By Id
export const getCheckInById = async (req, res) => {
  try {
    const checkIn = await CheckIn.findById(req.params.id).populate(
      "app",
      "appName appCode"
    );

    if (!checkIn) {
      return res.status(404).json({
        success: false,
        message: "Check-In not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: checkIn,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Check-Ins By App
export const getCheckInsByApp = async (req, res) => {
  try {
    const { appId } = req.params;
    const {
      deviceId,
      from,
      to,
    } = req.query;

    const filter = {
      app: appId,
    };

    if (deviceId) {
      filter.deviceId = {
        $regex: deviceId,
        $options: "i",
      };
    }

    if (from || to) {
      filter.checkedAt = {};

      if (from) {
        filter.checkedAt.$gte = new Date(from);
      }

      if (to) {
        filter.checkedAt.$lte = new Date(to);
      }
    }

    const checkIns = await CheckIn.find(filter)
      .sort({ checkedAt: -1 })

    res.status(200).json({
      success: true,
      data: checkIns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Check-In
export const deleteCheckIn = async (req, res) => {
  try {
    const checkIn = await CheckIn.findById(req.params.id);

    if (!checkIn) {
      return res.status(404).json({
        success: false,
        message: "Check-In not found.",
      });
    }

    await checkIn.deleteOne();

    res.status(200).json({
      success: true,
      message: "Check-In deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};