from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.tests.api.test_routes import router as context_test_router


def test_insert_context_item():
    app = FastAPI()
    app.include_router(context_test_router)

    client = TestClient(app)
    response = client.post("/context/test-insert")

    assert response.status_code == 200

    # Verifieer response body
    data = response.json()
    assert data["status"] == "ok"
    assert "data" in data

    # Controleer of de data JSON-serializable is
    inserted_data = data["data"]
    assert isinstance(inserted_data, dict)
    assert "data" in inserted_data
    assert isinstance(inserted_data["data"], list)

    # Controleer of er minimaal één item in zit
    assert len(inserted_data["data"]) > 0
    first_item = inserted_data["data"][0]
    assert "created_at" in first_item
    assert isinstance(first_item["created_at"], str)
    assert "source" in first_item
    assert first_item["source"] == "api"
