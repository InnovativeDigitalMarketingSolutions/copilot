from fastapi import APIRouter
from app.models.schemas import InputPayload
from app.services.store_context_item import store_context_item
from fastapi import Request
from app.core.dispatcher.dispatcher import dispatch_task


router = APIRouter()


@router.post("/input")
def handle_input(payload: InputPayload):
    result = store_context_item(payload)
    return {"status": "ok", "data": result}


@router.post("/api/v1/dispatch")
async def handle_dispatch(request: Request):
    payload = await request.json()
    result = dispatch_task(payload)
    return {"success": True, "data": result}
