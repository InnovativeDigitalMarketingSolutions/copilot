import redis
from app.core.config.settings import settings

redis_client = redis.Redis.from_url(
    settings.redis_url, decode_responses=True, socket_timeout=5
)


def ping_redis() -> bool:
    try:
        return redis_client.ping()
    except redis.exceptions.ConnectionError:
        return False
