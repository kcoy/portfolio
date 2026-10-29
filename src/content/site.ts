/**
 * Site-wide facts. Source of truth: docs/RESUME_Kevin-Coy.pdf.
 * Edit here — every page reads from this file.
 */

export const site = {
  name: "Kevin Coy",
  role: "Product Designer (UX/UI)",
  focus: "SaaS · AI-Driven Experiences",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kevincoy.design",
  email: "kcoy.design@gmail.com",
  linkedin: "https://www.linkedin.com/in/kevincoy",
  linkedinLabel: "linkedin.com/in/kevincoy",
  resumePdf: "/Kevin-Coy-Resume.pdf",
  description:
    "Kevin Coy is a product designer with 15+ years designing SaaS and web experiences across enterprise and consumer platforms — from discovery through high-fidelity UI and front-end implementation.",
} as const;

export const summary = [
  "Product Designer with 15+ years designing scalable SaaS and web experiences across enterprise and consumer platforms. Expert at translating complex systems into intuitive, high-impact interfaces that drive usability, engagement, and operational efficiency.",
  "Proven end-to-end ownership: discovery through high-fidelity UI and front-end implementation. Strong collaborator with PMs and engineers. Recently focused on AI-assisted design workflows — leveraging generative tools for rapid prototyping, UX writing, and iterative exploration.",
];

export type Role = {
  title: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  points: string[];
  /** slug of a related case study, if one exists */
  project?: string;
};

export const experience: Role[] = [
  {
    title: "Founder",
    company: "ClientJam",
    location: "Web Application",
    start: "Apr 2025",
    end: "Present",
    points: [
      "AI-powered lead generation for designers and agencies",
      "Utilization of Figma + Claude Code allowed for rapid product enhancements and deploys",
    ],
    project: "clientjam",
  },
  {
    title: "Application and CX Engineer",
    company: "Helix Business Solutions",
    location: "Bozeman, MT",
    start: "May 2017",
    end: "May 2018",
    points: [
      "Designed UX for enterprise SaaS (Oracle Service Cloud) — reduced user friction",
      "Built front-end components: HTML, CSS, JS, PHP; cut design-to-dev iteration",
    ],
    project: "helix",
  },
  {
    title: "User Experience Designer",
    company: "Sport Ngin (NBC Sports / SportsEngine)",
    location: "Minneapolis, MN",
    start: "May 2013",
    end: "Feb 2014",
    points: [
      "Designed UX for SaaS platform serving 500,000+ users across web and mobile",
      "Reduced onboarding friction; rapid prototyping cut revision cycles ~25%",
    ],
    project: "sportngin",
  },
  {
    title: "Web Designer (Contracts)",
    company: "Sempris · OfferBuys · CityGrid Media · Citysearch",
    start: "Jun 2009",
    end: "Feb 2013",
    points: ["End-to-end UX/UI across multiple client platforms"],
  },
  {
    title: "Web Designer",
    company: "PriceGrabber.com",
    location: "Los Angeles, CA",
    start: "Feb 2008",
    end: "Apr 2009",
    points: [
      "Redesigned search and product discovery for e-commerce; increased engagement ~10%",
    ],
    project: "pricegrabber",
  },
  {
    title: "Lead Web Designer",
    company: "Velocity Services (Penske Media Corp)",
    location: "El Segundo, CA",
    start: "Nov 2005",
    end: "Aug 2007",
    points: [
      "Led design and front-end development for Hollywood Life and 150+ client websites",
    ],
    project: "velocity",
  },
  {
    title: "Lead Web Designer",
    company: "Headquarters.com",
    location: "Milwaukee, WI",
    start: "Oct 2004",
    end: "Jun 2005",
    points: [
      "Designed and developed client websites end-to-end; improved SEO and user engagement",
    ],
  },
];

export const capabilities = [
  {
    title: "UX Strategy & Research",
    body: "Framing the problem before the pixels. Discovery, flows and information architecture for products with real operational complexity.",
  },
  {
    title: "Interaction Design",
    body: "States, edge cases and the moments in between — search, filtering, onboarding and the workflows people repeat all day.",
  },
  {
    title: "Design Systems",
    body: "Reusable UI patterns built to scale across multi-client implementations, white-label products and teams.",
  },
  {
    title: "Prototyping & Wireframing",
    body: "From low-fidelity flows to production-ready UI across web and mobile, fast enough to learn from.",
  },
  {
    title: "AI-Assisted Workflows",
    body: "ChatGPT and Claude in the loop for ideation, UX writing and rapid prototyping — plus UX patterns for AI interfaces themselves.",
  },
  {
    title: "Front-End Implementation",
    body: "HTML, CSS, JavaScript and PHP. Designs that survive contact with the codebase, because I can build them.",
  },
];

export const tools = [
  { group: "Design", items: ["Figma", "Claude Code"] },
  { group: "Creative", items: ["Adobe Creative Suite"] },
  { group: "Front-End", items: ["HTML5", "CSS3", "JavaScript", "PHP"] },
];

export const approach = [
  "Agile / Scrum",
  "Cross-functional teams",
  "Stakeholder alignment",
  "Iterative prototyping",
];

export const education = {
  degree: "AAS, Visual Communication & Computer Graphics",
  school: "Milwaukee Area Technical College",
};
