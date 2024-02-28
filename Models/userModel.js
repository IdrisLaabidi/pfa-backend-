const mongoose = require('mongoose');

// Define the User model schema
const UserSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['leader', 'member'], default: 'member' },
  isActive: { type: Boolean, default: true },
  pictureURL: { type: String }, // You can add validation rules for URLs if required
  leaveCount: { type: Number, default: 90 },
});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
