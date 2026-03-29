const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  cancelAppointment,
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
 *         patientId:
 *           type: number
 *         doctorId:
 *           type: number
 *         date:
 *           type: string
 *           example: "2026-04-10"
 *         time:
 *           type: string
 *           example: "10:00"
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *         notes:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     AppointmentInput:
 *       type: object
 *       required:
 *         - patientId
 *         - doctorId
 *         - date
 *         - time
 *       properties:
 *         patientId:
 *           type: number
 *           example: 1
 *         doctorId:
 *           type: number
 *           example: 3
 *         date:
 *           type: string
 *           example: "2026-04-10"
 *         time:
 *           type: string
 *           example: "10:00"
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *           example: "pending"
 *         notes:
 *           type: string
 *           example: "Follow-up visit"
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentInput'
 *     responses:
 *       201:
 *         description: Appointment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 */
router.post('/', createAppointment);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of appointments
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
 *     responses:
 *       200:
 *         description: Appointment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 */
router.get('/:id', getAppointmentById);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
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
 *             $ref: '#/components/schemas/AppointmentInput'
 *     responses:
 *       200:
 *         description: Appointment updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Appointment not found
 */
router.put('/:id', updateAppointment);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted
 *       404:
 *         description: Appointment not found
 */
router.delete('/:id', deleteAppointment);

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
 *     responses:
 *       200:
 *         description: Appointment cancelled
 *       404:
 *         description: Appointment not found
 */
router.patch('/:id/cancel', cancelAppointment);

module.exports = router;