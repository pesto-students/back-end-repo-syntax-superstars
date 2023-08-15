const projects = require("./getProjects");
const addProject = require("./addProject");
const editProject = require("./editProject");
const deleteProject = require("./deleteProject");

const {getProjects, getLatestProjects} = projects;

module.exports = {
  getProjects,
  getLatestProjects,
  addProject,
  editProject,
  deleteProject
};