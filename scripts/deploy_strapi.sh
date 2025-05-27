#!/bin/bash
set -e

# TODO share variables with parent scripts
PROJECT_DIR=~/code/NewEnglandMelee
STRAPI_DIR=$PROJECT_DIR/strapi

echo "=== Deploying Strapi CMS ==="

cd $STRAPI_DIR

# Stop the service first
echo "Stopping Strapi service..."
sudo systemctl stop strapi

# Update dependencies and build
echo "Installing dependencies..."
npm ci --only=production

echo "Building Strapi..."
npm run build

# Start the service
echo "Starting Strapi service..."
sudo systemctl start strapi
sudo systemctl enable strapi

# Check if it started successfully
sleep 5
if sudo systemctl is-active --quiet strapi; then
    echo "✅ Strapi deployed successfully"
else
    echo "❌ Strapi failed to start"
    sudo journalctl -u strapi --lines=20
fi
