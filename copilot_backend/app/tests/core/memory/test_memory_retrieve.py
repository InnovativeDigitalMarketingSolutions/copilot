from unittest.mock import patch, MagicMock
from app.core.memory.retrieve_memory import retrieve_from_memory


@patch("app.core.memory.retrieve.redis_client")
def test_retrieve_from_memory_calls_redis(mock_redis_client):
    mock_get = MagicMock()
    mock_redis_client.get = mock_get

    key = "test-key"
    expected_value = '{"foo": "bar"}'
    mock_get.return_value = expected_value

    result = retrieve_from_memory(key)

    mock_get.assert_called_once_with(key)
    assert result == {"foo": "bar"}  # Controleer of JSON correct is gedeserialiseerd
