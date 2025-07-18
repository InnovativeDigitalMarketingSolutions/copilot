from pydantic import BaseModel, Field
from typing import Optional


class InputPayload(BaseModel):
    user_id: str = Field(..., description="Unieke ID van de gebruiker")
    content: str = Field(..., description="De inhoud van de gebruikersinput")
    session_id: Optional[str] = Field(
        None, description="Optionele sessie-ID voor conversatiebeheer"
    )
    source: Optional[str] = Field(
        "api", description="Bron van de input, standaard 'api'"
    )
    task: Optional[str] = Field(
        None, description="Taaktype voor dispatching, bijv. 'project_agent'"
    )
    tenant_id: Optional[str] = Field("default", description="Tenant of organisatie-ID")
    metadata: Optional[dict] = Field(
        default_factory=dict, description="Eventuele aanvullende metadata"
    )

    class Config:
        schema_extra = {
            "example": {
                "user_id": "user_123",
                "content": "Maak een nieuw project aan met titel 'Q3 Planning'",
                "session_id": "session_456",
                "source": "api",
                "task": "project_agent",
                "tenant_id": "default",
                "metadata": {"priority": "high"},
            }
        }
