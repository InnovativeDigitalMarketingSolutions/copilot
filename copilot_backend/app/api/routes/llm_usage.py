from fastapi import APIRouter
from app.core.supabase_client import get_supabase

router = APIRouter()
supabase = get_supabase()


@router.get("/llm-usage")
def get_llm_usage(tenant_id: str, limit: int = 50) -> dict:
    """
    API endpoint: Haalt de laatste LLM usage logs op voor het frontend dashboard.
    """
    response = (
        supabase.table("llm_usage_logs")
        .select("*")
        .eq("tenant_id", tenant_id)
        .order("timestamp", desc=True)
        .limit(limit)
        .execute()
    )

    return {"data": response.data}
