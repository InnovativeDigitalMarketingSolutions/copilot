import pytest
from datetime import datetime
from unittest.mock import patch, MagicMock
from app.core.services.store_context_item import store_context_item


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_happy_path(mock_logger, mock_get_supabase):
    mock_supabase = mock_get_supabase.return_value
    mock_table = MagicMock()
    mock_insert = MagicMock()
    mock_execute = MagicMock(return_value={"data": [{"id": 1}]})

    mock_supabase.table.return_value = mock_table
    mock_table.insert.return_value = mock_insert
    mock_insert.execute.return_value = {"data": [{"id": 1}]}

    test_data = {
        "user_id": "test-user",
        "content": "Test content",
        "memory_type": "short_term",
    }

    result = store_context_item(test_data)

    mock_supabase.table.assert_called_with("context_items")
    mock_table.insert.assert_called_once()
    mock_insert.execute.assert_called_once()

    inserted_items = mock_table.insert.call_args[0][0]
    assert isinstance(inserted_items, list)
    inserted_item = inserted_items[0]
    assert inserted_item["user_id"] == "test-user"
    assert inserted_item["content"] == "Test content"
    assert inserted_item["memory_type"] == "short_term"
    assert inserted_item["source"] == "api"
    datetime.fromisoformat(inserted_item["created_at"])

    mock_logger.info.assert_called_with(
        "Context item succesvol opgeslagen voor user_id=test-user en source=api"
    )
    assert result["success"] is True
    assert result["data"] == [{"id": 1}]
    assert "succesvol opgeslagen" in result["message"]


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_invalid_input(mock_logger, mock_get_supabase):
    invalid_data = {
        "user_id": "test-user",
        "content": set(["onmogelijk"]),
        "memory_type": "short_term",
    }

    with pytest.raises(ValueError) as exc_info:
        store_context_item(invalid_data)

    assert "Invalid data for ContextItem" in str(exc_info.value)
    mock_logger.error.assert_called()


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_adds_required_fields(mock_logger, mock_get_supabase):
    mock_supabase = mock_get_supabase.return_value
    mock_table = MagicMock()
    mock_insert = MagicMock()
    mock_execute = MagicMock(return_value={"data": [{"id": 2}]})

    mock_supabase.table.return_value = mock_table
    mock_table.insert.return_value = mock_insert
    mock_insert.execute.return_value = {"data": [{"id": 2}]}

    data_without_fields = {
        "user_id": "test-user",
        "content": "Test zonder velden",
        "memory_type": "short_term",
    }

    result = store_context_item(data_without_fields)

    mock_supabase.table.assert_called_with("context_items")
    mock_table.insert.assert_called_once()
    mock_insert.execute.assert_called_once()

    inserted_items = mock_table.insert.call_args[0][0]
    inserted_item = inserted_items[0]

    assert "created_at" in inserted_item
    assert "source" in inserted_item
    assert inserted_item["source"] == "api"
    datetime.fromisoformat(inserted_item["created_at"])

    assert inserted_item["user_id"] == "test-user"
    assert inserted_item["content"] == "Test zonder velden"
    assert inserted_item["memory_type"] == "short_term"

    mock_logger.info.assert_called_with(
        "Context item succesvol opgeslagen voor user_id=test-user en source=api"
    )
    assert result["success"] is True
    assert result["data"] == [{"id": 2}]
    assert "succesvol opgeslagen" in result["message"]


@patch("app.core.services.store_context_item.get_supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_supabase_interaction(mock_logger, mock_get_supabase):
    mock_supabase = mock_get_supabase.return_value
    mock_table = MagicMock()
    mock_insert = MagicMock()
    mock_execute = MagicMock(return_value={"data": [{"id": 3}]})

    mock_supabase.table.return_value = mock_table
    mock_table.insert.return_value = mock_insert
    mock_insert.execute.return_value = {"data": [{"id": 3}]}

    test_data = {
        "user_id": "test-user",
        "content": "Supabase interactie test",
        "memory_type": "short_term",
    }

    result = store_context_item(test_data)

    mock_supabase.table.assert_called_with("context_items")
    mock_table.insert.assert_called_once()
    mock_insert.execute.assert_called_once()

    inserted_items = mock_table.insert.call_args[0][0]
    inserted_item = inserted_items[0]

    assert inserted_item["user_id"] == "test-user"
    assert inserted_item["content"] == "Supabase interactie test"
    assert inserted_item["memory_type"] == "short_term"

    assert result["success"] is True
    assert result["data"] == [{"id": 3}]
    assert "succesvol opgeslagen" in result["message"]
