from app.core.services.supabase_client import SupabaseClient
from app.core.logging.logger import setup_logger
from app.models.schemas.context_item import ContextItem
from datetime import datetime

logger = setup_logger(__name__)
supabase = SupabaseClient(logger=logger)


def store_context_item(data: ContextItem):
    data_dict = data.dict()
    data_dict.setdefault("created_at", datetime.utcnow().isoformat())
    data_dict.setdefault("source", "default")

    try:
        result = supabase.insert("context_items", data_dict)
        logger.info("Context item opgeslagen")
        return result
    except Exception as e:
        logger.error(f"Fout bij opslaan context item: {e}")
        raise
