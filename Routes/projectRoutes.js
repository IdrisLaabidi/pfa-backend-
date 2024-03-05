//
const express = require('express');
const router = express.Router();

// import controller functions 
const {createProject , getAllProjects , getProject , updateProject , deleteProject} = require('../Controllers/projectContoller')


// Create a new project
router.post('/', createProject);

// Get all projects
router.get('/', getAllProjects);

// Get a specific project by ID
router.get('/:id', getProject);

// Update a project by ID
router.put('/:id', updateProject);

// Delete a project by ID
router.delete('/:id', deleteProject);

module.exports = router;