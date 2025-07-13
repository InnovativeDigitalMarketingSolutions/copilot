from pydantic_settings import BaseSettings
from functools import lru_cache
from pydantic import Field
from typing import Literal
from enum import Enum
import os
from app.core.logging.logger import setup_logger
from typing import ClassVar


class Settings(BaseSettings):
    env: str = Field("development", env="ENV")
    api_prefix: str = "/api"
    supabase_url: str = Field(..., env="SUPABASE_URL")
    supabase_key: str = Field(..., env="SUPABASE_KEY")
    redis_url: str = Field("redis://localhost:6379", env="REDIS_URL")
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = Field(
        "INFO", env="LOG_LEVEL"
    )
    logger: ClassVar = setup_logger(__name__)

    class Config:
        env_file = os.getenv("ENV_FILE", ".env")


class LogLevel(str, Enum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
assert settings.supabase_url, "Missing SUPABASE_URL in environment"
assert settings.supabase_key, "Missing SUPABASE_KEY in environment"
