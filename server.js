// Import the express module
const express = require("express");

// Import the database configuration from ./config/connection
const db = require("./config/connection");

// Import the routes from ./routes
const routes = require("./routes");

// Set the port to the environment variable PORT or 3001 if it's not set
const PORT = process.env.PORT || 3001;

// Create an instance of an express application
const app = express();

// Use the express.urlencoded middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Use the express.json middleware to parse JSON bodies
app.use(express.json());

// Use the routes defined in ./routes
app.use(routes);

// Once the database connection is open, start the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
