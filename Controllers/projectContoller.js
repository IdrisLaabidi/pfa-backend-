// project controller
const asyncHandler = require('express-async-handler')
//import modules 
const Project = require('../Models/projectModel')

//create a function to add a project 
const createProject =asyncHandler(async (req,res) => {
    try {
        // create the new project
        const newProject = await Project.create(req.body);
        res.status(201).json(newProject);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})

//create a function to get all projects
const getAllProjects = asyncHandler(async (req,res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

// Get a specific project by ID
const getProject = asyncHandler(async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})
  
// Update a project by ID
const updateProject =  asyncHandler(async (req, res) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(updatedProject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
})
  
// Delete a project by ID
const deleteProject = asyncHandler(async (req, res) => {
    try {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})
//Get projects associated with a team leader(project manager)
const getUserProjects = asyncHandler(
  async (req,res) => {
    try {
      const userId = req.params.id
      const projects= await Project.find({manager : userId})
      res.json(projects)
    } catch (error) {
      res.status(400).json(error)
      console.log(error)
    }
  }
)
//export the controller functions.
module.exports = {createProject , getAllProjects , getProject , updateProject , deleteProject,getUserProjects}
  
