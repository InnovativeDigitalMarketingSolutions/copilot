import pytest
from unittest.mock import MagicMock
from app.core.services.supabase_client import SupabaseClient


@pytest.fixture
def mock_logger():
    return MagicMock()


def test_supabase_connection():
    client = SupabaseClient()
    assert client.client is not None
