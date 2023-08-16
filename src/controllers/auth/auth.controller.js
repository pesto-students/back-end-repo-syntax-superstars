const login = require('./login');
// const logout = require('./logout');
const register = require('./register');
const googleLogin = require('./googleLogin');
const verifyEmail = require('./verifyEmail');
const updateProfile = require('./updateProfile');
const changePassword = require('./changePassword');

module.exports = {
    login,
    // logout,
    register,
    // handleRefresh,
    googleLogin,
    verifyEmail,
    updateProfile,
    changePassword,
}