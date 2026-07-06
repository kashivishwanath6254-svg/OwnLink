# OwnLink

OwnLink is a backend-focused URL redirection service built to explore how modern link infrastructure works.

Rather than treating QR codes as the product, OwnLink starts with ownership of redirects and builds upward from there. The project is developed incrementally with a strong focus on understanding backend architecture, API design, database design, TypeScript, and system design fundamentals before introducing higher-level abstractions.

The long-term vision includes features such as analytics, QR code generation, authentication, and custom domains, but the current focus is on building a solid backend foundation.

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

---

## Redirect Engine

Redirect users using a short slug.

Example:

```text
/google
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

## PostgreSQL Persistence

OwnLink now uses PostgreSQL as its primary datastore.

Current schema includes:

* Identity primary key
* Unique slug constraint
* CHECK constraints preventing blank values

The project intentionally relies on PostgreSQL to enforce invariant data integrity instead of duplicating validation logic in application code.

---

## Layered Architecture

The application follows a layered architecture separating HTTP concerns from business logic and database access.

```text
HTTP Request
↓
Controller
↓
Service
↓
PostgreSQL
↓
Service
↓
Global Error Handler
↓
HTTP Response
```

Responsibilities are divided as follows:

* **Controllers** handle HTTP requests and responses.
* **Services** contain business logic and all database interaction.
* **PostgreSQL** enforces data integrity.
* **Global error middleware** converts application errors into HTTP responses.

---

## Database Error Handling

The project translates PostgreSQL-specific errors into application-level errors.

Examples include:

* Duplicate slug → **409 Conflict**
* Empty slug → **400 Bad Request**
* Empty destination URL → **400 Bad Request**
* Missing resource → **404 Not Found**

This approach keeps controllers and middleware independent of PostgreSQL implementation details.

---

# Tech Stack

### Backend

* Node.js
* Express 5
* TypeScript
* PostgreSQL
* `postgres` (PostgreSQL client)

### Tooling

* pnpm
* Git
* GitHub
* ESLint
* Prettier
* TSX

---

# Project Structure

```text
src/
├── controllers/
├── db/
├── errors/
├── middleware/
├── routes/
├── services/
├── app.ts
└── server.ts
```

---

# API Endpoints

| Method | Endpoint       | Description                     |
| ------ | -------------- | ------------------------------- |
| GET    | `/links`       | Retrieve all links              |
| GET    | `/links/:slug` | Retrieve a single link          |
| POST   | `/links`       | Create a new link               |
| PATCH  | `/links/:slug` | Update an existing link         |
| DELETE | `/links/:slug` | Delete a link                   |
| GET    | `/:slug`       | Redirect to the destination URL |

---

# Architectural Decisions

Some of the design principles currently followed in the project include:

* PostgreSQL is the source of truth for invariant data validation.
* Database constraints are preferred over application-side pre-validation where appropriate.
* Services translate infrastructure-specific errors into application-level errors.
* Controllers remain focused on HTTP concerns.
* Business logic and database interaction are isolated within the service layer.
* SQL column aliases are used to maintain camelCase objects in TypeScript while preserving snake_case database naming.

---

# Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm run dev
```

Build the project:

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

* REST API for link management
* Redirect engine
* PostgreSQL integration
* CRUD operations
* Layered architecture
* Global error handling
* Database-backed validation using constraints
* TypeScript migration
* GitHub workflow

## Next

* Database migrations
* Request validation middleware
* Automated testing
* Logging improvements

## Future

* User authentication
* User-owned links
* Analytics
* QR code generation
* Custom domains
* Role-based authorization

---

# Status

OwnLink is an actively developed learning project focused on backend engineering.

The current implementation provides a PostgreSQL-backed REST API with a layered architecture, database-enforced data integrity, and centralized error handling. Future development will continue expanding the project's capabilities while maintaining a strong emphasis on understanding the underlying systems rather than relying on heavy abstractions.

