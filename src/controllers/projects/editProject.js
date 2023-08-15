const Project = require("../../models/Project");

const editProject = async(req,res) => {
  try {
    const { id } = req.params;

    const { name } = req.body;

    const project = await Project.findOne({ _id: id});

    if (!project) {
      res.status(404).send("Project not found.");
    }
    const response = await Project.updateOne({ _id:  id }, {  name: name });

    if (response)
      res.status(200).send("Project updated succesfully.");
  } catch(err) {
    console.log(err);
  }
};

module.exports = editProject;