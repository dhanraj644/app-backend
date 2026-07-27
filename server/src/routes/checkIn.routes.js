import express from "express";

import {
  createCheckIn,
  getCheckIns,
  getCheckInById,
  getCheckInsByApp,
  deleteCheckIn,
} from "../controllers/checkIn.controller.js";

import validate from "../middleware/validate.js";

import {
  createCheckInValidator,
  checkInIdValidator,
  appCheckInValidator,
  checkInQueryValidator,
} from "../validator/checkIn.validator.js";

const router = express.Router();


router.post(
  "/",
  validate(createCheckInValidator),
  createCheckIn
);


router.get(
  "/",
  getCheckIns
);


router.get(
  "/:id",
  validate(checkInIdValidator, "params"),
  getCheckInById
);


router.get(
  "/app/:appId",
  getCheckInsByApp
);


router.delete(
  "/:id",
  validate(checkInIdValidator, "params"),
  deleteCheckIn
);

export default router;