const mongoose = require('mongoose');

// import the User schema (for team members and manager fields)
const UserSchema = require('./userModel')

//import the Task schema (for tasks field)
const TaskSchema = require('./taskModel')

// Define the Project model schema
const ProjectSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date ,default:Date.now },
  dueDate: { type: Date },
  team: [{ type: UserSchema }], // Array of User references
  manager: { type: UserSchema }, // Reference to a single User
  tasks: [{ type: TaskSchema }], // Array of Task references
});

// Create and export the Project model
module.exports = mongoose.model('Project', ProjectSchema);