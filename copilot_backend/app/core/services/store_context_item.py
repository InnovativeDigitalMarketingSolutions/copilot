# Supabase verwacht een lijst van records, zelfs als het er maar één is
from typing import Union, Dict, Any, Optional
from app.core.services.supabase_client import SupabaseClient
from app.core.logging.logger import setup_logger
from datetime import timezone, datetime
from functools import lru_cache

logger = setup_logger(__name__)


@lru_cache
def get_supabase():
    return SupabaseClient(logger=logger)


def store_context_item(
    data: Union["ContextItem", Dict[str, Any]],
    supabase_client: Optional[SupabaseClient] = None,
) -> Dict[str, Any]:
    from app.models.schemas.context_item import ContextItem

    # Zorg voor consistente input: ContextItem of dict
    if isinstance(data, ContextItem):
        logger.debug("Ontvangen ContextItem instantie, converteren naar dict.")
        data_dict = data.model_dump()
    elif isinstance(data, dict):
        try:
            data_dict = ContextItem(**data).model_dump()
        except Exception as e:
            logger.error(f"Validatiefout bij context item input: {e}")
            raise ValueError(f"Invalid data for ContextItem: {e}")
    else:
        logger.error(
            "store_context_item ontving een ongeldige input (geen dict of ContextItem)"
        )
        raise TypeError("Input moet een ContextItem of dict zijn")

    if isinstance(data_dict.get("created_at"), datetime):
        data_dict["created_at"] = data_dict["created_at"].isoformat()
    else:
        data_dict.setdefault("created_at", datetime.now(timezone.utc).isoformat())

    data_dict["source"] = "api"
    data_dict.setdefault("memory_type", data_dict.get("memory_type", "short_term"))

    if "metadata" in data_dict and data_dict["metadata"] is None:
        data_dict.pop("metadata")

    try:
        supabase = supabase_client or get_supabase()
        result = supabase.table("context_items").insert([data_dict]).execute()
        logger.debug(f"Supabase insert resultaat: {result}")
        logger.info(
            f"Context item succesvol opgeslagen voor user_id={data_dict.get('user_id')} en source={data_dict.get('source')}"
        )
        return {
            "success": True,
            "data": result["data"],
            "message": f"Context item succesvol opgeslagen voor user_id={data_dict.get('user_id')} en source=api",
        }

    except Exception as e:
        logger.error(f"Fout bij opslaan context item: {e}")
        raise
