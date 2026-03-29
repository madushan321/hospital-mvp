const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const appointmentRoutes = require('./routes/appointmentRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8083;
const baseMongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGO_URI = `${baseMongoUri.replace(/\/+$/, '')}/hospital_appointments`;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Appointment API', version: '1.0.0' },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: ['./src/routes/appointmentRoutes.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/appointments', appointmentRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Appointment Service → http://localhost:${PORT}`);
      console.log(`Swagger UI          → http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  });