from fastapi import APIRouter
from app.core.services.store_context_item import store_context_item

router = APIRouter()


@router.post("/context/test-insert")
def test_insert_context_item():
    test_item = {
        "user_id": "test-user",
        "content": "Test item via tester",
        "memory_type": "short_term",
    }
    result = store_context_item(test_item)
    return {"success": True, "data": result}
