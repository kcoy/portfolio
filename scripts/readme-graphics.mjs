// Renders the README graphics into .github/readme/ using the site's own type and palette.
//
//   npm run build && npx wrangler pages dev --port 8787   (in another terminal)
//   npm run readme:graphics
//
// Needs Google Chrome installed (Playwright drives it) and the site served on :8787.
import { chromium } from "playwright-core";
import fs from "fs";
import os from "os";
import path from "path";
import sharp from "sharp";

const SITE = process.cwd();
const OUT = `${SITE}/.github/readme`;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "readme-"));
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });

const dataUri = (p) => `data:image/${p.endsWith(".png") ? "png" : "jpeg"};base64,${fs.readFileSync(p).toString("base64")}`;
const logo = dataUri(`${SITE}/src/assets/kc-logo.png`);

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=block" rel="stylesheet">`;
const BASE = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.eyebrow{font-family:'Geist Mono',monospace;font-size:13px;letter-spacing:.08em;text-transform:uppercase}
.serif{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
.display{font-weight:500;letter-spacing:-.055em;line-height:.86}`;

const b = await chromium.launch({ channel: "chrome" });

async function render(name, w, h, body, css = "", { jpg = false } = {}) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await p.setContent(`<!doctype html><html><head>${FONTS}<style>${BASE}${css}</style></head><body>${body}</body></html>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  const raw = `${TMP}/${name}.png`;
  await p.screenshot({ path: raw });
  await p.close();
  const s = sharp(raw);
  if (jpg) await s.jpeg({ quality: 86, mozjpeg: true }).toFile(`${OUT}/${name}.jpg`);
  else await s.png({ compressionLevel: 9, palette: false }).toFile(`${OUT}/${name}.png`);
}

/* ---------- 1. Banner, light + dark ---------- */
for (const [mode, bg, ink, ink2, rule] of [
  ["light", "#f2f0eb", "#0e0e0d", "#55534e", "rgba(14,14,13,.16)"],
  ["dark", "#0e0e0d", "#f2f0eb", "#b9b6ad", "rgba(242,240,235,.16)"],
]) {
  await render(`banner-${mode}`, 1600, 650, `
  <div class="wrap">
    <div class="top">
      <div class="brand"><img src="${logo}"><span class="name">Kevin Coy</span><span class="eyebrow muted">Product Designer</span></div>
      <span class="eyebrow muted">kevincoy.design</span>
    </div>
    <div class="row eyebrow muted"><span>UX/UI</span><span>SaaS · AI-Driven Experiences</span><span>2004 — Now</span></div>
    <h1 class="display">Complex systems,<br>made <span class="serif accent">clear.</span></h1>
  </div>`, `
  body{background:${bg};color:${ink}}
  .wrap{padding:56px 72px}
  .top{display:flex;justify-content:space-between;align-items:center}
  .brand{display:flex;align-items:center;gap:12px}.brand img{width:34px;height:34px}
  .name{font-weight:600;font-size:21px;letter-spacing:-.02em}.brand .eyebrow{margin-left:4px}
  .muted{color:${ink2}}
  .row{display:flex;justify-content:space-between;margin-top:92px;padding-bottom:18px;border-bottom:1px solid ${rule}}
  h1{font-size:188px;margin-top:44px}
  .accent{color:#00bcff;padding-right:.05em}`);
}

/* ---------- 2. Device showcase from the real build ---------- */
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await p.goto("http://localhost:8787/", { waitUntil: "load" }); await p.waitForTimeout(3200);
  await p.screenshot({ path: `${TMP}/home-desktop.png` });
  await p.close();
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await m.goto("http://localhost:8787/work/clientjam", { waitUntil: "load" }); await m.waitForTimeout(2800);
  await m.screenshot({ path: `${TMP}/case-mobile.png` });
  await m.close();
  const d = dataUri(`${TMP}/home-desktop.png`), mo = dataUri(`${TMP}/case-mobile.png`);
  await render("showcase", 1600, 1000, `
  <div class="stage">
    <div class="browser"><div class="bar"><i></i><i></i><i></i><span>kevincoy.design</span></div><img src="${d}"></div>
    <div class="phone"><img src="${mo}"></div>
  </div>`, `
  body{background:#e8e5de}
  .stage{position:relative;width:1600px;height:1000px}
  .browser{position:absolute;left:80px;top:80px;width:1180px;border-radius:14px;overflow:hidden;background:#fff;
    box-shadow:0 1px 0 rgba(0,0,0,.04),0 50px 90px -40px rgba(0,0,0,.45);outline:1px solid rgba(0,0,0,.07)}
  .bar{height:38px;background:#f4f3f0;display:flex;align-items:center;gap:7px;padding:0 16px}
  .bar i{width:10px;height:10px;border-radius:50%;background:rgba(0,0,0,.12)}
  .bar span{margin:0 auto;font:12px 'Geist Mono',monospace;color:rgba(0,0,0,.45);background:rgba(0,0,0,.04);padding:3px 14px;border-radius:5px}
  .browser img{display:block;width:100%}
  .phone{position:absolute;right:90px;top:170px;width:330px;border-radius:44px;padding:11px;background:#0e0e0d;
    box-shadow:0 60px 100px -40px rgba(0,0,0,.6)}
  .phone img{display:block;width:100%;border-radius:34px}`, { jpg: true });
}

/* ---------- 3. Project cards ---------- */
const A = `${SITE}/src/assets/work`;
const projects = [
  ["clientjam", "01", "ClientJam", "2025–Present", "AI lead generation for designers and agencies: find a business, score its site, send the pitch.", "#141a2a", "#eef1f7", "#16a085", `${A}/clientjam/cj-app-detail.png`],
  ["helix", "02", "Helix", "2017–2018", "Self-service help centers for retail and member brands, on Oracle Service Cloud.", "#dde2ea", "#14171c", "#00bcff", `${A}/helix/helix-cover.jpg`],
  ["sportngin", "03", "Sport Ngin", "2013–2014", "Live game scoring on the iPad, for a sports SaaS platform used by 500,000+ people.", "#1f232c", "#eef1f5", "#2ba3d4", `${A}/sportngin/scorekeeper-poster.jpg`],
  ["offerbuys", "04", "OfferBuys", "2011–2012", "A name-your-price retail store — identity, bidding flows and browse.", "#ff5a0a", "#ffffff", "#1a1a18", `${A}/offerbuys/offerbuys-1a.jpg`],
  ["pricegrabber", "05", "PriceGrabber", "2008–2009", "Search and product discovery for a comparison-shopping engine.", "#dfe8d2", "#1b2a12", "#5e9b2a", `${A}/pricegrabber/pricegrabber-1a.jpg`],
  ["citysearch", "06", "Citysearch", "2009", "Local listings, advertiser acquisition and the Best of Citysearch awards.", "#cfe7f6", "#0d3550", "#2aa3e0", `${A}/citysearch/citysearch-2a.jpg`],
  ["velocity", "07", "Velocity Services", "2005–2007", "One template, many brands — portals and email for 150+ client sites.", "#1c1f2b", "#f2f0eb", "#f2c14e", `${A}/velocity/velocity-3a.jpg`],
];
for (const [slug, n, title, year, tagline, ground, ink, , cover] of projects) {
  await render(`project-${slug}`, 800, 620, `
  <div class="card">
    <div class="meta eyebrow"><span>${n}</span><span>${year.replace("Present", "Now")}</span></div>
    <h2 class="display">${title}</h2>
    <p>${tagline}</p>
    <div class="shot"><img src="${dataUri(cover)}"></div>
  </div>`, `
  body{background:${ground};color:${ink}}
  .card{position:relative;width:800px;height:620px;padding:44px 48px;overflow:hidden}
  .meta{display:flex;gap:18px;opacity:.7}
  h2{font-size:64px;margin-top:16px}
  p{margin-top:16px;max-width:30ch;font-size:19px;line-height:1.3;opacity:.82}
  .shot{position:absolute;left:48px;right:48px;top:300px;border-radius:12px;overflow:hidden;
    box-shadow:0 40px 70px -30px rgba(0,0,0,.55);outline:1px solid rgba(0,0,0,.08)}
  .shot img{display:block;width:100%}`, { jpg: true });
}

/* ---------- 4. Numbers ---------- */
await render("numbers", 1600, 250, `
  <div class="grid">
    ${[["15+", "Years designing SaaS<br>and web products"], ["500K+", "Users on the<br>SportsEngine platform"], ["~25%", "Faster task completion —<br>enterprise support workflows"], ["150+", "Client websites led at<br>Velocity Services"]]
      .map(([v, l]) => `<div class="cell"><div class="display v">${v}</div><div class="l">${l}</div></div>`).join("")}
  </div>`, `
  body{background:#f2f0eb;color:#0e0e0d}
  .grid{display:grid;grid-template-columns:repeat(4,1fr);padding:56px 72px}
  .cell{padding:0 28px;border-left:1px solid rgba(14,14,13,.16)}.cell:first-child{border-left:0;padding-left:0}
  .v{font-size:96px}.l{margin-top:18px;color:#55534e;font-size:18px;line-height:1.35}`);

/* ---------- 5. Colour + type sheet ---------- */
await render("system", 1600, 476, `
  <div class="sheet">
    <div class="col">
      <p class="eyebrow muted">Colour</p>
      <div class="sw">
        ${[["Paper", "#f2f0eb", "#0e0e0d", "1px solid rgba(14,14,13,.16)"], ["Paper 2", "#e8e5de", "#0e0e0d", "0"], ["Ink", "#0e0e0d", "#f2f0eb", "0"], ["Ink 2", "#55534e", "#f2f0eb", "0"], ["Accent", "#00bcff", "#0e0e0d", "0"]]
          .map(([n, c, t, bd]) => `<div class="chip" style="background:${c};color:${t};border:${bd}"><span>${n}</span><span class="eyebrow">${c}</span></div>`).join("")}
      </div>
    </div>
    <div class="col">
      <p class="eyebrow muted">Type</p>
      <div class="type">
        <div><span class="display big">Aa</span><span class="cap">Geist — display &amp; text</span></div>
        <div><span class="serif big accent">Aa</span><span class="cap">Instrument Serif Italic — accents</span></div>
        <div><span class="mono big">Aa</span><span class="cap">Geist Mono — labels</span></div>
      </div>
    </div>
  </div>`, `
  body{background:#f2f0eb;color:#0e0e0d}
  .sheet{display:grid;grid-template-columns:1fr 1fr;gap:64px;padding:64px 72px}
  .muted{color:#55534e}
  .sw{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:24px}
  .chip{height:300px;border-radius:12px;padding:18px;display:flex;flex-direction:column;justify-content:space-between;font-weight:500;font-size:18px}
  .chip .eyebrow{font-size:11px}
  .type{margin-top:24px;display:grid;gap:22px}
  .type div{display:flex;align-items:baseline;gap:28px;border-bottom:1px solid rgba(14,14,13,.16);padding-bottom:14px}
  .big{font-size:84px;line-height:.9;width:150px}.mono{font-family:'Geist Mono',monospace;font-size:64px}
  .cap{color:#55534e;font-size:18px}.accent{color:#00bcff}`);

await b.close();
console.log(fs.readdirSync(OUT).map((f) => `${f} ${Math.round(fs.statSync(`${OUT}/${f}`).size / 1024)}KB`).join("\n"));
