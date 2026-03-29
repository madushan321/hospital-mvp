const mongoose = require('mongoose');

// ==================== Patient Schema ====================
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a patient name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      match: [/^[0-9]{10}$/, 'Phone must be 10 digits']
    },
    age: {
      type: Number,
      required: [true, 'Please provide age'],
      min: [0, 'Age cannot be negative'],
      max: [150, 'Age cannot exceed 150']
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    bloodType: {
      type: String,
      enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      required: true
    },
    address: {
      type: String,
      required: true
    },
    medicalHistory: {
      type: String,
      default: ''
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Automatically update createdAt and updatedAt
  }
);

// Create and export the model
module.exports = mongoose.model('Patient', patientSchema);