import App from "../models/app.models.js";
import CheckIn from "../models/checkIn.model.js";


export const createApp = async (req, res) => {
  try {
    const { appName, appCode } = req.body;


    const appExists = await App.findOne({ appCode });

    if (appExists) {
      return res.status(409).json({
        success: false,
        message: "App code already exists.",
      });
    }

    const app = await App.create({
      appCode,
      appName,
    });

    return res.status(201).json({
      statusCode:201,
      success: true,
      message: "App created successfully.",
      data: app,
    });
  } catch (error) {
    console.error("Create App Error:", error);

    return res.status(500).json({
      statusCode:500,
      success: false,
      message: "Internal Server Error.",
    });
  }
};



export const getApps = async (req, res) => {
  try {
    const apps = await App.find().sort({ createdAt: -1 });

    return res.status(200).json({
      statusCode:200,
      success: true,
      count: apps.length,
      data: apps,
    });
  } catch (error) {
    console.error("Get Apps Error:", error);

    return res.status(500).json({
      statusCode:500,
      success: false,
      message: "Internal Server Error.",
    });
  }
};




export const getAppById = async (req, res) => {
  try {
    const app = await App.findById(req.params.id);

    if (!app) {
      return res.status(404).json({
        statusCode:404,
        success: false,
        message: "App not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: app,
    });
  } catch (error) {
    console.error("Get App Error:", error);

    return res.status(500).json({
      statusCode:500,
      success: false,
      message: "Internal Server Error.",
    });
  }
};



export const updateApp = async (req, res) => {
  try {
    const app = await App.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!app) {
      return res.status(404).json({
       statusCode:404,
        success: false,
        message: "App not found.",
      });
    }

    return res.status(200).json({
      statusCode:200,
      success: true,
      message: "App updated successfully.",
      data: app,
    });
  } catch (error) {
    console.error("Update App Error:", error);

    return res.status(500).json({
      statusCode:500,
      success: false,
      message: "Internal Server Error.",
    });
  }
};


export const deleteApp = async (req, res) => {
  try {
    const app = await App.findById(
      req.params.id,
    );

    if (!app) {
      return res.status(404).json({
        statusCode:404,
        success: false,
        message: "App not found.",
      });
    }


    await CheckIn.deleteMany({
      app: req.params.id,
    });

    await app.deleteOne();

    return res.status(200).json({
      statusCode:200,
      success: true,
      message: "App deleted successfully.",
    });
  } catch (error) {
    console.error("Delete App Error:", error);

    return res.status(500).json({
      statusCode:500,
      success: false,
      message: "Internal Server Error.",
    });
  }
};