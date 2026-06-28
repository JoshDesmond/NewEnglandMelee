# Strapi Troubleshooting Guide

Strapi runs under pm2 as `new-england-melee-strapi` on port 1337. The admin panel is served at `https://newenglandmelee.com/admin` via nginx path routing.

## Quick status check

```bash
pm2 status new-england-melee-strapi
pm2 logs new-england-melee-strapi --lines 50
ss -tlnp | grep 1337
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:1337/admin
```

## Admin panel 404

Strapi serves the admin UI from `strapi/dist/build/`. If that directory is empty or missing `index.html`, `/admin` returns 404.

The production server cannot run `strapi build` (OOM). Build on a dev machine and deploy:

```bash
./scripts/deploy_strapi_from_local.sh
```

## Common issues

### Process not running

```bash
pm2 restart new-england-melee-strapi
pm2 logs new-england-melee-strapi --lines 50
```

### Port conflict

```bash
lsof -i :1337
pm2 delete new-england-melee-strapi
cd ~/code/NewEnglandMelee && ./scripts/deploy_strapi.sh
```

### Nginx not routing to Strapi

```bash
sudo nginx -t
sudo tail -n 50 /var/log/nginx/error.log
cd ~/code/NewEnglandMelee && sudo ./scripts/configure_nginx.sh
```

Or redeploy the website (syncs nginx via passwordless `nem-deploy-web.sh`):

```bash
./scripts/deploy_website.sh
```

### Memory / build failures

```bash
free -h
df -h
```

Do not run `npm run build` on the server. Use `deploy_strapi_from_local.sh` instead.

## Environment

- `.env`: `/home/nem/code/NewEnglandMelee/strapi/.env`
- `PUBLIC_URL` must be `https://newenglandmelee.com`
- Uploads: `strapi/public/uploads/`
