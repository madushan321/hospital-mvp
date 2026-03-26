const express = require('express');
const router = express.Router();
const {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient
} = require('../controllers/patientController');

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     responses:
 *       200:
 *         description: List of all patients
 */
router.get('/', getAllPatients);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single patient
 *       404:
 *         description: Patient not found
 */
router.get('/:id', getPatientById);

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Register a new patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient created
 */
router.post('/', createPatient);

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update a patient
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
 *     responses:
 *       200:
 *         description: Patient updated
 */
router.put('/:id', updatePatient);

module.exports = router;