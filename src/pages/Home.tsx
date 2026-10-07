import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Icon, Reveal, SmartImage, Stars } from "@/components/ui";
import { Link, usd } from "@/lib/router";
import { HERO_IMAGES, IMG, photo, pick } from "@/data/media";
import { BUILDERS, LISTINGS } from "@/data/listings";
import { SITE, TESTIMONIALS } from "@/data/content";
import { useLead } from "@/components/LeadForm";
import { Seo } from "@/components/Seo";

/* Shared red / navy buttons matching the reference design */
function RedButton({
  children,
  onClick,
  to,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  className?: string;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-md bg-gold-600 px-6 py-3 text-[13px] font-extrabold tracking-wide text-white uppercase shadow-[0_12px_26px_-14px_rgba(217,38,38,.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-500 active:translate-y-0",
    className
  );
  if (to) return <Link to={to} className={cls}>{children}<Icon name="arrow" className="h-4 w-4" /></Link>;
  return <button onClick={onClick} className={cls}>{children}<Icon name="arrow" className="h-4 w-4" /></button>;
}

function OutlineButton({
  children,
  onClick,
  to,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  className?: string;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-md border-2 border-ink-800 bg-white px-6 py-[10px] text-[13px] font-extrabold tracking-wide text-ink-800 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-600 hover:text-gold-600 active:translate-y-0",
    className
  );
  if (to) return <Link to={to} className={cls}>{children}<Icon name="arrow" className="h-4 w-4" /></Link>;
  return <button onClick={onClick} className={cls}>{children}<Icon name="arrow" className="h-4 w-4" /></button>;
}

/* Founders portrait with a remote fallback so the hero never renders empty */
const FOUNDERS_FALLBACK = photo(8317677, 1200, 1300);

function FoundersPhoto({ ratio, eager = false, imgClassName = "" }: { ratio: string; eager?: boolean; imgClassName?: string }) {
  const [src, setSrc] = useState(HERO_IMAGES.founders);
  return (
    <div className={cn("relative overflow-hidden bg-ink-100", ratio)}>
      <img
        src={src}
        alt="Mike and Jenee Askins, Texas New Home Rebates"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => {
          if (src !== FOUNDERS_FALLBACK) setSrc(FOUNDERS_FALLBACK);
        }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <CalculatorStrip />
      <HowItWorks />
      <FindDeal />
      <TopCommunities />
      <WhichOption />
      <Since2004 />
      <FaqSection />
      <TestimonialsBand />
      <BottomCta />
    </>
  );
}

/* ═══════════════════════ 1 · HERO ═══════════════════════ */

function Hero() {
  const { open } = useLead();
  const [background, setBackground] = useState(HERO_IMAGES.foundersHero);

  return (
    <section className="reference-hero" aria-labelledby="home-hero-title">
      <div className="reference-hero-background">
        <img
          src={background}
          alt="Mike and Jenee Askins in front of a North Texas home"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={(event) => {
            if (background !== HERO_IMAGES.founders) setBackground(HERO_IMAGES.founders);
            else event.currentTarget.style.visibility = "hidden";
          }}
        />
      </div>
      <div className="reference-hero-wash" aria-hidden="true" />

      <div className="reference-hero-inner">
        <div className="reference-hero-content">
          <h1 id="home-hero-title">
            <span>Buy a New Home</span>
            <span>in North Texas?</span>
            <span className="reference-hero-headline-red">Get Money Back.</span>
          </h1>
          <p className="reference-hero-copy">
            Receive up to a <strong>3% cash rebate</strong> when you purchase
            <br />
            {" "}
            a qualifying new construction home with
            <br />
            {" "}
            {SITE.group}.
          </p>
          <div className="reference-hero-actions">
            <RedButton onClick={() => open("hero-calculate")} className="reference-hero-primary">
              <Icon name="calc" className="h-5 w-5" /> Calculate My Rebate
            </RedButton>
            <OutlineButton onClick={() => open("hero-talk")} className="reference-hero-secondary">
              Talk to Mike &amp; Jenee
            </OutlineButton>
          </div>
          <p className="reference-hero-note">
            Already visiting a builder?{" "}
            <button onClick={() => open("hero-warning")}>
              Contact us before you register or sign a contract.
            </button>
          </p>
        </div>
      </div>

      <p className="reference-hero-signature" aria-label="Mike and Jenee Askins">
        Mike &amp; Jenee
        <span>Askins</span>
        <svg viewBox="0 0 120 12" aria-hidden="true">
          <path d="M3 10 Q56 1 117 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </p>
    </section>
  );
}

/* ═══════════════════════ 2 · CALCULATOR STRIP ═══════════════════════ */

function CalculatorStrip() {
  const { open } = useLead();
  const [price, setPrice] = useState("500,000");
  const [builder, setBuilder] = useState("");
  const [result, setResult] = useState<number | null>(15000);
  const [calcKey, setCalcKey] = useState(0);

  const numeric = Number(price.replace(/[^0-9]/g, "")) || 0;
  const pct = builder ? (BUILDERS.find((b) => b.slug === builder)?.rebatePct ?? 3) : 3;

  const calculate = () => {
    setResult(Math.round((numeric * pct) / 100));
    setCalcKey((k) => k + 1);
  };

  const benefits = [
    { icon: "cash", bg: "bg-gold-600", t: "Up to 3% Cash Rebate", d: "Save thousands when you buy a new home." },
    { icon: "tag", bg: "bg-ink-800", t: "Keep Builder Incentives", d: "You still receive all available builder promotions and incentives." },
    { icon: "team", bg: "bg-ink-800", t: "Expert Guidance", d: "20+ years of new construction experience." },
    { icon: "shield", bg: "bg-ink-800", t: "No Extra Cost to You", d: "Our services are free to you — the builder pays our commission." },
  ];

  return (
    <section className="border-y border-ink-900/10 bg-ink-50/70 py-12 lg:py-14">
      <div className="container-x">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-bold text-ink-800 sm:text-4xl">How Much Could You Get Back?</h2>
          <p className="mt-2 text-[15px] text-ink-600">Get an instant estimate of your potential rebate.</p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <Reveal delay={100}>
            <div className="rounded-2xl bg-white p-6 shadow-[0_24px_50px_-30px_rgba(7,22,55,.35)] ring-1 ring-ink-900/10 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="hero-price" className="mb-1.5 block text-[12.5px] font-bold text-ink-700">
                    Home Purchase Price
                  </label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-4 -translate-y-1/2 text-[15px] font-bold text-ink-500">$</span>
                    <input
                      id="hero-price"
                      inputMode="numeric"
                      value={price}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/[^0-9]/g, "").slice(0, 9);
                        setPrice(digits ? Number(digits).toLocaleString("en-US") : "");
                      }}
                      className="w-full rounded-md border border-ink-200 bg-white py-3 pr-4 pl-8 text-[16px] font-bold text-ink-900 shadow-sm outline-none transition focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="hero-builder" className="mb-1.5 block text-[12.5px] font-bold text-ink-700">
                    Select a Builder <span className="font-semibold text-ink-400">(Optional)</span>
                  </label>
                  <select
                    id="hero-builder"
                    value={builder}
                    onChange={(e) => setBuilder(e.target.value)}
                    className="w-full appearance-none rounded-md border border-ink-200 bg-white px-4 py-3 text-[15px] font-semibold text-ink-800 shadow-sm outline-none transition focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20"
                  >
                    <option value="">Choose a Builder</option>
                    {BUILDERS.map((b) => (
                      <option key={b.slug} value={b.slug}>{b.name} — {b.rebatePct}% back</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5 grid items-center gap-5 rounded-xl bg-gold-50 p-5 ring-1 ring-gold-500/25 sm:grid-cols-[1fr_auto]">
                <div className="text-center sm:text-left">
                  <p className="text-[12px] font-extrabold tracking-wider text-ink-600 uppercase">Estimated ARG Rebate</p>
                  <p key={calcKey} className="animate-pop font-display text-[44px] leading-tight font-bold text-gold-600">
                    {result !== null ? usd(result) : "—"}
                  </p>
                  <p className="text-[12px] font-semibold text-ink-500">at {pct}% of {usd(numeric || 0)}</p>
                </div>
                <RedButton onClick={calculate} className="w-full sm:w-auto">Calculate My Rebate</RedButton>
              </div>

              <p className="mt-4 text-center text-[11.5px] leading-relaxed text-ink-400">
                Actual rebate amount depends on builder compensation, transaction terms and other applicable conditions.
                Contact us to confirm your rebate.{" "}
                <button onClick={() => open("calculator-strip")} className="font-bold text-gold-600 underline underline-offset-2">
                  Lock in this estimate
                </button>
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={140 + i * 80}>
                <div className="flex items-start gap-4 rounded-xl bg-white p-4 ring-1 ring-ink-900/[.06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full text-white shadow-md", b.bg)}>
                    <Icon name={b.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-extrabold text-ink-900">{b.t}</span>
                    <span className="block text-[13.5px] text-ink-600">{b.d}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ 3 · HOW IT WORKS ═══════════════════════ */

function HowItWorks() {
  const steps = [
    { n: "1", icon: "home", t: "Choose Your New Home", d: "Explore new construction homes and communities in North Texas." },
    { n: "2", icon: "doc", t: "Make ARG Your Buyer's Agent", d: "We represent you, help you navigate the builder and contract, and ensure your rebate eligibility." },
    { n: "3", icon: "cash", t: "Get Your Rebate", d: "When your qualifying home purchase closes, you receive your agreed cash rebate." },
  ];
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-x">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-bold text-ink-800 sm:text-4xl">How Does the New Home Rebate Work?</h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="relative flex h-full flex-col items-center px-6 text-center">
                <span className="absolute top-1 left-2 grid h-11 w-11 place-items-center rounded-full bg-ink-800 font-display text-xl font-bold text-white shadow-lg md:left-6">
                  {s.n}
                </span>
                {i < steps.length - 1 && (
                  <span className="absolute top-8 -right-4 hidden text-ink-300 md:block">
                    <Icon name="chevR" className="h-9 w-9" />
                  </span>
                )}
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink-50 text-ink-800 ring-1 ring-ink-900/10">
                  <Icon name={s.icon} className="h-8 w-8" />
                </span>
                <h3 className="mt-4 text-[17px] font-extrabold text-ink-900">{s.t}</h3>
                <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-ink-600">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ 4 · FIND YOUR DEAL ═══════════════════════ */

function FindDeal() {
  const cards = [
    { t: "Price-Reduced New Homes", to: "/new-homes?sort=price-asc", img: pick(IMG.ext, 0, 700, 460) },
    { t: "Builder Incentives & Specials", to: "/rebates#builders", img: pick(IMG.ext, 3, 700, 460) },
    { t: "Quick Move-In Homes", to: "/new-homes?status=quick", img: pick(IMG.ext, 8, 700, 460) },
    { t: "Search by Builder", to: "/rebates#builders", img: pick(IMG.build, 2, 700, 460) },
    { t: "Browse Communities", to: "/communities", img: pick(IMG.air, 4, 700, 460) },
  ];
  return (
    <section className="bg-ink-50/60 py-12 lg:py-16">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-bold text-ink-800 sm:text-4xl">
            Find Your New Home Deal{" "}
            <span className="font-sans text-[14px] font-semibold text-ink-500">
              Explore the latest new construction homes, builder incentives and communities across North Texas.
            </span>
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <Link to={c.to} className="card-hover group block overflow-hidden rounded-xl bg-white ring-1 ring-ink-900/10">
                <SmartImage src={c.img} alt={c.t} ratio="aspect-[3/2]" imgClassName="group-hover:scale-[1.07]" />
                <span className="flex items-center justify-between gap-2 p-3.5">
                  <span className="text-[14px] leading-snug font-extrabold text-ink-900">{c.t}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-600 text-white transition-transform duration-300 group-hover:translate-x-1">
                    <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ 5 · TOP COMMUNITIES ═══════════════════════ */

const DFW_CITIES = ["Sherman", "Van Alstyne", "Celina", "McKinney", "Prosper", "Melissa", "Anna", "Denison"];

function TopCommunities() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold text-ink-800 sm:text-4xl">
            Explore Top New Home Communities{" "}
            <span className="font-sans text-[14px] font-semibold text-ink-500">Beautiful homes. Great locations. Incredible opportunities.</span>
          </h2>
          <Link to="/communities" className="inline-flex items-center gap-2 text-[13px] font-extrabold tracking-wide text-ink-800 uppercase transition-colors hover:text-gold-600">
            View All Communities <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
      <Reveal delay={120}>
        <div className="hide-scrollbar mt-8 flex gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:justify-center">
          {DFW_CITIES.map((city, i) => {
            const count = LISTINGS.filter((l) => l.city === city).length;
            return (
              <Link
                key={city}
                to={`/new-homes?q=${encodeURIComponent(city)}`}
                className="card-hover group w-40 shrink-0 overflow-hidden rounded-xl ring-1 ring-ink-900/10 sm:w-44"
              >
                <SmartImage src={pick(IMG.ext, i + 1, 500, 380)} alt={`New homes in ${city}, TX`} ratio="aspect-[4/3]" imgClassName="group-hover:scale-[1.08]" />
                <span className="block bg-ink-800 px-3 py-2.5 text-center text-[14px] font-extrabold text-white transition-colors group-hover:bg-gold-600">
                  {city}
                  {count > 0 && <span className="block text-[10.5px] font-bold text-white/70">{count} home{count === 1 ? "" : "s"}</span>}
                </span>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════ 6 · WHICH OPTION ═══════════════════════ */

function WhichOption() {
  const { open } = useLead();
  return (
    <section className="bg-ink-50/60 py-12 lg:py-16">
      <div className="container-x">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-bold text-ink-800 sm:text-4xl">Which Option Describes You?</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal variant="left">
            <div className="flex h-full flex-col gap-5 rounded-2xl bg-white p-6 ring-1 ring-ink-900/10 sm:flex-row sm:items-center">
              <SmartImage src={photo(IMG.ext[2], 600, 500)} alt="Buying a new home" ratio="aspect-[4/3]" className="w-full shrink-0 rounded-xl sm:w-44" />
              <div>
                <h3 className="font-display text-[22px] font-bold text-ink-800">I&rsquo;m Just Buying a New Home</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
                  Work with us as your buyer&rsquo;s agent and receive a cash rebate at closing.
                </p>
                <RedButton onClick={() => open("which-option-buy")} className="mt-4">Calculate My Rebate</RedButton>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <div className="flex h-full flex-col gap-5 rounded-2xl bg-white p-6 ring-1 ring-ink-900/10 sm:flex-row sm:items-center">
              <SmartImage src={photo(IMG.ext[6], 600, 500)} alt="Move-up buyer option" ratio="aspect-[4/3]" className="w-full shrink-0 rounded-xl sm:w-44" />
              <div>
                <h3 className="font-display text-[22px] font-bold text-ink-800">I Have a Home to Sell Too</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
                  You may be able to apply the value of your rebate toward reducing the cost of selling your current home. Ask us about the Move-Up Option.
                </p>
                <OutlineButton to="/buyer-guide" className="mt-4">Learn About the Move-Up Option</OutlineButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ 7 · SINCE 2004 ═══════════════════════ */

function Since2004() {
  const creds = [
    { icon: "calendar", t: "20+ Years Experience" },
    { icon: "star", t: "A+ BBB Rating (Two+ Decades)" },
    { icon: "team", t: "Hundreds of 5-Star Reviews" },
    { icon: "trophy", t: "Thousands of Clients Served" },
  ];
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-x grid items-center gap-8 lg:grid-cols-[.9fr_1.4fr_.8fr]">
        <Reveal variant="left">
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-ink-900/10">
            <FoundersPhoto ratio="aspect-[4/4.6]" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display text-3xl font-bold text-ink-800">Texas New Home Rebates Since 2004</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
            We&rsquo;re Mike and Jenee Askins, and we&rsquo;ve helped thousands of home buyers across North Texas navigate
            new construction for over 20 years. Our goal is simple — to help you find the right new home, get the best
            incentives, and put more money back in your pocket through our builder rebate program.
          </p>
          <RedButton to="/about" className="mt-6">Meet Mike &amp; Jenee</RedButton>
        </Reveal>
        <div className="space-y-4">
          {creds.map((c, i) => (
            <Reveal key={c.t} delay={140 + i * 80}>
              <div className="flex items-center gap-3 rounded-xl bg-ink-50 px-4 py-3 ring-1 ring-ink-900/[.06]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink-800 text-white">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <span className="text-[14px] font-extrabold text-ink-900">{c.t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ 8 · FAQ ═══════════════════════ */

const HOME_FAQS = [
  { q: "Is the rebate really cash?", a: "Yes. Your rebate is credited on your closing statement — applied to closing costs, a rate buydown, or issued back to you, depending on your loan program." },
  { q: "Do I need to register before visiting a builder?", a: "Yes — this is the most important step. Contact us before your first model visit so we can register you as our client and protect your rebate eligibility." },
  { q: "Does the builder charge me more if I use ARG?", a: "No. Builders budget the buyer's agent commission whether or not you bring representation. Without us, that money simply stays with the builder." },
  { q: "When do I receive my rebate?", a: "At closing. It appears as a credit on your settlement statement, so there's no waiting period or mail-in claim." },
  { q: "Can I use my rebate toward closing costs?", a: "Absolutely — that's the most popular option. Most buyers apply the full rebate to title, escrow and lender fees, and many bring almost nothing to closing." },
  { q: "Are all builders eligible?", a: "Nearly all production and semi-custom builders in North Texas cooperate. We verify each builder's co-op and incentive package before you tour." },
  { q: "Do I still get builder incentives?", a: "Yes! Your rebate is completely separate. You keep 100% of builder promotions, design credits and rate buydowns — then we stack your rebate on top." },
  { q: "What if I'm already working with a builder?", a: "Call us before you sign anything. Many builders honor retroactive registration if no contract is executed, and we'll negotiate that for you." },
  { q: "Are there any conditions or restrictions?", a: "Just register with us first and close with our representation. The rebate is disclosed to your lender and title company — no hidden conditions." },
];

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="bg-ink-50/60 py-12 lg:py-16">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="w-full text-center">
            <h2 className="font-display text-3xl font-bold text-ink-800 sm:text-4xl">New Home Rebate FAQs</h2>
            <p className="mt-1 text-[14px] text-ink-500">Quick answers to the most common questions.</p>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {HOME_FAQS.map((f, i) => (
            <Reveal key={f.q} delay={(i % 3) * 70}>
              <div className={cn("overflow-hidden rounded-lg bg-white ring-1 ring-ink-900/10 transition-shadow", openIdx === i && "shadow-lg ring-gold-500/40")}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                >
                  <span className="text-[13.5px] font-bold text-ink-900">{f.q}</span>
                  <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full text-[16px] font-bold transition-all duration-300", openIdx === i ? "rotate-45 bg-gold-600 text-white" : "bg-ink-100 text-ink-600")}>
                    +
                  </span>
                </button>
                <div className={cn("grid overflow-hidden transition-all duration-400", openIdx === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="min-h-0">
                    <p className="border-t border-ink-900/[.07] px-4 py-3 text-[13px] leading-relaxed text-ink-600">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-7 text-center">
          <OutlineButton to="/rebates#faq">View All FAQs</OutlineButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ 9 · TESTIMONIALS ═══════════════════════ */

function TestimonialsBand() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => window.clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="border-y border-ink-900/10 bg-white py-10">
      <div className="container-x">
        <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr_auto]">
          <Reveal>
            <h2 className="font-display text-2xl font-bold whitespace-nowrap text-ink-800 sm:text-[26px]">
              What Our Clients Are Saying
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div key={i} className="animate-pop flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
              <Stars className="h-5 w-5 shrink-0" />
              <p className="text-[14px] leading-relaxed text-ink-700">
                &ldquo;{t.quote.split(".")[0]}.&rdquo; <span className="font-bold text-ink-900">— {t.name}</span>
                <span className="ml-2 rounded bg-mint-500/15 px-2 py-0.5 text-[12px] font-extrabold whitespace-nowrap text-mint-600">
                  {t.rebate} back
                </span>
              </p>
            </div>
            <div className="mt-3 flex gap-1.5">
              {TESTIMONIALS.slice(0, 8).map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Review ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={cn("h-1.5 rounded-full transition-all duration-400", idx === i % 8 ? "w-7 bg-gold-600" : "w-2.5 bg-ink-200 hover:bg-ink-300")}
                />
              ))}
            </div>
          </Reveal>
          <Reveal delay={160}>
            <OutlineButton to="/about#reviews" className="whitespace-nowrap">Read More Reviews</OutlineButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ 10 · BOTTOM CTA ═══════════════════════ */

function BottomCta() {
  const { open } = useLead();
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="absolute inset-0">
        <SmartImage src={HERO_IMAGES.dallasNight} alt="" ratio="h-full" className="absolute inset-0 h-full" imgClassName="animate-pan" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/80 to-ink-950/60" />
      </div>
      {/* Texas flag accent */}
      <div className="absolute inset-y-0 left-0 hidden w-24 opacity-90 lg:block" aria-hidden="true">
        <div className="flex h-full">
          <div className="grid w-2/5 place-items-center bg-ink-800">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-white/90" fill="currentColor"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" /></svg>
          </div>
          <div className="w-3/5">
            <div className="h-1/2 bg-white/95" />
            <div className="h-1/2 bg-gold-600" />
          </div>
        </div>
      </div>

      <div className="container-x relative grid items-center gap-8 py-12 lg:grid-cols-[.9fr_1.4fr_.9fr] lg:py-14 lg:pl-32">
        <Reveal variant="left">
          <p className="font-script text-4xl leading-tight text-white sm:text-5xl">
            Let&rsquo;s Find<br />Your Next Home.
          </p>
        </Reveal>
        <Reveal delay={100} className="text-center lg:text-left">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Ready to Find Out How Much You Could Save?
          </h2>
          <p className="mt-2 text-[15px] text-ink-200">Get your personalized rebate estimate today.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <RedButton onClick={() => open("bottom-cta")}>Calculate My Rebate</RedButton>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-[13px] font-extrabold tracking-wide text-ink-900 uppercase transition-all duration-300 hover:-translate-y-0.5"
            >
              <Icon name="phone" className="h-4 w-4 text-gold-600" />
              Or Call/Text {SITE.phone}
            </a>
          </div>
        </Reveal>
        <Reveal variant="right" delay={160}>
          <div className="mx-auto max-w-[240px] rounded-xl bg-ink-900/90 p-6 text-center ring-1 ring-white/15 backdrop-blur lg:ml-auto">
            <svg viewBox="0 0 24 24" className="mx-auto h-11 w-11 text-white" fill="currentColor" aria-hidden="true">
              <path d="M12.6 2.1 22 9.2V21a1 1 0 0 1-1 1h-5.6v-6.4H8.6V22H3a1 1 0 0 1-1-1V9.2L11.4 2.1a1 1 0 0 1 1.2 0Z" />
            </svg>
            <p className="mt-3 text-[15px] leading-snug font-black tracking-wide text-white uppercase">
              Buy Smart.<br />Save Thousands.<sup className="text-[9px]">®</sup>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
