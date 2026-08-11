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
- Current good build: `static/js/main.e6bf9140.js` (two-line hero `<br/>`).
