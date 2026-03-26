const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const patientRoutes = require('./routes/patientRoutes');

const app = express();
app.use(express.json());

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
app.use('/patients', patientRoutes);

app.listen(8081, () => {
  console.log('Patient Service  → http://localhost:8081');
  console.log('Swagger UI       → http://localhost:8081/api-docs');
});