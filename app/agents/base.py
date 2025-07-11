from abc import ABC, abstractmethod
from typing import Any, Dict, Optional, Callable


class BaseAgent(ABC):
    """
    Abstracte basisagent. Elke specifieke agent (zoals ProjectAgent of ContentAgent)
    moet deze klasse erven en de run() methode implementeren.
    """

    def __init__(
        self,
        input_data: Dict[str, Any],
        tenant_id: str = "default",
        tools: Optional[Dict[str, Any]] = None,
        logger: Optional[Callable[[str], None]] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ):
        self.input_data = input_data
        self.tenant_id = tenant_id
        self.output_data: Dict[str, Any] = {}
        self.tools = tools or {}
        self.logger = logger or print
        self.metadata = metadata or {}

    @abstractmethod
    def run(self) -> Dict[str, Any]:
        """
        Voert de hoofdlogica van de agent uit.
        Deze methode moet worden geïmplementeerd door subklassen.
        """
        pass

    def __call__(self) -> Dict[str, Any]:
        """
        Maakt het mogelijk om de agent als functie aan te roepen.
        """
        return self.run()

    def fallback(self) -> Optional[Dict[str, Any]]:
        """
        Optionele fallback logica voor wanneer run() geen bruikbare actie vindt.
        Kan worden overschreven door subklassen.
        """
        self.logger("⚠️ Fallback activated: geen geldige actie gevonden voor input.")
        return {
            "success": False,
            "message": "Geen geldige actie gevonden voor deze taak.",
            "agent_name": self.__class__.__name__.lower(),
        }


class FallbackAgent(BaseAgent):
    def run(self) -> Dict[str, Any]:
        return self.fallback()
