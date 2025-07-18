# app/agents/fallback_agent.py

from app.agents.base import FallbackAgent
from app.agents.registry import register_agent


@register_agent("fallback_agent")
class RegisteredFallbackAgent(FallbackAgent):
    """
    Fallback agent die als standaard agent wordt geregistreerd.
    Wordt gebruikt als er geen geschikte agent wordt gevonden.
    """

    def run(self):
        self.logger(
            f"[{self.__class__.__name__}] Activated fallback logic for: {self.input_data}"
        )

        return {
            "success": False,
            "agent_name": "fallback_agent",
            "message": "Geen geldige actie gevonden voor deze taak.",
            "input_data": self.input_data,
        }
