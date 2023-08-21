const jwt = require("jsonwebtoken");
const config = require("../../config/config")

const getToken = (payload) => {
  const token = jwt.sign(
    payload,
    config.jwt.secret,
    { expiresIn: '1d' }
  )
  return token;
}

module.exports = getToken;