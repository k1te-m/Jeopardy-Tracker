const router = require("express").Router();
const Game = require("../../models/Game");
const auth = require("../../middleware/auth");
const gameController = require("../../controllers/gameController");

// @route   GET api/game
// @desc    Get all of user games
// @access  Private
router.get("/:id", gameController.getUserGames);

// @route   POST api/game
// @desc    Create new game
// @access  Private
router.post("/", gameController.createNewGame);

module.exports = router;
