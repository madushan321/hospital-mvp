const express = require('express');
const router = express.Router();
const {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord
} = require('../controllers/recordController');

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all medical records
 *     responses:
 *       200:
 *         description: List of all medical records
 */
router.get('/', getAllRecords);

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     summary: Get medical record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single medical record
 *       404:
 *         description: Record not found
 */
router.get('/:id', getRecordById);

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a new medical record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *               doctorId:
 *                 type: integer
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medical record created
 */
router.post('/', createRecord);

/**
 * @swagger
 * /records/{id}:
 *   put:
 *     summary: Update an existing medical record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Medical record updated
 *       404:
 *         description: Record not found
 */
router.put('/:id', updateRecord);

module.exports = router;
