# app/agents/registry.py

AGENT_REGISTRY = {}


def register_agent(name):
    def wrapper(cls):
        AGENT_REGISTRY[name] = cls
        return cls

    return wrapper


def get_agent(name):
    return AGENT_REGISTRY.get(name)
