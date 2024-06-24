// Import User and Thought models from the models directory
const { User, Thought } = require("../models");

module.exports = {
  // Function to get all thoughts from the database
  fetchAllThoughts(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought)) // Send the fetched thoughts as a JSON response
      .catch((err) => res.status(500).json(err)); // Handle any errors
  },

  // Function to get a single thought by its ID
  fetchSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v") // Exclude the __v field
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought found with this ID!" }) // If no thought is found, send an error message
          : res.json(thought) // Send the fetched thought as a JSON response
      )
      .catch((err) => res.status(500).json(err)); // Handle any errors
  },

  // Function to create a thought and add it to the associated user's thoughts array
  addThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } }, // Push the thought's ID to the user's thoughts array
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No User found with this ID!" }) // If no user is found, send an error message
          : res.json(thought) // Send the created thought as a JSON response
      )
      .catch((err) => res.status(500).json(err)); // Handle any errors
  },

  // Function to update a thought by its ID
  modifyThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body }, // Update the thought with the data in the request body
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thought found with this ID!" }) // If no thought is found, send an error message
          : res.json(user) // Send the updated thought as a JSON response
      )
      .catch((err) => res.status(500).json(err)); // Handle any errors
  },

  // Function to delete a thought by its ID
  removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" }) // If no thought is found, send an error message
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } }, // Remove the thought's ID from the user's thoughts array
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought deleted, but no user found'}) // If no user is found, send an error message
          : res.json({ message: 'Thought successfully deleted' }) // Send a success message
      )
      .catch((err) => res.status(500).json(err)); // Handle any errors
  },

  // Function to add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }, // Add the reaction to the thought's reactions array
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" }) // If no thought is found, send an error message
          : res.json(thought) // Send the updated thought as a JSON response
      )
      .catch((err) => res.status(500).json(err)); // Handle any errors
  },

  // Function to remove a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Remove the reaction from the thought's reactions array
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" }) // If no thought is found, send an error message
          : res.json(thought) // Send the updated thought as a JSON response
      )
      .catch((err) => res.status(500).json(err)); // Handle any errors
  },
};
