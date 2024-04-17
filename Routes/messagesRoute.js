/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the message
 *         content:
 *           type: string
 *           description: The content of the message
 *         sender:
 *           type: string
 *           format: ObjectId
 *           description: Reference to the user sending the message (User schema)
 *         sentTo:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *             description: References to users receiving the message (User schema)
 *         who:
 *           type: string
 *           description: Additional information about the sender or recipient
 *         project:
 *           type: string
 *           format: ObjectId
 *           description: Reference to the associated project (Project schema)
 *         sentAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the message was sent (defaults to current date and time)
 */
const express = require('express');
const router = express.Router();

//import controller functions
const {getAllMessages,createMessage} = require('../Controllers/messagesController');

const { protect } = require('../Middleware/authMiddleware');

//add a message
router.get('/addMessage',protect,createMessage);

//get user messages
router.get('/allMessage/:id',protect,getAllMessages)

module.exports = router;