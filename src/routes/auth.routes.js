const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth.controller');
const verifyToken = require('../middleware/auth');

const multer = require('multer');
const upload = multer();

// router for /auth

router.post('/signup', authController.register);
router.post('/login', authController.login);
router.get('/verify-email/:code', authController.verifyEmail);
router.post('/google-login', authController.googleLogin);
router.post('/upload-profile-pic', upload.single('file'), authController.uploadProfilePic);
router.put('/edit-profile/:id', verifyToken, authController.updateProfile);
router.put('/change-password/:id', verifyToken, authController.changePassword);

module.exports = router;