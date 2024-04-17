/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *          - title 
 *          - project
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the task
 *         title:
 *           type: string
 *           description: The title of the task (required)
 *         description:
 *           type: string
 *           description: Additional description for the task
 *         project:
 *           type: string
 *           format: ObjectId
 *           description: Reference to the associated project (required)
 *         assignedTo:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *             description: References to users assigned to the task
 *         status:
 *           type: string
 *           enum: ['pending', 'in-progress', 'completed']
 *           default: 'pending'
 *           description: The status of the task
 *         priority:
 *           type: string
 *           enum: ['low', 'medium', 'high']
 *           default: 'medium'
 *           description: The priority level of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date for the task
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp of the task
 *         completedAt:
 *           type: string
 *           format: date-time
 *           description: The completion timestamp of the task
 */
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 * /api/task/createtask:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The created task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error creating task
 * /api/tasks/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 * /api/tasks/tasks/{id}:
 *   get:
 *     summary: Get a specific task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The updated task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error updating task
 *       404:
 *         description: Task not found
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 * /api/task/projtask/{id}:
 *   get:
 *     summary: Get all tasks associated with a project
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: List of tasks associated with the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 * /api/task/taskusers/{id}:
 *   get:
 *     summary: Get users assigned to a certain task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: List of users assigned to the task
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Task not found
 *       400:
 *         description: Error getting users assigned to the task
 */


// Import necessary modules
const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController'); // Import your task controller
const { protect } = require('../Middleware/authMiddleware')


// Create a new task
router.post('/createtask', protect ,taskController.createTask);

// Get all tasks
router.get('/tasks',protect, taskController.getAllTasks);

// Get a specific task by ID
router.get('/tasks/:id', protect ,taskController.getTaskById);

// Update a task by ID
router.put('/tasks/:id',protect, taskController.updateTaskById);

// Delete a task by ID
router.delete('/tasks/:id',protect, taskController.deleteTaskById);

// Get tasks associated with a project
router.get('/projtasks/:id',protect,taskController.getTasksByProject);

//get users associated with a task
router.get('/taskusers/:id',protect,taskController.getTaskUsers);

module.exports = router;
