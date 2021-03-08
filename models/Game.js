const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: String,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Game", gameSchema);
