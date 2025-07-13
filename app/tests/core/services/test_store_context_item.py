import pytest
from unittest.mock import patch
from app.core.services.store_context_item import store_context_item


@patch("app.core.services.store_context_item.supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_success(mock_logger, mock_supabase):
    mock_supabase.insert.return_value = {"id": 123, "status": "ok"}

    test_data = {
        "user_id": "test-user",
        "content": "Unit test item",
        "memory_type": "short_term",
    }

    result = store_context_item(test_data)

    mock_supabase.insert.assert_called_once_with("context_items", test_data)
    mock_logger.info.assert_called_with("Context item opgeslagen")
    assert result == {"id": 123, "status": "ok"}


@patch("app.core.services.store_context_item.supabase")
@patch("app.core.services.store_context_item.logger")
def test_store_context_item_error(mock_logger, mock_supabase):
    mock_supabase.insert.side_effect = Exception("DB error")

    with pytest.raises(Exception, match="DB error"):
        store_context_item(
            {"user_id": "x", "content": "...", "memory_type": "short_term"}
        )

    mock_logger.error.assert_called()
