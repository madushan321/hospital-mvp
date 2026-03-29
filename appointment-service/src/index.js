require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
app.use(express.json());

// ─── Swagger Setup ───────────────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Appointment API', version: '1.0.0' },
    servers: [{ url: `http://localhost:${process.env.PORT}` }],
  },
  apis: ['./src/routes/appointmentRoutes.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/appointments', appointmentRoutes);

// ─── MongoDB Connection ───────────────────────────────────────────────────────
const PORT = process.env.PORT || 8083;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅  Connected to MongoDB — HospitalSystem');
    app.listen(PORT, () => {
      console.log(`🚀  Appointment Service → http://localhost:${PORT}`);
      console.log(`📄  Swagger UI          → http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌  MongoDB connection failed:', err.message);
    process.exit(1);
  });