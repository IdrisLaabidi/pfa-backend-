/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email address of the user (must be unique)
 *         password:
 *           type: string
 *           description: The password for the user
 *         role:
 *           type: string
 *           enum: ['leader', 'member', 'admin']
 *           default: 'member'
 *           description: The role of the user
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Indicates whether the user is active
 *         pictureURL:
 *           type: string
 *           description: URL to the user's profile picture (optional)
 *         leaveCount:
 *           type: number
 *           default: 90
 *           description: The number of days available for taking leave
 *         projects:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *             description: References to associated projects (for member users)
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The registered user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error registering user
 * /login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: The logged-in user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error updating user
 *       404:
 *         description: User not found
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 * /users/{id}/tasks:
 *   get:
 *     summary: Get users associated with a task
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: List of users associated with the task
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error getting users associated with the task
 */


// Import necessary modules
const express = require('express');
const router = express.Router();
const {register, login, profile,getAllUsers, updateUser, deleteUser ,getUsersByTask ,updateUserAdmin} = require('../Controllers/userController');
const { protect } = require('../Middleware/authMiddleware');

// Create a new user
// Create a new user
router.post('/createuser', register);

// Get all users
router.get('/users',protect, getAllUsers);

// Get a specific user by ID
router.get('/users/:id', profile);

// Login route
router.post('/login', login);

// Update a user by ID
router.put('/users/:id',protect ,updateUser);

//Update a user by id (admin route)
router.put('/users/admin/:id',protect,updateUserAdmin)

// Delete a user by ID
router.delete('/users/:id', protect ,deleteUser);

// get users by task (assigned to)
router.get('/taskusers/:id',protect,getUsersByTask)


module.exports = router;
