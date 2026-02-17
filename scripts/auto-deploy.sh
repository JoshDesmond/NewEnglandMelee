#!/bin/bash
# Auto-deploy: pull main, rebuild website + API server (no Strapi).
# Intended for cron (e.g. daily 09:19 UTC). Lightweight, no extra deps.
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
# Load nvm if present (cron often doesn't)
[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"
LOCK_FILE="$PROJECT_DIR/.auto-deploy.lock"
LOG_DIR="${LOG_DIR:-$PROJECT_DIR/logs}"
LOG_FILE="$LOG_DIR/auto-deploy.log"

# Optional: set LOG_DIR when scheduling (e.g. LOG_DIR=/var/log/nem in cron)
# Optional: set HEALTHCHECK_URL to your Healthchecks.io ping URL; set to empty to disable
HEALTHCHECK_URL="${HEALTHCHECK_URL:-https://hc-ping.com/301131ad-64a4-4f32-b3af-9d55a473b88d}"
mkdir -p "$LOG_DIR"

log() { echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*" | tee -a "$LOG_FILE"; }

# Prevent overlapping runs (e.g. manual run while cron runs)
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  log "Another auto-deploy is running (lock held). Exiting."
  exit 0
fi

exit_code=0
(
  set -e
  log "=== Auto-deploy start ==="
  cd "$PROJECT_DIR"
  export PROJECT_DIR

  # Fast-forward main to origin/main; fails if local changes or divergence
  log "Fetching and fast-forwarding main..."
  git fetch origin main
  git checkout main
  git merge --ff-only origin/main

  # Root deps (for Vite build)
  log "Installing root dependencies..."
  npm ci

  # Deploy website (build Vite, copy to /var/www/nem)
  log "Deploying website..."
  "$SCRIPT_DIR/deploy_website.sh"

  # Deploy API server (build server, PM2 restart)
  log "Deploying API server..."
  "$SCRIPT_DIR/deploy_api_server.sh"

  log "=== Auto-deploy finished ==="
) || exit_code=$?

# Notify Healthchecks.io: 0 = success, non-zero = failure (so you get alerted)
if [ -n "$HEALTHCHECK_URL" ]; then
  curl -fsS --retry 3 -o /dev/null "$HEALTHCHECK_URL/$exit_code" || log "Healthchecks ping failed"
fi

exit $exit_code
