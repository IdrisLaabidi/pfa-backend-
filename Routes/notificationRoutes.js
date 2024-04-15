/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required :
 *          - sentTo
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the notification
 *         content:
 *           type: string
 *           description: The content of the notification
 *         sentTo:
 *           type: string
 *           format: ObjectId
 *           description: Reference to the user receiving the notification (User schema, required)
 *         sendAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the notification was sent (defaults to current date and time)
 */
/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 * /api/notification/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: The created notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Error creating notification
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Server error
 * /api/notification/notifications/{id}:
 *   get:
 *     summary: Get a specific notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The notification ID
 *     responses:
 *       200:
 *         description: The notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */


// notificationRoutes.js

const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/notificationController'); // Import your notification controller
const { protect } = require('../Middleware/authMiddleware');

// Create a new notification
router.post('/notifications',protect, notificationController.createNotification);

// Get all notifications
router.get('/notifications',protect, notificationController.getAllNotifications);

// Get a specific notification by ID
router.get('/notifications/:id',protect, notificationController.getNotificationById);

module.exports = router;
