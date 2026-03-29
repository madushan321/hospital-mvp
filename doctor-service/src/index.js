
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();
const PORT = process.env.PORT || 8082;
const baseMongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_URI = `${baseMongoUri.replace(/\/+$/, '')}/hospital_doctors`;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Doctor Service API',
      version: '1.0.0',
      description: 'Hospital Management System - Doctor Microservice'
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Direct Access' },
      { url: 'http://localhost:8080/doctor', description: 'Via API Gateway' }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/doctors', doctorRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    service: 'Doctor Service',
    status: 'UP',
    port: PORT
  });
});

// Connect MongoDB & Start Server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB - Doctor DB');
    app.listen(PORT, () => {
      console.log(`Doctor Service running on http://localhost:${PORT}`);
      console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('MongoDB error:', err.message);
    process.exit(1);
  });

module.exports = app;