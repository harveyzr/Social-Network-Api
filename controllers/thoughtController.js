const { User, Thought } = require("../models")

module.exports = {
     getThought(req, res) {
        Thought.find({})
            .then((thogutht) => res.json(thought))
            .catch((err) => res.status(500).json(err));
     },

     getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
              .select("-__v")
              .then((thought) => 
                !thought
                    ? res.status(404).json({ message: "No Thought find with this ID!" })
                    : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
     },

     createThought(req, res) {
        Thought.create(req.body)
           .then(({ _id }) => {
               return User.findOneAndUpdate(
                { _id: req.body.UserId },
                { $push: { thoughts: _id } },
                { new: true }
               );

           })
           .then((thought) =>
            !thought
               ? res.status(404).json({ message: "No User find with this ID!" })
        )
        .catch((err) => res.status(500).json(err));
     },
     updateThought(req, res)
     



}
