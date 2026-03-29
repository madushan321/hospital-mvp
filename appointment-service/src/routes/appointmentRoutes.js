const express = require('express');
const router = express.Router();
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  cancelAppointment
} = require('../controllers/appointmentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6607f2f4dc3c1d18e4920c31"
 *         patientId:
 *           type: integer
 *         doctorId:
 *           type: integer
 *         date:
 *           type: string
 *           example: "2026-04-01"
 *         time:
 *           type: string
 *           example: "09:00"
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *         reason:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     AppointmentInput:
 *       type: object
 *       required: [patientId, doctorId, date, time]
 *       properties:
 *         patientId:
 *           type: integer
 *         doctorId:
 *           type: integer
 *         date:
 *           type: string
 *         time:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *         reason:
 *           type: string
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */
router.get('/', getAllAppointments);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: A single appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid appointment id
 *       404:
 *         description: Appointment not found
 */
router.get('/:id', getAppointmentById);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Book a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentInput'
 *     responses:
 *       201:
 *         description: Appointment booked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Validation error
 */
router.post('/', createAppointment);

/**
 * @swagger
 * /appointments/{id}/cancel:
 *   patch:
 *     summary: Cancel an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Appointment cancelled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid appointment id
 *       404:
 *         description: Appointment not found
 */
router.patch('/:id/cancel', cancelAppointment);

module.exports = router;