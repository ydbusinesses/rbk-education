# RBK Education — DigitalOcean Deployment Guide
## Deploy in under 60 minutes

---

## STEP 1 — Push to GitHub (5 min)

Open PowerShell and run:

```powershell
cd C:\Pinkyandme\rbk-education

git init
git add .
git commit -m "Initial deploy — RBK Education"

# Create a new repo on github.com first, then:
git remote add origin https://github.com/YOUR-USERNAME/rbk-education.git
git branch -M main
git push -u origin main
```

---

## STEP 2 — Deploy on DigitalOcean App Platform (10 min)

1. Go to https://cloud.digitalocean.com/apps
2. Click **Create App**
3. Choose **GitHub** → select your `rbk-education` repo → branch: `main`
4. DigitalOcean will auto-detect it as a **Static Site**
5. Confirm these build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Node Version:** 18

---

## STEP 3 — Add Environment Variables (5 min)

In the DigitalOcean app settings → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://mrlpacszoediubihzqbf.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | your Supabase anon key |
| `VITE_FASTAPI_BASE_URL` | your FastAPI backend URL (or leave blank to use fallback mode) |

> **Important:** Rotate your Supabase anon key before going live.
> Go to Supabase → Settings → API → Regenerate anon key.

---

## STEP 4 — Connect Your Domain (10 min)

1. In DigitalOcean App → **Settings** → **Domains** → Add `sybfusionai.com`
2. DigitalOcean gives you a CNAME record
3. In your DNS provider (Cloudflare recommended):
   - Add CNAME: `sybfusionai.com` → `your-app.ondigitalocean.app`
   - Set SSL/TLS to **Full**
4. SSL is auto-provisioned by DigitalOcean — takes ~5 min

---

## STEP 5 — Enable SPA Routing (Critical)

React Router requires all routes to return `index.html`.
In DigitalOcean App → **Settings** → **Routes**, add a catch-all:

| Route | Type |
|-------|------|
| `/*` | Rewrite to `/index.html` |

Without this, direct links to `/bundles` or `/account` will return 404.

---

## STEP 6 — Test Your Site

Visit these URLs to confirm everything works:

- `https://sybfusionai.com` → Homepage (hero + quiz teaser)
- `https://sybfusionai.com/bundles` → Bundle tiers page
- `https://sybfusionai.com/bundles/catalog` → All 50 bundles
- `https://sybfusionai.com/quiz/automation-readiness` → Quiz
- `https://sybfusionai.com/account` → Auth gate

---

## FastAPI Backend (Optional — site works without it)

The frontend is built with graceful fallbacks. If FastAPI is unreachable:
- LUAU Mini banner won't show (silent fail)
- Checkout falls back to `/thank-you/:slug` demo mode
- Library access uses Supabase RPC directly

When you're ready to wire up FastAPI on MERCURY-01:
1. Set `VITE_FASTAPI_BASE_URL=https://your-tunnel-url.trycloudflare.com` in DO env vars
2. Redeploy (push any commit to main)

---

## Auto-Deploy on Push

Every `git push origin main` triggers an automatic rebuild on DigitalOcean.
Zero manual steps after initial setup.

---

## Cost

| Service | Cost |
|---------|------|
| DigitalOcean App Platform (Static) | **$0/month** (free tier) |
| Custom domain SSL | **$0** (included) |
| Supabase (free tier) | **$0/month** |

Total: **$0/month** until you need the FastAPI backend (then ~$5–12/mo for a DO Droplet).
