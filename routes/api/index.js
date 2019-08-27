import express from "express";
const router = express.Router();

import authRoutes from "./auth";
import installRoutes from "./install";

router.get("/", (req, res) => {
  res.send("Hello from /api/");
});

router.use("/auth", authRoutes);
router.use("/install", installRoutes);

export default router;
