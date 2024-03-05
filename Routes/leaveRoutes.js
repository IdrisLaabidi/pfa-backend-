// Import necessary modules
const express = require('express');
const router = express.Router();
const leaveController = require('../Controllers/leaveController'); // Import your leave controller

// Create a new leave request
router.post('/createleave', leaveController.createLeave);

// Get all leave requests
router.get('/leaves', leaveController.getAllLeaves);

// Get a specific leave request by ID
router.get('/leaves/:id', leaveController.getLeaveById);

// Update a leave request by ID
router.put('/leaves/:id', leaveController.updateLeaveById);

// Delete a leave request by ID
router.delete('/leaves/:id', leaveController.deleteLeaveById);

module.exports = router;
