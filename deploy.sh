#!/bin/bash

# AkuSparkle Deployment Script for Hostless.cloud
# Usage: ./deploy.sh [environment]
# Environment: production (default), staging

set -e

ENVIRONMENT=${1:-production}
PROJECT_NAME="akusparkle"

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

echo "✅ Docker image built successfully!"
echo ""
echo "📋 Next steps for Hostless.cloud deployment:"
echo "1. Push this repository to GitHub/GitLab"
echo "2. Connect your repository to Hostless.cloud dashboard"
echo "3. Hostless will automatically detect the Dockerfile"
echo "4. Set the following environment variables in Hostless dashboard:"
echo "   - DB_HOST=$DB_HOST"
echo "   - DB_NAME=$DB_NAME"
echo "   - DB_USER=$DB_USER"
echo "   - DB_PASS=$DB_PASS"
echo "   - APP_ENV=production"
echo "   - PORT=8080 (set automatically by Hostless)"
echo "5. Configure health check path: /health.php"
echo "6. Deploy!"
echo ""
echo "🌐 Your app will be available at: https://<your-app>.hostless.run"
echo ""
echo "For local testing with Docker Compose:"
echo "  docker-compose -f docker-compose.prod.yml up -d"