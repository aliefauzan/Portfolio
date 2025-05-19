#!/bin/bash

# Run the development Docker container with volume mounting for hot reloading
# This script starts a development container with the current directory mounted

# Stop any existing container with the same name
docker stop portfolio-dev 2>/dev/null || true
docker rm portfolio-dev 2>/dev/null || true

# Build the development image if it doesn't exist
if [[ "$(docker images -q portfolio-website:dev 2> /dev/null)" == "" ]]; then
  echo "Building development Docker image..."
  ./docker-build.sh dev
fi

# Run the container with the current directory mounted
echo "Starting development container..."
docker run -it --name portfolio-dev \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -v /app/.next \
  portfolio-website:dev

echo "Development server is running at http://localhost:3000"
