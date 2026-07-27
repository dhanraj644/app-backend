import express from "express";
import { createCheckIn } from "../controllers/checkIn.controller.js";

const router = express.Router();

router.post("/", createCheckIn);

export default router;