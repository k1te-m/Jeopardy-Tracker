const router = require("express").Router();
const authRoutes = require("./auth");
const gameRoutes = require("./game");
const userRoutes = require("./user");

router.use("/auth", authRoutes);
router.use("/game", gameRoutes);
router.use("/user", userRoutes);

module.exports = router;
