const patients = require('../models/Patient');

const getAllPatients = (req, res) => {
  res.json(patients);
};

const getPatientById = (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  res.json(patient);
};

const createPatient = (req, res) => {
  const newPatient = { id: patients.length + 1, ...req.body };
  patients.push(newPatient);
  res.status(201).json(newPatient);
};

const updatePatient = (req, res) => {
  const idx = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Patient not found' });
  patients[idx] = { ...patients[idx], ...req.body };
  res.json(patients[idx]);
};

module.exports = { getAllPatients, getPatientById, createPatient, updatePatient };