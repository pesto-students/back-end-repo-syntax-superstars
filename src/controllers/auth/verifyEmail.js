const User = require("../../models/User");

const verifyEmail = async (req, res) => {
  try {

    const {code} = req.params;
    const user = await User.findOne({ token: code });
    if (!user){
      return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
    } else if (user.token != code) {
      return res.status(400).send({msg:'Your verification link may have expired.'});
    } else if (user.isVerified){
        return res.status(200).send('User has been already verified. Please Login');
    } else {
      user.isVerified = true;
      user.save();
      return res.status(200).send('Your account has been successfully verified');
    }
  } catch(err) {
    console.log(err)
    return res.sendStatus(403)
  }
};

module.exports = verifyEmail;