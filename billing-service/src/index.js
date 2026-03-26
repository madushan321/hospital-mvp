const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const billingRoutes = require('./routes/billingRoutes');

const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Billing API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:8085' }]
  },
  apis: ['./src/routes/billingRoutes.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/bills', billingRoutes);

app.listen(8085, () => {
  console.log('Billing Service  → http://localhost:8085');
  console.log('Swagger UI       → http://localhost:8085/api-docs');
});