import express from "express";
const router = express.Router();

import authRoutes from "./auth";

router.get("/", (req, res) => {
  res.send("Hello from /api/");
});

router.use("/auth", authRoutes);

export default router;
