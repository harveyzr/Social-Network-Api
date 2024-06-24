// Importing required modules from mongoose
const { Schema, model, Types } = require('mongoose');

// Defining the user schema
const userSchema = new Schema(
  {
    // Defining the username field
    username: {
      type: String, // Data type is String
      unique: true, // Username must be unique
      required: true, // Username is required
      trim: true, // Trims whitespace
    },
    // Defining the email field
    email: {
      type: String, // Data type is String
      required: true, // Email is required
      unique: true, // Email must be unique
      // Email must match the given regex pattern
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    // Defining the thoughts field
    thoughts: [
      {
        type: Schema.Types.ObjectId, // Data type is ObjectId
        ref: "Thought", // References the Thought model
      },
    ],
    // Defining the friends field
    friends: [
      {
        type: Schema.Types.ObjectId, // Data type is ObjectId
        ref: "User", // References the User model
      },
    ],
  },
  {
    // This option tells Mongoose that we want virtuals to be included when we convert the mongoose document to JSON
    toJSON: {
      virtuals: true,
    },
    id: false, // This option tells Mongoose not to create an id virtual
  }
);

// Defining a virtual property 'friendCount' that's computed from the length of the user's 'friends' array field on query.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Creating the User model using the UserSchema
const User = model('User', userSchema);

// Exporting the User model
module.exports = User;
