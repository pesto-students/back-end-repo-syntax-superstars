const Plan = require("../../models/Plan");
const config = require('../../config/config');
const stripe = require('stripe')(config.stripe.secret_key);

const getPlans = async(req, res) => {
  try {
    if(!req.user)
      return res.status(401).send({ message: "User is not authorised."});

    const plans = await Plan.find({monthly_rate: { $ne: 0 }}).sort({ monthly_rate: 1});

    if (plans.length === 0) 
      res.status(200).send({message: "No plans found."});

    res.status(200).send(plans);
  } catch(err) {
    console.log(err);
  }
};

const getPlanById = async(req, res) => {
  try {
    if(!req.user)
      return res.status(401).send({ message: "User is not authorised."});

    const plan = await Plan.findOne({_id: req.params.id});

    if (plan.length === 0) 
      res.status(200).send({message: "No plans found."});

    res.status(200).send(plan);
  } catch(err) {
    console.log(err);
  }
};

const createSession = async (req,res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: req.body.price_id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${config.app_domain}/plan?success=true`,
      cancel_url: `${config.app_domain}/plan?canceled=true`,
    });
    res.status(200).send({url: session.url});
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getPlans, getPlanById, createSession };