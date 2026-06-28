# Agent instructions

## Production server

SSH alias: **`nem`**. Repo: `/home/nem/code/NewEnglandMelee`.

```bash
ssh nem
ssh nem 'command here'
```

## Hosting layout

Everything is on `newenglandmelee.com` (no Strapi subdomain):

- Static site → `/var/www/nem`
- Express (pm2 `new-england-melee-api`) → `/api/tournaments`, `/api/health`
- Strapi (pm2 `new-england-melee-strapi`) → `/api/*`, `/admin`, `/uploads/`
- Nginx → `scripts/nem_nginx.conf`

The production server cannot run `strapi build` (OOM). Build Strapi on a dev machine and use `deploy_strapi_from_local.sh`.

## Common commands

```bash
# Server: website + API (also runs via cron)
ssh nem 'cd ~/code/NewEnglandMelee && ./scripts/auto-deploy.sh'

# Dev machine: Strapi admin + API build, rsync, pm2 restart
./scripts/deploy_strapi_from_local.sh

# Server: nginx only (requires sudo password; auto-deploy uses nem-deploy-web.sh instead)
ssh nem 'cd ~/code/NewEnglandMelee && sudo ./scripts/configure_nginx.sh'
```

## Secrets

SSH config lives in `~/.ssh/config` (not in repo). Server secrets are in gitignored `.env` files (`strapi/.env`, `server/.env`, repo root `.env`).
