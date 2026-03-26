const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/patients',     createProxyMiddleware({ target: 'http://localhost:8081', changeOrigin: true }));
app.use('/doctors',      createProxyMiddleware({ target: 'http://localhost:8082', changeOrigin: true }));
app.use('/appointments', createProxyMiddleware({ target: 'http://localhost:8083', changeOrigin: true }));
app.use('/records',      createProxyMiddleware({ target: 'http://localhost:8084', changeOrigin: true }));
app.use('/bills',        createProxyMiddleware({ target: 'http://localhost:8085', changeOrigin: true }));

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