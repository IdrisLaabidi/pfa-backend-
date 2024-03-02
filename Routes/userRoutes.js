// Import necessary modules
const express = require('express');
const router = express.Router();
const {register, login, verifyToken, profile,getAllUsers, updateUser, deleteUser } = require('../Controllers/userController')


// Create a new user
router.post('/createuser', register);

// Get all users
router.get('/users', getAllUsers);

// Get a specific user by ID
router.get('/users/:id', profile);

// Login route
router.post('/login', login);

// Update a user by ID
router.put('/users/:id',updateUser);

// Delete a user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;
