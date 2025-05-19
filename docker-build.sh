#!/bin/bash

# Build the Docker image for development or production
# Usage: ./docker-build.sh [dev|prod]

ENV=${1:-prod}

if [ "$ENV" = "dev" ]; then
  echo "Building development Docker image..."
  docker build --target development -t portfolio-website:dev .
  
  echo "Docker image built successfully!"
  echo "To run the development container, use: docker run -p 3000:3000 -v $(pwd):/app portfolio-website:dev"
else
  echo "Building production Docker image..."
  docker build --target production -t portfolio-website:latest .
  
  echo "Docker image built successfully!"
  echo "To run the production container, use: docker run -p 3000:3000 portfolio-website:latest"
fi
