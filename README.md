# DSALTA Compliance API

A production-ready, multi-tenant REST API for managing compliance tasks and evidence in a DSALTA-style framework. Built with Node.js, TypeScript, TSOA, and PostgreSQL.

## Features

- Multi-tenant organization scoping
- RESTful API with OpenAPI/Swagger documentation
- Full CRUD operations for tasks and evidence
- Proper HTTP error handling with structured responses
- Input validation using TSOA decorators
- Docker & docker-compose support
- Database seeding for development
- Production-ready security (non-root Docker user, input validation)

## Tech Stack

- **Runtime**: Node.js 20
- **Language**: TypeScript
- **Framework**: Express.js
- **API Documentation**: TSOA (OpenAPI 3.0)
- **Database**: PostgreSQL 15
- **ORM**: Prisma 7
- **Containerization**: Docker & Docker Compose

## Data Model

```
Organization (1) ─── (n) Framework (1) ─── (n) Control
     │                                            │
     └──────────────────── (n) Task (1) ─── (n) Evidence
```

### Entities

- **Organization**: Multi-tenant root entity
- **Framework**: Compliance frameworks (e.g., DSALTA, ISO 27001)
- **Control**: Framework-specific controls (e.g., AC-01, AC-02)
- **Task**: Compliance tasks assigned to controls
- **Evidence**: Supporting evidence for task completion

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- PostgreSQL 15 (if running without Docker)

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd proj1
```

#### 2. Set up environment variables

Create a `.env` file in the project root:

```env
POSTGRES_DB=dsaltadb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password_here
POSTGRES_PORT=5432
DATABASE_URL="postgresql://postgres:your_password_here@localhost:5432/dsaltadb?schema=public"
PORT=3000
```

#### 3. Start with Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# Run database migrations
npx prisma migrate deploy

# Seed the database (optional)
npm run seed
```

#### 4. Or run locally

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npm run seed

# Start development server
npm run dev
```

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/organizations/{orgId}/tasks` | Create a new task |
| `GET` | `/api/v1/organizations/{orgId}/tasks` | List tasks (with pagination & filters) |
| `GET` | `/api/v1/organizations/{orgId}/tasks/{taskId}` | Get task details |
| `PATCH` | `/api/v1/organizations/{orgId}/tasks/{taskId}` | Update task |
| `DELETE` | `/api/v1/organizations/{orgId}/tasks/{taskId}` | Delete task |

### Evidence

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/organizations/{orgId}/tasks/{taskId}/evidence` | Add evidence to task |
| `DELETE` | `/api/v1/organizations/{orgId}/tasks/{taskId}/evidence/{evidenceId}` | Delete evidence |

## API Documentation

Once the server is running, access the interactive Swagger documentation at:

```
http://localhost:3000/docs
```

## Database Seeding

The project includes a seed script that creates sample data for development and testing.

### Run the seed script

```bash
npm run seed
```

### Sample data created

- 1 Organization
- 1 Framework
- 3 Controls
- 3 Tasks
- 3 Evidence items

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Seed database
npm run seed

# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Reset database and re-seed
npx prisma migrate reset
```

### Project Structure

```
proj1/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts             # Seed script
├── src/
│   ├── controllers/        # TSOA route controllers
│   ├── errors/            # HTTP error classes
│   ├── models/            # DTOs and interfaces
│   ├── services/          # Business logic layer
│   ├── app.ts            # Express app configuration
│   ├── routes.ts         # Generated TSOA routes
│   └── server.ts         # Application entry point
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile            # Multi-stage Docker build
└── tsoa.json            # TSOA configuration
```

## Validation

All API endpoints include input validation:

- **Task Name**: 1-100 characters
- **Task Description**: 1-500 characters
- **Task Category**: 1-100 characters
- **Task Status**: Enum (Pending, In Progress, Completed)
- **Control ID**: Integer

Invalid requests return `400 Bad Request` with detailed error messages.

## Error Handling

The API uses structured HTTP error responses:

```json
{
  "error": "NotFoundError",
  "message": "Task not found"
}
```

**HTTP Status Codes:**
- `200 OK` - Successful GET/PATCH requests
- `201 Created` - Successful POST requests
- `204 No Content` - Successful DELETE requests
- `400 Bad Request` - Validation errors
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Unexpected errors

## Security

- Multi-tenant data isolation (organization scoping on all queries)
- Docker containers run as non-root user
- Input validation on all endpoints
- Environment variables for sensitive data
- Proper error handling without leaking internal details

## Docker

### Build and Run

```bash
# Build the Docker image
docker build -t dsalta-api .

# Run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Health Checks

The PostgreSQL service includes health checks to ensure the database is ready before the API starts.

## Production Deployment

### Set production environment variables

### Build the application

```bash
npm run build
```

### Run migrations

```bash
npx prisma migrate deploy
```

### Start the server

```bash
npm start
```

### Or use Docker

```bash
docker-compose up -d
```

## Testing

### Manual Testing with Swagger

1. Start the server: `npm run dev`
2. Navigate to `http://localhost:3000/docs`
3. Use the interactive Swagger UI to test endpoints

### Example cURL Requests

#### Create a task

```bash
curl -X POST http://localhost:3000/api/v1/organizations/1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "controlId": 1,
    "name": "Implement Access Controls",
    "description": "Set up role-based access control system",
    "category": "Access Control",
    "status": "Pending"
  }'
```

## Author

Can Idemen
