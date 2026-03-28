# API Gateway - DEPRECATED

This directory contained the original Express-based API Gateway which has been **replaced by Kong Gateway**.

## New Architecture

The system now uses:

1. **Kong Gateway** (port 8000) - Production-grade API gateway with:
   - Service routing
   - CORS handling
   - Request/Response plugins
   - Admin API (port 8001)

2. **Swagger Gateway** (port 8086) - Unified API documentation

## How to Access Services

### Through Kong Gateway (Port 8000)
```
GET  http://localhost:8000/patients
GET  http://localhost:8000/doctors
GET  http://localhost:8000/appointments
GET  http://localhost:8000/records
GET  http://localhost:8000/bills
```

### Swagger Documentation (Port 8086)
```
http://localhost:8086/api-docs
```

### Kong Admin API (Port 8001)
```
http://localhost:8001
```

## Configuration

Routes are defined in `../kong/kong.yml` using Kong's declarative configuration format.
