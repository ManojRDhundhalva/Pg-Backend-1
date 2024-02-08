const { Router } = require("express");
const controller = require("../controllers/login");

const router = Router();

router.post("/", controller.getAccount);
router.get("/:username", controller.getEmailIdByUserName);
router.put("/", controller.updatePassword);

module.exports = router;
