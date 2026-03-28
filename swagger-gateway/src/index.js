const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8086;
const KONG_URL = process.env.KONG_URL || 'http://kong:8000';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital Management System API',
      version: '1.0.0',
      description: 'Unified API documentation for all Hospital MVP microservices',
      contact: {
        name: 'Hospital MVP Team'
      }
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Kong API Gateway (default for Try it out)'
      },
      {
        url: `http://localhost:${PORT}`,
        description: 'Swagger Gateway (docs host only)'
      }
    ],
    tags: [
      { name: 'Patients', description: 'Patient management endpoints' },
      { name: 'Doctors', description: 'Doctor management endpoints' },
      { name: 'Appointments', description: 'Appointment management endpoints' },
      { name: 'Records', description: 'Medical records endpoints' },
      { name: 'Billing', description: 'Billing and payments endpoints' }
    ],
    paths: {
      '/patients': {
        get: {
          tags: ['Patients'],
          summary: 'Get all patients',
          description: 'Retrieve a list of all registered patients',
          responses: {
            '200': {
              description: 'List of patients',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Patient' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Patients'],
          summary: 'Register a new patient',
          description: 'Register a new patient in the system',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PatientInput' }
              }
            }
          },
          responses: {
            '201': { description: 'Patient created successfully' }
          }
        }
      },
      '/patients/{id}': {
        get: {
          tags: ['Patients'],
          summary: 'Get patient by ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Patient details', content: { 'application/json': { schema: { $ref: '#/components/schemas/Patient' } } } },
            '404': { description: 'Patient not found' }
          }
        },
        put: {
          tags: ['Patients'],
          summary: 'Update patient',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/PatientInput' } } }
          },
          responses: {
            '200': { description: 'Patient updated' }
          }
        }
      },
      '/doctors': {
        get: {
          tags: ['Doctors'],
          summary: 'Get all doctors',
          responses: {
            '200': { description: 'List of doctors' }
          }
        },
        post: {
          tags: ['Doctors'],
          summary: 'Register a new doctor',
          responses: {
            '201': { description: 'Doctor created' }
          }
        }
      },
      '/doctors/{id}': {
        get: {
          tags: ['Doctors'],
          summary: 'Get doctor by ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Doctor details' },
            '404': { description: 'Doctor not found' }
          }
        }
      },
      '/appointments': {
        get: {
          tags: ['Appointments'],
          summary: 'Get all appointments',
          responses: {
            '200': { description: 'List of appointments' }
          }
        },
        post: {
          tags: ['Appointments'],
          summary: 'Book a new appointment',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AppointmentInput' }
              }
            }
          },
          responses: {
            '201': { description: 'Appointment booked' }
          }
        }
      },
      '/appointments/{id}': {
        get: {
          tags: ['Appointments'],
          summary: 'Get appointment by ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Appointment details' },
            '404': { description: 'Appointment not found' }
          }
        }
      },
      '/appointments/{id}/cancel': {
        patch: {
          tags: ['Appointments'],
          summary: 'Cancel an appointment',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Appointment cancelled' }
          }
        }
      },
      '/records': {
        get: {
          tags: ['Records'],
          summary: 'Get all medical records',
          responses: {
            '200': { description: 'List of medical records' }
          }
        },
        post: {
          tags: ['Records'],
          summary: 'Create a new medical record',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RecordInput' }
              }
            }
          },
          responses: {
            '201': { description: 'Record created' }
          }
        }
      },
      '/records/{id}': {
        get: {
          tags: ['Records'],
          summary: 'Get medical record by ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Record details' },
            '404': { description: 'Record not found' }
          }
        },
        put: {
          tags: ['Records'],
          summary: 'Update medical record',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/RecordInput' } } }
          },
          responses: {
            '200': { description: 'Record updated' }
          }
        }
      },
      '/bills': {
        get: {
          tags: ['Billing'],
          summary: 'Get all bills',
          responses: {
            '200': { description: 'List of bills' }
          }
        },
        post: {
          tags: ['Billing'],
          summary: 'Create a new bill',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BillInput' }
              }
            }
          },
          responses: {
            '201': { description: 'Bill created' }
          }
        }
      },
      '/bills/{id}': {
        get: {
          tags: ['Billing'],
          summary: 'Get bill by ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Bill details' },
            '404': { description: 'Bill not found' }
          }
        }
      },
      '/bills/{id}/pay': {
        patch: {
          tags: ['Billing'],
          summary: 'Mark bill as paid',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Bill marked as paid' }
          }
        }
      }
    },
    components: {
      schemas: {
        Patient: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            age: { type: 'integer' },
            phone: { type: 'string' }
          }
        },
        PatientInput: {
          type: 'object',
          required: ['name', 'age'],
          properties: {
            name: { type: 'string' },
            age: { type: 'integer' },
            phone: { type: 'string' }
          }
        },
        Doctor: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            specialization: { type: 'string' },
            phone: { type: 'string' }
          }
        },
        Appointment: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            patientId: { type: 'integer' },
            doctorId: { type: 'integer' },
            date: { type: 'string' },
            time: { type: 'string' },
            status: { type: 'string', enum: ['pending', 'confirmed', 'cancelled'] }
          }
        },
        AppointmentInput: {
          type: 'object',
          required: ['patientId', 'doctorId', 'date', 'time'],
          properties: {
            patientId: { type: 'integer' },
            doctorId: { type: 'integer' },
            date: { type: 'string' },
            time: { type: 'string' }
          }
        },
        Record: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            patientId: { type: 'integer' },
            doctorId: { type: 'integer' },
            diagnosis: { type: 'string' },
            treatment: { type: 'string' },
            date: { type: 'string' }
          }
        },
        RecordInput: {
          type: 'object',
          required: ['patientId', 'doctorId', 'diagnosis'],
          properties: {
            patientId: { type: 'integer' },
            doctorId: { type: 'integer' },
            diagnosis: { type: 'string' },
            treatment: { type: 'string' },
            date: { type: 'string' }
          }
        },
        Bill: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            patientId: { type: 'integer' },
            appointmentId: { type: 'integer' },
            amount: { type: 'number' },
            status: { type: 'string', enum: ['pending', 'paid'] },
            date: { type: 'string' }
          }
        },
        BillInput: {
          type: 'object',
          required: ['patientId', 'appointmentId', 'amount'],
          properties: {
            patientId: { type: 'integer' },
            appointmentId: { type: 'integer' },
            amount: { type: 'number' },
            date: { type: 'string' }
          }
        }
      }
    }
  },
  apis: []
};

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { font-size: 2em; }
    .swagger-ui .info { margin: 20px 0; }
  `,
  customSiteTitle: 'Hospital Management System API',
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true
  }
}));

app.get('/api/spec.json', (req, res) => {
  res.json(specs);
});

app.get('/api/services', async (req, res) => {
  const services = [
    { name: 'Patient Service', url: '/patients', docs: '/patient-api-docs' },
    { name: 'Doctor Service', url: '/doctors', docs: '/doctor-api-docs' },
    { name: 'Appointment Service', url: '/appointments', docs: '/appointment-api-docs' },
    { name: 'Records Service', url: '/records', docs: '/records-api-docs' },
    { name: 'Billing Service', url: '/bills', docs: '/billing-api-docs' }
  ];
  res.json(services);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    title: 'Hospital Management System - Swagger Gateway',
    version: '1.0.0',
    endpoints: {
      swaggerUi: '/api-docs',
      openApiSpec: '/api/spec.json',
      services: '/api/services',
      health: '/health',
      kongGateway: KONG_URL
    },
    services: {
      patient: { proxy: `${KONG_URL}/patients`, docs: 'http://patient-service:8081/api-docs' },
      doctor: { proxy: `${KONG_URL}/doctors`, docs: 'http://doctor-service:8082/api-docs' },
      appointment: { proxy: `${KONG_URL}/appointments`, docs: 'http://appointment-service:8083/api-docs' },
      records: { proxy: `${KONG_URL}/records`, docs: 'http://records-service:8084/api-docs' },
      billing: { proxy: `${KONG_URL}/bills`, docs: 'http://billing-service:8085/api-docs' }
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('===========================================');
  console.log('  Swagger Gateway');
  console.log(`  → http://localhost:${PORT}`);
  console.log(`  → http://localhost:${PORT}/api-docs`);
  console.log(`  → Kong Gateway: ${KONG_URL}`);
  console.log('===========================================');
  console.log('');
  console.log('Available endpoints through Kong:');
  console.log('  GET    /patients         → Patient Service');
  console.log('  GET    /doctors          → Doctor Service');
  console.log('  GET    /appointments     → Appointment Service');
  console.log('  GET    /records          → Records Service');
  console.log('  GET    /bills            → Billing Service');
  console.log('');
});
