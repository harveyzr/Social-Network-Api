// Import User and Thought models from the models directory
const { User, Thought } = require("../models");

module.exports = {
  // Function to fetch all users
  fetchAllUsers(req, res) {
    // Find all users in the database
    User.find({})
      // If successful, return the users as JSON
      .then((user) => res.json(user))
      // If an error occurs, return the error
      .catch((err) => res.status(500).json(err));
  },
  // Function to fetch a single user
  fetchSingleUser(req, res) {
    // Find one user by their ID
    User.findOne({ _id: req.params.userId })
      // Populate the user's thoughts and friends
      .populate("thoughts")
      .populate("friends")
      // Exclude the version key (__v)
      .select("-__v")
      // If successful, return the user as JSON
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with that ID!" })
          : res.json(user)
      )
      // If an error occurs, return the error
      .catch((err) => res.status(500).json(err));
  },
  // Function to register a new user
  registerUser(req, res) {
    // Create a new user with the request body
    User.create(req.body)
      // If successful, return the new user as JSON
      .then((user) => res.json(user))
      // If an error occurs, return the error
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Function to modify a user
  modifyUser(req, res) {
    // Find a user by their ID and update them with the request body
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      // If successful, return the updated user as JSON
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with this ID!" })
          : res.json(user)
      )
      // If an error occurs, return the error
      .catch((err) => res.status(500).json(err));
  },
  // Function to remove a user
  removeUser(req, res) {
    // Find a user by their ID and delete them
    User.findOneAndDelete({ _id: req.params.userId })
      // If successful, delete the user's associated thoughts
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with this ID!" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      // Return a success message
      .then(() => res.json({ message: "User and Thought deleted!" }))
      // If an error occurs, return the error
      .catch((err) => res.status(500).json(err));
  },
  // Function to add a friend to a user
  includeFriend(req, res) {
    // Find a user by their ID and add a friend to their friends list
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      // If successful, return the updated user as JSON
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with this ID!" })
          : res.json(user)
      )
      // If an error occurs, return the error
      .catch((err) => res.status(500).json(err));
  },
  // Function to remove a friend from a user
  excludeFriend(req, res) {
    // Find a user by their ID and remove a friend from their friends list
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      // If successful, return the updated user as JSON
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "No User found with this ID!" })
            : res.json(user)
      )
      // If an error occurs, return the error
      .catch((err) => res.status(500).json(err));
  },
};

