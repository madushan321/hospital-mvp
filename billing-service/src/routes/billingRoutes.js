const express = require('express');
const router = express.Router();
const {
  getAllBills,
  getBillById,
  createBill,
  payBill,
  deleteBill
} = require('../controllers/billingController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Bill:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         patientId:
 *           type: integer
 *         appointmentId:
 *           type: integer
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, paid]
 *         date:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     BillInput:
 *       type: object
 *       required: [patientId, appointmentId, amount]
 *       properties:
 *         patientId:
 *           type: integer
 *         appointmentId:
 *           type: integer
 *         amount:
 *           type: number
 */

/**
 * @swagger
 * /bills:
 *   get:
 *     summary: Get all bills
 *     tags: [Billing]
 *     responses:
 *       200:
 *         description: List of all bills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bill'
 */
router.get('/', getAllBills);

/**
 * @swagger
 * /bills/{id}:
 *   get:
 *     summary: Get bill by ID
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single bill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 *       404:
 *         description: Bill not found
 */
router.get('/:id', getBillById);

/**
 * @swagger
 * /bills:
 *   post:
 *     summary: Create a new bill
 *     tags: [Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BillInput'
 *     responses:
 *       201:
 *         description: Bill created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 */
router.post('/', createBill);

/**
 * @swagger
 * /bills/{id}/pay:
 *   patch:
 *     summary: Mark bill as paid
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bill marked as paid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 */
router.patch('/:id/pay', payBill);

/**
 * @swagger
 * /bills/{id}:
 *   delete:
 *     summary: Delete a bill by ID
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bill deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Bill not found
 */
router.delete('/:id', deleteBill);

module.exports = router;