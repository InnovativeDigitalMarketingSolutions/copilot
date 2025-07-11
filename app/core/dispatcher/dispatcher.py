from app.agents.registry import get_agent
from typing import Dict, Any
from app.agents.base import FallbackAgent


def dispatch_task(payload: Dict[str, Any], logger=None) -> Dict[str, Any]:
    """
    Receives a task payload and dispatches to the correct agent.
    """
    task_type = payload.get("task")
    if not task_type:
        raise ValueError("Missing 'task' field in payload")

    tenant_id = payload.get("tenant_id", "default")
    metadata = payload.get("metadata", {})  # noqa: F841
    tools = payload.get("tools", {})

    agent_cls = get_agent(task_type)

    if not agent_cls:
        agent = FallbackAgent(
            input_data=payload,
            tenant_id=tenant_id,
            tools=tools,
            logger=logger,
            metadata=metadata,
        )
        result = agent()
        return {
            "success": True,
            "data": result,
        }

    agent = agent_cls(
        input_data=payload,
        tenant_id=tenant_id,
        tools=tools,
        logger=logger,
        metadata=metadata,
    )

    result = agent()

    return {
        "success": True,
        "data": result,
    }
