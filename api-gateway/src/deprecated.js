const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const patientServiceUrl = process.env.PATIENT_SERVICE_URL || 'http://localhost:8081';
const doctorServiceUrl = process.env.DOCTOR_SERVICE_URL || 'http://localhost:8082';
const appointmentServiceUrl = process.env.APPOINTMENT_SERVICE_URL || 'http://localhost:8083';
const recordsServiceUrl = process.env.RECORDS_SERVICE_URL || 'http://localhost:8084';
const billingServiceUrl = process.env.BILLING_SERVICE_URL || 'http://localhost:8085';

app.use('/patients',     createProxyMiddleware({ target: patientServiceUrl, changeOrigin: true }));
app.use('/doctors',      createProxyMiddleware({ target: doctorServiceUrl, changeOrigin: true }));
app.use('/appointments', createProxyMiddleware({ target: appointmentServiceUrl, changeOrigin: true }));
app.use('/records',      createProxyMiddleware({ target: recordsServiceUrl, changeOrigin: true }));
app.use('/bills',        createProxyMiddleware({ target: billingServiceUrl, changeOrigin: true }));

app.listen(8080, () => {
  console.log('=====================================');
  console.log('API Gateway      → http://localhost:8080');
  console.log('  /patients      → :8081');
  console.log('  /doctors       → :8082');
  console.log('  /appointments  → :8083');
  console.log('  /records       → :8084');
  console.log('  /bills         → :8085');
  console.log('=====================================');
});