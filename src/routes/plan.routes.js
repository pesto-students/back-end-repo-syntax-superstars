const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/auth");
const planController = require("../controllers/plans/plan.controller");

router.get('/list', verifyToken, planController.getPlans);

module.exports = router;