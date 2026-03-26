const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Appointment API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:8083' }]
  },
  apis: ['./src/routes/appointmentRoutes.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/appointments', appointmentRoutes);

app.listen(8083, () => {
  console.log('Appointment Service → http://localhost:8083');
  console.log('Swagger UI          → http://localhost:8083/api-docs');
});