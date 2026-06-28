#!/bin/bash
# Copies project dist/ to /var/www/nem. Run with sudo so cron can deploy without a password.
# Usage: sudo scripts/nem-deploy-web.sh /path/to/NewEnglandMelee
# Add to sudoers (adjust path to your repo): nem ALL=(ALL) NOPASSWD: /home/nem/code/NewEnglandMelee/scripts/nem-deploy-web.sh /home/nem/code/NewEnglandMelee
set -e

if [ "$(id -u)" -ne 0 ]; then
  echo "Run with sudo." >&2
  exit 1
fi

PROJECT_DIR="${1:?Usage: sudo $0 /path/to/NewEnglandMelee}"
if [ ! -d "$PROJECT_DIR/dist" ]; then
  echo "No dist dir: $PROJECT_DIR/dist" >&2
  exit 1
fi

WEB_DIR=/var/www/nem
mkdir -p "$WEB_DIR"
rm -rf "$WEB_DIR"/*
cp -R "$PROJECT_DIR/dist/"* "$WEB_DIR/"
chown -R www-data:www-data "$WEB_DIR"

# Sync nginx config when present (passwordless sudo path for cron/auto-deploy)
NGINX_CONF_SOURCE="$PROJECT_DIR/scripts/nem_nginx.conf"
NGINX_CONF_DEST="/etc/nginx/conf.d/newenglandmelee.conf"
if [ -f "$NGINX_CONF_SOURCE" ]; then
  cp "$NGINX_CONF_SOURCE" "$NGINX_CONF_DEST"
  nginx -t
  systemctl reload nginx
fi
