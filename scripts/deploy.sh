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

echo "=== Deploying Strapi ==="
./deploy_strapi.sh

echo "=== Deploying Website ==="
./deploy_website.sh

echo "=== Full Deployment Complete! ==="

