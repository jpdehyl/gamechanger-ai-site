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
    { label: "Team", href: "#team" },
    { label: "FAQ", href: "#faq" },
  ],
  footerNav: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Team", href: "#team" },
    { label: "Fit", href: "#fit" },
    { label: "FAQ", href: "#faq" },
  ],
};

export const hero = {
  kicker: "Visionary, but practical",
  headline: "AI that makes your business measurably better — this quarter, not someday.",
  lede: "What's possible today wasn't possible two weeks ago. We partner with operators to turn this moment into wins across your processes, your people, your communications, and your customers — shipped in weeks, not quarters.",
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
    label: "from kickoff to a working prototype your team can use",
    kind: "Velocity",
  },
  {
    value: "1",
    unit: "team",
    label: "that maps, designs, and ships alongside yours — one team, end to end",
    kind: "Team",
  },
  {
    value: "Now",
    unit: "",
    label: "the window to turn AI into compounding wins is wide open",
    kind: "Moment",
  },
];

export const services = [
  {
    title: "AI audits that surface the highest-leverage wins",
    description:
      "We map how work really flows through your people, systems, and customer moments — then pinpoint where AI creates speed, sharper decisions, and experiences that dazzle the people you serve.",
    tag: "Audit",
  },
  {
    title: "Workflow design that respects the stack you already run",
    description:
      "We design around the tools, data, and teams already in place, so wins compound instead of triggering another platform rebuild. Visionary ambition, practical rollout.",
    tag: "Design",
  },
  {
    title: "Working software in the time it takes to prepare a deck",
    description:
      "The feedback loop now moves at the speed of the technology. We scope, prototype, and ship useful internal tools fast — so you learn from real usage instead of slides.",
    tag: "Implement",
  },
  {
    title: "Internal AI tools your team will reach for every day",
    description:
      "Copilots, knowledge assistants, intake flows, quoting helpers, reporting layers, and decision support — built to feel like leverage across your processes, your people, your communications, and your customers.",
    tag: "Adopt",
  },
];

export const processSteps = [
  {
    index: "01",
    title: "Map the landscape",
    description:
      "We study the people, workflows, and systems in play to find the moments where AI can create the biggest lift — commercial, operational, and experiential.",
    chip: "bone" as const,
  },
  {
    index: "02",
    title: "Design the path",
    description:
      "We simplify the workflow, choose the right AI surfaces, and sequence the work so momentum builds from week one — on top of the systems you already rely on.",
    chip: "yellow" as const,
  },
  {
    index: "03",
    title: "Ship the useful layer",
    description:
      "In weeks, not quarters, we stand up prototypes your team can actually use — tied to real data, real decisions, and real customer moments.",
    chip: "cobalt" as const,
    ai: true,
  },
  {
    index: "04",
    title: "Grow adoption, compound wins",
    description:
      "We tune prompts, interfaces, and operating rhythms around real usage, so AI becomes part of the work and every process, person, and customer feels the leverage.",
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
    bio: "Translates operational complexity into AI systems that make businesses measurably faster, sharper, and more delightful to interact with — with a bias toward legacy environments and practical rollout.",
    img: "/assets/jp.png" as string | undefined,
  },
  {
    name: "Juan Trujillo",
    role: "Internal tools · Automation · Delivery",
    bio: "Turns designs into internal products people love to use — automations and AI tools that give teams back hours and customers a noticeably smoother experience.",
    img: "/assets/truji.png" as string | undefined,
  },
];

export const fit = {
  for: [
    "Operators ready to turn this moment into measurable business wins",
    "Teams with real data, real customers, and real constraints — not greenfield fantasy",
    "Leaders who want visionary ambition paired with practical, weekly rollout",
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
      "We partner with operators to audit, design, and ship AI that creates real business wins — internal copilots, intake flows, reporting layers, automations, and customer-facing experiences that feel like magic against the systems you already run.",
  },
  {
    question: "Do you replace our current software stack?",
    answer:
      "Almost never. The biggest wins usually come from making the systems and data you already rely on sharper, faster, and smarter — then weaving AI in where the leverage is obvious.",
  },
  {
    question: "What kinds of companies are a fit?",
    answer:
      "Businesses ready to move while the window is wide open — more throughput, better customer experience, stronger teams. If you're excited about what's suddenly possible, we'll build it with you.",
  },
  {
    question: "How do you handle adoption?",
    answer:
      "By shipping tools people genuinely want to use. When software saves time, sharpens decisions, or delights a customer, adoption takes care of itself and the wins compound from there.",
  },
];

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
    text: "Dazzling customer experiences, faster workflows, and teams that feel more powerful — AI woven into daily operations.",
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
    "What's possible today wasn't possible two weeks ago. Let's turn that into measurable wins for your business.",
  note: "Book a working session. We'll map the highest-leverage wins, design the path, and sketch the first prototype together.",
  kv: [
    { k: "Response", v: "Within 2 business days" },
    { k: "Intro call", v: "45 minutes" },
    { k: "Scope", v: "2–4 week audit" },
  ],
};
