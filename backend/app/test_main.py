from fastapi.testclient import TestClient
from .main import app

client = TestClient(app)


def test_register():
    json = {
    }
    response = client.post('/auth/register', json=json)
    assert response.status_code == 422


def test_read_main():
    response = client.get("/users/me")
    assert response.status_code == 401

