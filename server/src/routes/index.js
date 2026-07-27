import express from "express";

import appRoutes from "./app.routes.js";
import checkInRoutes from "./checkIn.routes.js";

const router = express.Router();

router.use("/apps", appRoutes);
router.use("/check-ins", checkInRoutes);

export default router;