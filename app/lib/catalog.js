/* ============================================================
   Catalog — single source of truth for the detail pages.
   ------------------------------------------------------------
   Two collections (services + solutions) share one shape, so a
   single template (<DetailView/>) and one set of routes render
   them all. Copy lives here, not in components, so the marketing
   text and the JSON-LD on each page never drift apart.

   Pure data only — no JSX/icon imports — so this module is safe
   to import from Server Components (metadata, structured data)
   and Client Components alike. Icons are referenced by lucide
   name and resolved in <DetailView/>; demos are referenced by
   key and resolved in <DemoMount/>.

   Shape:
     kind        "service" | "solution"
     slug        URL segment (unique across BOTH collections)
     icon        lucide-react export name
     label       short kicker shown in the eyebrow
     name        page + tile title
     tagline     one-line promise (hero subhead / tile body)
     summary     hero paragraph (2–3 sentences)
     heroMetric  { value, label } — the headline number
     demo        DemoMount key | null
     how         [{ n, title, body }]  — "How it works"
     capabilities[{ title, body }]      — "What you get"
     industries  [industry labels]      — "Who it's for"
     metrics     [{ value, label }]     — outcomes band
     related     [slug]  — cross-links (resolved via bySlug)
     faqs        [{ q, a }] — focused subset for this page
   ============================================================ */

export const SERVICES = [
  {
    kind: "service",
    slug: "ai-agents",
    icon: "Bot",
    label: "Service",
    name: "AI agents",
    tagline: "Autonomous agents that run real workflows end to end.",
    summary:
      "We build AI agents that don't just answer questions — they do the work. They qualify leads, reply to customers, update your systems, and escalate the edge cases to a human with full context, around the clock, without adding headcount.",
    heroMetric: { value: "24/7", label: "Runs unattended, every day" },
    demo: "inbox",
    how: [
      { n: "01", title: "Scope the job", body: "We pick one workflow an agent can own end to end — and the number that proves it's working." },
      { n: "02", title: "Wire the tools", body: "The agent gets least-access connections to your CRM, inbox, calendar, and docs so it can actually act, not just talk." },
      { n: "03", title: "Guardrail & ship", body: "We set the rules, the escalation points, and the tone, then ship to production behind monitoring." },
      { n: "04", title: "Tune in the open", body: "You watch every action in a live log. We tune against real traffic until it beats the target." },
    ],
    capabilities: [
      { title: "Acts, doesn't just chat", body: "Books meetings, updates records, sends follow-ups, and triggers workflows in the tools you already run." },
      { title: "Knows when to stop", body: "Hands off to the right person the moment a decision needs judgement — with the full thread attached." },
      { title: "On-brand by design", body: "Tone, policies, and do-not-say rules are configured up front and enforced on every reply." },
      { title: "Fully observable", body: "Every action is logged and replayable, so you can audit exactly what it did and why." },
    ],
    industries: ["Real estate & brokerage", "Clinics & aesthetics", "Professional services", "E-commerce & retail"],
    metrics: [
      { value: "1.2 sec", label: "First response time" },
      { value: "70%+", label: "Inbound handled without a human" },
      { value: "0", label: "Leads left waiting overnight" },
    ],
    related: ["inbox-agent", "scout", "desk"],
    faqs: [
      { q: "Will the agent act on its own, or just suggest?", a: "It acts. Within the guardrails we agree, the agent completes the task — replying, booking, updating your CRM — and only routes to a person when a decision genuinely needs human judgement, with full context attached." },
      { q: "How do we stay in control of what it does?", a: "Every action runs against rules you approve, and every action is logged and replayable. You can watch the live activity feed, adjust the guardrails, or pause the agent at any time." },
    ],
  },
  {
    kind: "service",
    slug: "workflow-automation",
    icon: "Workflow",
    label: "Service",
    name: "Workflow automation",
    tagline: "Connect the tools you already use and delete the busywork between them.",
    summary:
      "Most teams lose hours every week to copy-paste, re-keying, and chasing updates between systems that don't talk to each other. We connect those systems and automate the hand-offs, so the work flows on its own and your people stop being the integration layer.",
    heroMetric: { value: "Hours", label: "Back every week, per team" },
    demo: null,
    how: [
      { n: "01", title: "Map the flow", body: "We trace a process step by step and mark every manual hand-off, re-key, and wait state." },
      { n: "02", title: "Find the friction", body: "We rank each step by time lost and error rate, then target the ones worth automating first." },
      { n: "03", title: "Build the bridge", body: "We connect the systems through APIs, webhooks, or exports — whatever the tools support." },
      { n: "04", title: "Run it for real", body: "We ship, monitor, and keep the automation healthy as your tools and volumes change." },
    ],
    capabilities: [
      { title: "Works with your stack", body: "WhatsApp Business, HubSpot, Salesforce, Zoho, Slack, Gmail, Outlook, Sheets, and most ERPs." },
      { title: "No platform switch", body: "Your team keeps the tools they know. We automate the seams between them, not the tools themselves." },
      { title: "Clean data downstream", body: "Validation and de-duplication built into every hand-off, so the automation doesn't just move bad data faster." },
      { title: "Resilient by default", body: "Retries, alerts, and a human fallback for anything that needs eyes — no silent failures." },
    ],
    industries: ["Logistics & trading", "Professional services", "Financial & insurance", "E-commerce & retail"],
    metrics: [
      { value: "8–12 hrs", label: "Saved per person, per week" },
      { value: "90%+", label: "Fewer manual re-keys" },
      { value: "1", label: "Source of truth, not five" },
    ],
    related: ["pipeline", "parser", "pulse"],
    faqs: [
      { q: "What if our tools don't have a clean API?", a: "We can usually still automate it. If a system has an API, a webhook, or even a scheduled export, we can connect it — and where nothing exists, we design a reliable workaround rather than forcing you onto new software." },
      { q: "Will this break when we change a tool?", a: "Automations are monitored, so a breaking change alerts us rather than failing silently. When you swap or upgrade a tool, we adjust the connection — keeping the workflow intact is part of operating it." },
    ],
  },
  {
    kind: "service",
    slug: "conversational-ai",
    icon: "MessagesSquare",
    label: "Service",
    name: "Conversational AI",
    tagline: "WhatsApp, web, and voice assistants that reply instantly and hand off cleanly.",
    summary:
      "Your customers expect an answer now, not in business hours. We build conversational assistants that reply in seconds across WhatsApp, web chat, and voice — holding context across the whole conversation and handing off to your team, with the full thread, the moment it matters.",
    heroMetric: { value: "1.2 sec", label: "Average first reply" },
    demo: "inbox",
    how: [
      { n: "01", title: "Learn your answers", body: "We ground the assistant in your real FAQs, policies, pricing logic, and tone of voice." },
      { n: "02", title: "Wire the channels", body: "WhatsApp Business, web chat, and voice all run through one brain, so context follows the customer." },
      { n: "03", title: "Set the hand-off", body: "We define exactly when and how it routes to a human, and what context goes with them." },
      { n: "04", title: "Improve from transcripts", body: "Real conversations feed back in, so the assistant gets sharper every week in production." },
    ],
    capabilities: [
      { title: "Holds context", body: "Remembers what was said earlier in the conversation — no making the customer repeat themselves." },
      { title: "One brain, every channel", body: "WhatsApp, web, and voice share the same knowledge, so answers are consistent everywhere." },
      { title: "Clean human hand-off", body: "Escalates with the full transcript and a summary, so your team picks up mid-stream without friction." },
      { title: "Grounded, not guessing", body: "Answers come from your approved content, with clear fallbacks when it doesn't know." },
    ],
    industries: ["Clinics & aesthetics", "Real estate & brokerage", "E-commerce & retail", "Professional services"],
    metrics: [
      { value: "45 min → 1.2 sec", label: "Response time" },
      { value: "24/7", label: "Coverage, after hours included" },
      { value: "40%", label: "Faster resolution" },
    ],
    related: ["inbox-agent", "desk", "ai-agents"],
    faqs: [
      { q: "Will it sound like a robot?", a: "No. We configure tone and phrasing to match your brand, and the assistant is grounded in your real answers. Customers get fast, on-brand replies — and a clean hand-off to a person whenever the conversation calls for one." },
      { q: "Can it handle WhatsApp specifically?", a: "Yes. WhatsApp Business is one of the most common channels we deploy on, alongside web chat and voice. All three run through the same knowledge base, so context follows the customer between them." },
    ],
  },
  {
    kind: "service",
    slug: "document-intelligence",
    icon: "FileText",
    label: "Service",
    name: "Document intelligence",
    tagline: "Read contracts, invoices, and forms automatically — extract, validate, route.",
    summary:
      "Paperwork is where hours and accuracy quietly leak. We deploy systems that read contracts, invoices, and forms the moment they arrive, pull out the data that matters, validate it against your rules, and push it into the right system — flagging only what genuinely needs a human eye.",
    heroMetric: { value: "3 hrs → 45 sec", label: "Per document audit" },
    demo: "parser",
    how: [
      { n: "01", title: "Define what matters", body: "We agree the fields, terms, and red flags worth extracting from each document type." },
      { n: "02", title: "Teach the reader", body: "The system learns your layouts — invoices, contracts, forms — and where the data lives." },
      { n: "03", title: "Validate & route", body: "Extracted data is checked against your rules, then pushed into your systems automatically." },
      { n: "04", title: "Flag the exceptions", body: "Only the genuinely ambiguous cases reach a person — with the document and the issue highlighted." },
    ],
    capabilities: [
      { title: "Reads messy inputs", body: "Scans, PDFs, photos, and forms — not just clean digital files." },
      { title: "Validates as it goes", body: "Checks totals, dates, and terms against your rules before anything is trusted." },
      { title: "Routes into your stack", body: "Clean data lands in your ERP, CRM, or sheet — no manual entry step." },
      { title: "Human-in-the-loop", body: "Ambiguous cases are escalated with the exact field highlighted, not the whole pile." },
    ],
    industries: ["Logistics & trading", "Financial & insurance", "Professional services", "Real estate & brokerage"],
    metrics: [
      { value: "45 sec", label: "Per contract, end to end" },
      { value: "99%+", label: "Field-level accuracy on key terms" },
      { value: "100%", label: "Documents touched, none skipped" },
    ],
    related: ["parser", "workflow-automation", "pipeline"],
    faqs: [
      { q: "What document types can it handle?", a: "Contracts, invoices, purchase orders, forms, manifests, and KYC documents are typical. It reads scans, PDFs, and photos — not just clean digital files — and we tune it to your specific layouts during setup." },
      { q: "What happens when it isn't sure?", a: "It escalates. Rather than guessing, the system flags the ambiguous field, highlights it on the document, and routes it to a person — so accuracy stays high and humans only touch the genuine exceptions." },
    ],
  },
  {
    kind: "service",
    slug: "sales-crm-automation",
    icon: "GitMerge",
    label: "Service",
    name: "Sales & CRM automation",
    tagline: "Capture, enrich, and route every lead the moment it lands — and keep the data clean.",
    summary:
      "Leads go cold in the gap between arriving and being worked. We close that gap: every inbound lead is captured, enriched, scored, and routed into your CRM the instant it lands, with the data kept clean as you scale — so your team works ready buyers instead of triaging a backlog.",
    heroMetric: { value: "0", label: "Leads dropped or duplicated" },
    demo: "leaddb",
    how: [
      { n: "01", title: "Catch every source", body: "Web forms, WhatsApp, ads, and inbox — every inbound channel feeds one pipeline." },
      { n: "02", title: "Enrich on arrival", body: "Each lead is enriched and de-duplicated against your CRM before it's ever assigned." },
      { n: "03", title: "Score & route", body: "Leads are scored on your criteria and routed to the right owner in seconds, not hours." },
      { n: "04", title: "Keep it clean", body: "Ongoing de-duplication and validation stop your CRM rotting as volume grows." },
    ],
    capabilities: [
      { title: "Every channel, one pipeline", body: "Forms, WhatsApp, ads, and email all land in the same clean, routed flow." },
      { title: "Instant enrichment", body: "Company, role, and context added automatically before the lead reaches a rep." },
      { title: "Rules-based routing", body: "The right lead reaches the right owner by territory, value, or product — in seconds." },
      { title: "Self-cleaning CRM", body: "Duplicates merged and bad data caught continuously, not in a quarterly clean-up." },
    ],
    industries: ["Real estate & brokerage", "Professional services", "Financial & insurance", "E-commerce & retail"],
    metrics: [
      { value: "3.2×", label: "Faster lead response" },
      { value: "100%", label: "Leads captured and routed" },
      { value: "0", label: "Duplicate records created" },
    ],
    related: ["pipeline", "scout", "ai-agents"],
    faqs: [
      { q: "Which CRMs do you support?", a: "HubSpot, Salesforce, Zoho, and most major CRMs. We build on top of the CRM you already use rather than asking you to migrate — capture, enrichment, and routing all feed into your existing setup." },
      { q: "How does it stop duplicate leads?", a: "Every incoming lead is matched against your existing records before it's created or assigned. Matches are merged or updated instead of duplicated, and the same check runs continuously to keep the database clean as volume grows." },
    ],
  },
  {
    kind: "service",
    slug: "custom-models-integrations",
    icon: "Cpu",
    label: "Service",
    name: "Custom models & integrations",
    tagline: "Bespoke models and secure integrations wired to fit your operations, not the reverse.",
    summary:
      "When off-the-shelf doesn't fit, we build what does. Custom models tuned to your data and secure integrations wired deep into your stack — designed around how your business actually runs, with security, access, and data residency agreed in writing before a line is built.",
    heroMetric: { value: "Built to fit", label: "Your stack, your rules" },
    demo: null,
    how: [
      { n: "01", title: "Understand the constraint", body: "We map the data, the systems, and the security and residency requirements you operate under." },
      { n: "02", title: "Design to fit", body: "We design the model or integration around your operations — not a template forced onto them." },
      { n: "03", title: "Build securely", body: "Least-access connections, scoped prompts, and your data kept out of shared training." },
      { n: "04", title: "Operate & evolve", body: "We run it, monitor it, and extend it as your stack and needs change." },
    ],
    capabilities: [
      { title: "Tuned to your data", body: "Models shaped around your domain, vocabulary, and edge cases — not a generic baseline." },
      { title: "Deep integrations", body: "Wired into ERPs, internal tools, and databases that off-the-shelf products can't reach." },
      { title: "Security first", body: "Least-access by design, scoped models, and data residency agreed in writing up front." },
      { title: "Never trains on you", body: "Your business data is never used to train shared models. Full stop." },
    ],
    industries: ["Financial & insurance", "Logistics & trading", "Professional services", "Clinics & aesthetics"],
    metrics: [
      { value: "1:1", label: "Built around your workflow" },
      { value: "Least-access", label: "Security posture by default" },
      { value: "In writing", label: "Data terms, before any build" },
    ],
    related: ["pulse", "parser", "workflow-automation"],
    faqs: [
      { q: "Is our business data safe?", a: "Yes. We design integrations on a least-access basis, keep prompts and models scoped to the task, and never use your business data to train shared models. Access, retention, and residency are agreed in writing before anything is built." },
      { q: "When do we need a custom build versus a pre-built solution?", a: "Start with a pre-built solution where one fits — it's faster and cheaper. We recommend custom only when your data, security requirements, or systems genuinely demand it, and we'll tell you honestly which path fits your case." },
    ],
  },
];

export const SOLUTIONS = [
  {
    kind: "solution",
    slug: "inbox-agent",
    icon: "Inbox",
    label: "Conversational AI",
    name: "Inbox Agent",
    tagline: "Replies to every inbound lead in seconds — and books the meeting before a competitor does.",
    summary:
      "Inbox Agent answers every message on WhatsApp and web the instant it arrives, day or night. It qualifies the lead, answers the questions, and books the consultation on your calendar — so the first reply is always yours, and no enquiry ever goes cold after hours.",
    heroMetric: { value: "45 min → 1.2 sec", label: "Response time" },
    demo: "inbox",
    how: [
      { n: "01", title: "Message lands", body: "A lead messages on WhatsApp or web chat — at 2pm or 2am, it makes no difference." },
      { n: "02", title: "Instant, on-brand reply", body: "Inbox Agent responds in seconds, in your voice, and starts qualifying the lead." },
      { n: "03", title: "Books the meeting", body: "When the lead is ready, it offers real calendar slots and books the consultation." },
      { n: "04", title: "Hands off warm", body: "Your team picks up a booked, qualified lead — with the whole conversation attached." },
    ],
    capabilities: [
      { title: "Always first to reply", body: "Sub-second responses around the clock mean you never lose a lead to a faster competitor." },
      { title: "Qualifies as it talks", body: "Asks the right questions, captures the answers, and scores the lead before hand-off." },
      { title: "Books on your calendar", body: "Offers genuine availability and confirms the consultation without a back-and-forth." },
      { title: "Escalates the hot ones", body: "High-intent leads are flagged to your team instantly, with full context." },
    ],
    industries: ["Real estate & brokerage", "Clinics & aesthetics", "E-commerce & retail", "Professional services"],
    metrics: [
      { value: "1.2 sec", label: "Average first reply" },
      { value: "24/7", label: "After-hours coverage" },
      { value: "3.2×", label: "More leads reached first" },
    ],
    related: ["conversational-ai", "scout", "desk"],
    faqs: [
      { q: "Does it work on WhatsApp?", a: "Yes — WhatsApp Business and web chat are the primary channels, running through the same brain so context follows the lead. It replies instantly on both, qualifies, and books the meeting before the lead cools." },
      { q: "What happens to leads it can't handle?", a: "They're escalated to your team with the full transcript and a short summary, so a person picks up mid-conversation without the lead having to repeat anything. High-intent leads are flagged immediately." },
    ],
  },
  {
    kind: "solution",
    slug: "pipeline",
    icon: "Route",
    label: "Sales automation",
    name: "Pipeline",
    tagline: "Captures, enriches, and routes every lead straight into your CRM — no manual entry.",
    summary:
      "Pipeline makes sure no lead sits in an inbox overnight. It captures inbound from every channel, enriches and de-duplicates it, scores it, and routes it to the right owner in your CRM in seconds — keeping the data clean as you scale so your reps work, not re-key.",
    heroMetric: { value: "0", label: "Leads dropped overnight" },
    demo: "leaddb",
    how: [
      { n: "01", title: "Capture everywhere", body: "Web forms, WhatsApp, ads, and inbox all feed into one Pipeline, automatically." },
      { n: "02", title: "Enrich & de-dupe", body: "Each lead is enriched with context and checked against your CRM before it's created." },
      { n: "03", title: "Score & assign", body: "Leads are scored on your rules and routed to the right owner in seconds." },
      { n: "04", title: "Stay clean", body: "Continuous de-duplication keeps the CRM trustworthy as volume climbs." },
    ],
    capabilities: [
      { title: "All channels in one flow", body: "Forms, WhatsApp, ads, and email land in a single routed pipeline." },
      { title: "Enriched before assignment", body: "Company and context added automatically so reps open a complete record." },
      { title: "Routed in seconds", body: "By territory, value, or product — the right lead reaches the right person fast." },
      { title: "Always clean", body: "Duplicates merged continuously, not cleaned up once a quarter." },
    ],
    industries: ["Real estate & brokerage", "Professional services", "Financial & insurance", "E-commerce & retail"],
    metrics: [
      { value: "3.2×", label: "Faster lead response" },
      { value: "100%", label: "Captured and routed" },
      { value: "0", label: "Duplicate records" },
    ],
    related: ["sales-crm-automation", "scout", "parser"],
    faqs: [
      { q: "Will it fit our existing CRM?", a: "Yes. Pipeline builds on top of HubSpot, Salesforce, Zoho, and most major CRMs — capture, enrichment, scoring, and routing all feed into the setup you already use, with no migration required." },
      { q: "How fast does a lead get routed?", a: "In seconds. From the moment a lead lands on any channel, Pipeline enriches, de-duplicates, scores, and assigns it to the right owner — so reps are following up while the lead is still warm." },
    ],
  },
  {
    kind: "solution",
    slug: "parser",
    icon: "FileSearch",
    label: "Document intelligence",
    name: "Parser",
    tagline: "Reads contracts, invoices, and forms — then pushes validated data into your systems.",
    summary:
      "Drop in a contract, invoice, or form and Parser does the rest: it scans the document, extracts the key terms, validates them against your rules, and pushes clean data into your systems — flagging only what genuinely needs a human. Hours of careful reading become seconds.",
    heroMetric: { value: "3 hrs → 45 sec", label: "Contract audit" },
    demo: "parser",
    how: [
      { n: "01", title: "Document arrives", body: "A contract, invoice, or form comes in — as a scan, PDF, or photo." },
      { n: "02", title: "Reads & extracts", body: "Parser pulls the terms, totals, dates, and clauses that matter to you." },
      { n: "03", title: "Validates", body: "Extracted data is checked against your rules before anything is trusted." },
      { n: "04", title: "Routes or flags", body: "Clean data flows into your systems; genuine exceptions are flagged for a person." },
    ],
    capabilities: [
      { title: "Handles messy inputs", body: "Scans, PDFs, and photos — not just clean digital documents." },
      { title: "Extracts what matters", body: "Key terms, totals, dates, and clauses, tuned to your document types." },
      { title: "Validates automatically", body: "Catches mismatched totals and missing terms before they cause problems." },
      { title: "Flags the exceptions", body: "Only ambiguous cases reach a human, with the exact field highlighted." },
    ],
    industries: ["Logistics & trading", "Financial & insurance", "Professional services", "Real estate & brokerage"],
    metrics: [
      { value: "45 sec", label: "Per document" },
      { value: "99%+", label: "Accuracy on key fields" },
      { value: "100%", label: "Documents read, none skipped" },
    ],
    related: ["document-intelligence", "workflow-automation", "pipeline"],
    faqs: [
      { q: "Can it read scanned or photographed documents?", a: "Yes. Parser handles scans, PDFs, and photos, not just clean digital files. We tune it to your specific document layouts during setup so accuracy stays high on the formats you actually receive." },
      { q: "Where does the extracted data go?", a: "Straight into your systems — ERP, CRM, or spreadsheet — with no manual entry step. Validated data flows automatically, and only the genuinely ambiguous cases are routed to a person to review." },
    ],
  },
  {
    kind: "solution",
    slug: "desk",
    icon: "LifeBuoy",
    label: "Support automation",
    name: "Desk",
    tagline: "Resolves routine and complex support across every channel — and escalates the rest with context.",
    summary:
      "Desk handles your support load across WhatsApp, web, and email — resolving the routine questions outright and working through the complex ones, then escalating whatever needs a human with the full history attached. Your team stops triaging and starts handling only what truly needs them.",
    heroMetric: { value: "40%", label: "Faster resolution" },
    demo: null,
    how: [
      { n: "01", title: "Request comes in", body: "A customer reaches out on any channel — WhatsApp, web chat, or email." },
      { n: "02", title: "Resolves the routine", body: "Common questions are answered instantly from your approved knowledge base." },
      { n: "03", title: "Works the complex", body: "Multi-step issues are progressed as far as the rules allow before any hand-off." },
      { n: "04", title: "Escalates with context", body: "Whatever needs a person arrives with the full history and a clear summary." },
    ],
    capabilities: [
      { title: "Every channel covered", body: "WhatsApp, web, and email handled by one consistent support brain." },
      { title: "Resolves, not deflects", body: "Answers routine tickets outright instead of bouncing customers to a form." },
      { title: "Context on escalation", body: "Agents inherit the full thread and a summary — no starting from zero." },
      { title: "Learns from tickets", body: "Real resolutions feed back in, widening what it can handle over time." },
    ],
    industries: ["E-commerce & retail", "Clinics & aesthetics", "Financial & insurance", "Professional services"],
    metrics: [
      { value: "40%", label: "Faster average resolution" },
      { value: "24/7", label: "Coverage on every channel" },
      { value: "60%+", label: "Tickets resolved without a human" },
    ],
    related: ["conversational-ai", "inbox-agent", "ai-agents"],
    faqs: [
      { q: "Does it replace our support team?", a: "No — it removes the repetitive load so your team focuses on the cases that need judgement. Desk resolves routine tickets and progresses complex ones, then hands off to a person with full context when human help is required." },
      { q: "How does it avoid wrong answers?", a: "Desk answers from your approved knowledge base rather than guessing, with clear fallbacks when it isn't confident. Anything outside what it can safely resolve is escalated to a human instead of risked." },
    ],
  },
  {
    kind: "solution",
    slug: "pulse",
    icon: "Activity",
    label: "Operational dashboards",
    name: "Pulse",
    tagline: "Turns scattered operational data into one live view your team actually uses.",
    summary:
      "Pulse pulls your operational data out of the silos it's trapped in and into a single live view — the numbers that actually drive decisions, updated in real time. No more stitching together five exports to answer one question; the picture is always current and in one place.",
    heroMetric: { value: "Real-time", label: "One live operational view" },
    demo: null,
    how: [
      { n: "01", title: "Connect the sources", body: "We wire Pulse into your CRM, ops tools, sheets, and databases." },
      { n: "02", title: "Define the signals", body: "Together we choose the metrics that actually drive decisions — not vanity numbers." },
      { n: "03", title: "Build the live view", body: "One dashboard, updated in real time, designed for the people who use it." },
      { n: "04", title: "Alert on what matters", body: "Thresholds and alerts surface problems before they become fires." },
    ],
    capabilities: [
      { title: "One source of truth", body: "Scattered data unified into a single view, instead of five conflicting exports." },
      { title: "Updated in real time", body: "The picture is always current, so decisions are made on now, not last week." },
      { title: "Built around decisions", body: "Shows the metrics that change what people do — not a wall of charts." },
      { title: "Alerts, not surprises", body: "Thresholds flag issues early, so problems surface before they escalate." },
    ],
    industries: ["Logistics & trading", "Financial & insurance", "E-commerce & retail", "Professional services"],
    metrics: [
      { value: "1", label: "Live view, not five exports" },
      { value: "Real-time", label: "Always-current numbers" },
      { value: "Early", label: "Alerts before problems escalate" },
    ],
    related: ["custom-models-integrations", "pipeline", "workflow-automation"],
    faqs: [
      { q: "Where does Pulse get its data?", a: "From the systems you already run — CRM, operational tools, spreadsheets, and databases. We connect to them on a least-access basis and unify the data into one live view, without asking you to move anything." },
      { q: "Is it just another dashboard nobody opens?", a: "We design Pulse around the decisions your team actually makes, showing the few metrics that change behaviour rather than a wall of charts — plus alerts that come to you, so the data does its job even when no one's looking." },
    ],
  },
  {
    kind: "solution",
    slug: "scout",
    icon: "Target",
    label: "Lead qualification",
    name: "Scout",
    tagline: "Scores and qualifies inbound automatically, so your team only works ready buyers.",
    summary:
      "Scout scores and tags every inbound lead the moment it lands, so your team opens its day to a database of buyers who are genuinely ready — not a backlog to triage. The qualifying happens automatically, in the background, against the criteria that actually predict a deal.",
    heroMetric: { value: "3.2×", label: "Faster qualification" },
    demo: "leaddb",
    how: [
      { n: "01", title: "Lead arrives", body: "Inbound from any channel lands and is picked up by Scout instantly." },
      { n: "02", title: "Scores on your rules", body: "Each lead is scored against the criteria that actually predict a closed deal." },
      { n: "03", title: "Tags & prioritises", body: "Leads are tagged and ranked, so the hottest rise to the top automatically." },
      { n: "04", title: "Surfaces the ready", body: "Your team starts the day with a ranked list of buyers worth their time." },
    ],
    capabilities: [
      { title: "Qualifies automatically", body: "Every lead scored on arrival, with no manual triage step for your team." },
      { title: "Scores what predicts deals", body: "Built on the criteria that actually correlate with closing, not gut feel." },
      { title: "Prioritised by default", body: "The highest-intent leads rise to the top, so the best time goes to the best buyers." },
      { title: "Feeds your CRM", body: "Scores and tags land on the record, ready for routing and follow-up." },
    ],
    industries: ["Real estate & brokerage", "Professional services", "Financial & insurance", "E-commerce & retail"],
    metrics: [
      { value: "3.2×", label: "Faster qualification" },
      { value: "100%", label: "Leads scored on arrival" },
      { value: "0", label: "Manual triage required" },
    ],
    related: ["sales-crm-automation", "inbox-agent", "pipeline"],
    faqs: [
      { q: "How does Scout know which leads are good?", a: "We build the scoring on the criteria that actually predict closed deals for your business — drawn from your history and refined in production. It's tuned to your definition of a ready buyer, not a generic template." },
      { q: "Does it work with Inbox Agent and Pipeline?", a: "Yes. Scout, Inbox Agent, and Pipeline are designed to work together — capture, qualify, and route as one flow — but Scout also drops cleanly into an existing setup if you only need the qualification layer." },
    ],
  },
];

export const INDUSTRIES = [
  {
    kind: "industry",
    slug: "real-estate",
    icon: "Building2",
    label: "Industry",
    name: "Real estate & brokerage",
    tagline: "Be the first to reply on every property enquiry — automatically.",
    summary:
      "In Dubai real estate, the broker who replies first usually wins the viewing. We deploy AI that responds to every portal lead, WhatsApp message, and web enquiry in seconds, qualifies the buyer, and books the viewing — so no high-intent enquiry sits unanswered while a competitor responds.",
    heroMetric: { value: "1.2 sec", label: "First reply on every enquiry" },
    demo: "inbox",
    how: [
      { n: "01", title: "Lead lands", body: "An enquiry arrives from a portal, WhatsApp, or your website — day or night." },
      { n: "02", title: "Instant qualification", body: "The agent replies in seconds, answers questions, and qualifies budget and intent." },
      { n: "03", title: "Viewing booked", body: "It offers real availability and books the viewing straight into the agent's calendar." },
      { n: "04", title: "Agent takes over", body: "Your broker picks up a qualified buyer with the full conversation attached." },
    ],
    capabilities: [
      { title: "Reply before competitors", body: "Sub-second responses on Bayut, Property Finder, WhatsApp, and web." },
      { title: "Qualify every buyer", body: "Budget, area, and intent captured before an agent spends a minute." },
      { title: "Book viewings 24/7", body: "After-hours enquiries still get booked, not lost to the morning." },
      { title: "Clean CRM, always", body: "Every lead enriched and routed into your CRM with no manual entry." },
    ],
    industries: ["Brokerages", "Property developers", "Property management", "Holiday-home operators"],
    metrics: [
      { value: "1.2 sec", label: "First response time" },
      { value: "3.2×", label: "More leads reached first" },
      { value: "0", label: "Enquiries lost after hours" },
    ],
    related: ["inbox-agent", "scout", "sales-crm-automation"],
    faqs: [
      { q: "Does it work with Bayut and Property Finder leads?", a: "Yes. Leads from Bayut, Property Finder, your website, and WhatsApp all feed into one flow. Each is answered in seconds, qualified, and routed to the right agent — so portal spend doesn't go cold in an inbox." },
      { q: "Will it book viewings on its own?", a: "Within the rules you set, yes. It offers genuine calendar availability and confirms the viewing, then hands the agent a qualified buyer with the full chat history. Anything outside its remit is escalated to a person." },
    ],
  },
  {
    kind: "industry",
    slug: "clinics-aesthetics",
    icon: "HeartPulse",
    label: "Industry",
    name: "Clinics & aesthetics",
    tagline: "Every patient enquiry answered and booked — even after the clinic closes.",
    summary:
      "Aesthetic and medical clinics lose bookings to slow replies and after-hours silence. We deploy AI that responds instantly on WhatsApp and web, answers treatment questions on-brand, and books consultations around the clock — so a 9pm enquiry becomes tomorrow's appointment instead of a missed call.",
    heroMetric: { value: "24/7", label: "Booking, after hours included" },
    demo: "inbox",
    how: [
      { n: "01", title: "Enquiry arrives", body: "A patient messages about a treatment on WhatsApp or your website." },
      { n: "02", title: "On-brand answer", body: "The assistant answers from your approved clinic information, in your tone." },
      { n: "03", title: "Consultation booked", body: "It offers open slots and books the consultation into your system." },
      { n: "04", title: "Front desk informed", body: "Your team starts the day with confirmed appointments, not a backlog." },
    ],
    capabilities: [
      { title: "Never miss an after-hours lead", body: "Evenings and weekends still convert into booked consultations." },
      { title: "Answers from approved info", body: "Treatment and pricing answers come from your content, not guesses." },
      { title: "Reduce no-shows", body: "Automated confirmations and reminders keep the calendar full." },
      { title: "Discreet and compliant", body: "Patient data handled on a least-access basis, scoped to the task." },
    ],
    industries: ["Aesthetic clinics", "Dental & medical", "Wellness & spa", "Dermatology"],
    metrics: [
      { value: "24/7", label: "After-hours coverage" },
      { value: "45 min → 1.2 sec", label: "Response time" },
      { value: "40%", label: "Faster enquiry handling" },
    ],
    related: ["inbox-agent", "conversational-ai", "desk"],
    faqs: [
      { q: "Is patient information kept private?", a: "Yes. Integrations are built on a least-access basis, prompts and models are scoped to the task, and your data is never used to train shared models. Access and retention are agreed in writing before anything goes live." },
      { q: "Can it answer treatment questions accurately?", a: "It answers only from the clinic information you approve, with clear fallbacks when it isn't sure, and escalates anything clinical to your team. It books and informs — it does not give medical advice." },
    ],
  },
  {
    kind: "industry",
    slug: "logistics-trading",
    icon: "Truck",
    label: "Industry",
    name: "Logistics & trading",
    tagline: "Turn manifests, invoices, and paperwork into clean data — in seconds.",
    summary:
      "Trading and logistics run on high-volume paperwork that eats hours and breeds errors. We deploy AI that reads manifests, invoices, and customs documents the moment they arrive, extracts and validates the data, and pushes it into your systems — flagging only the genuine exceptions for a human.",
    heroMetric: { value: "3 hrs → 45 sec", label: "Per document, end to end" },
    demo: "parser",
    how: [
      { n: "01", title: "Document arrives", body: "An invoice, manifest, or customs form comes in as a scan, PDF, or photo." },
      { n: "02", title: "Read & extract", body: "Key terms, quantities, and totals are pulled out automatically." },
      { n: "03", title: "Validate", body: "Data is checked against your rules and existing records before it's trusted." },
      { n: "04", title: "Route or flag", body: "Clean data flows into your ERP; only true exceptions reach a person." },
    ],
    capabilities: [
      { title: "Handles messy inputs", body: "Scans, PDFs, and photos — not just clean digital files." },
      { title: "Validates as it reads", body: "Catches mismatched totals and missing fields before they cause problems." },
      { title: "Feeds your ERP", body: "Extracted data lands in your systems with no manual re-keying." },
      { title: "Scales with volume", body: "Peak-season paperwork handled without adding back-office headcount." },
    ],
    industries: ["Freight & forwarding", "Import/export trading", "Distribution", "Customs brokerage"],
    metrics: [
      { value: "45 sec", label: "Per document" },
      { value: "99%+", label: "Accuracy on key fields" },
      { value: "100%", label: "Documents processed" },
    ],
    related: ["parser", "document-intelligence", "workflow-automation"],
    faqs: [
      { q: "What documents can it process?", a: "Commercial invoices, packing lists, manifests, bills of lading, customs forms, and purchase orders are typical. It handles scans and photos, and we tune it to your specific layouts during setup." },
      { q: "What happens with an unusual document?", a: "It's escalated rather than guessed. The system flags the ambiguous field, highlights it on the document, and routes it to a person — so accuracy stays high and your team only touches real exceptions." },
    ],
  },
  {
    kind: "industry",
    slug: "professional-services",
    icon: "Briefcase",
    label: "Industry",
    name: "Professional services",
    tagline: "Free your senior people from intake, admin, and chasing.",
    summary:
      "In professional services, your most expensive people lose hours to intake forms, proposals, and back-office follow-up. We deploy AI that captures and qualifies new enquiries, drafts routine documents, and automates the admin — so partners and consultants spend their time on billable work, not paperwork.",
    heroMetric: { value: "8–12 hrs", label: "Saved per person, weekly" },
    demo: "leaddb",
    how: [
      { n: "01", title: "Enquiry captured", body: "A new client enquiry is captured and enriched the moment it lands." },
      { n: "02", title: "Qualified & routed", body: "It's scored against your criteria and routed to the right person." },
      { n: "03", title: "Admin automated", body: "Intake, scheduling, and routine documents are handled automatically." },
      { n: "04", title: "People do the work", body: "Your team focuses on advice and delivery, not data entry." },
    ],
    capabilities: [
      { title: "Automated intake", body: "New enquiries captured, qualified, and routed without manual triage." },
      { title: "Faster proposals", body: "Routine documents and follow-ups drafted from your templates." },
      { title: "Less back-office", body: "Scheduling, reminders, and updates handled in the background." },
      { title: "Senior time protected", body: "Hours returned to the people whose time costs the most." },
    ],
    industries: ["Consultancies", "Law & legal", "Accounting & advisory", "Agencies"],
    metrics: [
      { value: "8–12 hrs", label: "Saved per person weekly" },
      { value: "3.2×", label: "Faster enquiry handling" },
      { value: "90%+", label: "Less manual admin" },
    ],
    related: ["scout", "workflow-automation", "ai-agents"],
    faqs: [
      { q: "Will it fit our existing tools?", a: "Yes. We build on top of the CRM, document, and scheduling tools you already use rather than asking you to switch — capturing, qualifying, and automating around your current stack." },
      { q: "Does it replace our team?", a: "No. It removes repetitive intake and admin so your people focus on advice and delivery. Anything needing judgement is routed to the right person with full context." },
    ],
  },
  {
    kind: "industry",
    slug: "ecommerce-retail",
    icon: "ShoppingBag",
    label: "Industry",
    name: "E-commerce & retail",
    tagline: "Conversational sales and support that scale through every peak.",
    summary:
      "Retail demand spikes; headcount can't. We deploy AI that handles sales questions and support across WhatsApp, web, and social — recommending products, answering instantly, and resolving the routine tickets — so you convert more and support faster through peak season without adding staff.",
    heroMetric: { value: "40%", label: "Faster support resolution" },
    demo: null,
    how: [
      { n: "01", title: "Customer reaches out", body: "A shopper asks a question on WhatsApp, web chat, or social." },
      { n: "02", title: "Instant, helpful reply", body: "The assistant answers, recommends, and guides toward purchase." },
      { n: "03", title: "Routine support resolved", body: "Order, returns, and FAQ tickets are handled automatically." },
      { n: "04", title: "Team handles the rest", body: "Complex cases escalate to your team with full context." },
    ],
    capabilities: [
      { title: "Sell while you sleep", body: "Product questions answered and carts recovered around the clock." },
      { title: "Scale through peaks", body: "Promo and seasonal spikes handled without extra headcount." },
      { title: "Resolve routine tickets", body: "Orders, returns, and FAQs handled before they reach an agent." },
      { title: "Every channel, one brain", body: "WhatsApp, web, and social answered consistently." },
    ],
    industries: ["Online retail", "D2C brands", "Marketplaces", "Omnichannel retail"],
    metrics: [
      { value: "40%", label: "Faster resolution" },
      { value: "24/7", label: "Sales & support coverage" },
      { value: "60%+", label: "Tickets auto-resolved" },
    ],
    related: ["desk", "conversational-ai", "inbox-agent"],
    faqs: [
      { q: "Can it handle order and returns questions?", a: "Yes. Routine order status, returns, and FAQ questions are resolved automatically from your systems and policies, with anything complex escalated to your team with the full history attached." },
      { q: "Will it sound like our brand?", a: "Yes. Tone and phrasing are configured to your brand, and answers come from your approved content — so customers get fast, on-brand help across every channel." },
    ],
  },
  {
    kind: "industry",
    slug: "financial-insurance",
    icon: "Landmark",
    label: "Industry",
    name: "Financial & insurance",
    tagline: "Process claims, KYC, and documents accurately — with humans in the loop.",
    summary:
      "Financial and insurance operations are document-heavy and accuracy-critical. We deploy AI that reads claims, KYC packs, and forms, extracts and validates the data against your rules, and routes it through your process — keeping a human in the loop for every decision that genuinely needs one.",
    heroMetric: { value: "45 sec", label: "Per document, validated" },
    demo: "parser",
    how: [
      { n: "01", title: "Documents arrive", body: "Claims, KYC packs, or applications come in across channels." },
      { n: "02", title: "Read & validate", body: "Data is extracted and checked against your rules and records." },
      { n: "03", title: "Routed through process", body: "Clean cases move forward; anything flagged goes to a reviewer." },
      { n: "04", title: "Human decides", body: "Your team makes the call on every case that needs judgement." },
    ],
    capabilities: [
      { title: "Accurate at speed", body: "High-volume documents processed quickly without sacrificing accuracy." },
      { title: "Human-in-the-loop", body: "Every decision that needs judgement is routed to a person." },
      { title: "Audit-ready", body: "Every action logged and replayable for compliance and review." },
      { title: "Secure by design", body: "Least-access integrations and data terms agreed in writing up front." },
    ],
    industries: ["Insurance", "Banking & finance", "Brokerage", "Wealth & advisory"],
    metrics: [
      { value: "45 sec", label: "Per document" },
      { value: "99%+", label: "Field-level accuracy" },
      { value: "100%", label: "Decisions human-reviewed" },
    ],
    related: ["parser", "document-intelligence", "custom-models-integrations"],
    faqs: [
      { q: "Is our data kept secure?", a: "Yes. Integrations are least-access by design, models are scoped to the task, your data is never used to train shared models, and access, retention, and residency are agreed in writing before anything is built." },
      { q: "Does a human stay in control of decisions?", a: "Always. The system reads, extracts, and validates, but every decision that needs judgement is routed to a reviewer with full context — and every action is logged and replayable for audit." },
    ],
  },
];

export const CATALOG = [...SERVICES, ...SOLUTIONS, ...INDUSTRIES];

/** URL segment per catalog kind. */
const SEGMENT = { service: "services", solution: "solutions", industry: "industries" };

const BY_SLUG = Object.fromEntries(CATALOG.map((item) => [item.slug, item]));

/** Look up any catalog item (service, solution, or industry) by slug. */
export function getItem(slug) {
  return BY_SLUG[slug] || null;
}

/** Canonical path for a catalog item. */
export function itemHref(item) {
  return `/${SEGMENT[item.kind]}/${item.slug}`;
}

/** Resolve an item's `related` slugs into lightweight tile objects. */
export function getRelated(item) {
  if (!item?.related) return [];
  return item.related
    .map((slug) => BY_SLUG[slug])
    .filter(Boolean)
    .map((r) => ({
      slug: r.slug,
      kind: r.kind,
      icon: r.icon,
      label: r.label,
      name: r.name,
      tagline: r.tagline,
      href: itemHref(r),
    }));
}

/** Map an industry display name (as used in service/solution `industries`
 *  arrays) to its detail-page href, so "who it's for" chips can deep-link. */
const INDUSTRY_HREF_BY_NAME = Object.fromEntries(
  INDUSTRIES.map((i) => [i.name, itemHref(i)])
);
export function industryHref(name) {
  return INDUSTRY_HREF_BY_NAME[name] || "/#industries";
}
