const Record = require('../models/Record');

const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
};

const getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching record', error: error.message });
  }
};

const createRecord = async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: 'Error creating record', error: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error: error.message });
  }
};

module.exports = { getAllRecords, getRecordById, createRecord, updateRecord };
