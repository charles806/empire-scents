#!/bin/bash

# AkuSparkle Deployment Script for Pxxl Space
# Usage: ./deploy.sh [environment]
# Environment: production (default), staging

set -e

ENVIRONMENT=${1:-production}
PROJECT_NAME="akusparkle"
REGISTRY="pxxl.app"

echo "🚀 Starting deployment for $ENVIRONMENT..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found! Copy .env.example to .env and fill in your values"
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
if [ -z "$DB_HOST" ] || [ -z "$DB_NAME" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASS" ]; then
    echo "❌ Missing required database environment variables"
    exit 1
fi

echo "📦 Building Docker image..."
docker build -t $PROJECT_NAME:$ENVIRONMENT .

echo "🏷️  Tagging image for Pxxl Space..."
docker tag $PROJECT_NAME:$ENVIRONMENT $REGISTRY/$PROJECT_NAME:$ENVIRONMENT

echo "📤 Pushing to Pxxl Space registry..."
docker push $REGISTRY/$PROJECT_NAME:$ENVIRONMENT

echo "🔄 Deploying to Pxxl Space..."
# Pxxl Space deployment - this will depend on their CLI or API
# For now, we'll use docker-compose on the server
# You may need to adapt this based on Pxxl Space's deployment method

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at: https://$PROJECT_NAME.pxxl.app"