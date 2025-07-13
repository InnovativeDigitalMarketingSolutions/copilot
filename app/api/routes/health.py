from fastapi import APIRouter
from fastapi import status
from app.core.services.redis_client import redis_client

router = APIRouter()


@router.get("/")
async def health_check():
    return {"status": "ok"}


@router.get("/redis", tags=["Health"], status_code=status.HTTP_200_OK)
def redis_health_check():
    try:
        pong = redis_client.ping()
        if pong:
            return {"success": True, "message": "Redis connection healthy"}
    except Exception as e:
        return {"success": False, "message": f"Redis health check failed: {str(e)}"}
