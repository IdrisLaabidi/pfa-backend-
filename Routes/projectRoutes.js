//
const express = require('express');
const router = express.Router();

// import controller functions 
const {createProject , getAllProjects , getProject , updateProject , deleteProject,getUserProjects} = require('../Controllers/projectContoller');
const { protect } = require('../Middleware/authMiddleware');


// Create a new project
router.post('/',protect, createProject);

// Get all projects
router.get('/',protect, getAllProjects);

// Get a specific project by ID
router.get('/:id',protect, getProject);

// Update a project by ID
router.put('/:id',protect, updateProject);

// Delete a project by ID
router.delete('/:id',protect, deleteProject);

router.get('/myprojects/:id',protect,getUserProjects)

module.exports = router;