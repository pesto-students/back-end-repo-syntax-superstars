const Document = require("../../models/Document");

const editDocument = async(req,res) => {
  try {
    const { id } = req.params;

    const { user } = req;

    if(!user){
      return res.status(401).send({ message: "User is not authorised."});
    }

    const { name } = req.body;
 
    const document = await Document.findOne({ _id: id});

    if (!document) {
      res.status(404).send("Document not found.");
    }
    const response = await Document.updateOne({ _id:  id }, {  name });

    if (response)
      res.status(200).send("Document updated succesfully.");
  } catch(err) {
    console.log(err);
  }
};

module.exports = editDocument;