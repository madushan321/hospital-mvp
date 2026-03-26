const appointments = require('../models/Appointment');

const getAllAppointments = (req, res) => {
  res.json(appointments);
};

const getAppointmentById = (req, res) => {
  const appt = appointments.find(a => a.id === parseInt(req.params.id));
  if (!appt) return res.status(404).json({ message: 'Appointment not found' });
  res.json(appt);
};

const createAppointment = (req, res) => {
  const newAppt = { id: appointments.length + 1, status: 'pending', ...req.body };
  appointments.push(newAppt);
  res.status(201).json(newAppt);
};

const cancelAppointment = (req, res) => {
  const appt = appointments.find(a => a.id === parseInt(req.params.id));
  if (!appt) return res.status(404).json({ message: 'Appointment not found' });
  appt.status = 'cancelled';
  res.json(appt);
};

module.exports = { getAllAppointments, getAppointmentById, createAppointment, cancelAppointment };