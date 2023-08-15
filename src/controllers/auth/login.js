const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const getToken = require("./jwtUtils");

const login = async(req, res) => {
  try {
    const { email, password, rememberme } = req.body;
  
    if (!(email && password)) {
      res.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({ message: "User not found." });
    }
    
    if (!user.isVerified){
      return res.status(401).send({msg:'Your Email has not been verified.'});
    };
    if (user && (await bcrypt.compare(password, user.password))) {

      const token = getToken({ email, userId: user._id });
      user.token = token;

      if(rememberme) {

      }

      res.cookie('jwtcookie', token, {httpOnly: true, secure:true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000})

      return res.status(200).json(user);
    }
    res.status(200).send({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = login;
