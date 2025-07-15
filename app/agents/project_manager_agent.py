# app/agents/project_agent.py
from app.agents.base import BaseAgent
from app.agents.registry import register_agent


@register_agent("project_manager_agent")
class ProjectManagerAgent(BaseAgent):
    def __init__(self, input_data, tenant_id="default", tools=None, logger=None):
        super().__init__(input_data, tenant_id, tools, logger)

    def run(self):
        self.logger.info(
            f"[{self.__class__.__name__}] Start run met input: {self.input_data}"
        )

        title = self.input_data.get("title")
        if not title:
            raise ValueError("Missing required field: 'title'")

        result = {
            "handled": True,
            "message": f"Project aangemaakt met titel: {title}",
        }

        self.logger.info(f"[{self.__class__.__name__}] Output: {result}")
        return result
