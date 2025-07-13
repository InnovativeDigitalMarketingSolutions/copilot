from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ContextItem(BaseModel):
    user_id: str = Field(..., description="Unieke ID van de gebruiker")
    content: str = Field(..., description="De inhoud van het context item")
    session_id: Optional[str] = Field(
        None, description="Sessie-ID indien van toepassing"
    )
    source: str = Field("api", description="Bron van de input, standaard 'api'")
    task: Optional[str] = Field(None, description="Gerelateerde taak of agent")
    tenant_id: str = Field("default", description="Tenant of organisatie-ID")
    metadata: Optional[dict] = Field(default_factory=dict, description="Extra metadata")
    created_at: datetime = Field(
        default_factory=datetime.utcnow, description="Tijdstip van creatie"
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
                "created_at": "2025-07-13T12:00:00Z",
            }
        }
