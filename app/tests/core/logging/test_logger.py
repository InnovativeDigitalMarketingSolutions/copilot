import logging
import pytest
from app.core.logging.logger import setup_logger


def test_logger_is_instance_of_logging_logger():
    logger = setup_logger("test_logger")
    assert isinstance(logger, logging.Logger)


def test_logger_has_at_least_one_handler():
    name = "test_logger_unique"
    logger = logging.getLogger(name)
    logger.handlers.clear()  # 💡 reset
    logger = setup_logger(name)
    assert logger.hasHandlers()
    assert any(isinstance(h, logging.StreamHandler) for h in logger.handlers)


def test_logger_uses_correct_formatter():
    name = "test_logger_unique_2"
    logging.getLogger(name).handlers.clear()
    logger = setup_logger(name)
    expected_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

    for handler in logger.handlers:
        formatter = handler.formatter
        if formatter:
            assert expected_format in formatter._fmt
            break
    else:
        pytest.fail("Geen formatter gevonden met het verwachte format")


def test_logger_emits_output(caplog):
    logger = setup_logger("test_logger_output")

    with caplog.at_level(logging.INFO):
        logger.info("Test log message")

    # Controleer of het logbericht is vastgelegd
    assert "Test log message" in caplog.text
    assert "test_logger_output" in caplog.text
    assert "INFO" in caplog.text
