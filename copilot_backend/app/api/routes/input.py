from fastapi import APIRouter
from app.models.schemas.schemas import InputPayload
from app.core.services.store_context_item import store_context_item
from fastapi import Request
from app.core.dispatcher.dispatcher import dispatch_task
import logging

logger = logging.getLogger(__name__)


router = APIRouter()


@router.post("/input")
def handle_input(payload: InputPayload):
    payload_dict = payload.dict()
    logger.info(f"Ontvangen input: {payload_dict}")
    result = store_context_item(payload_dict)
    logger.info(f"Opslagresultaat: {result}")
    return {"status": "ok", "data": result}


@router.post("/api/v1/dispatch")
async def handle_dispatch(request: Request):
    payload = await request.json()
    result = dispatch_task(payload)
    return {"success": True, "data": result}
