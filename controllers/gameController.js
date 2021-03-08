const Game = require("../models/Game");

module.exports = {
  getUserGames: (req, res) => {
    const id = req.params.id;
    Game.find({ userId: id })
      .sort({ date: -1 })
      .then((games) => res.json(games))
      .catch((error) => res.status(422).json(error));
  },
  createNewGame: (req, res) => {
    Game.create(req.body)
      .then((game) => {
        res.json(game);
        console.log("Game created.");
      })
      .catch((error) => res.status(422).json(error));
  },
};
