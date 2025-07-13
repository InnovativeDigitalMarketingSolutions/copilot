import logging
import sys


def setup_logger(name: str, force: bool = False) -> logging.Logger:
    logger = logging.getLogger(name)

    if (
        force or not logger.hasHandlers()
    ):  # voorkom dubbele handlers of forceer vernieuwing
        logger.setLevel(logging.DEBUG)

        # Verwijder bestaande handlers als force=True
        if force:
            for handler in logger.handlers[:]:
                logger.removeHandler(handler)

        handler = logging.StreamHandler(sys.stdout)
        formatter = logging.Formatter(
            "[%(asctime)s] [%(levelname)s] [%(name)s] - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    return logger
