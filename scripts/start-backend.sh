source ../.env

if ["$BACKEND_TYPE" = "python"]; then
  cd apps/backend-python && uv make start
else
  pnpm
