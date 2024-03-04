// userController.js

// Import modules
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

// Create a function to generate a token
const generateToken = (user) => {
  // Sign a token with the user id and a secret key
  return jwt.sign({ id: user._id }, "pfa123", { expiresIn: "1h" });
};

// Create a function to register a new user
const register = async (req, res) => {
  try {
    // Create a new user from the request body
    const user = new User(req.body);

    // Save the user to the database
    await user.save();

    // Generate a token for the user
    const token = generateToken(user);

    // Send the token and the user info as the response
    res.json({ token, user });
  } catch (error) {
    // Send the error message as the response
    res.status(400).json({ error: error.message });
  }
};

// Create a function to log in an existing user
const login = async (req, res) => {
  try {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the password with the hashed password
    const match = await user.verifyPassword(password);

    // If the password does not match, throw an error
    if (!match) {
      throw new Error("Invalid password");
    }

    // Generate a token for the user
    const token = generateToken(user);

    // Send the token and the user info as the response
    res.json({ token, user });
  } catch (error) {
    // Send the error message as the response
    res.status(401).json({ error: error.message });
  }
};

// Create a function to verify the token
const verifyToken = (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.headers["authorization"];

    // If the token is not provided, throw an error
    if (!token) {
      throw new Error("No token provided");
    }

    // Verify the token with the secret key
    const decoded = jwt.verify(token, "pfa123");

    // Set the user id in the request object
    req.userId = decoded.id;

    // Call the next middleware
    next();
  } catch (error) {
    // Send the error message as the response
    res.status(401).json({ error: error.message });
  }
};

// Create a function to get the user profile
const profile = async (req, res) => {
  try {
    // Get the user id from the request object
    const userId = req.params.id;

    // Find the user by id
    const user = await User.findById(userId);

    // If the user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // Send the user info as the response
    res.json({ user });
  } catch (error) {
    // Send the error message as the response
    res.status(404).json({ error: error.message });
  }
};

// create a function to get all the users 
const getAllUsers = async (req, res) => {
  try {
    // get all users
    const users = await User.find();
    // send users info as response 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//create a function to update a user 
const updateUser =  async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// create a function to delete a user 
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Export the controller functions
module.exports = { register, login, verifyToken, profile ,getAllUsers ,updateUser, deleteUser};
