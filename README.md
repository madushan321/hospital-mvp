# Hospital MVP - Microservices Architecture

A microservices-based hospital management system built with Node.js, Express, Kong API Gateway, and Docker.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
            ┌───────▼─────────┐     ┌────────▼────────┐
            │  Kong Gateway   │     │ Swagger Gateway  │
            │    (Port 8000)   │     │   (Port 8086)    │
            └───────┬─────────┘     └────────┬────────┘
                    │                        │
    ┌───────────────┼────────────────────────┘
    │               │
┌───┴───┐   ┌──────┴──────┐
│ Kong  │   │   Services   │
│  DB   │   │              │
└───────┘   │  ┌─────────┐ │
            │  │ Patient │ │
            │  └─────────┘ │
            │  ┌─────────┐ │
            │  │ Doctor  │ │
            │  └─────────┘ │
            │  ┌───────────┐ │
            │  │Appointments│ │
            │  └───────────┘ │
            │  ┌─────────┐ │
            │  │ Records │ │
            │  └─────────┘ │
            │  ┌─────────┐ │
            │  │ Billing │ │
            │  └─────────┘ │
            └───────────────┘
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| Kong Gateway | 8000 | API Gateway (proxy) |
| Kong Admin | 8001 | Kong Admin API |
| Swagger Gateway | 8086 | Unified API Documentation |
| Patient Service | 8081 | Patient management |
| Doctor Service | 8082 | Doctor management |
| Appointment Service | 8083 | Appointment booking |
| Records Service | 8084 | Medical records |
| Billing Service | 8085 | Billing & payments |

## Quick Start

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Access Points

- **Kong Gateway**: http://localhost:8000
- **Swagger UI**: http://localhost:8086/api-docs
- **Kong Admin API**: http://localhost:8001

### API Endpoints (via Kong)

```bash
# Patients
curl http://localhost:8000/patients
curl http://localhost:8000/patients/1

# Doctors
curl http://localhost:8000/doctors

# Appointments
curl http://localhost:8000/appointments

# Records
curl http://localhost:8000/records

# Bills
curl http://localhost:8000/bills
```

## Individual Service Ports

| Service | URL |
|---------|-----|
| Patient Service | http://localhost:8081 |
| Doctor Service | http://localhost:8082 |
| Appointment Service | http://localhost:8083 |
| Records Service | http://localhost:8084 |
| Billing Service | http://localhost:8085 |

## Technology Stack

- **API Gateway**: Kong 3.4
- **Database**: PostgreSQL 15 (for Kong)
- **Services**: Node.js 22, Express
- **Documentation**: Swagger/OpenAPI 3.0
- **Containerization**: Docker, Docker Compose
