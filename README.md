# 📁 CoPilot AI Business Suite — Backend

This repository contains the backend for the CoPilot AI Business Suite, designed as a modular microservice architecture with intelligent agents, task orchestration, and semantic memory.

---

## 🧱 Architecture Overview

The backend is structured around multiple FastAPI microservices, supported by a shared memory engine, dispatcher layer, and semantic vector database. Key technologies include:

- Supabase + pgvector for memory
- Redis Queue (RQ) for async task handling
- FastAPI for microservices
- Docker for containerized deployment
- Poetry for dependency management

---

## 🧩 Microservice Structure

```
copilot_backend/
├── services/
│   ├── projects_api/
│   ├── finance_api/
│   ├── crm_api/
│   └── agents_api/
├── core/          # dispatcher, memory, config
├── shared/        # auth, schemas, logging
```

Each service has its own `main.py`, `.env`, `Dockerfile`, `routes/`, and `schemas/`. The `core/` and `shared/` directories contain reusable logic across services.

---

## 🗂️ Legacy App Folder Structure

For initial monolithic development or migration reference:

```
copilot_backend/
├── app/
│   ├── agents/
│   ├── core/
│   ├── domains/
│   ├── memory/
│   ├── models/
│   ├── queues/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── tests/
│   └── tools/
├── main.py
├── .env
├── pyproject.toml
├── poetry.lock
```

---

## 📘 Module Explanations

### 🔹 `agents/`  
AI agents that perform concrete tasks using:
- Prompt logic
- External/internal tools
- `run()` method interface  
⏳ A shared `BaseAgent` class provides the standard agent interface.

### 🔹 `core/`  
Core infrastructure:
- `config/`: Settings from `.env`
- `dispatcher/`: Agent routing
- `logging/`: Output/error logging

### 🔹 `domains/`  
Business domains (e.g. Finance, Projects). Each contains:
- `service.py`: logic
- `models.py`: optional ORM
- `workflows.py`: pipelines

### 🔹 `memory/`  
Handles semantic context:
- `store.py`, `retrieve.py`, `feedback.py`
- Vector storage via pgvector (Supabase)
```json
{
  "user_id": "uuid",
  "tenant_id": "uuid",
  "content": "AI response",
  "memory_type": "short_term",
  "tags": ["planning", "project"],
  "created_at": "...",
  "valid_until": "..."
}
```

### 🔹 `queues/`  
Background tasks with Redis:
- `worker.py`, `tasks.py`, `job_definitions.py`

### 🔹 `routes/`  
FastAPI route handlers, grouped by theme:
- `input.py`, `feedback.py`, `health.py`

### 🔹 `schemas/`  
Pydantic models for validation:
- `input.py`, `task.py`, `memory.py`

### 🔹 `services/`  
Clients and service logic for:
- Supabase, ClickUp, MailerLite, etc.

### 🔹 `tools/`  
Wrappers for external APIs or internal utilities.

### 🔹 `tests/`  
Unit/integration tests using Pytest.

---

## 🚀 Development Workflow

### 🔧 Git Strategy

- `main`: stable, production-ready
- `dev`: integration branch
- `feature/*`: new features
- `fix/*`: bugfixes
- `hotfix/*`: production patches

Create a new feature branch from `dev`:

```bash
git checkout dev
git pull
git checkout -b feature/my-feature
```

Use conventional commits:
- `feat: add new memory indexing`
- `fix: correct Supabase query`
- `refactor: move redis logic`
- `docs: update README structure`

---

## 🔐 API Conventions

- All endpoints under `/api/v1/`
- JSON request/response only
- Use `X-Tenant-ID` header
- Response format:
```json
{
  "success": true,
  "data": { "item": "..." }
}
```

Swagger docs available at `/docs`.

---

## 🌐 Frontend Integration

Use `NEXT_PUBLIC_API_URL` in your frontend.  
Bolt.new / Next.js clients should:

- Call versioned endpoints (e.g. `/api/v1/tasks`)
- Pass `X-Tenant-ID` for scoped access
- Use fetch/axios wrappers with retry & logging

---

## 🧰 Tooling

- **Redis**: queueing, pub/sub, rate limiting
- **Supabase**: data, auth, memory (pgvector)
- **Docker**: containerized services
- **Poetry**: dependency management

---
---

## 🧪 Testing

CoPilot follows a multi-layer testing strategy with Pytest:

- Unit tests for logic in `agents/`, `memory/`, `domains/`, `tools/`
- Integration tests for agents + memory + tools interaction
- API tests for input and feedback routes
- Schema validation with Pydantic and Swagger
- Optional performance tests using Locust or k6

➡️ Full testing plan: see [TESTING.md](./TESTING.md)

Install dependencies:
```bash
poetry install
```
Run tests:

```bash
pytest
```

CI/CD pipelines will enforce test coverage, linting, type checks, and contract validation.

### 🔍 Testing Mocking strategy (Dispatcher & Agents)

Tests for `core/dispatcher/route_task()` rely on mocking internal dependencies:

- `get_agent()` from the agent registry (`agent_loader`)
- `retrieve_context()` from memory engine
- Tool access via the `tools` dict (e.g. Redis, Supabase)
- Optional: logger injection for output tracking

Example test approach:
- Patch agent loading: `patch("agent_loader.get_agent")`
- Patch context: `patch("memory.retrieve_context")`
- Inject mock tools and assert on `.run()` output

See `tests/core/test_dispatcher.py` for fixture and mock examples.

## 💡 Code Conventions

We follow a consistent code style across all services:

| Topic          | Convention          |
|----------------|---------------------|
| Code Style     | PEP8 via `black`    |
| Linting        | `ruff`              |
| Typing         | Mandatory (`mypy`)  |
| Imports        | Sorted via `ruff` or `isort` |
| Naming         | `snake_case`, `PascalCase`, `UPPER_CASE` |
| Docstrings     | Required for all classes and public methods |
| Tests          | Use `pytest` + `mocks` in `/tests/` folders |

> Configure `pre-commit` hooks to auto-check linting, types and formatting.

Run manually:

```bash
ruff check .
black .
mypy .
```

# Copilot Project

## BMAD Workflow

BMAD (Brian's Make And Deploy) is set up for this project to streamline development tasks.

### Available Commands

```bash
# List all available tasks
poetry run python bmad-run.py --list

# Run specific tasks
poetry run python bmad-run.py test          # Run all tests
poetry run python bmad-run.py test-backend  # Run only backend tests
poetry run python bmad-run.py dev           # Start development environment
poetry run python bmad-run.py dev-backend   # Start only backend server
poetry run python bmad-run.py dev-frontend  # Start only frontend server
poetry run python bmad-run.py deploy        # Deploy with Docker Compose
poetry run python bmad-run.py lint          # Run linting
poetry run python bmad-run.py format        # Format code
poetry run python bmad-run.py clean         # Clean cache files
poetry run python bmad-run.py install-deps  # Install dependencies
poetry run python bmad-run.py build         # Build project
```

### Quick Start

1. **Install dependencies:**
   ```bash
   poetry run python bmad-run.py install-deps
   ```

2. **Start development environment:**
   ```bash
   poetry run python bmad-run.py dev
   ```

3. **Run tests:**
   ```bash
   poetry run python bmad-run.py test
   ```

### Configuration

BMAD tasks are defined in `bmad.yaml`. You can modify this file to add new tasks or change existing ones.
