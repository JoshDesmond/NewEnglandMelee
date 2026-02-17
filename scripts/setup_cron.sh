#!/bin/bash
# Adds a daily 09:19 UTC cron job for scripts/auto-deploy.sh.
# Run from repo root, as the user that owns the repo and runs deploys.
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DEPLOY_SCRIPT="$SCRIPT_DIR/auto-deploy.sh"
LOG_FILE="$PROJECT_DIR/logs/auto-deploy.log"
CRON_LINE="19 9 * * * $DEPLOY_SCRIPT >> $LOG_FILE 2>&1"

if [ ! -x "$DEPLOY_SCRIPT" ]; then
  chmod +x "$DEPLOY_SCRIPT"
  echo "Made $DEPLOY_SCRIPT executable."
fi

mkdir -p "$(dirname "$LOG_FILE")"

EXISTING=$(crontab -l 2>/dev/null | grep -v "auto-deploy.sh" || true)
(echo "$EXISTING"; echo "$CRON_LINE") | crontab -

echo "Cron installed: daily at 09:19 UTC"
echo "  Job: $CRON_LINE"
echo "  Log: $LOG_FILE"
echo "  Edit: crontab -e"
