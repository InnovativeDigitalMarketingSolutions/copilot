import time
from app.core.services.redis_client import redis_client
from app.core.tasks.memory_tasks import prune_context_items

PRUNE_QUEUE_KEY = "copilot:prune_queue"


def prune_worker_loop():
    while True:
        task = redis_client.brpop(PRUNE_QUEUE_KEY, timeout=5)
        if task:
            print("Running prune task...")
            result = prune_context_items()
            print(result)
        time.sleep(1)
