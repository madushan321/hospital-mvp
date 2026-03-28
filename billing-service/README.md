# Billing Service

A RESTful API service for managing hospital billing, built with Node.js, Express, and PostgreSQL using Prisma ORM.

## Tech Stack

- **Runtime:** Node.js 20
- **Framework:** Express.js 5
- **ORM:** Prisma 5
- **Database:** PostgreSQL 15
- **Database Management:** Adminer

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)

### Running with Docker Compose

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f billing-service
```

### Local Development

```bash
# Install dependencies
npm install

# Run migrations
npx prisma migrate dev

# Start the server
npm run dev
```

## Services & Ports

| Service | URL |
|---------|-----|
| Billing API | http://localhost:8085 |
| Swagger Docs | http://localhost:8085/api-docs |
| Adminer (DB UI) | http://localhost:9001 |

## Database Connection

### Docker (within container)
- **Host:** `postgres-billing`
- **Port:** `5432`
- **Database:** `billing`
- **Username:** `postgres`
- **Password:** `admin`

### Local Development
- **Host:** `localhost`
- **Port:** `5432`
- **Database:** `billing`
- **Username:** `postgres`
- **Password:** `admin`

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/billing?schema=public"
```

## API Endpoints

### Base URL
```
http://localhost:8085
```

### Bills

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/bills` | Get all bills |
| GET | `/bills/:id` | Get bill by ID |
| POST | `/bills` | Create a new bill |
| PATCH | `/bills/:id/pay` | Mark bill as paid |
| DELETE | `/bills/:id` | Delete a bill by ID |

### Request/Response Examples

#### Create Bill
```bash
curl -X POST http://localhost:8085/bills \
  -H "Content-Type: application/json" \
  -d '{"patientId": 1, "appointmentId": 1, "amount": 1500}'
```

**Response:**
```json
{
  "id": 1,
  "patientId": 1,
  "appointmentId": 1,
  "amount": 1500,
  "status": "pending",
  "date": "2026-03-28T10:28:22.956Z",
  "createdAt": "2026-03-28T10:28:22.956Z",
  "updatedAt": "2026-03-28T10:28:22.956Z"
}
```

#### Get All Bills
```bash
curl http://localhost:8085/bills
```

#### Pay Bill
```bash
curl -X PATCH http://localhost:8085/bills/1/pay
```

#### Delete Bill
```bash
curl -X DELETE http://localhost:8085/bills/1
```

## Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Apply migrations
npx prisma migrate deploy

# Create new migration
npx prisma migrate dev --name <migration_name>

# Open Prisma Studio (DB GUI)
npx prisma studio
```

## Database Schema

```prisma
model Bill {
  id            Int      @id @default(autoincrement())
  patientId     Int
  appointmentId Int
  amount        Float
  status        String   @default("pending")
  date          DateTime @default(now())
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## Project Structure

```
billing-service/
├── prisma/
│   ├── migrations/         # Database migrations
│   └── schema.prisma       # Prisma schema
├── src/
│   ├── controllers/         # Route controllers
│   │   └── billingController.js
│   ├── models/             # Database models
│   │   └── bill.js
│   ├── routes/             # API routes
│   │   └── billingRoutes.js
│   └── index.js            # Application entry point
├── .env                    # Environment variables
├── Dockerfile              # Docker configuration
├── package.json
└── README.md
```

## Troubleshooting

### Adminer Login Issues
- Ensure `postgres-billing` container is running
- Use `postgres` as username and `admin` as password
- Server field should be `postgres-billing` (for Docker) or `localhost` (for local)

### Prisma Errors
- Make sure the database container is healthy before running migrations
- Delete `node_modules/.prisma` and run `npx prisma generate` if there are engine errors

### Database Connection Refused
- Wait for postgres-billing to be healthy before starting billing-service
- Check that the DATABASE_URL environment variable is correct
