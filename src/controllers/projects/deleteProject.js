const Project = require("../../models/Project");

const deleteProject = async(req,res) => {
  try {
    const { id } = req.params;

    if(!req.user){
      return res.status(401).send({ message: "User is not authorised."});
    }

    const project = await Project.findOne({ _id: id});

    if (!project) {
      res.status(404).send("Project not found.");
    }
    const response = await Project.deleteOne({_id: id});

    if (response)
      res.status(200).send("Project deleted succesfully.");
  } catch(err) {
    console.log(err);
  }
};

module.exports = deleteProject;