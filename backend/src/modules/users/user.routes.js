const router = require("express").Router();
const controller = require("./user.controller");

router.post("/login", controller.login);

module.exports = router;