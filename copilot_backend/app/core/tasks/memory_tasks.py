# /app/core/tasks/memory_tasks.py

from app.core.services.redis_client import redis_client
import requests

PRUNE_QUEUE_KEY = "copilot:prune_queue"


def enqueue_prune_task():
    redis_client.lpush(PRUNE_QUEUE_KEY, "run_prune")


def run_prune():
    # Call Supabase REST endpoint of gebruik direct SQL als je PostgREST gebruikt
    url = f"{settings.supabase_url}/rpc/prune_context_items"
    headers = {
        "apikey": settings.supabase_key,
        "Authorization": f"Bearer {settings.supabase_key}",
    }
    response = requests.post(url, headers=headers)
    return response.json()
