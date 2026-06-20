#  PUBO


PUBO is a cross-platform mobile application built around the philosophy of **Building in Public**. It enables creators, developers, founders, and professionals to compose content once and publish it across multiple social platforms from a single interface.

The goal is simple:

**Reduce the friction of sharing your work publicly and make consistent content creation effortless.**

---

## 📱 Application Screenshots

<p align="center">
  <img src="./assets/home-feed.png" width="250"/>
  <img src="./assets/post-composer.png" width="250"/>
</p>

## 🏛️ System Architecture

```text
Mobile App
     │
     ▼
 API Gateway / Router
     │
 ┌───┴─────────────┐
 ▼                 ▼
Middleware      Handlers
                    │
                    ▼
                Services
                    │
                    ▼
              Repositories
                    │
                    ▼
              PostgreSQL
```

The application follows a layered architecture where each layer has a single responsibility. This improves maintainability, scalability, and testability while keeping business logic isolated from infrastructure concerns.

---

## 🔄 Request Lifecycle

```text
Client Request
      │
      ▼
 Middleware
 ├── CORS
 ├── Rate Limiter
 ├── Request ID
 └── Context Enhancer
      │
      ▼
 Handler
      │
      ▼
 Service
      │
      ▼
 Repository
      │
      ▼
 PostgreSQL
      │
      ▼
 Response
```

This flow ensures every request is validated, traced, rate-limited, and processed through clearly separated layers.

---

## 📂 Backend Folder Structure

![Backend Folder Structure](./assets/backend-folder-structure.png)

```text
backend/
├── cmd/
├── internal/
│   ├── config/
│   ├── database/
│   ├── errs/
│   ├── handler/
│   ├── lib/
│   ├── logger/
│   ├── middleware/
│   ├── model/
│   ├── repository/
│   ├── router/
│   ├── server/
│   ├── service/
│   ├── sqlerr/
│   ├── testing/
│   └── validation/
```

---

## ⚙️ Architecture Principles

### Dependency Injection

The application follows dependency injection principles to keep components loosely coupled and easy to test.

**Benefits:**

- Improved maintainability
- Better testability
- Cleaner abstractions
- Easier mocking during testing
- Reduced coupling between layers

---

### Layered Architecture

PUBO follows a clean layered architecture:

```text
Handler → Service → Repository → Database
```

Each layer has a clearly defined responsibility:

- **Handlers** manage HTTP requests and responses
- **Services** contain business logic
- **Repositories** manage data persistence
- **Database** handles storage concerns

This separation makes the system easier to scale and maintain.

---

## 📂 Core Components

### `handler/`

Responsible for:

- HTTP request handling
- Request parsing
- Response formatting
- Delegating business logic to services

Handlers remain lightweight and focused solely on transport concerns.

---

### `service/`

Contains the application's core business logic.

Responsibilities:

- Business rules
- Workflow orchestration
- Publishing logic
- Domain-specific operations

The service layer acts as the heart of the application.

---

### `repository/`

Responsible for all database interactions.

Responsibilities:

- Query execution
- Data persistence
- Data retrieval
- Database abstraction

Repositories isolate storage concerns from business logic.

---

### `middleware/`

Contains reusable middleware components that process requests before they reach handlers.

Implemented middleware includes:

- CORS
- Rate Limiting
- Request ID
- Context Enhancement

---

### `router/`

Responsible for:

- Route registration
- Endpoint grouping
- Middleware configuration
- API versioning

Provides a centralized location for routing logic.

---

### `database/`

Handles:

- Database initialization
- Connection management
- Configuration setup
- Query execution support

---

### `config/`

Manages:

- Environment variables
- Application configuration
- Runtime settings
- Service configuration

---

### `logger/`

Provides centralized logging for:

- Request tracing
- Error reporting
- Debugging
- Operational visibility

---

### `validation/`

Contains reusable validation logic and request validation rules.

---

### `errs/` & `sqlerr/`

Responsible for structured error handling throughout the application.

Benefits:

- Consistent error responses
- Easier debugging
- Better error categorization

---

## 🛡️ Middleware Pipeline

### CORS Middleware

Handles cross-origin requests securely and enables communication between frontend and backend services.

### Rate Limiting

Protects the backend against:

- Abuse
- Spam requests
- Excessive API consumption

Ensures fair usage of system resources.

### Request ID Middleware

Generates a unique identifier for every incoming request.

Benefits:

- Easier debugging
- Request tracing
- Log correlation
- Better observability

### Context Enhancer

Enriches request context with useful metadata throughout the request lifecycle.

This allows downstream handlers and services to access request-scoped information cleanly and consistently.

---

## 🌐 API Design

The backend exposes RESTful APIs and follows consistent conventions for:

- Resource-oriented routes
- Structured error responses
- Request validation
- Authentication
- Logging and observability

Example:

```http
POST /api/v1/posts

GET /api/v1/posts

---

## 🛠️ Tech Stack

### Frontend

- React Native
- TypeScript
- Expo

### Backend

- Go
- Echo Framework

### Database

- PostgreSQL

### DevOps

- Docker
- GitHub Actions

### Architecture

- Layered Architecture
- Dependency Injection
- Middleware Pipeline
- Repository Pattern

---

## 🚀 Running Locally

### Clone Repository

```bash
git clone https://github.com/<your-username>/pubo.git
cd pubo
```

### Configure Environment

```bash
cp .env.example .env
```

Configure:

```env
DATABASE_URL=
JWT_SECRET=
PORT=
```

### Start Backend

```bash
go run cmd/main.go
```

### Start Mobile Application

```bash
cd frontend/pubo/
npx expo start
```

---

## 🎯 Vision

PUBO aims to make Building in Public effortless.

Whether you're:

- A developer sharing progress
- A founder documenting a startup journey
- A student showcasing projects
- A creator publishing updates

PUBO helps you write once and publish everywhere.

---

### Build • Learn • Share 🚀
