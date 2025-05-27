#!/bin/bash
set -e

# Check if .env file exists
if [ ! -f "/home/nem/code/NewEnglandMelee/strapi/.env" ]; then
    echo "Error: .env file not found in /home/nem/code/NewEnglandMelee/strapi/"
    echo "Please ensure the .env file exists before configuring the service."
    exit 1
fi

echo "=== Configuring Strapi Service ==="

# Copy service file
sudo cp ./strapi.service /etc/systemd/system/strapi.service

echo "Strapi Service Configured - Moving on to optional systemctl configuration"
read -p "Press Enter to continue or CTRL+C to quit..."

# Reload systemd to recognize the new service
echo "Reloading systemd..."
sudo systemctl daemon-reload

# Enable the service to start on boot
echo "Enabling Strapi service..."
sudo systemctl enable strapi

# Start the service now
echo "Starting Strapi service..."
sudo systemctl start strapi

# Check service status
echo "Checking service status..."
sudo systemctl status strapi

echo "=== Strapi service setup complete! ==="

