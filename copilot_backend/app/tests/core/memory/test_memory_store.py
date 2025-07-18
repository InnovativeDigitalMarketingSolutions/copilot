from unittest.mock import patch, MagicMock
from app.core.memory.store_memory import store_to_memory


@patch("app.core.memory.store.redis_client")
def test_store_to_memory_calls_redis(mock_redis_client):
    mock_set = MagicMock()
    mock_redis_client.set = mock_set

    key = "test-key"
    value = {"foo": "bar"}

    store_to_memory(key, value)

    mock_set.assert_called_once()
    args, kwargs = mock_set.call_args
    assert args[0] == key
    assert isinstance(args[1], str)  # Wordt als JSON string opgeslagen
