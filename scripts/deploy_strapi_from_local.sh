#!/bin/bash
# Build Strapi locally and transfer to server.
# The production server cannot run `strapi build` (OOM on ~2GB RAM).
set -e

# Configuration - adjust these for your setup
SSH_HOST="${STRAPI_SSH_HOST:-nem}"
REMOTE_STRAPI_DIR="${STRAPI_REMOTE_DIR:-~/code/NewEnglandMelee/strapi}"

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
STRAPI_DIR="$PROJECT_ROOT/strapi"

echo "=== Building Strapi locally ==="

cd "$STRAPI_DIR"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build Strapi (admin panel assets land in dist/build/)
echo "Building Strapi..."
NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=4096}" npm run build

# Verify build
if [ ! -f "dist/build/index.html" ]; then
    echo "ERROR: Admin build missing (dist/build/index.html)"
    exit 1
fi

echo "Build completed successfully"

# Test SSH connection
echo "Testing SSH connection to $SSH_HOST..."
if ! ssh -o ConnectTimeout=5 -o BatchMode=yes "$SSH_HOST" exit 2>/dev/null; then
    echo "Error: Cannot connect to $SSH_HOST"
    echo "Please ensure SSH agent is running and keys are loaded:"
    echo "  eval \$(ssh-agent -s) && ssh-add ~/.ssh/<your-key>"
    exit 1
fi

# Transfer files (.strapi/client is included for the admin panel)
echo "Transferring files to server..."
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude 'src' \
    --exclude '.cache' \
    --exclude '.tmp' \
    --exclude 'database' \
    --exclude '.env' \
    --exclude 'public/uploads' \
    "$STRAPI_DIR/" \
    "$SSH_HOST:$REMOTE_STRAPI_DIR/"

echo "Files transferred successfully"

# Run remote deployment script
echo "Running remote deployment script..."
REMOTE_PROJECT_DIR="$(dirname "$REMOTE_STRAPI_DIR")"
ssh "$SSH_HOST" "cd $REMOTE_PROJECT_DIR && ./scripts/deploy_strapi.sh"

echo "=== Local build and transfer complete ==="
