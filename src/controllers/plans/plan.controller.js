const Plan = require("../../models/Plan");

const getPlans = async(req, res) => {
  try {
    if(!req.user)
      return res.status(401).send({ message: "User is not authorised."});

    const plans = await Plan.find({monthly_rate: { $ne: 0 }});

    if (plans.length === 0) 
      res.status(200).send({message: "No plans found."});

    res.status(200).send(plans);
  } catch(err) {
    console.log(err);
  }
}

module.exports = { getPlans };