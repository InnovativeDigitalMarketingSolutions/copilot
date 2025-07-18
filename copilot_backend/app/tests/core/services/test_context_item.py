import pytest
from pydantic import ValidationError
from datetime import datetime
from app.models.schemas.context_item import ContextItem


def test_context_item_creation():
    item = ContextItem(user_id="test-user", content="Test content", task="short_term")

    assert item.user_id == "test-user"
    assert item.content == "Test content"
    assert item.task == "short_term"
    assert isinstance(item.created_at, datetime)
    assert item.source == "default"


def test_context_item_invalid_task():
    with pytest.raises(ValidationError) as exc_info:
        ContextItem(user_id="test-user", content="Test content", task="invalid_type")
    assert "task" in str(exc_info.value)


def test_context_item_missing_fields():
    with pytest.raises(ValidationError) as exc_info:
        ContextItem(content="Test content", task="short_term")
    assert "user_id" in str(exc_info.value)


def test_context_item_metadata_defaults():
    item = ContextItem(user_id="test-user", content="Test content", task="short_term")
    assert isinstance(item.metadata, dict)
