# Auto-deploy (website + API server)

Lightweight, dependency-free automation: pull `main`, rebuild the Vite site and the Express API server, then restart PM2. Strapi is **not** included (Strapi is build and deployed on a local dev machine instead).

## What it does

1. Locks so two runs never overlap.
2. `git fetch origin main` and `git merge --ff-only origin/main` (fails if you have local changes or diverged history, so you get alerted).
3. `npm ci` at repo root (for the Vite build).
4. Runs `deploy_website.sh` (build → copy to `/var/www/nem`).
5. Runs `deploy_api_server.sh` (build server → PM2 restart).
6. Pings **Healthchecks.io** with the run’s exit status (success = 0, failure = non-zero) so you get notified if the job fails.

Logs go to `logs/auto-deploy.log` inside the repo (or set `LOG_DIR` to e.g. `/var/log/nem`).

## Run manually

```bash
./scripts/auto-deploy.sh
```

## Passwordless sudo (for cron)

So the website deploy doesn’t prompt for a password, allow the deploy user to run only the copy-to-webdir wrapper. On the server:

```bash
sudo visudo -f /etc/sudoers.d/nem-deploy
```

Add one line (use your repo path and username):

```
nem ALL=(ALL) NOPASSWD: /home/nem/code/NewEnglandMelee/scripts/nem-deploy-web.sh /home/nem/code/NewEnglandMelee
```

Save and exit. Then `./scripts/auto-deploy.sh` (and cron) can run without a sudo prompt.

## Schedule with cron

To run daily at 09:19 UTC, install the cron job: **from the repo root, as the user that owns the repo and runs deploys**, run `./scripts/setup_cron.sh`.
