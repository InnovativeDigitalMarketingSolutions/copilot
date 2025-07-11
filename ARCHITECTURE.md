# 🧠 CoPilot AI Business Suite — Architecture Overview

This document describes the high-level architecture, responsibilities, and core design decisions behind the CoPilot AI Business Suite. It supplements the technical project structure found in `README.md`.

---

## 🚀 Purpose

CoPilot is a modular, AI-first platform that functions as a business operating system for freelancers and small teams. It combines intelligent automation, agent-based execution, and seamless integration with internal and third-party tools.

---

## 🏗️ Layered Architecture

The backend is composed of the following core layers:

### 1. Input Layer
- Accepts input from Slack, 3rd party triggers, or (future) WebUI.
- Routes input via API endpoints defined in `routes/`.

### 2. Dispatcher Layer
- Core logic in `core/dispatcher/`.
- Determines which agent or domain handles each task.
- Supports confidence scoring and fallback model routing via `model_router.py`.

### 3. Agent Layer
- Agents (in `agents/`) encapsulate prompting, memory injection, and task execution.
- Each agent has:
  - Prompt logic
  - Tool interface
  - `run()` method

### 4. Domain Layer
- Business logic split per functional domain in `domains/`.
  - Examples: `finance/`, `projects/`, `marketing/`
- Each domain may have workflows, services, and optional sub-agents.

### 5. Memory Layer
- Managed in `memory/` with pgvector + Supabase.
- Stores short-term and long-term memory as structured `context_items`.
- Includes tagging, feedback, and memory type classification.

### 6. Tooling Layer
- Tools live in `tools/`, accessible by agents.
- Includes wrappers for ClickUp, MailerLite, Notion, etc.
- All tool usage is logged, error-handled, and fallback-aware.

### 7. Queue Layer
- Redis Queue system defined in `queues/`.
- Backgrounds slow or retry-prone tasks (e.g., notifications, external calls).

### 8. Observability
- Logging via `core/logging/` (to Supabase or other platforms).
- Supports monitoring AI output, errors, task decisions.

---

## 🧠 Memory Engine Schema

A context item looks like:

```json
{
  "user_id": "uuid",
  "content": "The user asked to plan next week's tasks.",
  "memory_type": "short_term",
  "tags": ["planning", "project"],
  "valid_until": "2025-07-31T00:00:00Z",
  "source": "slack",
  "confidence": 0.92,
  "created_at": "...",
  "updated_at": "..."
}
```

- Used by agents for reasoning, validation, and knowledge reuse.

---

## 🧠 Prompting Architecture

Each agent inherits from a `BaseAgent`, which defines:

- `build_prompt(context, task) -> str`
- `run(task, context) -> AgentResponse`
- Optional: `select_tool()`, `rate_output()`, `inject_memory()`

This allows consistent chaining, fallback logic, and memory alignment.

---

## 🔐 Multi-Tenancy & Auth

- JWT-based user & tenant identification via `core/auth.py`
- Every context item, memory, and action is tenant-scoped

---

## 🌐 Frontend Vision (Future)

- FlutterFlow or WebUI inspired by WarmWind OS
- App marketplace interface for toggling 1st- or 3rd-party integrations

---

## 🧪 Testing & Deployment

- Use `Pytest` for tests in `/tests/`
- Run dev server with:

```bash
poetry install
uvicorn main:app --reload
```

---

## 🧩 Integration Principles

- 🧠 Memory-first AI behavior
- 🔁 Retryable and fallback-safe task design
- ✳️ Modular expansion per domain, agent or tool
- 🔒 Tenant isolation from day 1
