// Import the express router
const router = require('express').Router();

// Import the user routes
const userRoutes = require('./userRoutes');

// Import the thought routes
const thoughtRoutes = require('./thoughtRoutes');

// Use the user routes when the path is '/users'
router.use('/users', userRoutes);

// Use the thought routes when the path is '/thoughts'
router.use('/thoughts', thoughtRoutes);

// Export the router to be used in other parts of the application
module.exports = router;
