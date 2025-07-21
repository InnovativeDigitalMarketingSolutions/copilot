# DEVOPS_WORKFLOW_WITH_BMAD.md

## BMAD Setup Complete! 🎉

BMAD is now configured and ready to use in your copilot project.

## Available Commands:

### Development
- `./bmad dev` → Start full development environment (frontend + backend)
- `./bmad dev-backend` → Start only backend development server
- `./bmad dev-frontend` → Start only frontend development server

### Testing
- `./bmad test` → Run all tests for the copilot project
- `./bmad test-backend` → Run only backend tests
- `./bmad test-frontend` → Run frontend tests (if available)

### Deployment
- `./bmad deploy` → Deploy the application using Docker Compose
- `./bmad deploy-backend` → Deploy only the backend

### Code Quality
- `./bmad lint` → Run linting and code formatting
- `./bmad format` → Format code with black and ruff
- `./bmad clean` → Clean up temporary files and caches

### Project Management
- `./bmad install-deps` → Install all dependencies
- `./bmad build` → Build the entire project

## Quick Start:

1. **List all available tasks:**
   ```bash
   ./bmad --list
   ```

2. **Install dependencies:**
   ```bash
   ./bmad install-deps
   ```

3. **Start development:**
   ```bash
   ./bmad dev
   ```

4. **Run tests:**
   ```bash
   ./bmad test
   ```

## Configuration:

- BMAD tasks are defined in `bmad.yaml` in the project root
- You can modify this file to add new tasks or change existing ones
- The BMAD runner script is `bmad-run.py`
- Use `./bmad` as a convenient alias for `poetry run python bmad-run.py`

## Project Structure:

- Frontend: `/copilot_frontend`
- Backend: `/copilot_backend`
- BMAD config: `/bmad.yaml`
- BMAD runner: `/bmad-run.py`
- BMAD alias: `/bmad`