import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import useragent from "express-useragent";

import { dbg } from "./core/util/tools";

import { logRequest, setCookie } from "./core/middleware";

require("dotenv").config();

// Get an Express app
const app = express();
app.use(useragent.express());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());
app.use(setCookie());

// logging
app.use(logRequest());

//connect to database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    dbg("MongoDB connected");
  })
  .catch((err) => console.log(err));

// include the routes
import coreRoutes from "./core/routes";
app.use(coreRoutes);

// Serve static assets if in production and not found
if (process.env.NODE_ENV === "production") {
  //Set Static folder
  const staticPath = path.join(__dirname, "../client/build");
  console.log("Static Path: " + staticPath);
  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    console.log("Route not on server. Handing to client...");
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

export default app;
