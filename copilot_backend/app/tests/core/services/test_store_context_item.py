import pytest
from unittest.mock import patch
from app.core.services.store_context_item import store_context_item
from app.models.schemas.context_item import ContextItem


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_success(mock_logger, mock_get_supabase):
    mock_supabase_instance = mock_get_supabase.return_value
    mock_supabase_instance.table.return_value.insert.return_value.execute.return_value = {
        "data": [{"id": 1}],
        "success": True,
    }

    test_data = {
        "user_id": "test-user",
        "content": "Unit test item",
        "memory_type": "short_term",
    }

    context_item = ContextItem(**test_data)

    result = store_context_item(context_item)

    mock_supabase_instance.table.assert_called_once_with("context_items")
    mock_supabase_instance.table.return_value.insert.assert_called_once()
    called_data = mock_supabase_instance.table.return_value.insert.call_args[0][0]
    assert isinstance(called_data, list)
    inserted_item = called_data[0]

    # Check velden
    assert inserted_item["user_id"] == "test-user"
    assert inserted_item["content"] == "Unit test item"
    assert inserted_item["memory_type"] == "short_term"
    assert "created_at" in inserted_item
    assert inserted_item["source"] == "api"

    mock_logger.info.assert_called()
    assert result["success"] is True
    assert result["data"] == [{"id": 1}]
    assert "succesvol opgeslagen" in result["message"]


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_error(mock_logger, mock_get_supabase):
    mock_supabase_instance = mock_get_supabase.return_value
    mock_supabase_instance.table.return_value.insert.return_value.execute.side_effect = Exception(
        "DB error"
    )

    test_data = {"user_id": "x", "content": "...", "memory_type": "short_term"}

    context_item = ContextItem(**test_data)

    with pytest.raises(Exception, match="DB error"):
        store_context_item(context_item)
    mock_logger.error.assert_called()


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_calls_supabase(mock_logger, mock_get_supabase):
    mock_supabase = mock_get_supabase.return_value
    mock_table = mock_supabase.table.return_value
    mock_insert = mock_table.insert.return_value
    mock_execute = mock_insert.execute.return_value
    mock_execute.data = [{"id": 99}]

    test_data = {
        "user_id": "test-user",
        "content": "Test call chain",
        "memory_type": "short_term",
    }
    context_item = ContextItem(**test_data)
    store_context_item(context_item)


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_inserts_list(mock_logger, mock_get_supabase):
    mock_supabase = mock_get_supabase.return_value
    mock_table = mock_supabase.table.return_value
    mock_insert = mock_table.insert.return_value
    mock_insert.execute.return_value = {"data": [{"id": 123}]}

    test_data = {
        "user_id": "test-user",
        "content": "Test list insert",
        "memory_type": "short_term",
    }
    context_item = ContextItem(**test_data)
    store_context_item(context_item)

    called_data = mock_table.insert.call_args[0][0]
    assert isinstance(called_data, list)
    assert called_data[0]["user_id"] == "test-user"

    @patch("app.core.services.store_context_item.get_supabase")
    @patch("app.core.services.store_context_item.logger")
    def test_store_context_item_logs_success(mock_logger, mock_get_supabase):
        mock_supabase = mock_get_supabase.return_value
        mock_table = mock_supabase.table.return_value
        mock_insert = mock_table.insert.return_value
        mock_insert.execute.return_value = {"data": [{"id": 321}]}

    test_data = {
        "user_id": "test-user",
        "content": "Test logging",
        "memory_type": "short_term",
    }

    context_item = ContextItem(**test_data)
    store_context_item(context_item)

    mock_logger.info.assert_called()
    assert "succesvol opgeslagen" in str(mock_logger.info.call_args[0][0])


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_logs_error(mock_logger, mock_get_supabase):
    mock_supabase = mock_get_supabase.return_value
    mock_table = mock_supabase.table.return_value
    mock_insert = mock_table.insert.return_value
    mock_insert.execute.side_effect = Exception("DB failure")

    test_data = {
        "user_id": "test-user",
        "content": "Test error logging",
        "memory_type": "short_term",
    }

    context_item = ContextItem(**test_data)

    with pytest.raises(Exception, match="DB failure"):
        store_context_item(context_item)

    mock_logger.error.assert_called()


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_calls_supabase(mock_logger, mock_get_supabase):
    mock_supabase = mock_get_supabase.return_value
    mock_table = mock_supabase.table.return_value
    mock_insert = mock_table.insert.return_value
    mock_execute = mock_insert.execute.return_value
    mock_execute.data = [{"id": 99}]

    test_data = {
        "user_id": "test-user",
        "content": "Test call chain",
        "memory_type": "short_term",
    }

    context_item = ContextItem(**test_data)
    store_context_item(context_item)

    mock_supabase.table.assert_called_once_with("context_items")
    mock_table.insert.assert_called_once()
    mock_insert.execute.assert_called_once()


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_inserts_list(mock_logger, mock_get_supabase):
    mock_supabase = mock_get_supabase.return_value
    mock_table = mock_supabase.table.return_value
    mock_insert = mock_table.insert.return_value
    mock_insert.execute.return_value = {"data": [{"id": 123}]}

    test_data = {
        "user_id": "test-user",
        "content": "Test list insert",
        "memory_type": "short_term",
    }

    context_item = ContextItem(**test_data)
    store_context_item(context_item)

    called_data = mock_table.insert.call_args[0][0]
    assert isinstance(called_data, list)
    assert called_data[0]["user_id"] == "test-user"


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_logs_success(mock_logger, mock_get_supabase):
    mock_supabase = mock_get_supabase.return_value
    mock_table = mock_supabase.table.return_value
    mock_insert = mock_table.insert.return_value
    mock_insert.execute.return_value = {"data": [{"id": 321}]}

    test_data = {
        "user_id": "test-user",
        "content": "Test logging",
        "memory_type": "short_term",
    }

    context_item = ContextItem(**test_data)
    store_context_item(context_item)

    mock_logger.info.assert_called()
    assert "succesvol opgeslagen" in str(mock_logger.info.call_args[0][0])


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_logs_error(mock_logger, mock_get_supabase):
    mock_supabase = mock_get_supabase.return_value
    mock_table = mock_supabase.table.return_value
    mock_insert = mock_table.insert.return_value
    mock_insert.execute.side_effect = Exception("DB failure")

    test_data = {
        "user_id": "test-user",
        "content": "Test error logging",
        "memory_type": "short_term",
    }

    context_item = ContextItem(**test_data)

    with pytest.raises(Exception, match="DB failure"):
        store_context_item(context_item)

    mock_logger.error.assert_called()
