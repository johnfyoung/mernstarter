import app from "./app";

// Set port to listen to
const PORT = process.env.PORT || 3001;

// Start listening
export default app.listen(PORT);
