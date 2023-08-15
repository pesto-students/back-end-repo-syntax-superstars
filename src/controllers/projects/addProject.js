const Project = require("../../models/Project");

const addProject = async(req,res) => {
  try {
  const { name } = req.body;

  const { user } = req;

  if(!user){
    return res.status(401).send({ message: "User is not authorised."});
  }

  const project = await Project.create({
    name,
    user: user.userId
  });

  if(!project)
    return res.status(404).json({ message: "Project creation failed"});

  res.status(201).json(project);
  }catch(err) {
    console.log(err);
  }
};

module.exports = addProject;