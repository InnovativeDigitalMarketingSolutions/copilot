import datetime
from app.core.services.supabase_client import get_supabase

# Simuleer prijzen per model in USD per 1K tokens (voor interne mapping naar credits)
MODEL_PRICING = {
    "openai": 0.002,  # $0.002 per 1K tokens
    "claude": 0.003,
    "gemini": 0.0018,
    "gork": 0.0025,
    "default": 0.0025,
}

# Mapping van USD naar CoPilot credits (bijvoorbeeld 1 USD = 100 credits)
USD_TO_CREDITS = 100


def calculate_cost(model_name: str, input_tokens: int, output_tokens: int) -> dict:
    """
    Berekent kosten in USD en credits op basis van tokengebruik.
    """
    price_per_1k = MODEL_PRICING.get(model_name, MODEL_PRICING["default"])
    total_tokens = input_tokens + output_tokens
    cost_usd = (total_tokens / 1000) * price_per_1k
    cost_credits = round(cost_usd * USD_TO_CREDITS)
    return {
        "model": model_name,
        "total_tokens": total_tokens,
        "cost_usd": round(cost_usd, 5),
        "cost_credits": cost_credits,
    }


def log_llm_usage(
    tenant_id: str,
    task_type: str,
    model_name: str,
    input_tokens: int,
    output_tokens: int,
    latency: float,
) -> dict:
    """
    Schrijft de LLM call naar Supabase tabel 'llm_usage_logs'.
    """
    cost_info = calculate_cost(model_name, input_tokens, output_tokens)

    log_entry = {
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "tenant_id": tenant_id,
        "task_type": task_type,
        "model": model_name,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "latency": latency,
        "cost_usd": cost_info["cost_usd"],
        "cost_credits": cost_info["cost_credits"],
    }

    supabase = get_supabase()
    try:
        supabase.table("llm_usage_logs").insert(log_entry).execute()
    except Exception as e:
        print(f"[LLM_USAGE] Logging failed: {str(e)}")

    return log_entry
