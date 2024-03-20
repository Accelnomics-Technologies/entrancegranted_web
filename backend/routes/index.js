const router = require("express").Router();

const authRoutes = require("./auth/index.routes");

router.use("/auth", authRoutes);

module.exports = router;
