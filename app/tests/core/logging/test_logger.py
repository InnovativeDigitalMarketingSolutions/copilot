import logging
import pytest
from app.core.logging.logger import setup_logger


def test_logger_is_instance_of_logging_logger():
    logger = setup_logger("test_logger")
    assert isinstance(logger, logging.Logger)


def test_logger_has_at_least_one_handler():
    name = "test_logger_unique"
    logger = logging.getLogger(name)
    logger.handlers.clear()

    logger = setup_logger(name)

    assert logger.hasHandlers(), "Logger heeft geen handlers"

    handlers = logger.handlers
    stream_handlers = [h for h in handlers if isinstance(h, logging.StreamHandler)]
    assert stream_handlers, "Geen StreamHandler gevonden"

    expected_format = "[%(asctime)s] [%(levelname)s] [%(name)s] - %(message)s"

    for handler in stream_handlers:
        formatter = handler.formatter
        assert formatter is not None, "Handler heeft geen formatter"
        assert (
            formatter._fmt == expected_format
        ), f"Formatter wijkt af: {formatter._fmt}"


def test_logger_uses_correct_formatter():
    name = "test_logger_unique_2"
    logging.getLogger(name).handlers.clear()
    logger = setup_logger(name)
    expected_format = "[%(asctime)s] [%(levelname)s] [%(name)s] - %(message)s"

    for handler in logger.handlers:
        formatter = handler.formatter
        if formatter:
            assert (
                formatter._fmt == expected_format
            ), f"Formatter wijkt af: {formatter._fmt}"
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
