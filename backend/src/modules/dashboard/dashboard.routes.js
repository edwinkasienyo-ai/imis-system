const router = require("express").Router();
const controller = require("./dashboard.controller");

router.get("/stats", controller.getStats);

module.exports = router;