import logging
import sys


def setup_logger(name: str, force: bool = False) -> logging.Logger:
    logger = logging.getLogger(name)

    if force:
        for handler in logger.handlers[:]:
            logger.removeHandler(handler)

    if not any(isinstance(h, logging.StreamHandler) for h in logger.handlers):
        handler = logging.StreamHandler(sys.stdout)
        formatter = logging.Formatter(
            "[%(asctime)s] [%(levelname)s] [%(name)s] - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    logger.setLevel(logging.DEBUG)
    return logger
