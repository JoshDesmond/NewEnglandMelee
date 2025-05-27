#!/bin/bash
set -e

# Define paths - using current directory since we know where we are
NGINX_CONF_SOURCE="$(dirname "$0")/nem_nginx.conf"
NGINX_CONF_DEST="/etc/nginx/conf.d/newenglandmelee.conf"

echo "=== Configuring Nginx ==="
echo "Using configuration from: $NGINX_CONF_SOURCE"

# Check if source config exists
if [ ! -f "$NGINX_CONF_SOURCE" ]; then
    echo "Error: Nginx configuration file not found at $NGINX_CONF_SOURCE"
    exit 1
fi

# Copy new configuration
echo "Installing new nginx configuration..."
sudo cp "$NGINX_CONF_SOURCE" "$NGINX_CONF_DEST"

# Test nginx configuration
echo "Testing nginx configuration..."
if ! sudo nginx -t; then
    echo "Error: Nginx configuration test failed"
    exit 1
fi

# Reload nginx
echo "Reloading nginx..."
sudo systemctl reload nginx

echo "=== Nginx configuration complete! ===" 