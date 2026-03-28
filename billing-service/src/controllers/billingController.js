const prisma = require('../models/bill');

const getAllBills = async (req, res) => {
  try {
    const bills = await prisma.bill.findMany();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBillById = async (req, res) => {
  try {
    const bill = await prisma.bill.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBill = async (req, res) => {
  try {
    const { patientId, appointmentId, amount } = req.body;
    const newBill = await prisma.bill.create({
      data: {
        patientId: parseInt(patientId),
        appointmentId: parseInt(appointmentId),
        amount: parseFloat(amount),
        status: 'pending'
      }
    });
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const payBill = async (req, res) => {
  try {
    const bill = await prisma.bill.update({
      where: { id: parseInt(req.params.id) },
      data: { status: 'paid' }
    });
    res.json(bill);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteBill = async (req, res) => {
  try {
    await prisma.bill.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBills, getBillById, createBill, payBill, deleteBill };
