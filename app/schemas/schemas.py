from pydantic import BaseModel
from typing import Optional


class InputPayload(BaseModel):
    user_id: str
    content: str
    session_id: Optional[str] = None
    source: Optional[str] = "api"
