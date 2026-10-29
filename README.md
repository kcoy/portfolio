# Kevin Coy — Portfolio

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion. Statically generated; deploys to Vercel with zero config.

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

The case-study route, work index, homepage showcase, prev/next links and sitemap all update from that array. Case studies are built from flexible blocks: `text`, `image`, `pair`, `gallery` (horizontal), `compare` (before/after slider), `screens` (portrait phone captures; set `device: "phone"` on the media) and `placeholder`. Homepage layouts are assigned per slug in `selected-work.tsx`. Use as many or as few as the project warrants. The site is static, so new content goes live with the next deploy (a git push on Vercel).

To promote a "Recent practice" entry (SportsEngine, AI workflow) to a full case study, add screenshots and move it from `recent` into `projects`.

## Placeholders

`<Placeholder>` slots mark missing assets. They render in development and are **omitted from production builds**, so nothing unfinished ships. Preview them in production with `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`. See `ASSETS-NEEDED.md`.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://kevincoy.com`) in Vercel so canonical URLs, sitemap and Open Graph links are absolute.

## Motion & accessibility

- Mount animations are CSS (content paints before hydration); scroll reveals use Motion `whileInView`.
- `prefers-reduced-motion` disables transforms, parallax, the hero slideshow and the magnetic effect.
- No scroll-jacking: horizontal galleries are native overflow with snap, buttons and keyboard support.
- The before/after slider is a real range input (arrow keys work). Lightboxes are native `<dialog>`.
- The custom cursor label is fine-pointer only and never hides the system cursor.
