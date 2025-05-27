# Strapi Troubleshooting Guide

This guide provides steps to diagnose and fix common issues with the Strapi deployment.

## Quick Status Check

1. Check if Strapi service is running:
```bash
sudo systemctl status strapi
```

2. Check Strapi logs:
```bash
sudo journalctl -u strapi -n 100 --no-pager
```

3. Check if the process is listening on port 1337:
```bash
sudo netstat -tulpn | grep 1337
```

## Common Issues and Solutions

### 1. Service Not Running

If `systemctl status strapi` shows the service is not running:

```bash
# Check for errors in the service
sudo systemctl status strapi --no-pager

# Try restarting the service
sudo systemctl restart strapi

# Check logs immediately after restart
sudo journalctl -u strapi -n 100 --no-pager
```

### 2. Port Conflicts

If port 1337 is already in use:

```bash
# Find what's using port 1337
sudo lsof -i :1337

# Kill the process if needed (replace PID with actual process ID)
sudo kill -9 PID
```

### 3. Permission Issues

Check file permissions:

```bash
# Check ownership of Strapi directory
ls -la /home/nem/code/NewEnglandMelee/strapi

# Ensure correct permissions
sudo chown -R nem:nem /home/nem/code/NewEnglandMelee/strapi
```

### 4. Environment and Configuration

Verify environment setup:

```bash
# Check if .env file exists and has correct permissions
ls -la /home/nem/code/NewEnglandMelee/strapi/.env

# Verify environment variables are loaded
sudo systemctl show strapi -p Environment
```

### 5. Nginx Configuration

Check Nginx status and logs:

```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -n 100 /var/log/nginx/error.log

# Test Nginx configuration
sudo nginx -t
```

### 6. Memory Issues

Check system resources:

```bash
# Check memory usage
free -h

# Check disk space
df -h

# Check process memory usage
ps aux | grep node
```

## Complete Reset Procedure

If all else fails, try this complete reset:

1. Stop the service:
```bash
sudo systemctl stop strapi
```

2. Clear any existing processes:
```bash
sudo pkill -f strapi
```

3. Rebuild Strapi:
```bash
cd /home/nem/code/NewEnglandMelee/strapi
npm run build
```

4. Restart the service:
```bash
sudo systemctl restart strapi
```

5. Check status:
```bash
sudo systemctl status strapi
```

## Important Notes

- The Strapi service runs as user `nem`
- Service configuration is in `/etc/systemd/system/strapi.service`
- Logs are available through `journalctl`
- Environment variables are loaded from `/home/nem/code/NewEnglandMelee/strapi/.env`
- The service is configured to restart automatically on failure
- Memory limit is set to 1GB with CPU quota at 80%

## Contact

If issues persist after following these steps, please:
1. Collect all relevant logs
2. Note any error messages
3. Document the steps you've tried
4. Contact the system administrator 