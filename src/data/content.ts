import { photo, IMG } from "./media";

/* ------------------------------------------------------------------ *
 *  Site + navigation
 * ------------------------------------------------------------------ */

export const SITE = {
  name: "Texas New Home Rebates",
  shortName: "Texas New Home REBATES.com",
  group: "Askins Realty Group",
  tagline: "Buy Smart, Save Thousands.",
  subTag: "DFW · Dallas / Ft. Worth",
  since: "2004",
  phone: "214-727-3686",
  phoneHref: "tel:+12147273686",
  email: "hello@texasnewhomerebates.com",
  address: "Dallas–Fort Worth Metroplex, TX",
  license: "TREC #9007124",
  hours: "Mon–Sat 8am–8pm CT · Sun 11am–6pm",
  social: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "X", href: "https://x.com", icon: "x" },
  ],
};

export type NavChild = { label: string; to: string; desc?: string; icon?: string };
export type NavItem = { label: string; to: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "New Homes",
    to: "/new-homes",
    children: [
      { label: "Search All Listings", to: "/new-homes", desc: "Live MLS VOW feed", icon: "search" },
      { label: "Interactive Map Search", to: "/new-homes?view=map", desc: "Search by Texas region", icon: "map" },
      { label: "Quick Move-Ins", to: "/new-homes?status=quick", desc: "Close in 30–45 days", icon: "bolt" },
      { label: "Under $400K", to: "/new-homes?max=400000", desc: "Best value statewide", icon: "tag" },
      { label: "Communities", to: "/communities", desc: "Master-planned living", icon: "pin" },
    ],
  },
  {
    label: "Builder Rebates",
    to: "/rebates",
    children: [
      { label: "How Rebates Work", to: "/rebates", desc: "Contract to cash in 6 steps", icon: "cash" },
      { label: "Rebate Calculator", to: "/rebates#calculator", desc: "See your cash back", icon: "calc" },
      { label: "HUD-1 / Closing Statement", to: "/rebates#hud1", desc: "Line-by-line disclosure", icon: "doc" },
      { label: "Builder Incentives", to: "/rebates#builders", desc: "18 builders compared", icon: "builder" },
      { label: "Rebate FAQ", to: "/rebates#faq", desc: "Legality, limits, timing", icon: "faq" },
    ],
  },
  { label: "Communities", to: "/communities" },
  {
    label: "Buyers Guide",
    to: "/buyer-guide",
    children: [
      { label: "The 8-Step Process", to: "/buyer-guide#process", desc: "Tour to title", icon: "steps" },
      { label: "Financing Center", to: "/buyer-guide#financing", desc: "Buydowns & programs", icon: "cash" },
      { label: "Closing Checklist", to: "/buyer-guide#checklist", desc: "Download the PDF", icon: "doc" },
      { label: "Warranty & Care", to: "/buyer-guide#warranty", desc: "Year 1, 2 and 10", icon: "shield" },
    ],
  },
  { label: "Blog", to: "/blog" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "Our Story", to: "/about#story", desc: "Since 2004 in North Texas", icon: "star" },
      { label: "Platform Engine", to: "/about#platform", desc: "AI + SEO + CRM stack", icon: "chip" },
      { label: "The Team", to: "/about#team", desc: "Licensed TX advisors", icon: "team" },
      { label: "Reviews", to: "/about#reviews", desc: "1,240 families served", icon: "quote" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

/* ------------------------------------------------------------------ *
 *  Automated SEO metadata map (pages render this into <head>)
 * ------------------------------------------------------------------ */

export type SeoMeta = {
  title: string;
  description: string;
  keywords: string;
  path: string;
  schema: "WebSite" | "WebPage" | "CollectionPage" | "Blog" | "ContactPage" | "AboutPage" | "ItemList";
};

export const SEO_MAP: Record<string, SeoMeta> = {
  "/": {
    title: "Texas New Home Rebates | Up to 3% Cash Back on New Construction",
    description:
      "Get up to 3% cash back on new construction homes anywhere in Texas. Search 110+ live MLS VOW listings, compare 18 builders' incentives, and keep more at closing.",
    keywords: "texas new home rebates, new construction texas, builder rebate, cash back new home, mls vow listings",
    path: "/",
    schema: "WebSite",
  },
  "/new-homes": {
    title: "New Homes for Sale in Texas | Map Search + MLS VOW Feed",
    description:
      "Search new construction homes across Dallas, Houston, Austin, San Antonio and beyond. Filter by price, beds and square footage on an interactive Texas map.",
    keywords: "new homes for sale texas, new construction map search, dfw new homes, houston new homes, austin new homes",
    path: "/new-homes",
    schema: "CollectionPage",
  },
  "/rebates": {
    title: "Builder Rebates Texas | How to Get 3% Cash Back at Closing",
    description:
      "Learn exactly how Texas builder rebates work, calculate your cash back, and compare incentives from 18 homebuilders. Licensed TX buyer representation.",
    keywords: "builder rebate texas, home buyer rebate, 3 percent cash back new home, builder incentives",
    path: "/rebates",
    schema: "WebPage",
  },
  "/communities": {
    title: "New Home Communities in Texas | Master-Planned Neighborhoods",
    description:
      "Explore master-planned new home communities across Texas with builder rosters, pricing, amenities and school information.",
    keywords: "texas master planned communities, new home communities, dfw communities, houston communities",
    path: "/communities",
    schema: "ItemList",
  },
  "/buyer-guide": {
    title: "Texas New Construction Buyer Guide | 8 Steps + Financing",
    description:
      "A step-by-step Texas new construction buyer guide: builder registration, contract review, options, construction milestones, closing and warranty.",
    keywords: "new construction buyer guide, buying a new build texas, builder contract, closing checklist",
    path: "/buyer-guide",
    schema: "WebPage",
  },
  "/about": {
    title: "About Texas New Home Rebates | Licensed TX Rebate Brokerage",
    description:
      "Meet the licensed Texas team behind the state's largest new-construction rebate program and the AI platform that powers it.",
    keywords: "texas rebate brokerage, about texas new home rebates, licensed texas realtor",
    path: "/about",
    schema: "AboutPage",
  },
  "/blog": {
    title: "Texas New Home Blog | Rebates, Market Reports & Buyer Tips",
    description:
      "Weekly Texas new-construction insight: market reports, incentive comparisons, financing strategies and buyer checklists.",
    keywords: "texas real estate blog, new construction market report, builder incentives blog",
    path: "/blog",
    schema: "Blog",
  },
  "/contact": {
    title: "Contact Texas New Home Rebates | Talk to a Licensed TX Advisor",
    description:
      "Talk to a licensed Texas new-home advisor. Call, text or send the 60-second rebate request and get your personalized builder plan same day.",
    keywords: "contact texas realtor, new home rebate request, texas home buyer agent",
    path: "/contact",
    schema: "ContactPage",
  },
};

/* ------------------------------------------------------------------ *
 *  Stats, testimonials, team
 * ------------------------------------------------------------------ */

export const STATS = [
  { value: 18.4, prefix: "$", suffix: "M", label: "Rebate cash paid to buyers" },
  { value: 1240, suffix: "+", label: "New construction closings" },
  { value: 46, suffix: "", label: "Builders in our network" },
  { value: 27, suffix: " days", label: "Avg. search → contract" },
];

export type Testimonial = {
  name: string;
  city: string;
  region: string;
  price: string;
  rebate: string;
  rebatePct: string;
  builder: string;
  community: string;
  quote: string;
  image: string;
  date: string;
  stars: number;
  badge: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Megan & Chris Alvarez",
    city: "Celina, DFW",
    region: "DFW",
    price: "$629,900",
    rebate: "$18,897",
    rebatePct: "3%",
    builder: "Highland Homes",
    community: "Mustang Lakes",
    quote:
      "We had already walked the model before we found this team. They handled the registration retroactively with the builder, negotiated a $22K design credit AND delivered a check-level credit of $18,897 at closing. Unreal experience.",
    image: photo(IMG.life[1], 800, 800),
    date: "January 2026",
    stars: 5,
    badge: "Verified Buyer",
  },
  {
    name: "Deshawn & Tanya Carter",
    city: "Katy, Houston",
    region: "Houston",
    price: "$579,900",
    rebate: "$17,397",
    rebatePct: "3%",
    builder: "Perry Homes",
    community: "Cross Creek Ranch",
    quote:
      "I'm a first-time buyer and honestly expected to be upsold. Instead they walked me through a 2/1 rate buydown, applied the $17K rebate directly to closing costs, and I brought just $1,400 out-of-pocket to the table on a $579K house.",
    image: photo(IMG.life[3], 800, 800),
    date: "February 2026",
    stars: 5,
    badge: "First-Time Buyer",
  },
  {
    name: "Rachel & Tom Nguyen",
    city: "Georgetown, Austin",
    region: "Austin",
    price: "$519,900",
    rebate: "$15,597",
    rebatePct: "3%",
    builder: "Gehan Homes",
    community: "Wolf Ranch",
    quote:
      "The map search tool alone saved us two months of weekend driving. We filtered by commute and school rating, shortlisted six homes, and toured four in one Saturday. We executed the contract the following week and kept $15,597.",
    image: photo(IMG.life[6], 800, 800),
    date: "December 2025",
    stars: 5,
    badge: "Verified Buyer",
  },
  {
    name: "Dr. Amara Osei",
    city: "Boerne, Hill Country",
    region: "Hill Country",
    price: "$725,000",
    rebate: "$21,750",
    rebatePct: "3%",
    builder: "Highland Homes",
    community: "Montana Springs",
    quote:
      "Relocating from Chicago, I never visited in person until final walkthrough. They sent video walkthroughs of every framing milestone, flagged a foundation elevation issue, and negotiated a $21,750 rebate right on the settlement statement.",
    image: photo(IMG.life[4], 800, 800),
    date: "January 2026",
    stars: 5,
    badge: "Out-of-State Relo",
  },
  {
    name: "Luis & Karina Reyes",
    city: "Edinburg, RGV",
    region: "Valley",
    price: "$309,900",
    rebate: "$9,297",
    rebatePct: "3%",
    builder: "CastleRock Communities",
    community: "Las Colinas",
    quote:
      "Three other agents told us builders don't give rebates on Valley homes under $350K. These folks proved otherwise — and our $10K builder appliance package stacked on top of the $9,297 check at closing.",
    image: photo(IMG.life[7], 800, 800),
    date: "November 2025",
    stars: 5,
    badge: "Verified Buyer",
  },
  {
    name: "Brett & Sarah Henderson",
    city: "Frisco, DFW",
    region: "DFW",
    price: "$845,000",
    rebate: "$21,125",
    rebatePct: "2.5%",
    builder: "David Weekley Homes",
    community: "Fields – Falcon Ranch",
    quote:
      "We were building a semi-custom home in the new Fields development in Frisco. Having a broker who actually understood builder contracts and returned over $21K of their commission made this the easiest financial decision we've ever made.",
    image: photo(IMG.life[0], 800, 800),
    date: "February 2026",
    stars: 5,
    badge: "Luxury Build",
  },
  {
    name: "Capt. Michael & Lisa Vance",
    city: "Cibolo, San Antonio",
    region: "San Antonio",
    price: "$429,900",
    rebate: "$12,897",
    rebatePct: "3%",
    builder: "D.R. Horton",
    community: "Windmill Farms",
    quote:
      "As a military family using our VA loan benefit with 0% down, the $12,897 rebate refunded our entire earnest money deposit and funded our new backyard privacy fence and water softener system.",
    image: photo(IMG.life[5], 800, 800),
    date: "October 2025",
    stars: 5,
    badge: "Military / VA Buyer",
  },
  {
    name: "Pooja & Sanjay Patel",
    city: "Sugar Land, Houston",
    region: "Houston",
    price: "$675,000",
    rebate: "$20,250",
    rebatePct: "3%",
    builder: "Meritage Homes",
    community: "Imperial",
    quote:
      "The spray-foam energy efficiency was our must-have. Marcus on the Texas New Home Rebates team compared 4 builders in Fort Bend County and got us $20,250 back on our Meritage build.",
    image: photo(IMG.life[2], 800, 800),
    date: "January 2026",
    stars: 5,
    badge: "Verified Buyer",
  },
  {
    name: "Kyle & Jessica Morrison",
    city: "Liberty Hill, Austin",
    region: "Austin",
    price: "$629,000",
    rebate: "$15,725",
    rebatePct: "2.5%",
    builder: "Perry Homes",
    community: "Santa Rita Ranch",
    quote:
      "We loved the master-planned amenities at Santa Rita Ranch. Working with Texas New Home Rebates was seamless — they attended our pre-drywall inspection, flagged 6 items, and we got $15,725 at closing.",
    image: photo(IMG.life[1], 800, 800),
    date: "December 2025",
    stars: 5,
    badge: "Verified Buyer",
  },
  {
    name: "Victor & Elena Morales",
    city: "El Paso, West TX",
    region: "El Paso",
    price: "$359,900",
    rebate: "$10,797",
    rebatePct: "3%",
    builder: "D.R. Horton",
    community: "Painted Sky",
    quote:
      "Mountain views and a brand new home with $10,797 back at the title company. The communication was flawless from pre-approval through key handoff.",
    image: photo(IMG.life[7], 800, 800),
    date: "November 2025",
    stars: 5,
    badge: "Verified Buyer",
  },
];

/* Real-time recent transaction ticker */
export const RECENT_REBATES = [
  { city: "Celina, TX", builder: "Highland Homes", rebate: "$18,897", time: "2 hrs ago" },
  { city: "Katy, TX", builder: "Perry Homes", rebate: "$17,397", time: "4 hrs ago" },
  { city: "Georgetown, TX", builder: "Gehan Homes", rebate: "$15,597", time: "6 hrs ago" },
  { city: "Frisco, TX", builder: "David Weekley", rebate: "$21,125", time: "11 hrs ago" },
  { city: "Boerne, TX", builder: "Highland Homes", rebate: "$21,750", time: "1 day ago" },
  { city: "Cypress, TX", builder: "D.R. Horton", rebate: "$14,697", time: "1 day ago" },
  { city: "Prosper, TX", builder: "Perry Homes", rebate: "$18,475", time: "2 days ago" },
  { city: "Cibolo, TX", builder: "D.R. Horton", rebate: "$12,897", time: "2 days ago" },
  { city: "Fulshear, TX", builder: "Highland Homes", rebate: "$16,375", time: "3 days ago" },
  { city: "Edinburg, TX", builder: "CastleRock", rebate: "$9,297", time: "3 days ago" },
];

export const TEAM = [
  { name: "Mike Askins", role: "Founder & Managing Broker", region: "DFW · Dallas / Ft. Worth", img: photo(IMG.team[1], 600, 700), license: "TREC #9007124", bio: "20+ years guiding North Texas buyers through new construction — and putting rebate money back in their pockets since 2004." },
  { name: "Jenee Askins", role: "Co-Founder & Buyer Specialist", region: "DFW · Dallas / Ft. Worth", img: photo(IMG.team[0], 600, 700), license: "TREC #7412990", bio: "Former builder sales insider who now sits on your side of the table, negotiating incentives and design credits." },
  { name: "Marcus Delgado", role: "Sr. New Home Advisor", region: "Houston & Gulf", img: photo(IMG.team[3], 600, 700), license: "TREC #6812044", bio: "Specialist in rate buydown structures and builder financing comparisons." },
  { name: "Elena Vasquez", role: "Client Experience Lead", region: "San Antonio & Valley", img: photo(IMG.team[2], 600, 700), license: "TREC #7022813", bio: "Runs the CRM that keeps 1,200+ active buyers updated daily." },
];

/* ------------------------------------------------------------------ *
 *  Platform / integration story (AI + SEO + CRM)
 * ------------------------------------------------------------------ */

export const PLATFORM = [
  {
    key: "wireframe",
    title: "AI Wireframe Mapping",
    kicker: "Design",
    desc: "Every legacy VOW-IDX page was crawled, then re-mapped into a modern layout system — no orphan URLs, no lost content.",
    bullets: [
      "Auto-crawled 214 legacy URLs",
      "Layout blocks matched 1:1 to old content zones",
      "Design tokens applied across all templates",
    ],
    metric: "214 pages migrated",
  },
  {
    key: "seo",
    title: "Automated SEO Autopilot",
    kicker: "Traffic",
    desc: "Titles, meta descriptions, canonical tags, Open Graph, alt text and schema are generated per page from live MLS data.",
    bullets: [
      "Auto meta + JSON-LD on every route",
      "Programmatic city × builder landing pages",
      "Sitemap.xml regenerated on each MLS sync",
    ],
    metric: "100% schema coverage",
  },
  {
    key: "ai-pages",
    title: "AI Page Creation",
    kicker: "Scale",
    desc: "Spin up a new neighborhood, builder or city page in seconds — copy, image picks, FAQ schema and internal links included.",
    bullets: [
      "1,400+ programmatic landing pages queued",
      "Brand-voice locked to your tone",
      "Human review before publish",
    ],
    metric: "8 sec per page",
  },
  {
    key: "speed",
    title: "Core Web Vitals Engine",
    kicker: "Speed",
    desc: "Edge-cached, code-split and image-optimized. The old IDX embed shipped 4.1MB of blocking scripts; this build ships a fraction of that.",
    bullets: [
      "Lazy-loaded, properly sized imagery",
      "Zero render-blocking third-party JS",
      "Animated with GPU-only transforms",
    ],
    metric: "0.9s LCP target",
  },
];

export const INTEGRATIONS = [
  { group: "CRM & Lead Routing", icon: "crm", items: ["Follow Up Boss", "HubSpot", "kvCORE", "Salesforce", "LionDesk", "GoHighLevel"], desc: "Every form posts straight to your pipeline with source, region and rebate estimate attached." },
  { group: "Listing Feeds", icon: "feed", items: ["IDXBroker PRO", "MLS VOW", "RESO Web API", "Builder API"], desc: "Hourly sync of status, price and inventory changes across every metro feed." },
  { group: "Social & Distribution", icon: "social", items: ["Facebook", "Instagram", "YouTube", "LinkedIn", "X", "Google Business"], desc: "New listings and blog posts auto-publish with UTM tracking back to source." },
  { group: "AI Content Tools", icon: "ai", items: ["AI Blog Creator", "AI Page Builder", "SEO Autopilot", "Lead Scoring AI"], desc: "Frequent, on-brand updates without a content team in the loop." },
];

/* ------------------------------------------------------------------ *
 *  Buyer guide
 * ------------------------------------------------------------------ */

export const GUIDE_STEPS = [
  { n: "01", title: "Register with us first", desc: "One 60-second form. We register you with every builder you plan to visit so your rebate is protected from the first handshake.", icon: "doc" },
  { n: "02", title: "Build your shortlist", desc: "Use the map search and filters to narrow by price, beds, square footage, commute and school zone.", icon: "search" },
  { n: "03", title: "Tour with an advisor", desc: "We join your model tours, ask the questions that move incentives, and record video walkthroughs for remote buyers.", icon: "pin" },
  { n: "04", title: "Compare the real numbers", desc: "We model base price, lot premium, options, taxes, insurance, HOA and your rebate into one monthly-cost comparison.", icon: "calc" },
  { n: "05", title: "Contract & option period", desc: "We review the builder addenda, deadlines and earnest money terms, then negotiate structural credits before you sign.", icon: "doc" },
  { n: "06", title: "Options & design studio", desc: "Budget-first selection strategy: spend where appraisal and resale respond — kitchen, primary bath, flooring.", icon: "builder" },
  { n: "07", title: "Construction milestones", desc: "Independent inspections at foundation, pre-dry-in, pre-drywall and final. We attend every one with you.", icon: "shield" },
  { n: "08", title: "Close & collect your rebate", desc: "Final walk, closing disclosure review, then your rebate is applied to costs or issued on the settlement statement.", icon: "cash" },
];

export const FINANCE_OPTIONS = [
  { title: "Conventional 5% down", rate: "6.25% APR*", note: "PMI removable at 20% equity. Best for strong credit + stable income.", good: "Most flexible on builder incentives" },
  { title: "FHA 3.5% down", rate: "6.05% APR*", note: "620 minimum score at most builders. Higher MIP but easier approval.", good: "First-time buyers building credit" },
  { title: "VA 0% down", rate: "5.75% APR*", note: "No monthly mortgage insurance. Builder can pay up to 4% in concessions.", good: "Veterans & active duty" },
  { title: "Builder rate program", rate: "From 3.99%", note: "Forward commitments funded by the builder's lender. Compare against a price cut.", good: "Maximum monthly payment relief" },
];

export const FAQ = [
  { q: "Are builder rebates legal in Texas?", a: "Yes. Texas explicitly permits cash rebates and closing credits to buyers from a licensed real estate brokerage. We are a TREC-licensed brokerage (License #9007124) and every rebate is formally disclosed on the settlement statement / Closing Disclosure so your lender and title company approve it." },
  { q: "How much cash back can I actually get?", a: "Between 2% and 3% of your home's final purchase price, depending on the builder's offered co-op commission and your price tier. On a $500,000 home that is $10,000 to $15,000 back; on an $800,000 home that is $20,000 to $24,000." },
  { q: "Does using a rebate agent raise the price of the home?", a: "No. Builders budget the buyer-side commission into their baseline marketing cost whether or not you bring an agent. Walking in unrepresented does NOT lower your price — the builder simply absorbs the commission as pure profit." },
  { q: "What if I already visited the builder's sales center?", a: "Call or text us immediately before you sign any paperwork. Many builders will accept retroactive electronic registration as long as you have not executed a contract, and we negotiate that on your behalf." },
  { q: "Does the rebate count as taxable income?", a: "Under IRS Revenue Ruling 2007-21, a broker rebate is classified as an adjustment to the purchase price (reduction in cost basis) rather than gross taxable income. You will not receive a 1099-MISC." },
  { q: "Can I use my own lender instead of the builder's lender?", a: "Absolutely. We run a comprehensive side-by-side analysis comparing the builder lender's incentive package with your preferred lender's rates and discount points over a 5-year and 30-year hold period." },
  { q: "How is the rebate paid to me at closing?", a: "The rebate is credited directly on the Closing Disclosure / HUD-1 settlement statement (Line 506 / Section L) against your closing costs, prepaids, or rate buydown. If allowed by your loan program, any excess is issued as a credit check or wired to you." },
  { q: "Do you attend inspections and walkthroughs with me?", a: "Yes. We coordinate and attend 4 milestone independent inspections (Foundation, Pre-Drywall, Final Walkthrough, and 11-Month Warranty) to ensure the builder delivers on their promises." },
];
