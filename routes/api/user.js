const router = require("express").Router();
const auth = require("../../middleware/auth");
const userController = require("../../controllers/userController");

// @route   GET api/user/:id
// @desc    Get all of user games
// @access  Private
router.get("/:id", userController.getUser);

module.exports = router;
