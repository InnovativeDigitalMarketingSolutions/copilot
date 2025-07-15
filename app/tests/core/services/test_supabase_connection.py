import pytest
from unittest.mock import MagicMock
from app.core.services.supabase_client import SupabaseClient


@pytest.fixture
def mock_supabase_client():
    mock = MagicMock()
    mock_table = MagicMock()

    # Chaining mocks voor CRUD
    mock_table.select.return_value = mock_table
    mock_table.insert.return_value = mock_table
    mock_table.update.return_value = mock_table
    mock_table.delete.return_value = mock_table
    mock_table.eq.return_value = mock_table
    mock_table.rpc.return_value = mock_table
    mock_table.execute.return_value = {"data": "result"}

    # Voor .rpc direct op client
    mock.rpc.return_value.execute.return_value = {"data": "result"}

    mock.table.return_value = mock_table

    return mock


@pytest.fixture
def mock_logger():
    return MagicMock()


def test_supabase_connection():
    client = SupabaseClient()
    assert client.client is not None
