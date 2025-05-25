#!/bin/bash
set -e

PROJECT_DIR=~/code/NewEnglandMelee
WEB_DIR=/var/www/nem

echo "=== Deploying NEM Website ==="

cd $PROJECT_DIR
git pull
npm install
export NODE_OPTIONS="--max-old-space-size=512"
npm run build

if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
  echo "ERROR: Build failed or produced no files"
  exit 1
fi

echo "Deploying to $WEB_DIR..."
sudo mkdir -p $WEB_DIR
sudo rm -rf $WEB_DIR/*
sudo cp -R dist/* $WEB_DIR/
sudo chown -R www-data:www-data $WEB_DIR

echo "Deployment complete!"

