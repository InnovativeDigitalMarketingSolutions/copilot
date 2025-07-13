# app/agents/project_agent.py
from app.agents.base import BaseAgent
from app.agents.registry import register_agent


@register_agent("project_agent")
class ProjectAgent(BaseAgent):
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
            "success": True,
            "message": f"Project aangemaakt met titel: {title}",
            "agent_name": self.__class__.__name__.lower(),
        }

        self.logger.info(f"[{self.__class__.__name__}] Output: {result}")
        return result
