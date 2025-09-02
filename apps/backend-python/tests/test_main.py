import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)


def test_get_places_returns_empty_list():
    """Test that GET /places returns an empty list initially"""
    response = client.get("/places")
    assert response.status_code == 200
    assert response.json() == []