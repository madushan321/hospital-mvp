const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
  {
    patientId: { type: Number, required: true },
    doctorId: { type: Number, required: true },
    diagnosis: { type: String, required: true },
    treatment: { type: String, required: true },
    date: { 
      type: Date, 
      default: Date.now,
      set: (value) => {
        // If value is a string, try to parse it as a date
        if (typeof value === 'string' && value.trim()) {
          return new Date(value);
        }
        // If value is already a Date, return it
        if (value instanceof Date) {
          return value;
        }
        // Otherwise use current date
        return new Date();
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Record', recordSchema);
