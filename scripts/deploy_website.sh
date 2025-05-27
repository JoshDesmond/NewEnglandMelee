#!/bin/bash
set -e

# TODO share PROJECT_DIR between scripts
PROJECT_DIR=~/code/NewEnglandMelee
WEB_DIR=/var/www/nem

# Stop services to free up memory
echo "Stopping nginx..."
sudo systemctl stop nginx

# Clear system caches
echo "Clearing system caches..."
sudo sync && sudo sysctl vm.drop_caches=3

cd $PROJECT_DIR

# Build with constrained memory
export NODE_OPTIONS="--max-old-space-size=512"
npm run build

if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo "ERROR: Build failed or produced no files"
    # Make sure to restart nginx even if build fails
    sudo systemctl start nginx
    exit 1
fi

echo "Deploying to $WEB_DIR..."
sudo mkdir -p $WEB_DIR
sudo rm -rf $WEB_DIR/*
sudo cp -R dist/* $WEB_DIR/
sudo chown -R www-data:www-data $WEB_DIR

# Restart nginx
echo "Restarting nginx..."
sudo systemctl start nginx

echo "Website deployment complete!"

