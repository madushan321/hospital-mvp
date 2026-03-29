require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const recordRoutes = require('./routes/recordRoutes');

const app = express();
app.use(express.json());

// Global error handler for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      message: 'Invalid JSON format',
      error: err.message 
    });
  }
  next(err);
});

// Connect to MongoDB
const baseMongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_URI = `${baseMongoUri.replace(/\/+$/, '')}/hospital_records`;
const PORT = process.env.PORT || 8084;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  });

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Records API', version: '1.0.0' },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: ['./src/routes/recordRoutes.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/records', recordRoutes);

app.listen(PORT, () => {
  console.log(`Records Service  → http://localhost:${PORT}`);
  console.log(`Swagger UI       → http://localhost:${PORT}/api-docs`);
});
