import express from "express";
import {
  createApp,
  getApps,
  getAppById,
  updateApp,
  deleteApp,
} from "../controllers/app.controller.js";

import validate from "../middleware/validate.js";

import {
  createAppValidator,
  updateAppValidator,
  appIdValidator,
} from "../validator/app.validator.js";

const router = express.Router();

router.post("/",validate(createAppValidator), createApp);

router.get("/", getApps);

router.get("/:id", validate(appIdValidator, "params"), getAppById);

router.put("/:id",  validate(appIdValidator, "params"), validate(updateAppValidator), updateApp);

router.delete("/:id", validate(appIdValidator, "params"), deleteApp);

export default router;