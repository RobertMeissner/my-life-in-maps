

run:
	uv run src/app.py

pre-commit:
	uv run pre-commit run -a

pre-commit-manual:
	uv run pre-commit run -a --hook-stage manual

dev:
	granian --interface asgi main:app

health:
	curl -X GET http://localhost:8000/health
