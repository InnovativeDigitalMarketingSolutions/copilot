import logging
from typing import Dict, Type, Optional
from app.agents.base import BaseAgent

AGENT_REGISTRY: Dict[str, Type[BaseAgent]] = {}


logger = logging.getLogger(__name__)


def register_agent(name: Optional[str] = None):
    def wrapper(cls: Type[BaseAgent]):
        agent_name = name or cls.__name__.replace("Agent", "").lower() + "_agent"
        AGENT_REGISTRY[agent_name] = cls
        logger.info(f"✅ Agent '{agent_name}' geregistreerd als {cls.__name__}")
        return cls

    return wrapper


def get_agent(name: str) -> Optional[Type[BaseAgent]]:
    agent = AGENT_REGISTRY.get(name)
    if not agent:
        logger.warning(f"⚠️ Agent '{name}' niet gevonden in registry.")
    return agent


def list_agents() -> Dict[str, str]:
    return {name: cls.__name__ for name, cls in AGENT_REGISTRY.items()}
