const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const changePassword = async(req,res) => {
  try {

    const { password } = req.body;
  
    if(!req.user){
      return res.status(401).send({ message: "User is not authorised."});
    }

    const user = await User.findOne({ _id: req.user.userId  });

    encryptedPassword = await bcrypt.hash(password, 10);
  
    Object.assign(user, {password: encryptedPassword});
  
    await user.save();
  
    res.status(200).send({
      message: "Your password has been changed sucsessfully."
    });
  } catch(err) {
    console.log(err);
  }
};

module.exports = changePassword;