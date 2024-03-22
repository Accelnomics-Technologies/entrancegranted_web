const router = require("express").Router();

const { isAuthenticatedAdmin } = require("../middlewares/admin.middleware");
const authRoutes = require("./auth/index.routes");
const adminRoutes = require("./admin/index.routes")

router.use("/auth", authRoutes);

router.use("/admin", isAuthenticatedAdmin, adminRoutes);

module.exports = router;
