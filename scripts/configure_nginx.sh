#!/bin/bash
set -e

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run this script with sudo"
    exit 1
fi

# Define paths
PROJECT_DIR=~/code/NewEnglandMelee
NGINX_CONF_SOURCE="$PROJECT_DIR/scripts/nem_nginx.conf"
NGINX_CONF_DEST="/etc/nginx/conf.d/newenglandmelee.conf"

echo "=== Configuring Nginx ==="

# Check if source config exists
if [ ! -f "$NGINX_CONF_SOURCE" ]; then
    echo "Error: Nginx configuration file not found at $NGINX_CONF_SOURCE"
    exit 1
fi

# Backup existing config if it exists
if [ -f "$NGINX_CONF_DEST" ]; then
    echo "Backing up existing nginx configuration..."
    cp "$NGINX_CONF_DEST" "${NGINX_CONF_DEST}.bak"
fi

# Copy new configuration
echo "Installing new nginx configuration..."
cp "$NGINX_CONF_SOURCE" "$NGINX_CONF_DEST"

# Test nginx configuration
echo "Testing nginx configuration..."
if ! nginx -t; then
    echo "Error: Nginx configuration test failed"
    echo "Restoring previous configuration..."
    if [ -f "${NGINX_CONF_DEST}.bak" ]; then
        cp "${NGINX_CONF_DEST}.bak" "$NGINX_CONF_DEST"
    fi
    exit 1
fi

# Reload nginx
echo "Reloading nginx..."
systemctl reload nginx

echo "=== Nginx configuration complete! ===" 