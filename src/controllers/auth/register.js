const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const getToken = require("./jwtUtils");
const Plan = require("../../models/Plan");
const sendEmail = require("../../config/email");

const register = async(req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(200).send({message: "User Already Exist. Please Login"});
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const plan = Plan.findOne({monthly_rate: 0});

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      plan: plan?._id,
    });

    const token =  getToken({ email, userId: user._id });

    user.token = token;

    user.save();

    const response = sendEmail(req, res, user);

    return response;
  
  } catch (err) {
    console.log(err);
  }
};

module.exports = register;