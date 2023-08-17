const User = require('../../models/User');
const bcrypt = require("bcryptjs");
const getToken = require('./jwtUtils');
const Plan = require('../../models/Plan');
const axios = require("axios");

const googleLogin = async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${req.body.access_token}`,
        },
      }
    );

    const {email_verified, given_name, family_name, email} = response.data;

    if(!email_verified){
        return res.status(401).send({Message: "User is not verified."});
    };

    const foundUser = await User.findOne({email}).exec();

    if(!foundUser){
      encryptedPassword = await bcrypt.hash('123456', 10);
      const user = await User.create({
        firstName: given_name,
        lastName: family_name,
        email, 
        password : encryptedPassword,  
        isVerified: email_verified
      });
      user.token = getToken({ email, userId: user._id });
      const plan = Plan.findOne({monthly_rate: 0});
      if(plan) {
        user.plan = plan._id;
      }

      user.save();

      return user;
    }
    const token =  getToken({ email, userId: foundUser._id });
    foundUser.token = token;
    foundUser.isVerified = email_verified;
    await foundUser.save()
    return res.json(foundUser);
  } catch (error) {
    console.log(error);
    return res.status(501).send({ error: "Invalid user detected. Please try again" });
  }
}

module.exports = googleLogin;