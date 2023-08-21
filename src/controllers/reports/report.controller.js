const Report = require("../../models/Report");

const getReport = async(req, res) => {
  try {
    if(!req.user)
      return res.status(401).send({ message: "User is not authorised."});

      const { docId } = req.params;

    const report = await Report.find({document: docId, user: req.user.userId});

    if (report.length === 0) 
      res.status(200).send({message: "No Report found."});

    res.status(200).send(report);
  } catch(err) {
    console.log(err);
  }
}

module.exports = { getReport };