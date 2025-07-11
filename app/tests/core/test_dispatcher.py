import pytest
from unittest.mock import patch, MagicMock
from app.core.dispatcher.dispatcher import dispatch_task
from app.tests.mocks.agents import MockAgent


@pytest.fixture
def example_task():
    return {
        "agent": "project_agent",
        "task_type": "create_project",
        "title": "Nieuwe website",
    }


@patch("app.core.dispatcher.dispatcher.get_agent")
def test_dispatcher_routes_task_correctly(mock_get_agent, example_task):
    mock_get_agent.return_value = MockAgent

    task_payload = {
        "task": "create_project",
        "title": "Nieuwe website",
        "tenant_id": "test-tenant",
    }

    result = dispatch_task(task_payload)

    assert result["success"] is True
    assert "data" in result
    assert result["data"]["agent_name"] == "project_manager"
    mock_get_agent.assert_called_once_with("create_project")


@patch("app.core.dispatcher.dispatcher.get_agent")
def test_dispatcher_handles_missing_task_field(mock_get_agent):
    task_payload = {
        "title": "Nieuwe website",
        "tenant_id": "test-tenant",
        # 'task' field ontbreekt
    }

    with pytest.raises(ValueError, match="Missing 'task' field in payload"):
        dispatch_task(task_payload)

    mock_get_agent.assert_not_called()


def test_dispatcher_logs_with_custom_logger():
    # Arrange
    mock_logger = MagicMock()

    class MockAgent:
        def __init__(self, input_data, tenant_id=None, tools=None, logger=None, metadata=None):
            self.logger = logger or MagicMock()
            self.metadata = metadata or {}

        def run(self):
            self.logger.info("Running task")
            return {"agent_name": "project_agent", "result": "ok"}

        def __call__(self):
            return self.run()

    task_payload = {
        "task": "create_project",
        "tenant_id": "test-tenant",
        "title": "Nieuwe website",
    }

    with patch("app.core.dispatcher.dispatcher.get_agent", return_value=MockAgent):
        result = dispatch_task(task_payload)

        assert result["success"] is True
        assert result["data"]["agent_name"] == "project_agent"
    # Dummy agent class met logger check
    class MockAgent:
        def __init__(self, input_data, tenant_id=None, tools=None, logger=None, metadata=None):
            self.logger = logger or MagicMock()
            self.metadata = metadata or {}

        def run(self):
            self.logger.info("Running task")
            return {"agent_name": "project_agent", "result": "ok"}

        def __call__(self):
            return self.run()

    task_payload = {
        "task": "create_project",
        "tenant_id": "test-tenant",
        "title": "Nieuwe website",
    }

    with patch("app.core.dispatcher.dispatcher.get_agent", return_value=MockAgent):
        # Act
        result = dispatch_task(task_payload)

        # Assert
        assert result["success"] is True
        assert result["data"]["agent_name"] == "project_agent"


@patch("app.core.dispatcher.dispatcher.get_agent", return_value=None)
def test_dispatcher_uses_fallback_when_no_agent(mock_get_agent):
    from app.core.dispatcher.dispatcher import dispatch_task

    task_payload = {
        "task": "onbekende_taak",
        "tenant_id": "tenant123",
        "title": "Fictieve taak",
    }

    result = dispatch_task(task_payload)

    # The dispatcher itself returns success: True, but the fallback data has success: False
    assert result["success"] is True
    assert result["data"]["success"] is False
    assert result["data"]["agent_name"] == "fallbackagent"
    assert "Geen geldige actie gevonden" in result["data"]["message"]
