from abc import ABC, abstractmethod
from typing import Any, Dict, Optional, Union
from logging import Logger
from app.core.logging.logger import setup_logger
import re


class BaseAgent(ABC):
    """
    Abstracte basisagent. Elke specifieke agent (zoals ProjectAgent of ContentAgent)
    moet deze klasse erven en de run() methode implementeren.
    """

    @staticmethod
    def camel_to_snake(name: str) -> str:
        s1 = re.sub("(.)([A-Z][a-z]+)", r"\1_\2", name)
        return re.sub("([a-z0-9])([A-Z])", r"\1_\2", s1).lower()

    @property
    def agent_name(self) -> str:
        """
        Bepaalt de agent naam op basis van de class naam.
        Consistent met registry: eindigt altijd op '_agent'.
        """
        name = self.camel_to_snake(self.__class__.__name__)
        if not name.endswith("_agent"):
            name += "_agent"
        return name

    def __init__(
        self,
        input_data: Dict[str, Any],
        tenant_id: str = "default",
        tools: Optional[Dict[str, Any]] = None,
        logger: Optional[Logger] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ):
        self.input_data = input_data
        self.tenant_id = tenant_id
        self.output_data: Dict[str, Any] = {}
        self.tools = tools or {}
        self.logger = logger or setup_logger(self.__class__.__name__)
        self.metadata = metadata or {}

    @abstractmethod
    def run(self) -> Union[Dict[str, Any], None]:
        """
        Voert de hoofdlogica van de agent uit.
        Deze methode moet worden geïmplementeerd door subklassen.
        """
        pass

    def __call__(self) -> Dict[str, Any]:
        """
        Maakt het mogelijk om de agent als functie aan te roepen.
        """
        result = self.run()
        return {
            "success": True,
            "handled": True if result else False,
            "data": result,
            "agent_name": self.agent_name,
        }

    def fallback(self) -> Dict[str, Any]:
        """
        Fallback logica voor wanneer run() geen bruikbare actie vindt.
        Retourneert standaard een agent_name 'fallback_agent' voor consistentie met tests.
        """
        self.logger.warning(f"[Fallback] Geen geldige actie voor {self.input_data}")
        return {
            "success": True,
            "handled": False,
            "agent_name": "fallback_agent",
            "message": "Geen geldige actie gevonden voor deze taak.",
            "input_data": self.input_data,
        }


class FallbackAgent(BaseAgent):
    def run(self) -> Dict[str, Any]:
        return self.fallback()
