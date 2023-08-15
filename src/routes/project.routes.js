const express = require('express')
const router = express.Router();
const verifyToken = require("../middleware/auth");
const projectController = require('../controllers/projects/project.contoller');

router.post('/create', verifyToken, projectController.addProject);
router.get('/list?*', verifyToken, projectController.getProjects);
router.get('/latest', verifyToken, projectController.getLatestProjects);
router.put('/edit/:id', verifyToken, projectController.editProject);
router.delete('/delete/:id', verifyToken, projectController.deleteProject);

module.exports = router;