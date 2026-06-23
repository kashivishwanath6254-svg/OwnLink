# OwnLink

OwnLink is a backend-focused project exploring how modern link infrastructure works.

Rather than treating QR codes as the product, OwnLink starts with ownership of redirects and builds upward from there.

The long-term goal is to understand and implement the systems behind:

* Redirect management
* Link ownership
* Analytics
* QR code generation
* Custom domains

The project is being built incrementally to learn backend architecture, API design, TypeScript, data modeling, and system design fundamentals.

## Current Features

### Redirect Engine

Redirect users based on a slug.

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
Lookup link
↓
Redirect
```

### In-Memory Storage

Links are currently stored in memory using a TypeScript `Record`.

Example:

```text
google  -> Link
youtube -> Link
```

No database is used at this stage.

## Tech Stack

Backend:

* Node.js
* Express
* TypeScript

Tooling:

* PNPM
* ESLint
* Prettier
* TSX

## Project Structure

```text
src/
├── controllers/
├── routes/
├── data/
├── services/
├── middleware/
├── types/
├── app.ts
└── server.ts
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm run dev
```

Build project:

```bash
pnpm run build
```

Run linting:

```bash
pnpm run lint
```

Format code:

```bash
pnpm run format
```

## Roadmap

### Completed

* Redirect engine
* Slug lookup
* Redirect handling
* TypeScript type safety
* GitHub workflow setup

### Next

* Create links via API
* In-memory CRUD operations
* Request validation

### Future

* MongoDB persistence
* User authentication
* Analytics
* QR code generation
* Custom domains

## Status

Early development.

The current focus is understanding backend systems and building features incrementally before introducing databases and external services.
