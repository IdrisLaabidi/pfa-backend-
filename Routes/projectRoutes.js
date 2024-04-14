/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required :
 *          - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the project
 *         name:
 *           type: string
 *           description: The name of the project (required)
 *         description:
 *           type: string
 *           description: Additional description for the project
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the project (defaults to current date)
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date for the project
 *         status:
 *           type: string
 *           enum: ['complete', 'in-progress']
 *           default: 'in-progress'
 *           description: The status of the project
 *         team:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *             description: References to team members (User schema)
 *         manager:
 *           type: string
 *           format: ObjectId
 *           description: Reference to the project manager (User schema)
 *         tasks:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *             description: References to associated tasks (Task schema)
 */
/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing projects
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: The created project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Error creating project
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 * /api/projects/{id}:
 *   get:
 *     summary: Get a specific project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: The project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: The updated project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Error updating project
 *       404:
 *         description: Project not found
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description
*/
const express = require('express');
const router = express.Router();

// import controller functions 
const {createProject , getAllProjects , getProject , updateProject , deleteProject,getUserProjects, getProjectUsers} = require('../Controllers/projectContoller');
const { protect } = require('../Middleware/authMiddleware');


// Create a new project
router.post('/',protect, createProject);

// Get all projects
router.get('/', getAllProjects);

// Get a specific project by ID
router.get('/:id',protect, getProject);

// Update a project by ID
router.put('/:id',protect, updateProject);

// Delete a project by ID
router.delete('/:id',protect, deleteProject);

// Get all projects assigned to a user
router.get('/myprojects/:id',protect,getUserProjects)
// Get all users assigned to a project

// Get all users assigned to a project
router.get('/projusers/:id',protect,getProjectUsers)
module.exports = router;