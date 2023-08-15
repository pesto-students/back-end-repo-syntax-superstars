const Document = require("../../models/Document");

const deleteProject = async(req,res) => {
  try {
    const { id } = req.params;

    if(!req.user){
      return res.status(401).send({ message: "User is not authorised."});
    }

    const document = await Document.findOne({ _id: id});

    if (!document) {
      res.status(404).send("Document not found.");
    }
    const response = await Document.deleteOne({_id: id});

    if (response)
      res.status(200).send("Document deleted succesfully.");
  } catch(err) {
    console.log(err);
  }
};

module.exports = deleteProject;