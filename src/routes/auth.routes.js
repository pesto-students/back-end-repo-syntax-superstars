const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth.controller');
const verifyToken = require('../middleware/auth');

// router for /auth

router.post('/signup', authController.register);
router.post('/login', authController.login);
// router.post('/logout', authController.logout);
router.get('/verify-email/:code', authController.verifyEmail);
router.post('/google-login', authController.googleLogin);
router.put('/edit-profile/:id', verifyToken, authController.updateProfile);
router.put('/change-password/:id', verifyToken, authController.changePassword);
router.post('/upload-profile-pic', authController.uploadProfilePic);

module.exports = router;