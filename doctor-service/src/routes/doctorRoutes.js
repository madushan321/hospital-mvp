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
 *     Doctor:
 *       type: object
 *       required:
 *         - name
 *         - specialization
 *         - email
 *         - contact
 *         - qualification
 *         - experience
 *       properties:
 *         _id:
 *           type: string
 *           example: "6607f2f4dc3c1d18e4920c31"
 *         name:
 *           type: string
 *           example: Dr. Nimal Perera
 *         specialization:
 *           type: string
 *           example: Cardiology
 *         email:
 *           type: string
 *           format: email
 *           example: nimal@hospital.com
 *         contact:
 *           type: string
 *           example: "0712345678"
 *         qualification:
 *           type: string
 *           example: MBBS, MD
 *         experience:
 *           type: integer
 *           example: 10
 *         availability:
 *           type: array
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
 *     DoctorInput:
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
 *         specialization:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         contact:
 *           type: string
 *         qualification:
 *           type: string
 *         experience:
 *           type: integer
 *         availability:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *                 enum: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Register a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DoctorInput'
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
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Email already registered
 */
router.post('/', registerDoctor);

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of all doctors
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
 */
router.get('/', getAllDoctors);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor found
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
 *         description: Doctor not found
 */
router.get('/:id', getDoctorById);

/**
 * @swagger
 * /doctors/{id}/availability:
 *   get:
 *     summary: Get doctor availability schedule
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor availability schedule
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
 *       404:
 *         description: Doctor not found
 */
router.get('/:id/availability', getDoctorAvailability);

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update doctor by ID
 *     tags: [Doctors]
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
 *             $ref: '#/components/schemas/DoctorInput'
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
 */
router.put('/:id', updateDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Doctor not found
 */
router.delete('/:id', deleteDoctor);

module.exports = router;