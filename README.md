# OwnLink

OwnLink is a backend-focused URL redirection service built to explore how modern link infrastructure works.

Rather than treating QR codes as the product, OwnLink starts with ownership of redirects and builds upward from there. The project is developed incrementally with a strong focus on understanding backend architecture, API design, database design, TypeScript, and system design fundamentals before introducing higher-level abstractions.

The long-term vision is to build a link infrastructure platform that prioritizes user ownership and portability while supporting features such as analytics, QR code generation, authentication, and custom domains.

---

# Current Features

## Link Management

OwnLink currently provides a REST API for managing redirect links.

Supported operations include:

* Create new links
* Retrieve a single link
* Retrieve all links
* Update existing links
* Delete links

### Automatic Slug Generation

Clients never provide a slug.

Instead, the backend automatically generates a unique short slug for every new link and transparently retries if a collision occurs.

This keeps the API simple while ensuring slug uniqueness remains a server-side responsibility.

Example request:

```http
POST /links
```

```json
{
  "destinationUrl": "https://google.com"
}
```

Example response:

```json
{
  "id": 1,
  "slug": "Ab3X9kQ",
  "destinationUrl": "https://google.com"
}
```

Updating a link only requires changing the destination URL.

```http
PATCH /links/Ab3X9kQ
```

```json
{
  "destinationUrl": "https://google.ai"
}
```

Slugs are immutable after creation.

---

## Redirect Engine

Redirect users using a short slug.

Example:

```text
/Ab3X9kQ
```

↓

```text
https://google.com
```

Current flow:

```text
Request
    ↓
Extract slug
    ↓
Lookup destination
    ↓
HTTP Redirect
```

---

## Request Validation

Incoming requests are validated using **Zod** before reaching the controller layer.

Current request flow:

```text
HTTP Request
    ↓
Validation Middleware
    ↓
Controller
    ↓
Service
    ↓
PostgreSQL
    ↓
Global Error Handler
    ↓
HTTP Response
```

Validation provides:

* Validation at the HTTP boundary
* Reusable request schemas
* Type-safe request bodies using `z.infer`
* Consistent HTTP 400 responses
* Controllers receive validated data only

---

## PostgreSQL Persistence

OwnLink uses PostgreSQL as its primary datastore.

Current schema includes:

* Identity primary key
* Unique slug constraint
* CHECK constraints preventing blank slugs
* CHECK constraints preventing blank destination URLs

The project intentionally relies on PostgreSQL to enforce data integrity instead of duplicating database validation inside application code.

---

## Database Migrations

The project uses **DBMate** to version and manage database schema changes.

Every schema modification is recorded as a migration, allowing the database to evolve without recreating it or losing existing data.

Common commands:

```bash
pnpm db:new <migration_name>
pnpm db:up
pnpm db:down
pnpm db:status
pnpm db:dump
```

Each migration contains an **up** section that applies the change and a corresponding **down** section that rolls it back.

The generated `schema.sql` file represents the latest database schema and is committed alongside migration files.

---

## Layered Architecture

The application follows a layered architecture separating transport concerns, business logic, and persistence.

```text
HTTP Request
    ↓
Validation Middleware
    ↓
Controller
    ↓
Service
    ↓
PostgreSQL
    ↓
Global Error Handler
    ↓
HTTP Response
```

Responsibilities are divided as follows:

* **Validation middleware** validates incoming HTTP requests.
* **Controllers** coordinate HTTP requests and responses.
* **Services** contain business logic and database interaction.
* **PostgreSQL** enforces data integrity.
* **Global error middleware** converts application errors into HTTP responses.

---

## Database Error Handling

Infrastructure-specific database errors are translated into application-level HTTP errors.

Examples include:

* Empty destination URL → **400 Bad Request**
* Missing resource → **404 Not Found**
* Slug generation exhausted after retry limit → **500 Internal Server Error**

This keeps PostgreSQL implementation details isolated from the rest of the application.

---

## Data Integrity

Data integrity is enforced primarily at the database layer.

Current safeguards include:

* Identity primary key
* Unique slugs
* Non-empty slug validation
* Non-empty destination URL validation

Application code focuses on business rules while PostgreSQL guarantees data consistency.

---

# Tech Stack

## Backend

* Node.js
* Express 5
* TypeScript
* PostgreSQL
* postgres.js
* Zod

## Tooling

* DBMate
* pnpm
* Git
* GitHub
* ESLint
* Prettier
* TSX

---

# Project Structure

```text
backend/
├── db/
│   ├── migrations/
│   └── schema.sql
├── src/
│   ├── controllers/
│   ├── db/
│   ├── errors/
│   ├── middleware/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── package.json
└── tsconfig.json
```

---

# API Endpoints

| Method | Endpoint       | Description                 |
| ------ | -------------- | --------------------------- |
| GET    | `/links`       | Retrieve all links          |
| GET    | `/links/:slug` | Retrieve a single link      |
| POST   | `/links`       | Create a new short link     |
| PATCH  | `/links/:slug` | Update destination URL      |
| DELETE | `/links/:slug` | Delete a link               |
| GET    | `/:slug`       | Redirect to destination URL |

---

# Architectural Decisions

Current design principles include:

* PostgreSQL is the source of truth for data integrity.
* Request validation happens at the HTTP boundary.
* Slugs are generated exclusively by the server.
* Clients never control slug generation.
* Services translate infrastructure-specific errors into application-level errors.
* Controllers remain focused on HTTP concerns.
* Business logic is isolated within the service layer.
* SQL column aliases preserve camelCase objects while maintaining snake_case database naming.

---

# Getting Started

Create a `.env` file:

```env
DATABASE_URL=your_database_url
PORT=3000
```

Install dependencies:

```bash
pnpm install
```

Apply migrations:

```bash
pnpm db:up
```

Start the development server:

```bash
pnpm run dev
```

Build:

```bash
pnpm run build
```

Run ESLint:

```bash
pnpm run lint
```

Format the project:

```bash
pnpm run format
```

---

# Roadmap

## Completed

* Express server setup
* Redirect engine
* CRUD operations
* Service layer architecture
* PostgreSQL integration
* Database migrations with DBMate
* Configuration management
* Request validation with Zod
* Automatic server-side slug generation
* Layered architecture
* Centralized error handling
* TypeScript migration
* GitHub workflow

## Next

* API hardening
* Automated testing
* Request logging
* Performance improvements

## Future

* User authentication
* User-owned links
* Analytics
* QR code generation
* Custom domains
* Role-based authorization

---

# Status

OwnLink is an actively developed backend engineering project focused on understanding how production systems are designed.

The current implementation provides a PostgreSQL-backed REST API featuring layered architecture, request validation, automatic server-side slug generation, centralized error handling, and database-enforced data integrity.

Future development will continue expanding the platform while maintaining a strong emphasis on learning the architectural decisions behind production backend systems rather than simply adding features.

