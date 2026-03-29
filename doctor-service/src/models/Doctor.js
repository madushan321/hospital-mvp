const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  contact: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  availability: [
    {
      day: {
        type: String,
        enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
      },
      startTime: String,
      endTime: String
    }
  ],
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);