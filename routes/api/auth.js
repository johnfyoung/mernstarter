import express from "express";
const router = express.Router();

router.get("/authenticate", (req, res) => {
  res.send("Hello from /api/auth/authenticate");
});

router.get("/authorize", (req, res) => {
  res.send("Hello from /api/auth/authorize");
});

export default router;
