from fastapi import APIRouter
from app.services.redis_client import ping_redis

router = APIRouter()


@router.get("/")
async def health_check():
    return {"status": "ok"}


@router.get("/redis")
async def redis_status():
    return {"redis_alive": ping_redis()}
