from app.core.config.settings import settings


def test_env_is_loaded():
    """Controleer of de juiste environment is geladen"""
    assert settings.env in {"development", "production", "staging"}


def test_supabase_settings_present():
    """Controleer of supabase_url en supabase_key aanwezig zijn"""
    assert isinstance(settings.supabase_url, str) and settings.supabase_url != ""
    assert isinstance(settings.supabase_key, str) and settings.supabase_key != ""


def test_redis_url_format():
    """Controleer of redis_url correct is geformatteerd"""
    assert settings.redis_url.startswith("redis://")


def test_log_level_valid():
    """Controleer of het log_level veld een geldige waarde bevat"""
    assert hasattr(settings, "log_level"), "log_level ontbreekt in settings"
    assert settings.log_level in {"DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"}
