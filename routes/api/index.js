import express from "express";
const router = express.Router();

import authRoutes from "./auth";
import installRoutes from "./install";
import usersRoutes from "./users";

router.get("/", (req, res) => {
  res.send("Hello from /api/");
});

router.use("/auth", authRoutes);
router.use("/install", installRoutes);
router.use("/users", usersRoutes);

export default router;
