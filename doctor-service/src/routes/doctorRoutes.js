const express = require('express');
const router = express.Router();
const {
  registerDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorAvailability
} = require('../controllers/doctorController');

/**
 * @swagger
 * components:
 *   schemas:
 *     DoctorCreate:
 *       type: object
 *       required:
 *         - name
 *         - specialization
 *         - email
 *         - contact
 *         - qualification
 *         - experience
 *       properties:
 *         name:
 *           type: string
 *           description: Doctor's full name
 *           example: Dr. Nimal Perera
 *         specialization:
 *           type: string
 *           description: Medical specialization
 *           example: Cardiology
 *         email:
 *           type: string
 *           format: email
 *           description: Unique email address
 *           example: nimal@hospital.com
 *         contact:
 *           type: string
 *           description: Contact number
 *           example: "0712345678"
 *         qualification:
 *           type: string
 *           description: Educational qualifications
 *           example: MBBS, MD
 *         experience:
 *           type: integer
 *           description: Years of experience
 *           example: 10
 *         availability:
 *           type: array
 *           description: Doctor's availability schedule (optional)
 *           items:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *                 enum: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
 *                 example: Monday
 *               startTime:
 *                 type: string
 *                 example: "08:00"
 *               endTime:
 *                 type: string
 *                 example: "16:00"
 *     Doctor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB document ID
 *           example: "6607f2f4dc3c1d18e4920c31"
 *         name:
 *           type: string
 *           description: Doctor's full name
 *           example: Dr. Nimal Perera
 *         specialization:
 *           type: string
 *           description: Medical specialization
 *           example: Cardiology
 *         email:
 *           type: string
 *           format: email
 *           description: Unique email address
 *           example: nimal@hospital.com
 *         contact:
 *           type: string
 *           description: Contact number
 *           example: "0712345678"
 *         qualification:
 *           type: string
 *           description: Educational qualifications
 *           example: MBBS, MD
 *         experience:
 *           type: integer
 *           description: Years of experience
 *           example: 10
 *         availability:
 *           type: array
 *           description: Doctor's availability schedule
 *           items:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *                 enum: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
 *                 example: Monday
 *               startTime:
 *                 type: string
 *                 example: "08:00"
 *               endTime:
 *                 type: string
 *                 example: "16:00"
 *         registeredAt:
 *           type: string
 *           format: date-time
 *           description: Registration timestamp
 *           example: "2025-03-31T10:30:00.000Z"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error message"
 *     ValidationError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           description: Validation error details
 *           example: "Doctor validation failed: experience: Path `experience` is required., qualification: Path `qualification` is required., contact: Path `contact` is required., email: Path `email` is required., specialization: Path `specialization` is required., name: Path `name` is required."
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Operation successful"
 *         data:
 *           type: object
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Register a new doctor
 *     description: Create a new doctor record with required personal and professional information. All fields marked as required must be provided.
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       description: |
 *         Doctor registration details. The following fields are REQUIRED:
 *         - name (string): Doctor's full name
 *         - specialization (string): Medical specialization (e.g., Cardiology, Surgery)
 *         - email (string): Unique email address
 *         - contact (string): Contact phone number
 *         - qualification (string): Educational qualifications (e.g., MBBS, MD)
 *         - experience (integer): Years of professional experience
 *         
 *         Optional fields:
 *         - availability (array): Doctor's availability schedule
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DoctorCreate'
 *           example:
 *             name: Dr. Nimal Perera
 *             specialization: Cardiology
 *             email: nimal@hospital.com
 *             contact: "0712345678"
 *             qualification: MBBS, MD
 *             experience: 10
 *             availability:
 *               - day: Monday
 *                 startTime: "08:00"
 *                 endTime: "16:00"
 *               - day: Wednesday
 *                 startTime: "09:00"
 *                 endTime: "17:00"
 *     responses:
 *       201:
 *         description: Doctor registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Doctor registered successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Bad Request - Validation error or email already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               MissingFields:
 *                 summary: Missing required fields
 *                 value:
 *                   success: false
 *                   message: "Doctor validation failed: experience: Path `experience` is required., qualification: Path `qualification` is required., contact: Path `contact` is required., email: Path `email` is required., specialization: Path `specialization` is required., name: Path `name` is required."
 *               DuplicateEmail:
 *                 summary: Email already registered
 *                 value:
 *                   success: false
 *                   message: "Email already registered"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', registerDoctor);

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     description: Retrieve a list of all registered doctors with their complete information
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of all doctors retrieved successfully
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
 *                   items:
 *                     $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllDoctors);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     description: Retrieve a specific doctor's information by their MongoDB ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor's MongoDB ID
 *     responses:
 *       200:
 *         description: Doctor found and retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getDoctorById);

/**
 * @swagger
 * /doctors/{id}/availability:
 *   get:
 *     summary: Get doctor availability schedule
 *     description: Retrieve the availability schedule for a specific doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor's MongoDB ID
 *     responses:
 *       200:
 *         description: Doctor availability schedule retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     specialization:
 *                       type: string
 *                     availability:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           day:
 *                             type: string
 *                           startTime:
 *                             type: string
 *                           endTime:
 *                             type: string
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/availability', getDoctorAvailability);

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update doctor by ID
 *     description: Update doctor information with validation
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor's MongoDB ID
 *     requestBody:
 *       required: true
 *       description: Updated doctor information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DoctorCreate'
 *           example:
 *             name: Dr. Nimal Perera
 *             specialization: Cardiology
 *             email: nimal@hospital.com
 *             contact: "0712345678"
 *             qualification: MBBS, MD
 *             experience: 10
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Validation or server error
 */
router.put('/:id', updateDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete doctor by ID
 *     description: Remove a doctor record from the system
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor's MongoDB ID
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Doctor not found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteDoctor);

module.exports = router;