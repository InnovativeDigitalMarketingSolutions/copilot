from app.services.supabase_client import supabase
from app.models.schemas import InputPayload


def store_context_item(payload: InputPayload):
    response = (
        supabase.table("context_items")
        .insert(
            {
                "user_id": payload.user_id,
                "content": payload.content,
                "session_id": payload.session_id,
                "source": payload.source,
            }
        )
        .execute()
    )
    return response.data
