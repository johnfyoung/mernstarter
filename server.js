import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

// Get an Express app
const app = express();
const PORT = process.env.PORT || 3001;

// logging
app.use(morgan("dev"));

// Public static routes
app.use(express.static(path.join(__dirname, "./client/build")));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

import routes from "./routes";
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
