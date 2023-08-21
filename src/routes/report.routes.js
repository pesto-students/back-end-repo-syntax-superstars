const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/auth");
const reportController = require("../controllers/reports/report.controller");

router.get('/list/:docId', verifyToken, reportController.getReport);

module.exports = router;