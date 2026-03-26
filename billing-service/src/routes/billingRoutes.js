const express = require('express');
const router = express.Router();
const {
  getAllBills,
  getBillById,
  createBill,
  payBill
} = require('../controllers/billingController');

/**
 * @swagger
 * /bills:
 *   get:
 *     summary: Get all bills
 *     responses:
 *       200:
 *         description: List of all bills
 */
router.get('/', getAllBills);

/**
 * @swagger
 * /bills/{id}:
 *   get:
 *     summary: Get bill by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single bill
 *       404:
 *         description: Bill not found
 */
router.get('/:id', getBillById);

/**
 * @swagger
 * /bills:
 *   post:
 *     summary: Create a new bill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *               appointmentId:
 *                 type: integer
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bill created
 */
router.post('/', createBill);

/**
 * @swagger
 * /bills/{id}/pay:
 *   patch:
 *     summary: Mark bill as paid
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bill marked as paid
 */
router.patch('/:id/pay', payBill);

module.exports = router;