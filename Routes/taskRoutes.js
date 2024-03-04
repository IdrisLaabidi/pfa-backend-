// Import necessary modules
const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController'); // Import your task controller

// Create a new task
router.post('/createtask', taskController.createTask);

// Get all tasks
router.get('/tasks', taskController.getAllTasks);

// Get a specific task by ID
router.get('/tasks/:id', taskController.getTaskById);

// Update a task by ID
router.put('/tasks/:id', taskController.updateTaskById);

// Delete a task by ID
router.delete('/tasks/:id', taskController.deleteTaskById);

module.exports = router;
