import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import useragent from "express-useragent";

import { dbg } from "./util/tools";

import { logRequest, setCookie } from "./middleware";

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
    reconnectTries: 100,
    reconnectInterval: 500,
    autoReconnect: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    dbg("MongoDB connected");
  })
  .catch(err => console.log(err));

// include the routes
import routes from "./routes";
app.use(routes);

// Serve static assets if in production and not found
if (process.env.NODE_ENV === "production") {
  //Set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

export default app;
