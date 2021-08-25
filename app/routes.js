const express = require("express");
const router = express.Router();
const { saveCallId, getCallId, meetById } = require("./controller");

router.post("/save-call-id", saveCallId);
router.get("/get-call-id/:id", getCallId);
router.param("id", meetById);

module.exports = router;
