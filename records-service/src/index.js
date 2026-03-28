const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const recordRoutes = require('./routes/recordRoutes');

const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Records API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:8084' }]
  },
  apis: ['./src/routes/recordRoutes.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/records', recordRoutes);

app.listen(8084, () => {
  console.log('Records Service  → http://localhost:8084');
  console.log('Swagger UI       → http://localhost:8084/api-docs');
});
