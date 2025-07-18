from fastapi import APIRouter
from app.core.services.store_context_item import store_context_item
from datetime import datetime, timezone

router = APIRouter()


@router.post("/context/test-insert")
def test_insert_context_item():
    test_item = {
        "user_id": "test-user",
        "content": "Test item via tester",
        "memory_type": "short_term",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "source": "test",
    }
    result = store_context_item(test_item)
    return {"status": "ok", "data": result}
