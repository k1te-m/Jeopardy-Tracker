const router = require("express").Router();
const authRoutes = require("./auth");
const gameRoutes = require("./game");

router.use("/auth", authRoutes);
router.use("/game", gameRoutes);

module.exports = router;
