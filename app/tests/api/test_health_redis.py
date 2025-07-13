from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_redis_health_check_success():
    response = client.get("/health/redis")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert "Redis connection healthy" in json_data["message"]
