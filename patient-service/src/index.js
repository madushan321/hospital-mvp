const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const patientRoutes = require('./routes/patientRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

const baseMongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017';
const patientMongoUri = `${baseMongoUri.replace(/\/+$/, '')}/hospital_patients`;

// ==================== MongoDB Connection ====================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(patientMongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// ==================== Swagger Configuration ====================
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Patient API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:8081' }]
  },
  apis: ['./src/routes/patientRoutes.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ==================== Routes ====================
app.use('/patients', patientRoutes);

// ==================== Error Handling ====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// ==================== Start Server ====================
const PORT = process.env.PORT || 8081;

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log('\n═══════════════════════════════════════');
    console.log('🏥 Patient Service Running');
    console.log(`📍 API Endpoint    → http://localhost:${PORT}`);
    console.log(`📚 Swagger UI      → http://localhost:${PORT}/api-docs`);
    console.log('═══════════════════════════════════════\n');
  });
};

startServer();