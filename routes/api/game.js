const router = require("express").Router();
const auth = require("../../middleware/auth");
const gameController = require("../../controllers/gameController");

// @route   GET api/game/:id
// @desc    Get all of user games
// @access  Private
router.get("/:id", auth, gameController.getUserGames);

// @route   GET api/game/set
// @desc    Get all of user games
// @access  Private
router.get("/set/:id", auth, gameController.getSpecificGame);

// @route   POST api/game
// @desc    Create new game
// @access  Private
router.post("/", auth, gameController.createNewGame);

// @route   PUT api/game/save/:id
// @desc    Update score for current game
// @access  Private
router.put("/save/:id", auth, gameController.updateScore);

// @route   GET api/game
// @desc    Get all games for high score board
// @access  Private
router.get("/", auth, gameController.getAllGames);

module.exports = router;
