const Appointment = require('../models/Appointment');

// ─── CREATE ───────────────────────────────────────────────────────────────────
// POST /appointments
const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, notes } = req.body;

    const newAppt = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      notes,
      status: 'pending',
    });

    const saved = await newAppt.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

// ─── READ ALL ─────────────────────────────────────────────────────────────────
// GET /appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── READ ONE ─────────────────────────────────────────────────────────────────
// GET /appointments/:id
const getAppointmentById = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appt);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────
// PUT /appointments/:id
const updateAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, status, notes } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { patientId, doctorId, date, time, status, notes },
      { new: true, runValidators: true } // return updated doc + validate enum/required
    );

    if (!updated) return res.status(404).json({ message: 'Appointment not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

// ─── DELETE ───────────────────────────────────────────────────────────────────
// DELETE /appointments/:id
const deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully', deleted });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── CANCEL (PATCH) ───────────────────────────────────────────────────────────
// PATCH /appointments/:id/cancel
const cancelAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appt);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  cancelAppointment,
};