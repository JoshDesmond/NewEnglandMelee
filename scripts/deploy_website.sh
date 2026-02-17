#!/bin/bash
set -e

# PROJECT_DIR can be set by caller (e.g. auto-deploy.sh); default for manual runs
PROJECT_DIR="${PROJECT_DIR:-$HOME/code/NewEnglandMelee}"
WEB_DIR=/var/www/nem

cd $PROJECT_DIR

npm run build

if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo "ERROR: Build failed or produced no files"
    exit 1
fi

echo "Deploying to $WEB_DIR..."
WRAPPER="$PROJECT_DIR/scripts/nem-deploy-web.sh"
if [ -x "$WRAPPER" ]; then
  sudo "$WRAPPER" "$PROJECT_DIR"
else
  sudo mkdir -p $WEB_DIR
  sudo rm -rf $WEB_DIR/*
  sudo cp -R dist/* $WEB_DIR/
  sudo chown -R www-data:www-data $WEB_DIR
fi

echo "Website deployment complete!"

