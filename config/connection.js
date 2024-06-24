// Import the 'connect' and 'connection' objects from the 'mongoose' library.
// 'connect' is used to connect to the MongoDB database.
// 'connection' is an object that represents the connection to a MongoDB server.
const { connect, connection } = require('mongoose');

// Define the connection string, which is the location of the MongoDB database.
// If the 'MONGODB_URI' environment variable is set, use that.
// Otherwise, connect to a MongoDB server running on localhost, port 27017, and use the 'socialDB' database.
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

// Connect to the MongoDB database using the connection string.
// The options object passed to 'connect' tells it to use the new URL string parser and the unified topology.
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export the 'connection' object. This will be used in other parts of the application to interact with the database.
module.exports = connection;
