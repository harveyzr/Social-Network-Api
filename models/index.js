// Import the User model from the User.js file
const User = require('./User');

// Import the Thought model from the Thought.js file
const Thought = require('./Thought');

// Export the User and Thought models so they can be used in other parts of the application
module.exports = { User, Thought };
