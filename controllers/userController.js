const User = require("../models/User");
const Game = require("../models/Game");

module.exports = {
  // Retrieve a specific user based on username
  getUser: (req, res) => {
    const username = req.params.username;
    User.findOne({ username: username })
      .select("-password")
      .then((user) => res.json(user))
      .catch((error) => res.status(422).json(error));
  },
  // Retrieve user games based on username
  getProfileGames: (req, res) => {
    const username = req.params.username;
    Game.find({ username: username })
      .sort({ gameDate: -1 })
      .then((games) => res.json(games))
      .catch((error) => res.status(422).json(error));
  },
};
