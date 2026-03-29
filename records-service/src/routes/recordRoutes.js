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
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6607f2f4dc3c1d18e4920c31"
 *         patientId:
 *           type: integer
 *         doctorId:
 *           type: integer
 *         diagnosis:
 *           type: string
 *         treatment:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     RecordInput:
 *       type: object
 *       required: [patientId, doctorId, diagnosis, treatment]
 *       properties:
 *         patientId:
 *           type: integer
 *         doctorId:
 *           type: integer
 *         diagnosis:
 *           type: string
 *         treatment:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all medical records
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: List of all medical records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Record'
 */
router.get('/', getAllRecords);

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     summary: Get medical record by ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: A single medical record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       404:
 *         description: Record not found
 */
router.get('/:id', getRecordById);

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a new medical record
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecordInput'
 *     responses:
 *       201:
 *         description: Medical record created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 */
router.post('/', createRecord);

/**
 * @swagger
 * /records/{id}:
 *   put:
 *     summary: Update an existing medical record
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecordInput'
 *     responses:
 *       200:
 *         description: Medical record updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       404:
 *         description: Record not found
 */
router.put('/:id', updateRecord);

module.exports = router;
