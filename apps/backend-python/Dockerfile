# Use the official Python 3.10 image
FROM python:3.12-slim

# Set environment variables for Python and uv
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install uv
RUN pip install uv

# Copy dependency files first for better Docker layer caching
COPY pyproject.toml ./

# Install Python dependencies using uv
RUN uv pip install --system --no-cache-dir .

# Copy the rest of the application
COPY . .

# Add src directory to Python path
ENV PYTHONPATH="/app/src"

# Create a non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8000


CMD ["granian", "--interface", "asgi", "main:app", "--host", "0.0.0.0", "--port", "8000"]
