import express from "express";
import {
  createApp,
  getApps,
  getAppById,
  updateApp,
  deleteApp,
} from "../controllers/app.controller.js";

const router = express.Router();

router.post("/", createApp);

router.get("/", getApps);

router.get("/:id", getAppById);

router.put("/:id", updateApp);

router.delete("/:id", deleteApp);

export default router;