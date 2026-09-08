# TODO SEO

> Last updated: 2026-09-08

## Pending Changes

### Confirm production domain and set NEXT_PUBLIC_SITE_URL
- **Source:** [Next.js Metadata API docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase) — `metadataBase` must resolve to the real deployed origin for OG images, canonical URLs, sitemap, robots and llms.txt links to be correct.
- **What:** Set `NEXT_PUBLIC_SITE_URL` in the Vercel project's Environment Variables (Production) to the actual live domain (custom domain if one gets added, otherwise the real `*.vercel.app` URL).
- **Where:** Vercel dashboard → status-hub project → Settings → Environment Variables. Code already reads it in `lib/site.ts` with a fallback to `https://status-hub.vercel.app`.
- **Why:** Every generated URL (sitemap entries, robots.txt sitemap reference, OG/Twitter card `url`, JSON-LD `url`, llms.txt page links) is built from this constant. If it's wrong, social share previews and search engines index the wrong canonical URL.
- **Risk:** None to the app itself — just needs the real URL confirmed once, ideally after checking whether `status-hub.vercel.app` actually resolves (it returned an unexplained 307 redirect during setup — worth checking Vercel's Deployment Protection setting isn't blocking public access before relying on that domain).
- **Effort:** Low.

### Submit sitemap to Google Search Console / Bing Webmaster Tools
- **Source:** Next.js SEO guidance (2026) — "Generating a /sitemap.xml is only half the job. Submit it in Google Search Console."
- **What:** Once the domain above is confirmed and live, add the property to Google Search Console and Bing Webmaster Tools, then submit `https://<domain>/sitemap.xml`.
- **Where:** External tools, not a code change.
- **Why:** Sitemap existing doesn't get pages crawled/indexed faster on its own — search engines need to be told about it once.
- **Risk:** None. Requires owning/verifying the domain in each console.
- **Effort:** Low, one-time, manual (needs your Google/Microsoft account).

### PWA manifest + app icons
- **Source:** General Next.js App Router SEO/PWA checklist.
- **What:** Add `app/manifest.ts` (name, short_name, theme_color `#0b0f0e`, background_color, icons) and `app/icon.tsx` (favicon generated via `next/og`, matching the current `favicon.ico`).
- **Where:** New files under `app/`.
- **Why:** Improves "add to home screen" / mobile bookmarking experience and is a minor ranking/UX signal; not urgent since a static `favicon.ico` already exists.
- **Risk:** Low — purely additive, but deferred out of this cycle to keep the diff focused.
- **Effort:** Low.

### README: live demo link + screenshot/GIF
- **Source:** General GitHub discoverability best practice (repos with a visible screenshot/demo link get more stars and clicks from search + social shares).
- **What:** Once the production domain is confirmed, add a "**Live demo →**" link near the top of `README.md`, plus a screenshot or short GIF of the dashboard.
- **Where:** `README.md` (currently only has install/run instructions, no visual or live link).
- **Why:** GitHub repo READMEs are themselves indexed by Google and increasingly cited by AI coding assistants/GEO — a visible live link and screenshot raise both click-through and "is this a real working project" signal.
- **Risk:** None, but depends on the domain confirmation above happening first.
- **Effort:** Low.
