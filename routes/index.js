import express from "express";
const router = express.Router();

import apiRoutes from "./api";

router.use("/api", apiRoutes);

export default router;