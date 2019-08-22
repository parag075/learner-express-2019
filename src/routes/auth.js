const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	res.send("Hi there one");
});

module.exports = router;
