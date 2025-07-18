import os
import pytest
from unittest.mock import MagicMock, patch, ANY
from app.core.services.supabase_client import SupabaseClient


@pytest.fixture
def mock_logger():
    return MagicMock()


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


@patch("app.core.services.supabase_client.create_client")
class TestSupabaseClient:

    def test_init_with_env_vars(
        self, mock_create_client, mock_logger, mock_supabase_client
    ):
        os.environ["SUPABASE_URL"] = "http://example.supabase.co"
        os.environ["SUPABASE_KEY"] = "fake-key"
        mock_create_client.return_value = mock_supabase_client

        client = SupabaseClient(logger=mock_logger)

        mock_logger.info.assert_called_with("SupabaseClient initialized.")

    def test_init_raises_without_env_vars(
        self, monkeypatch, mock_create_client, mock_logger
    ):
        from app.core.services.supabase_client import SupabaseClient

        monkeypatch.delenv("SUPABASE_URL", raising=False)
        monkeypatch.delenv("SUPABASE_KEY", raising=False)

        with pytest.raises(ValueError, match="Missing Supabase credentials"):
            SupabaseClient(logger=mock_logger)

    def test_insert_calls_correct_chain(
        self, mock_create_client, mock_logger, mock_supabase_client
    ):
        mock_create_client.return_value = mock_supabase_client
        mock_supabase_client.table.return_value.insert.return_value.execute.return_value = {
            "data": "result"
        }
        os.environ["SUPABASE_URL"] = "http://example.supabase.co"
        os.environ["SUPABASE_KEY"] = "fake-key"
        client = SupabaseClient(logger=mock_logger)

        result = client.insert("test_table", {"name": "John"})

        mock_supabase_client.table.assert_called_with("test_table")

        mock_supabase_client.table.return_value.insert.assert_called_with(
            [{"name": "John", "created_at": ANY, "source": "default"}]
        )
        mock_supabase_client.table.return_value.execute.assert_called()
        assert result == {"data": "result"}

    def test_select_with_filters(
        self, mock_create_client, mock_logger, mock_supabase_client
    ):
        mock_create_client.return_value = mock_supabase_client
        mock_supabase_client.table.return_value.select.return_value.execute.return_value = {
            "data": "result"
        }
        os.environ["SUPABASE_URL"] = "http://example.supabase.co"
        os.environ["SUPABASE_KEY"] = "fake-key"
        client = SupabaseClient(logger=mock_logger)

        filters = {"active": True}
        client.select("test_table", filters)

        mock_supabase_client.table.return_value.select.assert_called_with("*")
        mock_supabase_client.table.return_value.eq.assert_called_with("active", True)

    def test_select_without_filters(
        self, mock_create_client, mock_logger, mock_supabase_client
    ):
        mock_create_client.return_value = mock_supabase_client
        mock_supabase_client.table.return_value.select.return_value.execute.return_value = {
            "data": "result"
        }
        os.environ["SUPABASE_URL"] = "http://example.supabase.co"
        os.environ["SUPABASE_KEY"] = "fake-key"
        client = SupabaseClient(logger=mock_logger)

        client.select("test_table", filters=None)

        mock_supabase_client.table.return_value.select.assert_called_with("*")
        mock_supabase_client.table.return_value.eq.assert_not_called()

    def test_update_with_filters_and_data(
        self, mock_create_client, mock_logger, mock_supabase_client
    ):
        mock_create_client.return_value = mock_supabase_client
        mock_supabase_client.table.return_value.update.return_value.execute.return_value = {
            "data": "result"
        }
        os.environ["SUPABASE_URL"] = "http://example.supabase.co"
        os.environ["SUPABASE_KEY"] = "fake-key"
        client = SupabaseClient(logger=mock_logger)

        client.update("test_table", {"id": 1}, {"name": "Updated"})

        mock_supabase_client.table.return_value.update.assert_called_with(
            {"name": "Updated"}
        )
        mock_supabase_client.table.return_value.eq.assert_called_with("id", 1)

    def test_update_with_empty_data(
        self, mock_create_client, mock_logger, mock_supabase_client
    ):
        mock_create_client.return_value = mock_supabase_client
        mock_supabase_client.table.return_value.delete.return_value.execute.return_value = {
            "data": "result"
        }
        os.environ["SUPABASE_URL"] = "http://example.supabase.co"
        os.environ["SUPABASE_KEY"] = "fake-key"
        client = SupabaseClient(logger=mock_logger)

        with pytest.raises(ValueError, match="Update data cannot be empty"):
            client.update("test_table", {"id": 1}, {})

    def test_delete_with_filters(
        self, mock_create_client, mock_logger, mock_supabase_client
    ):
        mock_create_client.return_value = mock_supabase_client
        mock_supabase_client.rpc.return_value.execute.return_value = {"data": "result"}
        os.environ["SUPABASE_URL"] = "http://example.supabase.co"
        os.environ["SUPABASE_KEY"] = "fake-key"
        client = SupabaseClient(logger=mock_logger)

        client.delete("test_table", {"id": 1})

        mock_supabase_client.table.return_value.delete.assert_called()
        mock_supabase_client.table.return_value.eq.assert_called_with("id", 1)

    def test_delete_without_filters_warns(
        self, mock_create_client, mock_logger, mock_supabase_client
    ):
        mock_create_client.return_value = mock_supabase_client
        mock_supabase_client.rpc.return_value.execute.return_value = {"data": "result"}
        os.environ["SUPABASE_URL"] = "http://example.supabase.co"
        os.environ["SUPABASE_KEY"] = "fake-key"
        client = SupabaseClient(logger=mock_logger)

        result = client.delete("test_table", {})

        mock_logger.warning.assert_called_with(
            "Delete called without filters — operation skipped."
        )
        assert result is None

    def test_call_rpc_with_params(
        self, mock_create_client, mock_logger, mock_supabase_client
    ):
        mock_create_client.return_value = mock_supabase_client
        os.environ["SUPABASE_URL"] = "http://example.supabase.co"
        os.environ["SUPABASE_KEY"] = "fake-key"
        client = SupabaseClient(logger=mock_logger)

        client.call_rpc("my_function", {"key": "value"})

        mock_supabase_client.rpc.assert_called_with("my_function", {"key": "value"})

    def test_call_rpc_with_none_params(
        self, mock_create_client, mock_logger, mock_supabase_client
    ):
        mock_create_client.return_value = mock_supabase_client
        os.environ["SUPABASE_URL"] = "http://example.supabase.co"
        os.environ["SUPABASE_KEY"] = "fake-key"
        client = SupabaseClient(logger=mock_logger)

        client.call_rpc("my_function")

        mock_supabase_client.rpc.assert_called_with("my_function", None)
