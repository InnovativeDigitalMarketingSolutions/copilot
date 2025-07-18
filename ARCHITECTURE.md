# 🧠 CoPilot AI Business Suite — Architecture Overview

This document describes the high-level architecture, responsibilities, and core design decisions behind the CoPilot AI Business Suite. It supplements the technical project structure found in `README.md`.

---

## 🚀 Purpose

CoPilot is a modular, AI-first **Autonomous Business Operating System (BOS)**. Unlike traditional SaaS, CoPilot's AI-agents can autonomously execute business processes, not just support them. The target audience are freelancers and small teams. It combines intelligent automation, agent-based execution, and seamless integration with internal and third-party tools.
- Deeper autonomy for business execution
- A calmer, asynchronous UX approach (no “ghost hands”)
- Human-in-the-loop optionality for overrides and governance

---

## 🛡️ Security & Autonomy Framework

CoPilot includes layers of control to ensure:

### Transparency

- **Task Monitor (Command Center)** for action tracking.
- **Agent Protocol Layer (APL)** returns:
  - Action description
  - Reasoning
  - Confidence/risk score
- Use `importance_score` for summarizing logs.

### Real-time Control

- **Pause/Override API**: Agents can be paused/stopped dynamically.
- Users manage workflows via the Task Monitor UI.
- **Fallback Queue** for rollback actions.

### Autonomy Boundaries

- **Policy Layer**:
  - Budget limits (e.g., max invoice)
  - Legal gates (e.g., human review for contracts)
  - Customer interaction policies (e.g., opt-in required)

### Data Privacy & BYO-GPT Control

- BYO-GPT runs per tenant in sandboxes.
- **Explicit Consent Enforcement** for outbound calls with sensitive data.
- **Context Filtering Layer** in `model_router.py` for outbound data control.

### Fail-safe Behavior

- **Fallback & Validation Layer** (Pydantic/JSON Schema)
- **Rollback Mechanisms** via Redis & Supabase snapshots
- **Circuit Breaker Pattern** for repeated failures

### Auditability

- **TraceID per workflow & action**
- **Reproducibility Layer**: log input, context, model version, output

## 🏗️ Layered Architecture

The backend is composed of the following core layers:

### 1. Input Layer
- Accepts input from Slack, 3rd party triggers, or (future) WebUI.
- Routes input via API endpoints defined in `routes/`.

### 2. Dispatcher Layer
- Core logic in `core/dispatcher/`.
- Determines which agent or domain handles each task.
- Supports confidence scoring and fallback model routing via `model_router.py`.
- In future: supports external GPT profiles via Bring Your Own GPT (BYO-GPT).

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
- Includes tagging, feedback, memory type classification, and `importance_score` for future compression.

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

## 🔧 Architectural Considerations

| Component | Action Needed |
|-----------|---------------|
| **MCP Dispatcher** | Bi-directional event routing |
| **State Observer Layer** | Track external SaaS state changes |
| **Unified Connector Framework** | Handle Slack, ClickUp, MailerLite etc uniformly |
| **Agent Protocol Layer (APL)** | Standardize agent responses across LLMs |
| **OAuth & Security** | Manage tenant-specific integrations securely |
| **Task Monitor UI** | Manage and visualize workflows asynchronously |

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
  "importance_score": 0.8,
  "source": "slack",
  "confidence": 0.92,
  "created_at": "...",
  "updated_at": "..."
}
```

---

## 🧠 Prompting Architecture

Each agent inherits from a `BaseAgent`, which defines:

- `build_prompt(context, task) -> str`
- `run(task, context) -> AgentResponse`
- Optional: `select_tool()`, `rate_output()`, `inject_memory()`

---

## 🔐 Multi-Tenancy & Auth

- JWT-based user & tenant identification via `core/auth.py`
- Every context item, memory, and action is tenant-scoped

---

## 🤖 Strategy: Autonomous Business Agents

CoPilot envisions domain-specific autonomous agents:

| Business Function | Agent |
|------------------|-------|
| Lead Generation & Marketing | MarketingAgent, SocialMediaAgent |
| CRM & Sales | SalesAgent, CRMAgent |
| Project Management | ProjectAgent |
| Delivery & Fulfillment | DeliveryAgent |
| Customer Service | SupportAgent |

These agents coordinate via the MCP dispatcher and operate in workflows with human-override optionality.

## 🧪 Bring Your Own GPT (BYO-GPT) FUTURE! Now Multi LLM Router (LLM Orchestration Layer)

- Tenants may register their own GPT endpoints (OpenAI, Claude, Mistral, etc.)
- Registered in a `gpt_profiles` table with metadata and API info
- Dispatcher dynamically invokes user-defined models when configured
- Scoped to tenant sandbox and tied to specific agent/task roles

## 🧠 Multi-LLM Router (LLM Orchestration Layer)
Doel:
De Multi-LLM Router is de centrale module in de dispatcher die alle AI model-aanroepen beheert.
In plaats van BYO-GPT keys te beheren per gebruiker, draait CoPilot zelf de routing naar verschillende LLM-aanbieders.

Ondersteunde modellen (stapsgewijs uit te breiden):
OpenAI (GPT-4, GPT-4o, GPT-3.5)

Claude (Anthropic)

Gemini (Google)

DeepSeek / Gork (optioneel in latere fases)

Grok (xAI)

Llama3 (future: eigen hosting)
---

## 🌍 Growth Path & Phases

### Phase 1: Orchestration over Existing Tools

- CoPilot acts as a coordinator over ClickUp, Notion, MailerLite etc.
- BYO-GPT support for early adopters
- AI is the strategic decision layer, tools handle execution

### Phase 2: Own Modules + Semantic Memory

- Develop proprietary modules (e.g., invoicing, KPI tracking)
- Users can choose between CoPilot modules or external SaaS plugins
- Introduce ContextCompressor for memory summarization
- Use LangGraph/CrewAI for agent chaining

### Phase 3: Own LLM Hosting

- Fine-tuned LLM (e.g., LLaMA3) for full control
- Private data fine-tuning per tenant
- Self-hosted inference infrastructure

---

### Phase 1: MVP - Orchestration & Integration

- OS-like frontend (prompt UI + task monitor)
- SaaS integrations (ClickUp, Slack, MailerLite, etc.)
- Marketplace for app and BYO-GPT connections
- Real-time sync via MCP event handling

### Phase 2: Semi-autonomous Agents

- Agents execute tasks, users can supervise or override
- Start with lead-to-project flow: Marketing → Sales → CRM → Project Mgmt

### Phase 3: Full Autonomy

- End-to-end business workflows fully autonomous
- Exception handling & human-in-the-loop remain optional

----

## 🔄 Real-Time Sync & Event Handling

To support real-time sync with SaaS tools:

| Function                 | Implementation |
|-------------------------|----------------|
| Event-driven integration| Webhooks, event triggers, polling fallback |
| State sync & diffs       | Agents monitor changes since last sync |
| Two-way binding          | Read/write flow between CoPilot and SaaS |
| Conflict resolution      | Handle manual changes by users externally |

The MCP Dispatcher becomes a **bi-directional event router** and requires:

- State observer layer (e.g., Supabase triggers, Redis pub/sub)
- Unified connector framework for all 3rd-party services
- Permission & OAuth management per tenant

---

## 🧩 Agent Protocol Layer (APL) – Model Consistency

To ensure consistent behavior across LLMs (GPT, Claude, Grok, etc.): 

- Define a standard **JSON output schema** (actions, explanations, results)
- Use **Role & Behavior Injection** via prompt preambles
- Implement **Fallback & Validation Layer** with schema checks (Pydantic/JSON Schema)
- Use APL as a middle layer to decouple CoPilot logic from specific LLM behaviors

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
- 🔄 Event-driven SaaS orchestration support
- 🤖 Autonomous agent execution with optional human-in-the-loop


## 🖥️ Frontend Vision: OS-like User Experience

### Key Components

| Component | Function |
|-----------|----------|
| **Prompt Interface** | Main communication method with agents (text, later speech) |
| **Marketplace & App Store** | Connect SaaS tools, CoPilot modules, or BYO-GPTs |
| **Task Monitor (Command Center)** | - View actions & workflows<br>- Manage running tasks<br>- Access logs and history |
| **Notification System** | Alerts for critical events or decision points |
| **Speech Interface (Future)** | Whisper, Deepgram, or custom ASR integration for voice commands |

### UX Philosophy

| Aspect | Approach |
|---------|----------|
| **Prompt-based control** | Users interact via text or speech |
| **Asynchronous control panel** | Users can monitor tasks but are not overwhelmed with visual updates |
| **Transparency & Control** | Always possible to override or approve agent actions |