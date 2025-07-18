# ✅ Teststrategie – CoPilot AI Business Suite

## 🎯 Doel
Zorgen voor betrouwbare, veilige en consistente werking van het CoPilot-platform door een robuuste, geautomatiseerde teststrategie die schaalbaar is voor toekomstige uitbreidingen en integraties.

---

## 🧱 Testpiramide

```
          ⬆️ End-to-End Tests (API/UI)
         ⬆️ Integration Tests (Agents, Memory, Tools)
        ⬆️ Service Layer Tests (Domains, Dispatcher)
       ⬆️ Unit Tests (Functions, Classes, Utilities)
      ⬆️ Static Checks & Contract Tests
```

---

## 🧪 Testniveaus en aanpak

### 1. Unit Tests
- Doel: Verifiëren van logica in isolatie.
- Targets:
  - Prompt-logica in agents (`build_prompt`, `run`)
  - Business logica in `domains/`
  - Tool wrappers (`tools/`)
  - Context- en geheugenlogica (`memory/store.py`, `retrieve.py`)
- Tools: `pytest`, `pytest-mock`, `faker`
- Aanpak: Testen per functie/methode, inclusief edge cases en exceptions.

### 2. Integratietests
- Doel: Verifiëren van samenwerking tussen modules.
- Targets:
  - Agent ↔ Memory ↔ Tool interacties
  - Dispatcher-logica met fallback, confidence scoring
  - Domain workflows en services
- Aanpak:
  - Testen met mock Supabase, Redis en externe APIs (ClickUp, Notion)
  - Gebruik `pytest` + `testcontainers` (optioneel)

### 3. End-to-End Tests (API)
- Doel: Valideren van user flows van input tot output.
- Targets:
  - Input via API (`routes/input.py`)
  - Verwerking via dispatcher → agent → tools
  - Output + logging
- Tools: `pytest + httpx` of `Postman/Newman`, evt. `Playwright` (voor toekomstige WebUI)
- Mocking: Externe API's via `responses` of `httpx_mock`

### 4. Contract & Schema Validation
- Doel: Validatie van API schema's, backward compatibility.
- Tools: `Pydantic`, `schemathesis`, Swagger validators
- Targets:
  - `schemas/*.py` (input/task/memory models)
  - Validatie van API responses

### 5. Load & Performance Tests (optioneel bij groei)
- Tools: `Locust`, `k6`, `Artillery`
- Targets:
  - Queue-verwerking bij Redis
  - Reactietijd van AI-agent flows

---

## 🔄 CI/CD Strategie
- Tests draaien via GitHub Actions of GitLab CI:
  - `pytest` met coverage check (90%+ op critical path)
  - Linting met `ruff`, `black`
  - Type checks met `mypy`
  - Swagger/schema checks
- Automatische rollback bij mislukte deploys (via Poetry + Docker rollback)

---

## 📂 Teststructuur

```
copilot_backend/tests/
├── agents/
├── core/
├── domains/
├── memory/
├── tools/
├── routes/
├── test_conftest.py  # fixtures
└── test_config.py    # test settings
```

---

## 📈 Testdekking en Prioriteiten

| Module              | Type         | Prioriteit | Opmerking                         |
|---------------------|--------------|------------|-----------------------------------|
| `core/dispatcher`   | Unit + Int   | 🔴 Hoog     | Cruciaal voor agent routing       |
| `agents/`           | Unit + Int   | 🔴 Hoog     | Prompting, fallback, tools        |
| `memory/`           | Unit         | 🔴 Hoog     | context store/retrieve            |
| `routes/`           | API Tests    | 🟡 Midden   | Input en feedback afhandeling     |
| `tools/`            | Unit         | 🟢 Laag     | Wrappers met fallback-logica      |
| `domains/`          | Int          | 🟡 Midden   | Workflow-logica per domein        |
| `queues/`           | Int + Perf   | 🟡 Midden   | Background processing tests       |
| Swagger/API Schema  | Contract     | 🔴 Hoog     | Validatie voor API compatibiliteit|

---

## 📌 Kwaliteitscriteria
- Code coverage: 90% op `core`, `agents`, `memory`
- Elke pull request vereist:
  - ✅ Groene test runs
  - ✅ Toegevoegde/gewijzigde tests
  - ✅ Geldige Swagger docs
- Failing tests = Blocked merge naar `dev` of `main`

### 🔍 Mocking strategy (Dispatcher & Agents)

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
