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
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6607f2f4dc3c1d18e4920c31"
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         age:
 *           type: integer
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *         bloodType:
 *           type: string
 *           enum: [O+, O-, A+, A-, B+, B-, AB+, AB-]
 *         address:
 *           type: string
 *         medicalHistory:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PatientInput:
 *       type: object
 *       required: [name, email, phone, age, gender, bloodType, address]
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         age:
 *           type: integer
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *         bloodType:
 *           type: string
 *           enum: [O+, O-, A+, A-, B+, B-, AB+, AB-]
 *         address:
 *           type: string
 *         medicalHistory:
 *           type: string
 *     PatientListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         count:
 *           type: integer
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Patient'
 *     PatientSingleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Patient'
 */

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
 *               $ref: '#/components/schemas/PatientListResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientSingleResponse'
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
 *             $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       201:
 *         description: Patient created successfully in MongoDB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientSingleResponse'
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
 *             $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientSingleResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientSingleResponse'
 *       404:
 *         description: Patient not found
 */
router.delete('/:id', deletePatient);

module.exports = router;