# Kevin Coy — Portfolio

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion. Fully static export (`out/`); hosted on Cloudflare.

```bash
npm install
npm run dev      # http://localhost:3000 — shows "Asset needed" placeholders
npm run build && npm start
```

## Where things live

| What | File |
| --- | --- |
| Name, contact, summary, experience, skills | `src/content/site.ts` |
| Case studies + recent (text-only) work | `src/content/projects.ts` |
| Project images | `src/assets/work/<slug>/` |
| Résumé PDF (download) | `public/Kevin-Coy-Resume.pdf` |
| Design tokens (color, type, easing) | `src/app/globals.css` (`@theme`) |

## Adding a project

1. Put images in `src/assets/work/<slug>/` (≥1920px wide preferred).
2. Import them at the top of `src/content/projects.ts`.
3. Add a `Project` object and append it to `projects`.

The case-study route, work index, homepage showcase, prev/next links and sitemap all update from that array. Case studies are built from flexible blocks: `text`, `image`, `pair`, `gallery` (horizontal), `compare` (before/after slider), `screens` (portrait phone captures; set `device: "phone"` on the media) and `placeholder`. Homepage layouts are assigned per slug in `selected-work.tsx`. Use as many or as few as the project warrants. The site is static, so new content goes live with the next deploy (a git push to `main`).

To promote a "Recent practice" entry (SportsEngine, AI workflow) to a full case study, add screenshots and move it from `recent` into `projects`.

## Placeholders

`<Placeholder>` slots mark missing assets. They render in development and are **omitted from production builds**, so nothing unfinished ships. Preview them in production with `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`. See `ASSETS-NEEDED.md`.

## Deploy (Cloudflare)

`next.config.ts` sets `output: "export"`, so `npm run build` writes plain HTML/CSS/JS to `out/`. Pushing to `main` triggers a Cloudflare build.

| Setting | Workers project | Pages project |
| --- | --- | --- |
| Build command | `npm run build` | `npm run build` |
| Deploy command | `npx wrangler deploy` | — |
| Output directory | (from `wrangler.jsonc`) | `out` |

The Worker name in `wrangler.jsonc` (`portfolio`) must match the project name in Cloudflare.

Set the build variable `NEXT_PUBLIC_SITE_URL` (e.g. `https://kevincoy.com`) so canonical URLs, the sitemap and Open Graph links are absolute.

Images are served as-is (`images.unoptimized`), so export them at the size they're shown (≤2880px wide).

## Motion & accessibility

- Mount animations are CSS (content paints before hydration); scroll reveals use Motion `whileInView`.
- `prefers-reduced-motion` disables transforms, parallax, the hero slideshow and the magnetic effect.
- No scroll-jacking: horizontal galleries are native overflow with snap, buttons and keyboard support.
- The before/after slider is a real range input (arrow keys work). Lightboxes are native `<dialog>`.
- The custom cursor label is fine-pointer only and never hides the system cursor.
