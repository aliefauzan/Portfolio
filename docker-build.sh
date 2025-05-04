#!/bin/bash

# Build the Docker image
docker build -t portfolio-website:latest .

# Run the Docker container
# docker run -p 3000:3000 portfolio-website:latest

echo "Docker image built successfully!"
echo "To run the container, use: docker run -p 3000:3000 portfolio-website:latest"
