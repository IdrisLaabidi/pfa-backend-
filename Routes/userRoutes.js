// Import necessary modules
const express = require('express');
const router = express.Router();
const {register, login, profile,getAllUsers, updateUser, deleteUser ,getUsersByTask} = require('../Controllers/userController');
const { protect } = require('../Middleware/authMiddleware');


// Create a new user
router.post('/createuser', register);

// Get all users
router.get('/users',protect, getAllUsers);

// Get a specific user by ID
router.get('/users/:id',protect, profile);

// Login route
router.post('/login', login);

// Update a user by ID
router.put('/users/:id',protect ,updateUser);

// Delete a user by ID
router.delete('/users/:id', protect ,deleteUser);

// get users by task (assigned to)
router.get('/taskusers/:id',protect,getUsersByTask)

module.exports = router;
