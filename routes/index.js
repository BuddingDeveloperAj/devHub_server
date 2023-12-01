const express = require("express");
const router = express.Router();

const questionRoutes = require("./question");

router.use("/questions", questionRoutes);

module.exports = router;
