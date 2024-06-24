// Import necessary modules from mongoose
const { Schema, model, Types } = require('mongoose');

// Import moment module to format timestamps
const moment = require('moment')

// Define the schema for reactions
const reactionSchema = new Schema (
    {
       // Unique ID for the reaction
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       // Text of the reaction
       reactionBody: {
        type: String,
        required: true,
        maxlength: 280
       },
       // Username of the user who posted the reaction
       username: {
        type: String,
        required: true,
       },
       // Timestamp for the creation of the reaction
       createdAt: {
        type: Date,
        default: Date.now,
        // Use moment to format the timestamp
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
       },
    },
    {
        // Enable getters for virtuals and id field
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

// Define the schema for thoughts
const thoughtSchema = new Schema (
    {
      // Text of the thought
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      // Timestamp for the creation of the thought
      createdAt: {
        type: Date,
        default: Date.now,
        // Use moment to format the timestamp
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
      },
      // Username of the user who posted the thought
      username: {
        type: String,
        required: true,
      },
      // List of reactions to the thought
      reactions: [reactionSchema],
    },
    {
        // Enable getters for virtuals and id field
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

// Virtual property to get the total count of reactions
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;
