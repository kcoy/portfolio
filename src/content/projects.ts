import type { StaticImageData } from "next/image";

import ob1 from "@/assets/work/offerbuys/offerbuys-1a.jpg";
import ob2 from "@/assets/work/offerbuys/offerbuys-2a.jpg";
import ob3 from "@/assets/work/offerbuys/offerbuys-3a.jpg";
import ob4 from "@/assets/work/offerbuys/offerbuys-4a.jpg";
import ob5 from "@/assets/work/offerbuys/offerbuys-5a.jpg";
import ob6 from "@/assets/work/offerbuys/offerbuys-6a.jpg";
import ob7 from "@/assets/work/offerbuys/offerbuys-7a.jpg";
import ob8 from "@/assets/work/offerbuys/offerbuys-8a.jpg";
import pg1 from "@/assets/work/pricegrabber/pricegrabber-1a.jpg";
import pg2 from "@/assets/work/pricegrabber/pricegrabber-2a.jpg";
import pg3 from "@/assets/work/pricegrabber/pricegrabber-3a.jpg";
import pg4 from "@/assets/work/pricegrabber/pricegrabber-4a.jpg";
import pg5 from "@/assets/work/pricegrabber/pricegrabber-5a.jpg";
import pg6 from "@/assets/work/pricegrabber/pricegrabber-6a.jpg";
import pg7 from "@/assets/work/pricegrabber/pricegrabber-7a.jpg";
import cs1 from "@/assets/work/citysearch/citysearch-1a.jpg";
import cs2 from "@/assets/work/citysearch/citysearch-2a.jpg";
import cs3 from "@/assets/work/citysearch/citysearch-3a.jpg";
import cs4 from "@/assets/work/citysearch/citysearch-4a.jpg";
import vs1 from "@/assets/work/velocity/velocity-1a.jpg";
import vs2 from "@/assets/work/velocity/velocity-2a.jpg";
import vs3 from "@/assets/work/velocity/velocity-3a.jpg";
import vs4 from "@/assets/work/velocity/velocity-4a.jpg";
import vs5 from "@/assets/work/velocity/velocity-5a.jpg";
import hxCover from "@/assets/work/helix/helix-cover.jpg";
import cjDetail from "@/assets/work/clientjam/cj-app-detail.png";
import cjAnalyzer from "@/assets/work/clientjam/cj-app-analyzer.png";
import cjProspector from "@/assets/work/clientjam/cj-app-prospector.png";
import cjGenerator from "@/assets/work/clientjam/cj-app-generator.png";
import cjGeneratorResults from "@/assets/work/clientjam/cj-generator-results.png";
import cjDashboard from "@/assets/work/clientjam/cj-dashboard.png";
import cjLeads from "@/assets/work/clientjam/cj-leads.png";
import cjAudit from "@/assets/work/clientjam/cj-audit.png";
import cjClose from "@/assets/work/clientjam/cj-close.png";
import cjTileEmail from "@/assets/work/clientjam/cj-tile-email.png";
import cjTilePackage from "@/assets/work/clientjam/cj-tile-package.png";
import cjTileAi from "@/assets/work/clientjam/cj-tile-ai.png";
import snPoster from "@/assets/work/sportngin/scorekeeper-poster.jpg";
import hx1 from "@/assets/work/helix/helix-1.png";
import hx2 from "@/assets/work/helix/helix-2.png";
import hx3 from "@/assets/work/helix/helix-3.png";
import hx4 from "@/assets/work/helix/helix-4.png";
import hx5 from "@/assets/work/helix/helix-5.png";
import hx6 from "@/assets/work/helix/helix-6.png";
import hx7 from "@/assets/work/helix/helix-7.png";

/* ------------------------------------------------------------------
   Content model
   To add a project: drop images in src/assets/work/<slug>/, import
   them above, and append an entry to `projects`. Routes, the work
   index, prev/next links, sitemap and OG images are all generated.
------------------------------------------------------------------- */

export type Media = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  /** Render inside browser chrome (with this address) or bare. */
  browser?: string;
  /** Portrait mobile capture — rendered as a phone screen, not in browser chrome. */
  device?: "phone";
};

/** A video served from public/ (static export: no image pipeline for video). */
export type Film = {
  src: string;
  poster: string;
  /** width / height, e.g. "872 / 480" */
  aspect: string;
  /** Describes what the video shows, for screen readers */
  alt: string;
  caption?: string;
};

export type Block =
  | { type: "text"; kicker?: string; heading: string; body: string[] }
  | { type: "image"; media: Media; size?: "wide" | "full" }
  | { type: "pair"; items: [Media, Media]; caption?: string }
  | { type: "gallery"; heading: string; items: Media[] }
  | {
      type: "compare";
      heading: string;
      body?: string;
      before: Media;
      after: Media;
      labels: [string, string];
    }
  | { type: "screens"; kicker?: string; heading: string; body?: string; items: Media[] }
  | { type: "tiles"; kicker?: string; heading: string; body?: string; items: Media[] }
  | { type: "video"; kicker?: string; heading: string; body?: string; film: Film }
  | { type: "placeholder"; label: string; note: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  /** One line, shown in lists */
  tagline: string;
  year: string;
  role: string;
  disciplines: string[];
  platform: string;
  intro: string;
  cover: Media;
  /** Additional frames used on the home page showcase */
  showcase: Media[];
  /** Presentation colors drawn from the project's own brand */
  theme: {
    ground: string;
    ink: string;
    accent: string;
    /** Optional halo around the cover image (homepage feature and case-study header) */
    glow?: string;
  };
  /** Only outcomes verified in the résumé */
  outcome?: { label: string; value: string; note: string };
  /** Plays in place of the cover image at the top of the case study */
  film?: Film;
  /** Muted loop shown on the homepage feature, if any */
  reel?: Film;
  /** Large serif line set under the homepage feature, if any */
  slogan?: string;
  blocks: Block[];
};

const clientjam: Project = {
  slug: "clientjam",
  title: "ClientJam",
  client: "ClientJam — my own product",
  tagline: "AI lead generation for designers and agencies: find a business, score its site, send the pitch.",
  year: "2025–Present",
  role: "Founder — product design, UI and build",
  disciplines: ["AI product", "SaaS", "Brand"],
  platform: "Web Application · clientjam.app",
  intro:
    "Designers and small agencies usually find clients the slow way: search a niche, eyeball a few dozen websites, then write cold emails one at a time. ClientJam turns that into one flow — find local businesses, score their websites, and send an outreach email written from the audit. I founded it, designed it, and build it with Figma and Claude Code.",
  theme: { ground: "#141a2a", ink: "#eef1f7", accent: "#16a085" },
  slogan: "Find. Score. Close.",
  cover: {
    src: cjDetail,
    alt: "ClientJam lead detail page: sidebar navigation, three score gauges for site quality, sales opportunity and search visibility, business info, pipeline status, website analysis and AI opportunity analysis.",
    browser: "clientjam.app/leads",
  },
  showcase: [
    {
      src: cjDashboard,
      alt: "ClientJam dashboard: total leads, average web and opportunity scores, contacted count, today's focus, pipeline value and lead activity.",
    },
    { src: cjTileAi, alt: "AI opportunity analysis card: what's wrong, why they're a good prospect, best pitch angle." },
    { src: cjTileEmail, alt: "Generated outreach email card in the friendly tone, with copy and mark-contacted actions." },
    { src: cjTilePackage, alt: "Suggested package card: Starter Refresh at $750 with a low-mid-high price toggle and scope checklist." },
  ],
  blocks: [
    {
      type: "text",
      kicker: "The opportunity",
      heading: "A dated website is a lead.",
      body: [
        "Slow, unconverting local websites are everywhere, and every one is a potential client for a designer. The hard part isn't the redesign — it's finding the businesses, judging which ones are worth a pitch, and writing something specific enough to get a reply.",
        "So the product is built around three verbs: find, score, close.",
      ],
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: cjDashboard,
        alt: "Dashboard with KPI tiles, today's focus list, pipeline overview donut, lead activity chart and pipeline-by-status bars.",
        caption:
          "The dashboard answers one question first — who should I contact today? — then shows the pipeline behind it. (Sample data.)",
        browser: "clientjam.app/dashboard",
      },
    },
    {
      type: "text",
      kicker: "Score",
      heading: "Show the evidence next to the verdict.",
      body: [
        "An AI summary is only useful if you can trust it. Every audit pairs the raw technical checks with the AI's read on them — what's wrong, why the business is a good prospect, the best pitch angle — and every score carries a label in words, not just a number.",
      ],
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: cjAudit,
        alt: "Audit of info.cern.ch: site quality 50, sales opportunity 46 (low priority), search visibility 60; eight checks with SSL, meta description and mobile viewport failing; AI analysis cards.",
        caption:
          "A real audit, run for this case study on info.cern.ch — the world's first website. Eight checks, three labelled scores, and an AI analysis that cites the checks it came from.",
      },
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: cjLeads,
        alt: "Leads table with web, SEO and opportunity score pills, status dropdowns, filters and row actions.",
        caption:
          "Every saved lead keeps its three scores and a status, with filters for the work that's actually next: low scores, not yet emailed, exported. (Sample data.)",
        browser: "clientjam.app/leads",
      },
    },
    {
      type: "text",
      kicker: "Close",
      heading: "Walk away with the pitch, not a to-do.",
      body: [
        "The lead page ends where the work does: a recommended package with a price you can tune, an outreach email written from the audit in three tones, and a one-page proposal PDF — copy, send or download.",
      ],
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: cjClose,
        alt: "Suggested package card with Starter, Growth and Premium tiers and a Starter Refresh at $750; generated friendly outreach email; proposal PDF card with download and send.",
        caption:
          "Package, email and proposal for the CERN audit above — generated live, unedited.",
      },
    },
    {
      type: "gallery",
      heading: "Find",
      items: [
        {
          src: cjAnalyzer,
          alt: "Website Analyzer empty state: Scan any website in seconds, with chips for 8 technical checks, AI opportunity score and outreach email draft.",
          caption: "Analyzer — one field, one promise: scan any website in seconds.",
          browser: "clientjam.app/analyzer",
        },
        {
          src: cjProspector,
          alt: "Prospector empty state: Strike gold, with example searches like photographers in Saint Louis MO.",
          caption: "Prospector — search a category in a city; examples do the explaining.",
          browser: "clientjam.app/prospector",
        },
        {
          src: cjGenerator,
          alt: "Lead slot machine: Feeling lucky? with category and location reels and a Pull the lever button.",
          caption: "Generator — a lead slot machine for when you don't know where to look next.",
          browser: "clientjam.app/generator",
        },
        {
          src: cjGeneratorResults,
          alt: "Slot machine results: roofers in Denver CO, six nuggets found, each a card with web, SEO and opportunity scores and a Save as lead button.",
          caption: "…and what it pays out: scored businesses, ready to save. (Sample data.)",
        },
      ],
    },
    {
      type: "text",
      kicker: "Brand & voice",
      heading: "Sweet design leads.",
      body: [
        "A raspberry mark, a teal-on-midnight palette, and a vocabulary to match: leads ripen from Unripe to Warming to Ripe berry, the prospector tells you to strike gold, and the slot machine reports nuggets found. A sales tool that doesn't feel like one.",
      ],
    },
    {
      type: "text",
      kicker: "How it's built",
      heading: "From Figma frame to deploy, one person.",
      body: [
        "I design in Figma and build with Claude Code. Owning both ends is what makes rapid product enhancements and deploys possible — the distance between an idea in a frame and a change in production stays short.",
      ],
    },
  ],
};

const phone = (src: StaticImageData, alt: string, caption: string): Media => ({
  src,
  alt,
  caption,
  device: "phone",
});

const hx = {
  costco: phone(
    hx1,
    "Costco Customer Service home: a search field, a Main Menu bar, and a ten-icon grid of tasks such as My Orders, Return/Replace Order, Price Adjustment and Cancel Order.",
    "Costco — top tasks as an icon grid.",
  ),
  fanatics: phone(
    hx2,
    "Fanatics help page on mobile: How can we help you? with a Search for Answers field above a list of topic cards such as Shipping and Handling, Returns and Order Inquiries.",
    "Fanatics — search, then topic cards.",
  ),
  nike: phone(
    hx3,
    "Nike Get Help page on mobile: a single search field, then Quick Assists — an accordion list of Returns, Shipping & Delivery, Orders & Payment and more.",
    "Nike — Quick Assists accordion.",
  ),
  nvidia: phone(
    hx4,
    "NVIDIA Consumer Support on mobile: language selector and knowledge-base search, then Top Support Links grouped under icons for drivers, orders, GeForce NOW and forums.",
    "NVIDIA — knowledge-base search, grouped links.",
  ),
  rei: phone(
    hx5,
    "REI Help Center footer on mobile: Need more help? with a Contact us button, a How are we doing? feedback link, and an email sign-up.",
    "REI — a clear route to a person, and to feedback.",
  ),
  sag: phone(
    hx6,
    "SAG-AFTRA Frequently Asked Questions on mobile: FAQ search with a button, then categories such as Audiobooks, Background and Commercials with their questions listed beneath.",
    "SAG-AFTRA — FAQ categories for members.",
  ),
  sportsmans: phone(
    hx7,
    "Sportsman's Guide FAQ page on mobile: FAQ search with Search and Reset, expand all and collapse all controls, a list of collapsible topics, and a Live Chat tab.",
    "Sportsman's Guide — collapsible topics and live chat.",
  ),
};

const helix: Project = {
  slug: "helix",
  title: "Helix",
  client: "Helix Business Solutions · Oracle Service Cloud",
  tagline: "Self-service help centers for retail and member brands, on Oracle Service Cloud.",
  year: "2017–2018",
  role: "Application and CX Engineer — UX design and front-end",
  disciplines: ["Enterprise SaaS", "Support UX", "Front-end"],
  platform: "Mobile-first web · Oracle Service Cloud",
  intro:
    "Helix implements Oracle Service Cloud for brands with high support volume. I designed the UX of the customer-facing portals and built their front-end components in HTML, CSS, JavaScript and PHP. A help center is used at the worst moment in a customer relationship — an order that didn't arrive, a renewal that failed — so the job is to get people to an answer, or to a person, fast.",
  theme: { ground: "#dde2ea", ink: "#14171c", accent: "#2f45ff" },
  outcome: {
    label: "Task completion",
    value: "~25%",
    note: "faster after simplifying complex support workflows",
  },
  cover: {
    src: hxCover,
    alt: "Four mobile help-center screens side by side: Fanatics, Nike, NVIDIA and SAG-AFTRA.",
  },
  showcase: [hx.fanatics, hx.nike, hx.nvidia, hx.sag, hx.sportsmans],
  blocks: [
    {
      type: "text",
      kicker: "The pattern",
      heading: "Many brands, one anatomy.",
      body: [
        "Every portal answers the same three questions in the same order: where do I search, what do most people come here for, and how do I reach a person. The brand changes; the structure doesn't.",
        "That consistency is what made reusable UI patterns possible across client implementations — and why a new portal didn't start from a blank page.",
      ],
    },
    {
      type: "screens",
      kicker: "01 · Search",
      heading: "The question comes first.",
      body: "A single search field sits at the top, phrased the way a customer would ask — “How can we help you?”, “What can we help you with?” — before any menu.",
      items: [hx.fanatics, hx.nike, hx.nvidia],
    },
    {
      type: "screens",
      kicker: "02 · Top tasks",
      heading: "Two shapes for the same list.",
      body: "Below search come the most common requests. When they're actions — cancel an order, request a price adjustment — they work as an icon grid. When they're topics, a scannable list of categories reads faster.",
      items: [hx.costco, hx.sag],
    },
    {
      type: "screens",
      kicker: "03 · Escalation",
      heading: "Always a way to a person.",
      body: "When self-service runs out, the next step is never hidden: a plain Contact us, a feedback prompt on the page itself, a persistent live-chat tab.",
      items: [hx.rei, hx.sportsmans],
    },
  ],
};

const scorekeeperFilm: Film = {
  src: "/work/sportngin/scorekeeper.mp4",
  poster: "/work/sportngin/scorekeeper-poster.jpg",
  aspect: "852 / 480",
  alt: "Sport Ngin Scorekeeper Hockey on an iPad: signing in, picking the goalie from the roster, setting clock format and live-update options, then scoring a game — start play, goal, choose the scorer and assists, penalty — with web sync on.",
  caption: "Scorekeeper Hockey, Sport Ngin's iPad app for scoring games rinkside. UX design and video production by me. 57 seconds, with sound.",
};

const sportngin: Project = {
  slug: "sportngin",
  title: "Sport Ngin",
  client: "Sport Ngin (now SportsEngine, NBC Sports)",
  tagline: "Live game scoring on the iPad, for a sports SaaS platform used by 500,000+ people.",
  year: "2013–2014",
  role: "User Experience Designer — Scorekeeper UX and video production",
  disciplines: ["SaaS", "Mobile UX", "Video"],
  platform: "iPad app · web platform",
  intro:
    "Sport Ngin's platform ran websites, registration and game scoring for leagues, clubs and tournaments — SaaS serving 500,000+ users across web and mobile. I designed UX for it: wireframes, prototypes and production-ready UI, with a focus on reducing onboarding friction. For Scorekeeper Hockey, the platform's iPad app for scoring games rinkside, I designed the UX and produced the product video.",
  theme: { ground: "#1f232c", ink: "#eef1f5", accent: "#2ba3d4" },
  outcome: {
    label: "Prototyping",
    value: "~25%",
    note: "fewer revision cycles, from rapid prototyping",
  },
  cover: {
    src: snPoster,
    alt: "Scorekeeper Hockey on an iPad: the live scoreboard with Goal, Penalty and Save buttons on both sides, the game clock at 19:12 and a Start Play button.",
  },
  film: scorekeeperFilm,
  showcase: [],
  reel: {
    src: "/work/sportngin/scorekeeper-loop.mp4",
    poster: "/work/sportngin/scorekeeper-loop-poster.jpg",
    aspect: "852 / 480",
    alt: "Scorekeeper Hockey on an iPad: the live scoreboard, logging a goal and choosing the assist.",
  },
  blocks: [
    {
      type: "text",
      kicker: "The platform",
      heading: "Someone at every game has to keep score.",
      body: [
        "Sport Ngin ran leagues and tournaments end to end, from registration to published results. At the rink, that came down to one person with an iPad logging the game as it happened.",
      ],
    },
    {
      type: "text",
      kicker: "Scorekeeper",
      heading: "The game, on an iPad.",
      body: [
        "Goal, penalty and save get the biggest buttons on the screen, and the game clock sits dead center. Logging a goal means picking the scorer and assists straight from the roster. With web sync on, plays are posted to the web as they're logged.",
        "Before a game starts, the scorekeeper sets the clock format and chooses what to track: shots, play locations, live game updates.",
      ],
    },
  ],
};

const offerbuys: Project = {
  slug: "offerbuys",
  title: "OfferBuys",
  client: "OfferBuys",
  tagline: "A name-your-price retail store — identity, bidding flows and browse.",
  year: "2011–2012",
  role: "Contract Web Designer — end-to-end UX/UI",
  disciplines: ["Brand identity", "UX/UI", "E-commerce"],
  platform: "Responsive desktop web",
  intro:
    "OfferBuys asked shoppers to do something unusual: instead of paying the sticker price, make an offer. The interface had to make that mechanic feel as ordinary as adding to cart — price context, offer windows and the status of every open bid, always in reach.",
  theme: { ground: "#ff5a0a", ink: "#ffffff", accent: "#1a1a18", glow: "0 0 18.5px 20px #df4900" },
  slogan: "Retail at your price.",
  cover: {
    src: ob1,
    alt: "OfferBuys homepage showing the Super Deal module: product photo, last sale and average price, an offer field, and offer duration options.",
    browser: "offerbuys.com",
  },
  showcase: [
    { src: ob8, alt: "OfferBuys wordmark lockups in white on brand orange at three sizes." },
    {
      src: ob4,
      alt: "OfferBuys category browse with department, type and style facets and a product grid.",
      browser: "offerbuys.com/women/tops",
    },
  ],
  blocks: [
    {
      type: "text",
      kicker: "The mechanic",
      heading: "Make an offer feel as easy as add-to-cart.",
      body: [
        "The Super Deal module is the heart of the store. It puts the evidence a shopper needs right next to the offer field — last sale and the 30-day average price — and lets them decide how long the offer stands: 24 hours, 48 hours or a week.",
        "Sharing, wish list and comments sit in a quiet side rail, so the primary action never competes with them.",
      ],
    },
    {
      type: "compare",
      heading: "Same page, two people.",
      body: "A first-time visitor lands on the deal. A returning member lands on their own activity — open bids and accepted offers, with offer expiry counted down — before anything else.",
      before: {
        src: ob1,
        alt: "Guest view of the OfferBuys homepage: sign in and register links, Super Deal module first.",
        browser: "offerbuys.com",
      },
      after: {
        src: ob2,
        alt: "Signed-in member view: a Your Bids and Accepted Offers tray appears above the Super Deal.",
        browser: "offerbuys.com",
      },
      labels: ["Guest", "Member"],
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: ob4,
        alt: "Category browse: department, type and style columns with color and size selectors, breadcrumb trail and a 6-column product grid showing last sale prices.",
        caption:
          "Browse by category. Department, type and style facets read left to right like a sentence; color and size sit apart as refinements. Every tile leads with the last sale price.",
        browser: "offerbuys.com/women/tops/casual",
      },
    },
    {
      type: "pair",
      items: [
        {
          src: ob5,
          alt: "Product carousels for related products and new hot sales with paging controls.",
          browser: "offerbuys.com",
        },
        {
          src: ob6,
          alt: "Carousel and site footer with view-by-product and view-by-specialty link lists.",
          browser: "offerbuys.com",
        },
      ],
      caption:
        "Merchandising carousels and the footer index — one reusable carousel pattern, paged and countable.",
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: ob3,
        alt: "Hello Sellers panel with a seller contact form beside a Why OfferBuys explanation.",
        caption:
          "The seller side: an inline inquiry panel that opens over the page instead of sending merchants away.",
        browser: "offerbuys.com/sellers",
      },
    },
    {
      type: "pair",
      items: [
        { src: ob7, alt: "OfferBuys wordmark in orange with the line Retail At Your Price, on white." },
        { src: ob8, alt: "OfferBuys wordmark lockups reversed out in white on brand orange, at three sizes." },
      ],
      caption: "Wordmark and lockups — positive, reversed, and scaled down to the header size.",
    },
  ],
};

const pricegrabber: Project = {
  slug: "pricegrabber",
  title: "PriceGrabber",
  client: "PriceGrabber.com",
  tagline: "Search and product discovery for a comparison-shopping engine.",
  year: "2008–2009",
  role: "Web Designer",
  disciplines: ["Search UX", "Product discovery", "E-commerce"],
  platform: "Desktop web",
  intro:
    "PriceGrabber helped people compare prices across thousands of merchants. I redesigned how they searched and browsed — the moment between knowing roughly what you want and finding the exact product to compare.",
  theme: { ground: "#dfe8d2", ink: "#1b2a12", accent: "#5e9b2a" },
  outcome: {
    label: "Engagement",
    value: "~10%",
    note: "increase after the search and product discovery redesign",
  },
  cover: {
    src: pg1,
    alt: "PriceGrabber electronics homepage with a Sony feature, featured brands and top category icons.",
    browser: "pricegrabber.com/electronics",
  },
  showcase: [
    {
      src: pg2,
      alt: "Search suggestion dropdown, collapsed and expanded, for the query Cam.",
      browser: "pricegrabber.com",
    },
    {
      src: pg7,
      alt: "Shop by Category flyout menu revealing subcategories for Indoor Living.",
    },
    {
      src: pg3,
      alt: "Apparel landing page with The North Face feature and department navigation.",
      browser: "pricegrabber.com/clothing",
    },
    {
      src: pg4,
      alt: "Featured product module for a Nikon D90 and category tabs.",
    },
  ],
  blocks: [
    {
      type: "text",
      kicker: "Search",
      heading: "Help people finish the thought.",
      body: [
        "Suggestions appear as you type and are split in two: category matches first, specific products second. A short query like “Cam” can mean a camera, a camcorder or a camping tent — grouping lets people pick the right lane before they ever hit a results page.",
      ],
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: pg2,
        alt: "The search field shown twice: a collapsed hint state, and an expanded suggestion list grouped into categories and products.",
        caption: "Collapsed and expanded suggestion states for the query “Cam”.",
      },
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: pg7,
        alt: "Shop by Category flyout with the Indoor Living subcategories expanded.",
        caption:
          "Browse without leaving the page — the Shop by Category flyout opens subcategories in place, with examples under each.",
      },
    },
    {
      type: "gallery",
      heading: "Category landings",
      items: [
        {
          src: pg1,
          alt: "Electronics landing page.",
          caption: "Electronics — hero, featured brands, top categories, buying guides.",
          browser: "pricegrabber.com/electronics",
        },
        {
          src: pg3,
          alt: "Clothing landing page with department tabs.",
          caption: "Apparel — department tabs, featured stores and brands.",
          browser: "pricegrabber.com/clothing",
        },
        {
          src: pg4,
          alt: "Featured product module and top categories.",
          caption: "A featured product module that previews price, rating and specs.",
        },
      ],
    },
    {
      type: "pair",
      items: [
        { src: pg5, alt: "My Wishlist module, collapsed and expanded with a Canon EOS 40D offer." },
        { src: pg6, alt: "Account utility tabs in each state: login, register, account and share." },
      ],
      caption:
        "Component states: a sponsored wish-list module (collapsed and open) and the account utility tabs — login, register, your account, share.",
    },
  ],
};

const citysearch: Project = {
  slug: "citysearch",
  title: "Citysearch",
  client: "CityGrid Media · Citysearch",
  tagline: "Local listings, advertiser acquisition and the Best of Citysearch awards.",
  year: "2009",
  role: "Contract Web Designer",
  disciplines: ["UX/UI", "Marketing design", "Print & signage"],
  platform: "Web and print",
  intro:
    "Citysearch connected people with local businesses — and businesses with the people looking for them. The work spanned both sides: the pages consumers used to decide where to go, the pitch to the owners who advertised, and the awards winners could put on display.",
  theme: { ground: "#cfe7f6", ink: "#0d3550", accent: "#2aa3e0" },
  cover: {
    src: cs2,
    alt: "Citysearch Los Angeles listing page for Bar Centro at the Bazaar: ratings, address, hours, photo and related lists.",
    browser: "losangeles.citysearch.com",
  },
  showcase: [
    { src: cs4, alt: "Best of Citysearch 2009 nominee and winner square badges with a skyline illustration." },
    {
      src: cs1,
      alt: "Advertiser landing page explaining the Performance Package.",
      browser: "citysearch.com/advertise",
    },
  ],
  blocks: [
    {
      type: "text",
      kicker: "For businesses",
      heading: "Explain an ad product in four verbs.",
      body: [
        "Local owners don't buy impressions, they buy phone calls. The advertiser page breaks the Performance Package into what it actually does for them — connect, share a video, get results, respond — with real call counts and real reviews as the proof.",
      ],
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: cs1,
        alt: "Advertiser landing page with four modules: Connect, Share a Video, Get Results, Respond, and a Get Started call to action.",
        caption: "Advertiser acquisition — one package, four outcomes, one primary action.",
        browser: "citysearch.com/advertise",
      },
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: cs2,
        alt: "Restaurant listing with star rating, Best of Citysearch badge, hours, parking and editorial lists.",
        caption:
          "The consumer side: a listing page where rating, address and hours come first and editorial lists keep people exploring.",
        browser: "losangeles.citysearch.com/bar-centro",
      },
    },
    {
      type: "text",
      kicker: "Best of Citysearch 2009",
      heading: "One award, many formats.",
      body: [
        "A small system — skyline illustration, sky blue, a single warm accent for the winner line — stretched across horizontal, vertical and square formats for winners and nominees.",
      ],
    },
    {
      type: "pair",
      items: [
        {
          src: cs3,
          alt: "Best of Citysearch 2009 Restaurant Winner signage for Ramos House Cafe, horizontal and vertical.",
        },
        {
          src: cs4,
          alt: "Square Best of Citysearch 2009 Nominee and Winner badges.",
        },
      ],
      caption: "Winner signage in two orientations; nominee and winner badges.",
    },
  ],
};

const velocity: Project = {
  slug: "velocity",
  title: "Velocity Services",
  client: "Velocity Services (Penske Media Corp)",
  tagline: "One template, many brands — portals and email for 150+ client sites.",
  year: "2005–2007",
  role: "Lead Web Designer",
  disciplines: ["Design systems", "Front-end", "Media"],
  platform: "Desktop web",
  intro:
    "At Velocity I led design and front-end development for Hollywood Life and more than 150 client websites. At that volume you don't design pages, you design templates — layouts strong enough to carry a university's colors one day and a pro team's the next.",
  theme: { ground: "#1c1f2b", ink: "#f2f0eb", accent: "#f2c14e" },
  outcome: {
    label: "Scale",
    value: "150+",
    note: "client websites — design and front-end led, plus Hollywood Life",
  },
  cover: {
    src: vs3,
    alt: "MyUtahJazz.com portal promoting free email, a free portal and a free toolbar.",
    browser: "myutahjazz.com",
  },
  showcase: [
    { src: vs1, alt: "VSI.net email sign-in page.", browser: "vsi.net" },
    { src: vs5, alt: "Stanford Cardinal email sign-in page built on the same template.", browser: "gostanford.com" },
    { src: vs2, alt: "Hollywood Life homepage.", browser: "hl.com" },
  ],
  blocks: [
    {
      type: "compare",
      heading: "One template, re-skinned.",
      body: "The same sign-in layout — form, member pitch, support line — carried two completely different brands. Drag to compare.",
      before: { src: vs1, alt: "VSI.net sign-in page.", browser: "vsi.net" },
      after: { src: vs5, alt: "Stanford Cardinal sign-in page.", browser: "gostanford.com" },
      labels: ["VSI.net", "Stanford"],
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: vs3,
        alt: "MyUtahJazz.com portal with three product columns: free email, free portal, free toolbar.",
        caption: "Team-branded portal — three products, three calls to action, one grid.",
        browser: "myutahjazz.com",
      },
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: vs4,
        alt: "Personalized portal homepage with search, news carousel, category tiles and weather.",
        caption: "A personalized portal home: search, a featured story carousel, channel tiles and local weather.",
      },
    },
    {
      type: "image",
      size: "wide",
      media: {
        src: vs2,
        alt: "Hollywood Life homepage with top stories, contest promotion and daily blog.",
        caption: "Hollywood Life — entertainment news with a dense, ad-supported front page.",
        browser: "hl.com",
      },
    },
  ],
};

export const projects: Project[] = [clientjam, helix, sportngin, offerbuys, pricegrabber, citysearch, velocity];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNeighbors(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}

/* ------------------------------------------------------------------
   Recent practice — real work from the résumé without supplied
   visuals. Shown typographically. When screenshots arrive, promote
   an entry into `projects` above.
------------------------------------------------------------------- */

export type Note = {
  title: string;
  context: string;
  period?: string;
  points: string[];
  tags: string[];
  /** Slug of the case study this became, if any */
  project?: string;
  /** What would turn this into a full case study */
  assetsNeeded: string;
};

export const recent: Note[] = [
  {
    title: "AI-Assisted Design Workflow",
    context: "Concept / Ongoing",
    points: [
      "Integrated AI tools (ChatGPT, Claude) for ideation, UX writing, and rapid prototyping",
      "Reduced concept-to-wireframe time by ~40–60% through prompt-driven iteration",
      "Designed UX patterns for AI interfaces: dynamic content generation, validation flows",
    ],
    tags: ["AI", "Prototyping", "UX writing"],
    assetsNeeded: "Before/after wireframes, prompt-to-prototype sequence, AI interface pattern frames",
  },
  {
    title: "Sports SaaS Platform",
    context: "SportsEngine · 500,000+ users · Web & Mobile",
    period: "2013–2014",
    points: [
      "Improved onboarding and usability flows, reducing friction and increasing engagement",
      "Delivered wireframes, prototypes, and production-ready UI across web and mobile",
    ],
    tags: ["SaaS", "Onboarding", "Mobile"],
    project: "sportngin",
    assetsNeeded: "Onboarding flow, wireframes, mobile screens",
  },
];
