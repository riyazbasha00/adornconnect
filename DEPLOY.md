# ADORN Connect — Deployment & Server Fix Notes

Live site: https://adornconnect.com

## Repos (IMPORTANT — do not mix them up)
- **CORRECT repo:** `https://github.com/riyazbasha00/adornconnect.git` (branch `main`)
  - Monorepo layout: `client/`, `server/`, `data.json`, `package.json`, `index.js` at root.
  - `index.js` at root does `require('./server/index.js')`.
  - `client/build/` is committed (CRA build) so deploys work without a build step.
- **WRONG/stale repo (do NOT use):** `riyazbasha00/adorn.git` — flat old app, no `client/`.
  - Server clone location: `/home/u341249923/adorn/` — was attached to this wrong remote.
  - Permanent fix applied: `git remote set-url origin https://github.com/riyazbasha00/adornconnect.git`.

## Server layout (Hostinger, shared Node.js hosting)
- Correct clone / file source: `/home/u341249923/domains/adornconnect.com/nodejs/`
- Deploy builds land in: `/home/u341249923/domains/adornconnect.com/hbuilds/versions/<version-id>/nodejs/`
  - Version folder also needs `client/` and `data.json` copied to its ROOT, not just inside `nodejs/`,
    because the running process resolves paths relative to the version root.
- Deploy mechanism: Hostinger runs only `npm install` (no git pull, no client build) per deploy log.
  - `hbuilds/last-source/` and `hbuilds/config/` are Hostinger internals; `hbuilds/current` is a symlink.

## Root cause of recurring breakage
- hPanel Node.js app was attached to the WRONG repo (`riyazbasha00/adorn.git`) with an app root
  that deployed only the old flat `server` layout — so `client/build` never shipped and every
  redeploy reverted to old code (`ENOENT client/build/index.html`).

## Manual fix pattern (works, survives until next deploy)
From the current live version folder:
```bash
cd /home/u341249923/domains/adornconnect.com/hbuilds/versions/<version-id>
cp -r /home/u341249923/domains/adornconnect.com/nodejs/client nodejs/
cp -r /home/u341249923/domains/adornconnect.com/nodejs/server nodejs/
cp /home/u341249923/domains/adornconnect.com/nodejs/index.js nodejs/
cp /home/u341249923/domains/adornconnect.com/nodejs/package.json nodejs/
cp /home/u341249923/domains/adornconnect.com/nodejs/data.json nodejs/
cp -r nodejs/client .
cp /home/u341249923/domains/adornconnect.com/nodejs/data.json .
ls nodejs/client/build/index.html client/build/index.html data.json
```
Then restart the Node.js app (Stop → Start, NOT Redeploy) so the new code loads.

## Permanent fix (still pending in hPanel)
- Advanced → Node.js → app:
  - Git repository: `https://github.com/riyazbasha00/adornconnect.git`, branch `main`
  - Application root: `/` (repo root — NOT the `server` subfolder)
  - Entry file: `index.js`
  - After one clean redeploy from the correct repo, future deploys include `client/build` and `data.json`
    automatically.

## Local workflow
- Build: `npm --prefix client run build` (CRA). Commit `client/build` along with source.
- Push to `origin/main` on `riyazbasha00/adornconnect`.
- Current good build: `static/js/main.db1e1659.js` (Home animations + responsive fixes + maintenance pages).

## Last manual deploy (Sep 7)
- Current live version: `01a07ba0-8918-72a9-b53f-4794ae09822e`
- Site was broken (500) — Redeploy had shipped only the flat `server/` layout (hPanel app root still `server`).
  At version ROOT it was missing `client/build` and `data.json`.
- Fix applied via SCP/SSH:
  - Uploaded `client/build/*` → `.../<version>/client/build/`
  - Uploaded `data.json` → `.../<version>/data.json`
  - They must live at the VERSION ROOT because the flat server resolves `db.js` data path to
    `nodejs/../data.json` and `buildDir` to `nodejs/../client/build`.
- Server code in the live version already matched the repo (routes/db/index identical), so no server files copied.
- Verified 200 on `/`, `/academy`, `/where-to-buy`, `/projects`, `/api/banner`, `/api/categories`, `/api/downloads`.
- Server source clone `/home/u341249923/domains/adornconnect.com/nodejs` updated via `git pull --ff-only` to `02638fb`.
