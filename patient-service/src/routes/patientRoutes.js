const express = require('express');
const router = express.Router();
const {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of all patients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *       500:
 *         description: Server error
 */
router.get('/', getAllPatients);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
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
 *     summary: Register a new patient (saved to MongoDB)
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, phone, age, gender, bloodType, address]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Kamal Perera"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "kamal@example.com"
 *               phone:
 *                 type: string
 *                 example: "0771234567"
 *               age:
 *                 type: integer
 *                 example: 45
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *               bloodType:
 *                 type: string
 *                 enum: [O+, O-, A+, A-, B+, B-, AB+, AB-]
 *               address:
 *                 type: string
 *                 example: "123 Main Street"
 *               medicalHistory:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient created successfully in MongoDB
 *       400:
 *         description: Validation error
 */
router.post('/', createPatient);

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       404:
 *         description: Patient not found
 */
router.put('/:id', updatePatient);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 */
router.delete('/:id', deletePatient);

module.exports = router;