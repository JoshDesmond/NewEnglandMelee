#!/bin/bash
set -e

# TODO share variables with parent scripts
PROJECT_DIR=~/code/NewEnglandMelee
STRAPI_DIR=$PROJECT_DIR/strapi

echo "=== Deploying Strapi CMS ==="

# Stop services to free up memory
echo "Stopping services..."
sudo systemctl stop nginx
sudo systemctl stop strapi

# Clear system caches
echo "Clearing system caches..."
sudo sync && sudo sysctl vm.drop_caches=3

cd $STRAPI_DIR

# Update dependencies and build
echo "Installing dependencies..."
npm ci --only=production

echo "Building Strapi..."
npm run build

# Start the services
echo "Starting services..."
sudo systemctl start strapi
sudo systemctl enable strapi
sudo systemctl start nginx

# Check if Strapi started successfully
sleep 5
if sudo systemctl is-active --quiet strapi; then
    echo "✅ Strapi deployed successfully"
else
    echo "❌ Strapi failed to start"
    sudo journalctl -u strapi --lines=20
fi
