const records = require('../models/Record');

const getAllRecords = (req, res) => {
  res.json(records);
};

const getRecordById = (req, res) => {
  const record = records.find(r => r.id === parseInt(req.params.id));
  if (!record) return res.status(404).json({ message: 'Record not found' });
  res.json(record);
};

const createRecord = (req, res) => {
  const newRecord = { id: records.length + 1, ...req.body };
  records.push(newRecord);
  res.status(201).json(newRecord);
};

const updateRecord = (req, res) => {
  const record = records.find(r => r.id === parseInt(req.params.id));
  if (!record) return res.status(404).json({ message: 'Record not found' });

  Object.assign(record, req.body);
  res.json(record);
};

module.exports = { getAllRecords, getRecordById, createRecord, updateRecord };
