const router = require("express").Router();
const authRoutes = require("./auth");
const gameRoutes = require("./game");
const userRoutes = require("./user");
const followRoutes = require("./follow");

router.use("/auth", authRoutes);
router.use("/game", gameRoutes);
router.use("/user", userRoutes);
router.use("/follow", followRoutes);

module.exports = router;
