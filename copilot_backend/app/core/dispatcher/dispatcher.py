import traceback
from app.agents.registry import get_agent
from typing import Dict, Any
from app.core.llm_router import dispatch_to_llm


def dispatch_task(payload: Dict[str, Any], logger=None) -> Dict[str, Any]:
    """
    Receives a task payload and dispatches to the correct agent.
    """
    task_type = payload.get("task")
    tenant_id = payload.get("tenant_id", "default")
    if logger:
        logger.info(f"Received task: {task_type} for tenant: {tenant_id}")
    if not task_type:
        raise ValueError("Missing 'task' field in payload")

    metadata = payload.get("metadata", {})  # noqa: F841
    tools = payload.get("tools", {})
    if not isinstance(tools, dict):
        raise ValueError("'tools' must be a dictionary")

    # 🔐 [BYO-GPT placeholder] If a gpt_profile_id is provided, intercept here | Inactief omdat we momenteel geen BYO gebruiken.
    # if payload.get("gpt_profile_id"):
    #    if logger:
    #        logger.warning("BYO-GPT requested but not implemented.")
    #    return {"success": False, "error": "BYO-GPT not yet supported."}

    agent_cls = get_agent(task_type)

    if not agent_cls:
        if logger:
            logger.info(
                f"No agent found for task '{task_type}' in tenant '{tenant_id}'. Using LLM router fallback."
            )
        llm_response = dispatch_to_llm(payload, tenant_id)
        return {
            "success": True,
            "data": llm_response,
        }

    agent = agent_cls(
        input_data=payload,
        tenant_id=tenant_id,
        tools=tools,
        logger=logger,
        metadata=metadata,
    )

    try:
        result = agent()
    except Exception as e:
        if logger:
            logger.error(f"Agent execution failed: {e}")
            logger.debug(traceback.format_exc())
        return {"success": False, "error": str(e)}

    return {
        "success": True,
        "data": result,
    }
