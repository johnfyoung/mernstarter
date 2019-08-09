import express from "express";
import path from "path";

// Get an Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Public static routes
app.use(express.static(path.join(__dirname, "./client/build")));

import routes from "./routes";
app.use(routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});