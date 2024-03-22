const router = require("express").Router();
const { getJson } = require("../../controllers/admin/admin.controller")
const { getTicket } = require("../../controllers/admin/admin.controller")
const { getAlltickets } = require("../../controllers/admin/admin.controller")
const { deleteTicket } = require("../../controllers/admin/admin.controller")
const { updateTicket } = require("../../controllers/admin/admin.controller")



router.post("/get_json", getJson);
router.get("/tickets", getTicket);
router.get("/all_tickets", getAlltickets)
router.post("/del_tickets", deleteTicket)
router.post("/update_tickets", updateTicket)


module.exports = router;
