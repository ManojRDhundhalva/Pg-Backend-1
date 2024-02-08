const { Router } = require("express");
const controller = require("../controllers/verifyEmail");

const router = Router();

router.post("/", controller.sendEmail);

module.exports = router;
