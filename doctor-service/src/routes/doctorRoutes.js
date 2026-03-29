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
 *         name:
 *           type: string
 *           example: Dr. Nimal Perera
 *         specialization:
 *           type: string
 *           example: Cardiology
 *         email:
 *           type: string
 *           example: nimal@hospital.com
 *         contact:
 *           type: string
 *           example: "0712345678"
 *         qualification:
 *           type: string
 *           example: MBBS, MD
 *         experience:
 *           type: number
 *           example: 10
 *         availability:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *                 example: Monday
 *               startTime:
 *                 type: string
 *                 example: "08:00"
 *               endTime:
 *                 type: string
 *                 example: "16:00"
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
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201:
 *         description: Doctor registered successfully
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
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       200:
 *         description: Doctor updated successfully
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
 *       404:
 *         description: Doctor not found
 */
router.delete('/:id', deleteDoctor);

module.exports = router;