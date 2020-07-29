const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  urlCollections: [
    {
      title: { type: String },
      url: { type: String },
      short: { type: String },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
