// Import the express router
const router = require('express').Router();

// Import all of the API routes from /api/index.js (this is a directory we've created to organize our routes)
const apiRoutes = require('./api');

// Add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

// If no API routes are hit, send the client an error message
router.use((req, res) => res.send('Wrong route!'));

// Export the router
module.exports = router;
