# app/agents/agent_loader.py
import importlib
import pkgutil
import app.agents


def load_all_agents():
    for _, name, _ in pkgutil.iter_modules(app.agents.__path__):
        if name not in ("base", "registry", "agent_loader"):
            importlib.import_module(f"app.agents.{name}")
