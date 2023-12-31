const User = require("../../models/User");

const getUserByEmail = async (email, userId) => {
  const user = User.findOne({ email, _id: { $ne: userId }  });
  return user;
};

const updateProfile = async(req, res) => {
  try {
    const { firstName, lastName, email, plan, profilePic, creditsLeft } = req.body;

    const { user } = req;

    if (!user) {
      res.status(404).send("User not found.");
    }

    let userData = await getUserByEmail(email, user._id);

    if (email && !(userData)) {
      res.status(400).send("Email already taken");
    }

    Object.assign(userData, {firstName, lastName, email, plan, profilePic, creditsLeft});
    
    await userData.save();
    res.status(200).send({
      message: "Your profile has been updated successfully.",
      user: userData,
    });

  } catch (err) {
    console.log(err);
  }
};

module.exports = updateProfile;