export const site = {
  brand: "GameChanger AI",
  established: "Est. 2025 · Vancouver / Santa Cruz / Medellín",
  positioning:
    "Boutique AI consultancy helping operators turn today's tools into measurable business wins.",
  email: "hello@gamechanger-ai.dev",
  cities: ["Vancouver", "Santa Cruz", "Medellín"],
  nav: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Proof", href: "#proof" },
    { label: "Team", href: "#team" },
    { label: "FAQ", href: "#faq" },
  ],
  footerNav: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Proof", href: "#proof" },
    { label: "Team", href: "#team" },
    { label: "Fit", href: "#fit" },
    { label: "FAQ", href: "#faq" },
  ],
};

export const hero = {
  kicker: "Boutique AI consultancy · The agentic era",
  headline: "AI that makes your business measurably better — this quarter, not someday.",
  lede: "The agentic era is here. What was impossible two weeks ago is shippable today. We help operators turn this moment into wins across processes, people, and customers — in weeks, not quarters.",
  meta: [
    { term: "Practice", detail: "Audit · Design · Implementation" },
    { term: "Engagement", detail: "2–4 weeks from kickoff to a working prototype" },
    { term: "Sector", detail: "Mid-market · Legacy operations · 50–500 FTE" },
  ],
  primaryCta: { label: "Book the working session →", href: "#cta" },
  secondaryCta: { label: "What we do ↓", href: "#services" },
  ctaNote: "Working sessions that ship real prototypes.",
};

export const heroStats = [
  {
    value: "2–4",
    unit: "weeks",
    label: "from kickoff to a working prototype",
    kind: "Velocity",
  },
  {
    value: "1",
    unit: "team",
    label: "maps, designs, and ships alongside yours — end to end",
    kind: "Team",
  },
  {
    value: "Now",
    unit: "",
    label: "the agentic era is wide open for operators",
    kind: "Moment",
  },
];

export const services = [
  {
    title: "AI audits that surface the highest-leverage wins",
    description:
      "We map how work flows through your people, systems, and customer moments, then pinpoint where AI and agents create speed, sharper decisions, and standout experiences.",
    tag: "Audit",
  },
  {
    title: "Workflow design that respects the stack you already run",
    description:
      "We design around the tools, data, and teams already in place, so wins compound instead of triggering another platform rebuild.",
    tag: "Design",
  },
  {
    title: "Working software in the time it takes to prepare a deck",
    description:
      "The feedback loop moves at the speed of the technology. We scope, prototype, and ship AI and agent workflows fast — so you learn from real usage, not slides.",
    tag: "Implement",
  },
  {
    title: "Internal AI tools your team will reach for every day",
    description:
      "Copilots, knowledge assistants, intake flows, quoting helpers, reporting layers, and agentic decision support — built to feel like leverage, not another tool to wrangle.",
    tag: "Adopt",
  },
];

export const processSteps = [
  {
    index: "01",
    title: "Map the landscape",
    description:
      "We study your people, workflows, and systems to find where AI creates the biggest lift — commercial, operational, experiential.",
    chip: "bone" as const,
  },
  {
    index: "02",
    title: "Design the path",
    description:
      "We simplify the workflow, pick the right AI and agent surfaces, and sequence the work so momentum builds from week one.",
    chip: "yellow" as const,
  },
  {
    index: "03",
    title: "Ship the useful layer",
    description:
      "In weeks, not quarters, we stand up prototypes tied to real data, real decisions, and real customer moments.",
    chip: "cobalt" as const,
    ai: true,
  },
  {
    index: "04",
    title: "Grow adoption, compound wins",
    description:
      "We tune prompts, interfaces, and operating rhythms around real usage, so AI becomes part of the work — and every process, person, and customer feels the lift.",
    chip: "black" as const,
  },
];

export const team = [
  {
    name: "Marc Snegg",
    role: "Commercial strategy · North America relationships",
    bio: "15-year career as an operator, real estate investor, and founder of GroundGame, building nearshore sales teams for client businesses.",
    img: "/assets/marc.png" as string | undefined,
  },
  {
    name: "JP Domínguez",
    role: "Systems · Workflow design · Implementation",
    bio: "PhD + 15 years running projects and estimation across construction, environmental, and international infrastructure. Translates operational complexity into AI systems that fit the business you already run.",
    img: "/assets/jp.png" as string | undefined,
  },
  {
    name: "Juan Trujillo",
    role: "Internal tools · Automation · Delivery",
    bio: "Ex-Google engineer (Android, Play Services, Fi) turned fintech CTO. Co-founder of Tixpert.ai. 20 years shipping systems at billion-user scale.",
    img: "/assets/truji.png" as string | undefined,
  },
];

export const fit = {
  for: [
    "Operators ready to move while the agentic era is wide open",
    "Teams with real data, real customers, real constraints",
    "Leaders who want ambition paired with weekly, shippable rollout",
  ],
  wins: [
    "Processes that move faster with less friction",
    "Customers who notice the difference in speed, polish, and responsiveness",
    "Teams that feel more powerful because the tools finally fit the work",
    "Compounding leverage as AI gets woven deeper into daily operations",
  ],
};

export const faqs = [
  {
    question: "What do you actually do?",
    answer:
      "We audit, design, and ship AI and agent systems that create real business wins — copilots, intake flows, reporting layers, automations, and customer-facing experiences built on the systems you already run.",
  },
  {
    question: "Do you replace our current software stack?",
    answer:
      "Almost never. The biggest wins come from making the systems and data you already rely on sharper, faster, smarter — with AI woven in where the leverage is obvious.",
  },
  {
    question: "What kinds of companies are a fit?",
    answer:
      "Businesses ready to move while the window is open — more throughput, better customer experience, stronger teams.",
  },
  {
    question: "How do you handle adoption?",
    answer:
      "By shipping tools people genuinely want to use. When software saves time, sharpens decisions, or delights a customer, adoption takes care of itself.",
  },
];

export const proof = {
  kicker: "Case study · 01",
  title: "GameTime",
  summary:
    "Operator-led partnership bringing AI and agent workflows into a fast-moving commercial team.",
  meta: [
    { k: "Sector", v: "Consumer · Commercial ops" },
    { k: "Role", v: "AI audit · Workflow design · Internal tools" },
    { k: "Engagement", v: "2026 · Ongoing" },
  ],
  items: [
    "Mapped the commercial and operations workflow end-to-end to find where AI and agent workflows removed the most friction.",
    "Designed a focused internal toolset on top of the systems the team already runs, so adoption did not depend on a platform rebuild.",
    "Shipped the first working prototype inside the first few weeks — running on live work, not slides.",
  ],
};

export const beforeAfter = {
  before: {
    label: "State 01",
    text: "Talented teams, legacy systems, and inefficiencies everyone can feel but no one has time to rethink.",
    meta: "Spreadsheets · Inboxes · Tribal knowledge",
    ticker: [
      "INV-4471 · waiting on approval",
      "RFQ-228 · forwarded → inbox",
      "SO-1183 · stuck in spreadsheet v14",
      "TICKET-9920 · reassigned 3x",
      "BATCH-204 · manual reconcile",
      "INV-4472 · awaiting CFO sign-off",
    ],
  },
  after: {
    label: "State 02",
    text: "Sharper customer experiences, faster workflows, teams that feel more powerful — AI and agents in daily operations.",
    meta: "Map · Design · Ship · Compound",
    ticker: [
      "INV-4471 · auto-routed → JD",
      "RFQ-228 · drafted → sent",
      "SO-1183 · reconciled",
      "TICKET-9920 · triaged in 4s",
      "BATCH-204 · closed by op",
      "INV-4472 · approved by rule",
    ],
  },
};

export const diagram = {
  rows: [
    {
      key: "intake",
      label: "Intake",
      nodes: [
        { idx: "01", label: "email" },
        { idx: "02", label: "ticket" },
        { idx: "03", label: "sheet" },
      ],
    },
    {
      key: "decision",
      label: "Decision",
      nodes: [
        { idx: "04", label: "triage" },
        { idx: "AI", label: "AI", ai: true },
        { idx: "05", label: "approve" },
      ],
    },
    {
      key: "output",
      label: "Output",
      nodes: [
        { idx: "06", label: "dispatch" },
        { idx: "07", label: "reply" },
        { idx: "08", label: "export" },
      ],
    },
  ],
};

export const marquee = [
  "Booking · Q2 2026",
  "3 slots open",
  "Next start · WK 18",
  "Vancouver",
  "Santa Cruz",
  "Medellín",
  "Working sessions",
  "Prototypes in weeks",
];

export const cta = {
  eyebrow: "Get started",
  headline:
    "What was impossible two weeks ago is shippable today. Let's turn that into wins for your business.",
  note: "Book a working session. We'll map the highest-leverage wins and sketch the first prototype together.",
  kv: [
    { k: "Response", v: "Within 2 business days" },
    { k: "Intro call", v: "45 minutes" },
    { k: "Scope", v: "2–4 week audit" },
  ],
};
