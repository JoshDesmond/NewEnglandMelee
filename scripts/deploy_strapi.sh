#!/bin/bash
set -e

# TODO share variables with parent scripts
PROJECT_DIR=~/code/NewEnglandMelee
STRAPI_DIR=$PROJECT_DIR/strapi

echo "=== Deploying Strapi CMS ==="

cd $STRAPI_DIR

echo "Building Strapi..."
npm install
npm run build

echo "Restarting Strapi service..."
sudo systemctl restart strapi
sudo systemctl enable strapi

echo "Strapi deployment complete!"

