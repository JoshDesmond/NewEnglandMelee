#!/bin/bash
set -e

# TODO share variables with parent scripts
PROJECT_DIR=~/code/NewEnglandMelee
STRAPI_DIR=$PROJECT_DIR/strapi

echo "=== Deploying Strapi CMS ==="

# Check if PM2 is installed, install if not
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found, installing globally..."
    sudo npm install -g pm2
fi

# Clear system caches
echo "Clearing system caches..."
sudo sync && sudo sysctl vm.drop_caches=3

cd $STRAPI_DIR

# Update dependencies and build
echo "Installing dependencies..."
npm ci --only=production

echo "Building Strapi with increased memory allocation..."
NODE_OPTIONS="--max-old-space-size=1228" npm run build

# Deploy with PM2
echo "Starting/restarting Strapi with PM2..."
pm2 delete new-england-melee-strapi || true  # Remove existing process if it exists
pm2 start npm --name "new-england-melee-strapi" -- start --time
pm2 save  # Save the process list for system reboot

# Verify deployment
sleep 5
if pm2 list | grep -q "new-england-melee-strapi.*online"; then
    echo "✅ Strapi deployed successfully"
else
    echo "❌ Strapi failed to start"
    pm2 logs new-england-melee-strapi --lines 20
fi

echo "Strapi deployment complete!"
echo "Strapi logs can be viewed with: pm2 logs new-england-melee-strapi"
echo "Strapi status can be checked with: pm2 status"
