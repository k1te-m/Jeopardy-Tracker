const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: "Please enter a valid password.",
    trim: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  following: {
    type: [String],
    trim: true,
    unique: true,
  },
  followers: {
    type: [String],
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
