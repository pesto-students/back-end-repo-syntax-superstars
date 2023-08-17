const login = require('./login');
const register = require('./register');
const googleLogin = require('./googleLogin');
const verifyEmail = require('./verifyEmail');
const updateProfile = require('./updateProfile');
const changePassword = require('./changePassword');
const uploadProfilePic = require('./uploadProfilePic');

module.exports = {
    login,
    register,
    googleLogin,
    verifyEmail,
    updateProfile,
    changePassword,
    uploadProfilePic,
}