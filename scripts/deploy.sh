#!/bin/bash
set -e

echo "=== Starting Full Deployment ==="

# TODO automatically verify project directory
PROJECT_DIR=~/code/NewEnglandMelee
cd $PROJECT_DIR

# Update first
git pull
npm install

# Update/Install in Strapi project folder
cd strapi
npm install
cd ..

echo "=== Deploying API Server ==="
./scripts/deploy_api_server.sh

# Change back to project root before running next script
cd $PROJECT_DIR

echo "=== Deploying Strapi ==="
./scripts/deploy_strapi.sh

# Change back to project root before running next script
cd $PROJECT_DIR

echo "=== Deploying Website ==="
./scripts/deploy_website.sh

echo "=== Full Deployment Complete! ==="

