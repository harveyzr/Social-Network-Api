// Import the express router
const router = require('express').Router();

// Import the controller functions from the thoughtController
const {
    fetchAllThoughts,
    fetchSingleThought,
    addThought,
    modifyThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// Define a route for the path '/'. This route will respond to GET and POST requests.
// GET requests will fetch all thoughts, while POST requests will add a new thought.
router.route('/').get(fetchAllThoughts).post(addThought);

// Define a route for the path '/:thoughtId'. This route will respond to GET, PUT, and DELETE requests.
// GET requests will fetch a single thought by its ID.
// PUT requests will modify a thought by its ID.
// DELETE requests will remove a thought by its ID.
router.route('/:thoughtId')
.get(fetchSingleThought)
.put(modifyThought)
.delete(removeThought);

// Define a route for the path '/:thoughtId/reactions'. This route will respond to POST requests.
// POST requests will add a new reaction to a thought.
router.route('/:thoughtId/reactions')
.post(addReaction);

// Define a route for the path '/:thoughtId/reactions/:reactionId'. This route will respond to DELETE requests.
// DELETE requests will remove a reaction by its ID.
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

// Export the router to be used in other parts of the application
module.exports = router;
