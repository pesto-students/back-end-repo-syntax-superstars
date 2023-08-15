const express = require('express')
const router = express.Router();
const verifyToken = require("../middleware/auth");
const documentController = require('../controllers/documents/document.contoller');

router.post('/create', verifyToken, documentController.addDocument);
router.get('/list?*', verifyToken, documentController.getDocuments);
router.get('/usage/:date', verifyToken, documentController.getDocumentsByWordCount);
router.put('/edit/:id', verifyToken, documentController.editDocument);
router.delete('/delete/:id', verifyToken, documentController.deleteDocument);

module.exports = router;