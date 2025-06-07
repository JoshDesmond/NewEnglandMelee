#!/bin/bash
set -e

PROJECT_DIR=~/code/NewEnglandMelee
SERVER_DIR=$PROJECT_DIR/server

echo "=== Deploying API Server ==="

# Check if PM2 is installed, install if not
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found, installing globally..."
    sudo npm install -g pm2
fi

# Clear system caches
echo "Clearing system caches..."
sudo sync && sudo sysctl vm.drop_caches=3

cd $SERVER_DIR

# Install dependencies
echo "Installing dependencies..."
npm ci --only=production

# Build the server
echo "Building server..."
npm run build

if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo "ERROR: Build failed or produced no files"
    exit 1
fi

# Deploy with PM2
echo "Starting/restarting server with PM2..."
pm2 delete new-england-melee-api || true  # Remove existing process if it exists
pm2 start dist/index.js --name "new-england-melee-api" --time
pm2 save  # Save the process list for system reboot

# Verify deployment
sleep 5
if pm2 list | grep -q "new-england-melee-api.*online"; then
    echo "✅ API Server deployed successfully"
else
    echo "❌ API Server failed to start"
    pm2 logs new-england-melee-api --lines 20
fi

echo "API Server deployment complete!"
echo "Server logs can be viewed with: pm2 logs new-england-melee-api"
echo "Server status can be checked with: pm2 status" 