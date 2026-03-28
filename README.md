# Hospital MVP - Microservices Architecture

A microservices-based hospital management system built with Node.js, Express, Kong API Gateway, PostgreSQL, and Docker.

## Services

| Service | Port | Description | Database |
|---------|------|-------------|----------|
| Kong Gateway | 8000 | API Gateway (proxy) | PostgreSQL |
| Kong Admin | 8001 | Kong Admin API | - |
| Swagger Gateway | 8086 | Unified API Documentation | - |
| Patient Service | 8081 | Patient management | In-memory |
| Appointment Service | 8083 | Appointment booking | In-memory |
| Records Service | 8084 | Medical records | In-memory |
| Billing Service | 8085 | Billing & payments | PostgreSQL (Prisma) |
| Adminer | 8087 | Database management UI | - |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
            ┌───────▼─────────┐     ┌────────▼────────┐
            │  Kong Gateway  │     │ Swagger Gateway │
            │    (Port 8000) │     │   (Port 8086)   │
            └───────┬─────────┘     └────────┬────────┘
                    │                        │
    ┌───────────────┼────────────────────────┘
    │               │
┌───┴───┐   ┌──────┴───────────┐
│ Kong  │   │    Services      │
│  DB   │   │                  │
└───────┘   │  ┌─────────────┐ │
            │  │  Patient    │ │
            │  └─────────────┘ │
            │  ┌───────────────┐│
            │  │ Appointment  ││
            │  └───────────────┘│
            │  ┌─────────────┐ │
            │  │  Records    │ │
            │  └─────────────┘ │
            │  ┌─────────────┐ │
            │  │  Billing    │ │ PostgreSQL
            │  └─────────────┘ │
            └──────────────────┘
```

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)

### Using Docker Compose

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

## Access Points

| Service | URL |
|---------|-----|
| Kong Gateway | http://localhost:8000 |
| Swagger UI | http://localhost:8086 |
| Kong Admin API | http://localhost:8001 |
| Adminer (DB UI) | http://localhost:8087 |
| Patient Service | http://localhost:8081 |
| Appointment Service | http://localhost:8083 |
| Records Service | http://localhost:8084 |
| Billing Service | http://localhost:8085 |

### Adminer Login
- **URL:** http://localhost:8087
- **System:** PostgreSQL
- **Server:** postgres-billing
- **Username:** postgres
- **Password:** admin
- **Database:** billing

## API Endpoints

### Via Kong Gateway (Port 8000)

```bash
# Patients
curl http://localhost:8000/patients
curl http://localhost:8000/patients/1

# Appointments
curl http://localhost:8000/appointments
curl http://localhost:8000/appointments/1

# Records
curl http://localhost:8000/records
curl http://localhost:8000/records/1

# Bills
curl http://localhost:8000/bills
curl http://localhost:8000/bills/1
```

### Direct Service Access

```bash
# Patients
curl http://localhost:8081/patients
curl -X POST http://localhost:8081/patients -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","phone":"1234567890","address":"123 Main St"}'

# Appointments
curl http://localhost:8083/appointments
curl -X POST http://localhost:8083/appointments -H "Content-Type: application/json" -d '{"patientId":1,"doctorId":1,"date":"2026-04-01","time":"09:00","reason":"Checkup"}'

# Records
curl http://localhost:8084/records
curl -X POST http://localhost:8084/records -H "Content-Type: application/json" -d '{"patientId":1,"doctorId":1,"diagnosis":"Flu","prescription":"Rest and fluids"}'

# Bills
curl http://localhost:8085/bills
curl -X POST http://localhost:8085/bills -H "Content-Type: application/json" -d '{"patientId":1,"appointmentId":1,"amount":1500}'
curl -X PUT http://localhost:8085/bills/1/pay
```

## Billing Service

The Billing Service uses PostgreSQL with Prisma ORM.

### Database
- **Host:** postgres-billing (Docker) / localhost (local)
- **Port:** 5432
- **Database:** billing
- **Username:** postgres
- **Password:** admin

### Prisma Commands
```bash
# Install dependencies
cd billing-service && npm install

# Generate Prisma Client
npx prisma generate

# Apply migrations
npx prisma migrate deploy

# Create new migration
npx prisma migrate dev --name <migration_name>

# Open Prisma Studio
npx prisma studio
```

## Technology Stack

- **API Gateway:** Kong 3.4
- **Databases:** PostgreSQL 15
- **ORM:** Prisma 5 (Billing Service)
- **Services:** Node.js 20, Express 5
- **Documentation:** Swagger/OpenAPI 3.0
- **DB Management:** Adminer
- **Containerization:** Docker, Docker Compose

## Project Structure

```
hospital-mvp/
├── patient-service/         # Patient management (Port 8081)
├── appointment-service/      # Appointment management (Port 8083)
├── records-service/         # Medical records (Port 8084)
├── billing-service/         # Billing with PostgreSQL + Prisma (Port 8085)
├── doctor-service/          # Doctor management (Port 8082) - disabled
├── kong/                    # Kong API Gateway config
├── swagger-gateway/         # Unified Swagger documentation (Port 8086)
├── docker-compose.yml       # Docker Compose configuration
└── README.md
```

## Development

### Individual Service Setup

```bash
# Patient Service
cd patient-service && npm install && npm start

# Appointment Service
cd appointment-service && npm install && npm start

# Records Service
cd records-service && npm install && npm start

# Billing Service (requires PostgreSQL)
cd billing-service && npm install && npx prisma migrate dev && npm start
```

### Building Images

```bash
docker compose build <service-name>
docker compose up -d <service-name>
```
