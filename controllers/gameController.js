const Game = require("../models/Game");

module.exports = {
  // Get specific user games, sorted by gameDate
  getUserGames: (req, res) => {
    const id = req.params.id;
    Game.find({ userId: id })
      .sort({ gameDate: -1 })
      .then((games) => res.json(games))
      .catch((error) => res.status(422).json(error));
  },
  // Get one specif game based on it's _id
  getSpecificGame: (req, res) => {
    const id = req.params.id;
    Game.findOne({ _id: id })
      .then((game) => res.json(game))
      .catch((error) => res.status(422).json(error));
  },
  // Create a new game document
  createNewGame: (req, res) => {
    Game.create(req.body)
      .then((game) => {
        res.json(game);
        console.log("Game created.");
      })
      .catch((error) => res.status(422).json(error));
  },
  // Find game based on ID and update score to req.body.score, then save/send
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
  // Retrieve all games sorted by high score
  getAllGames: (req, res) => {
    Game.find({})
      .sort({ score: -1 })
      .limit(10)
      .then((games) => res.json(games))
      .catch((error) => res.status(422).json(error));
  },
};
