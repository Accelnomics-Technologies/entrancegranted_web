const router = require("express").Router();
const { getJson } = require("../../controllers/admin/admin.controller")
 
router.post("/get_json", getJson);

module.exports = router;
