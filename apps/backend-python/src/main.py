import http.client

from fastapi import FastAPI
from starlette.exceptions import HTTPException
from granian import Granian

app = FastAPI()


@app.get("/places")
def places() -> list:
    raise HTTPException(status_code=http.client.NOT_IMPLEMENTED)


@app.post("/place")
def place(request) -> int:
    raise HTTPException(status_code=http.client.NOT_IMPLEMENTED)


@app.delete("/{place_id}")
def delete_place(place_id):
    raise HTTPException(status_code=http.client.NOT_IMPLEMENTED)


@app.get("/{place_id}")
def place_by_id(place_id):
    raise HTTPException(status_code=http.client.NOT_IMPLEMENTED)


@app.put("/places/{place_id}")
def updated_place_by_id(place_id):
    raise HTTPException(status_code=http.client.NOT_IMPLEMENTED)


if __name__ == '__main__':
    Granian(...).serve()
