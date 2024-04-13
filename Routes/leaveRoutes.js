/**
 * @swagger
 * components:
 *   schemas:
 *     Leave:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the leave request
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the leave (required)
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the leave (required)
 *         reason:
 *           type: string
 *           description: Additional reason for the leave
 *         type:
 *           type: string
 *           enum: ['sick leave', 'annual', 'normal']
 *           default: 'normal'
 *           description: The type of leave
 *         concernedUser:
 *           type: string
 *           format: ObjectId
 *           description: Reference to the user requesting the leave (User schema)
 *         status:
 *           type: string
 *           enum: ['pending', 'confirmed', 'declined']
 *           default: 'pending'
 *           description: The status of the leave request
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the leave request was created (defaults to current date and time)
 */

/**
 * @swagger
 * tags:
 *   name: Leaves
 *   description: API for managing leave requests
 * /createleave:
 *   post:
 *     summary: Create a new leave request
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Leave'
 *     responses:
 *       200:
 *         description: The created leave request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       500:
 *         description: Some server error
 * /leaves:
 *   get:
 *     summary: Get all leave requests
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of leave requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Leave'
 * /leaves/{id}:
 *   get:
 *     summary: Get a specific leave request by ID
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The leave request ID
 *     responses:
 *       200:
 *         description: The leave request by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       404:
 *         description: Leave request not found
 *   put:
 *     summary: Update a leave request by ID
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The leave request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Leave'
 *     responses:
 *       200:
 *         description: The leave request was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       404:
 *         description: Leave request not found
 *       500:
 *         description: Some error happened
 *   delete:
 *     summary: Delete a leave request by ID
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The leave request ID
 *     responses:
 *       200:
 *         description: The leave request was deleted
 *       404:
 *         description: Leave request not found
 */


// Import necessary modules
const express = require('express');
const router = express.Router();
const leaveController = require('../Controllers/leaveController'); // Import your leave controller
const { protect } = require('../Middleware/authMiddleware');

// Create a new leave request
router.post('/createleave',protect, leaveController.createLeave);

// Get all leave requests
router.get('/leaves',protect, leaveController.getAllLeaves);

// Get a specific leave request by ID
router.get('/leaves/:id',protect, leaveController.getLeaveById);

// Update a leave request by ID
router.put('/leaves/:id',protect, leaveController.updateLeaveById);

// Delete a leave request by ID
router.delete('/leaves/:id',protect, leaveController.deleteLeaveById);

module.exports = router;
