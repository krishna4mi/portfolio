/* global window */
// Dummy project showcase — original concept pieces (not replicas of prior employers' real UIs)
const PROJECTS = [
  {
    n: "01",
    title: "Meridian",
    titleIt: "Trading Desk",
    role: "Realtime data viz · Lead Frontend",
    year: "2025",
    tags: ["React", "WebGL", "WebSockets", "D3"],
    desc: "An institutional trading workstation rendering 120k ticks/sec on a single canvas layer. Virtualized order book, DOM ladder, and a custom GPU-accelerated candlestick shader.",
    palette: ["#0A0E14", "#E86C2A", "#64FFDA"],
    kind: "grid"
  },
  {
    n: "02",
    title: "Paperlane",
    titleIt: "CMS",
    role: "Product design + engineering",
    year: "2024",
    tags: ["Next.js", "tRPC", "Postgres"],
    desc: "A block-based editor for long-form journalism. Real-time co-editing, CRDT conflict resolution, and a typography engine that respects optical sizing at every scale.",
    palette: ["#1F1A14", "#E86C2A", "#EDE5D3"],
    kind: "editor"
  },
  {
    n: "03",
    title: "Orrery",
    titleIt: "Analytics",
    role: "Three.js · Data viz",
    year: "2024",
    tags: ["Three.js", "GLSL", "WebGPU"],
    desc: "A 3D dependency graph for microservice telemetry. Force-directed layout, instanced meshes for 20k nodes, custom post-processing for a soft bloom on critical paths.",
    palette: ["#0E0A1C", "#7A9BC7", "#E86C2A"],
    kind: "orb"
  },
  {
    n: "04",
    title: "Finch",
    titleIt: "Field Ops",
    role: "Angular · Offline-first",
    year: "2023",
    tags: ["Angular", "IndexedDB", "PWA"],
    desc: "A ruggedized tablet app for utility field technicians. Works two weeks offline, syncs 800MB of imagery in background, reduced average job time by 32%.",
    palette: ["#14140E", "#E86C2A", "#C9CFAE"],
    kind: "mobile"
  },
  {
    n: "05",
    title: "Pellucid",
    titleIt: "Design System",
    role: "Tokens · Docs · Governance",
    year: "2023",
    tags: ["Style Dictionary", "Storybook", "RFC"],
    desc: "A tri-platform token pipeline producing web, iOS, and Android primitives from one source of truth. Adopted by 14 product teams, cut net CSS by 41%.",
    palette: ["#16141C", "#E86C2A", "#B7ADFF"],
    kind: "tokens"
  },
  {
    n: "06",
    title: "Halftone",
    titleIt: "Generative",
    role: "Creative coding",
    year: "2022",
    tags: ["Canvas", "Simplex", "Web Audio"],
    desc: "An audio-reactive poster generator. FFT-driven halftone rasters render 6000×9000 print plates in-browser, exportable as layered SVG for screen-printing.",
    palette: ["#0E0E0E", "#E86C2A", "#F1ECE3"],
    kind: "poster"
  }
];

const EXPERIENCE = [
  {
    when: "2023 — NOW",
    role: "Senior Software Developer",
    co: "GlobalLogic — Google (RPP Tool)",
    desc: "Lead frontend on an internal access-management platform. Built role-based request tracking, bulk-ops tooling, and a gRPC-backed real-time status layer used by thousands of Googlers."
  },
  {
    when: "2021 — 2023",
    role: "Frontend Engineer",
    co: "UST Global — Dell (PAC OCA)",
    desc: "Rebuilt a legacy manufacturing admin portal in React + TypeScript. Introduced a component library, scoped role/permission model, and SKU-traceability views used across the production floor."
  },
  {
    when: "2019 — 2021",
    role: "Digital Solutions Developer",
    co: "Deloitte USI",
    desc: "Shipped interactive web games, internal tools, and SharePoint animation systems. Won the Rockstar award for a campaign game built in two months from scratch."
  },
  {
    when: "2017 — 2019",
    role: "Full-Stack Developer",
    co: "Ivory Innovation — TopSocial",
    desc: "Influencer-brand marketplace in Angular 7 + Node. Designed the campaign-participation flow and the three-sided admin/brand/creator dashboards."
  },
  {
    when: "2016 — 2017",
    role: "Junior Developer",
    co: "VSOSCO — Prepaid Meters",
    desc: "NFC-integrated utility metering portal. Built consumer self-service UI and a two-way messaging layer to smart meters over PostgreSQL + Express."
  }
];

const SKILLS = [
  { head: "Frontend", items: ["React", "Angular", "TypeScript", "Three.js", "WebGL"] },
  { head: "Platform",  items: ["Node.js", "Express", "gRPC", "PostgreSQL", "MongoDB"] },
  { head: "Craft",    items: ["Design Systems", "Motion", "Perf Tuning", "A11y", "Creative Code"] }
];

const AWARDS = [
  { yr: "2020", ttl: "Rockstar", it: "Award", body: "Recognized at Deloitte for shipping an interactive campaign game within 60 days of joining the team." },
  { yr: "2019", ttl: "BrightStar", it: "Award", body: "Honored as a core efficiency expert for inline SVG animation research that became team standard." },
  { yr: "2019", ttl: "Spot", it: "Award", body: "For raising the functional bar on SharePoint delivery and opening a new scope of page-level interactivity." }
];

window.PROJECTS = PROJECTS;
window.EXPERIENCE = EXPERIENCE;
window.SKILLS = SKILLS;
window.AWARDS = AWARDS;
