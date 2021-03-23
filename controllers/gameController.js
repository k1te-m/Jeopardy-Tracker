const Game = require("../models/Game");

module.exports = {
  getUserGames: (req, res) => {
    const id = req.params.id;
    Game.find({ userId: id })
      .sort({ date: -1 })
      .then((games) => res.json(games))
      .catch((error) => res.status(422).json(error));
  },
  getSpecificGame: (req, res) => {
    const id = req.params.id;
    Game.findOne({ _id: id })
      .then((game) => res.json(game))
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
  updateScore: async (req, res) => {
    const id = req.params.id;
    try {
      const game = await Game.findOne({ _id: id });

      game.score = req.body.score;

      await game.save();

      res.send(game);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  getAllGames: (req, res) => {
    Game.find({})
      .sort({ score: -1 })
      .limit(10)
      .then((games) => res.json(games))
      .catch((error) => res.status(422).json(error));
  },
};
