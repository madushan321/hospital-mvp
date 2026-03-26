const bills = require('../models/bill');

const getAllBills = (req, res) => {
  res.json(bills);
};

const getBillById = (req, res) => {
  const bill = bills.find(b => b.id === parseInt(req.params.id));
  if (!bill) return res.status(404).json({ message: 'Bill not found' });
  res.json(bill);
};

const createBill = (req, res) => {
  const newBill = { id: bills.length + 1, status: 'pending', ...req.body };
  bills.push(newBill);
  res.status(201).json(newBill);
};

const payBill = (req, res) => {
  const bill = bills.find(b => b.id === parseInt(req.params.id));
  if (!bill) return res.status(404).json({ message: 'Bill not found' });
  bill.status = 'paid';
  res.json(bill);
};

module.exports = { getAllBills, getBillById, createBill, payBill };