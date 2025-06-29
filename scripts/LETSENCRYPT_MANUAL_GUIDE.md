# Let's Encrypt Manual Setup Guide for New England Melee

This guide will walk you through setting up Let's Encrypt SSL certificates for your New England Melee website (`newenglandmelee.xyz`) and API (`api.newenglandmelee.xyz`). This is a manual process that gives you full control over each step.

## Prerequisites

Before starting, ensure:
- Your domains point to your server's IP address
- Nginx is running and accessible on port 80
- You have sudo access
- Your current nginx configuration is working

## Step 1: Install Certbot

First, let's install Certbot using the recommended snap method:

```bash
# Update snapd core
sudo snap install core
sudo snap refresh core

# Remove any old certbot installation (if it exists)
sudo apt remove certbot

# Install certbot
sudo snap install --classic certbot

# Create a symlink so you can run certbot from anywhere
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## Step 2: Configure Firewall for HTTPS

Allow HTTPS traffic through your firewall:

```bash
# Check current firewall status
sudo ufw status

# Allow HTTPS traffic
sudo ufw allow 'Nginx Full'

# Remove HTTP-only rule (if it exists)
sudo ufw delete allow 'Nginx HTTP'

# Verify the changes
sudo ufw status
```

You should see "Nginx Full" in the allowed services.

## Step 3: Verify Your Nginx Configuration

Before proceeding, let's make sure your nginx configuration is ready for Certbot:

```bash
# Check your current nginx configuration
sudo nginx -t

# If it passes, reload nginx
sudo systemctl reload nginx
```

## Step 4: Obtain SSL Certificates

Now let's get certificates for both domains:

```bash
# Get certificates for both domains
sudo certbot --nginx -d newenglandmelee.xyz -d api.newenglandmelee.xyz
```

During this process:
- You'll be asked for an email address (for renewal notifications)
- You'll need to agree to the terms of service
- Certbot will automatically configure nginx for SSL

**Important Notes:**
- Certbot will temporarily modify your nginx configuration
- It will add SSL directives to your existing server blocks
- Your custom settings (API proxy, caching, etc.) should be preserved

## Step 5: Test Certificate Renewal

Let's verify that automatic renewal will work:

```bash
# Test the renewal process (dry run)
sudo certbot renew --dry-run
```

You should see a success message indicating the renewal would work.

## Step 6: Update Your Project's Nginx Configuration Template

After Certbot has configured SSL, you'll want to save the updated configuration as your new template. This way, your deployment scripts will use the Let's Encrypt certificate paths.

```bash
# Backup your current project template
cp scripts/nem_nginx.conf scripts/nem_nginx.conf.backup.$(date +%Y%m%d_%H%M%S)

# Copy the updated configuration from nginx to your project
sudo cp /etc/nginx/conf.d/newenglandmelee.conf scripts/nem_nginx.conf

# Make sure you own the file (since it was copied with sudo)
sudo chown $USER:$USER scripts/nem_nginx.conf
```

**What this does:**
- Saves Certbot's SSL-enabled configuration as your new template
- Preserves all your custom settings (API proxy, caching, security headers)
- Updates certificate paths to use Let's Encrypt locations
- Makes this configuration available for your deployment scripts

## Step 7: Verify Everything Works

Test your websites:

```bash
# Test the main website
curl -I https://newenglandmelee.xyz

# Test the API subdomain
curl -I https://api.newenglandmelee.xyz

# Check certificate details
sudo certbot certificates
```

## Step 8: Verify Automatic Renewal

Check that automatic renewal is set up:

```bash
# Check the renewal timer status
sudo systemctl status snap.certbot.renew.timer

# Check when the next renewal will happen
sudo systemctl list-timers | grep certbot
```

## Troubleshooting

### If Certbot Fails During Certificate Obtainment

1. **Check domain resolution:**
   ```bash
   nslookup newenglandmelee.xyz
   nslookup api.newenglandmelee.xyz
   ```

2. **Check nginx is accessible on port 80:**
   ```bash
   sudo netstat -tlnp | grep :80
   ```

3. **Check firewall settings:**
   ```bash
   sudo ufw status
   ```

### If Nginx Configuration Test Fails

1. **Check the configuration syntax:**
   ```bash
   sudo nginx -t
   ```

2. **Look at the error messages and fix any issues**

3. **If needed, restore your backup:**
   ```bash
   sudo cp /etc/nginx/conf.d/newenglandmelee.conf.backup.* /etc/nginx/conf.d/newenglandmelee.conf
   ```

### If Certificates Don't Renew Automatically

1. **Check the renewal timer:**
   ```bash
   sudo systemctl status snap.certbot.renew.timer
   ```

2. **Manually test renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

## Integration with Your Deployment

Your existing deployment scripts will continue to work as before. The certificates will be automatically renewed by Certbot's systemd timer, so you don't need to modify your deployment process.

**After this setup:**
- Your `scripts/nem_nginx.conf` will contain the Let's Encrypt certificate paths
- Your `scripts/configure_nginx.sh` will deploy the SSL-enabled configuration
- Your deployment process remains unchanged

## Certificate Information

- **Certificate location:** `/etc/letsencrypt/live/[domain]/`
- **Main certificate:** `fullchain.pem`
- **Private key:** `privkey.pem`
- **Renewal frequency:** Automatic (twice daily check)
- **Certificate validity:** 90 days (renewed when 30 days or less remain)

## Security Notes

- Certificates are automatically renewed
- Your nginx configuration includes security headers
- HTTPS redirects are properly configured
- SSL protocols are restricted to TLS 1.2 and 1.3

## Next Steps

After completing this setup:
1. Your websites will be accessible via HTTPS
2. Certificates will renew automatically
3. Your deployment scripts will continue working
4. You can remove the old self-signed certificates if desired

## Useful Commands for Future Reference

```bash
# Check certificate status
sudo certbot certificates

# Manually renew certificates
sudo certbot renew

# Check renewal timer
sudo systemctl status snap.certbot.renew.timer

# View nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
``` 