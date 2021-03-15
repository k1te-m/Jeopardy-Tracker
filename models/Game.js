const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//comment

const gameSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    default: 0,
  },
  showDoubleJeopardy: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Game", gameSchema);
