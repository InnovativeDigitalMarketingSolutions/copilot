import time


def dispatch_to_llm(payload, tenant_id):
    """
    Multi-LLM Router: Dispatches the prompt to the correct LLM backend.
    Supports OpenAI and Claude as initial models.
    Handles fallback, token usage simulation, and latency logging.
    """
    model_choice = payload.get("model", "openai")
    prompt = payload.get("prompt", "No prompt provided.")
    task_type = payload.get("task", "generic_task")
    start_time = time.time()

    try:
        # Simulated LLM response (replace with real API calls in production)
        if model_choice == "openai":
            response = {"model": "openai", "response": f"OpenAI response to: {prompt}"}
        elif model_choice == "claude":
            response = {"model": "claude", "response": f"Claude response to: {prompt}"}
        elif model_choice == "gemini":
            response = {"model": "gemini", "response": f"Gemini response to: {prompt}"}
        elif model_choice == "gork":
            response = {"model": "gork", "response": f"Gork response to: {prompt}"}
        else:
            response = {
                "model": "default",
                "response": f"Default LLM response to: {prompt}",
            }

        success = True

    except Exception as e:
        # Fallback mechanism on error
        response = {"model": "fallback", "response": f"Error fallback: {str(e)}"}
        success = False

    latency = round(time.time() - start_time, 4)

    # Simulate token usage
    input_tokens = len(prompt.split())
    output_tokens = len(response["response"].split())

    # Normalize output to AgentResponse format
    return {
        "agent_name": f"llm_{model_choice}",
        "handled": success,
        "output": response["response"],
        "model_used": response["model"],
        "latency": latency,
        "token_usage": {"input_tokens": input_tokens, "output_tokens": output_tokens},
        "task_type": task_type,
        "tenant_id": tenant_id,
    }
