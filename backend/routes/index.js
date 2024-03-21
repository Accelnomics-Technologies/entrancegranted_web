const router = require("express").Router();

const authRoutes = require("./auth/index.routes");
const adminRoutes = require("./admin/index.routes")

router.use("/auth", authRoutes);

router.use("/admin",adminRoutes);

module.exports = router;
