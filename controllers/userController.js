const User = require("../models/User");
const Game = require("../models/Game");

module.exports = {
  getUser: (req, res) => {
    const username = req.params.username;
    User.findOne({ username: username })
      .select("-password")
      .then((user) => res.json(user))
      .catch((error) => res.status(422).json(error));
  },
  getProfileGames: (req, res) => {
    const username = req.params.username;
    Game.find({ username: username })
      .sort({ date: -1 })
      .then((games) => res.json(games))
      .catch((error) => res.status(422).json(error));
  },
};
