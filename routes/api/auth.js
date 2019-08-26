import express from "express";
import { validateLoginInput } from "../../util/validation";

const router = express.Router();

router.post("/authenticate", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // stub
  if (req.body.email === "john@john.com") {
    if (req.body.password === "password") {
      res.status(200).json({
        user: {
          email: "john@john.com",
          name: "John Young",
          exp: Date.now() / 1000 + 60,
          token: "fake token here"
        }
      });
    } else {
      errors.password = "Password incorrect";
      res.status(400).json(errors);
    }
  } else {
    errors.email = "User not found";
    res.status(400).json(errors);
  }
});

router.post("/authorize", (req, res) => {
  res.send("Hello from /api/auth/authorize");
});

export default router;
