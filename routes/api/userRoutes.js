// Import the express router
const router = require('express').Router();

// Import the user controller methods
const {
    fetchAllUsers,       // Method to fetch all users
    fetchSingleUser,     // Method to fetch a single user by ID
    registerUser,        // Method to register a new user
    modifyUser,          // Method to modify an existing user
    removeUser,          // Method to remove a user
    includeFriend,       // Method to add a friend to a user's friend list
    excludeFriend        // Method to remove a friend from a user's friend list
} = require('../../controllers/userController');

// Define the route for getting all users and registering a new user
// GET request to /api/users will fetch all users
// POST request to /api/users will register a new user
router.route('/').get(fetchAllUsers).post(registerUser);

// Define the route for getting, modifying, and deleting a user by ID
// GET request to /api/users/:userId will fetch a single user by ID
// PUT request to /api/users/:userId will modify a user by ID
// DELETE request to /api/users/:userId will remove a user by ID
router.route('/:userId')
.get(fetchSingleUser)
.put(modifyUser)
.delete(removeUser);

// Define the route for adding and removing a friend by ID
// POST request to /api/users/:userId/friends/:friendId will add a friend to a user's friend list
// DELETE request to /api/users/:userId/friends/:friendId will remove a friend from a user's friend list
router.route('/:userId/friends/:friendId')
.post(includeFriend)
.delete(excludeFriend);

// Export the router to be used in other parts of the application
module.exports = router;
