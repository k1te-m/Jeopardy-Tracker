const router = require("express").Router();
const auth = require("../../middleware/auth");
const followController = require("../../controllers/followController");

// @route   PUT api/follow/:id
// @desc    Add specific profile to user's following property
// @access  Private
router.put("/:id", followController.followUser);

module.exports = router;
