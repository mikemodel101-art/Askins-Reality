import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon, Reveal, SectionHeading, SmartImage, Button, StatCounter, Eyebrow, Marquee, Pill, Stars } from "./ui";
import { Link, usd } from "@/lib/router";
import { BUILDERS, LISTINGS } from "@/data/listings";
import { FAQ, GUIDE_STEPS, RECENT_REBATES, SITE, STATS, TESTIMONIALS } from "@/data/content";
import { LeadForm, useLead } from "./LeadForm";

/* ------------------------------------------------------------------ *
 *  Page hero (interior pages)
 * ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  sub,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pt-28 pb-14 sm:pt-32 lg:pt-40 lg:pb-20">
      <div className="absolute inset-0">
        <SmartImage src={image} alt="" ratio="h-full" eager className="absolute inset-0 h-full" imgClassName="scale-105 animate-pan" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/90 to-ink-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(247,181,42,.18),transparent_55%)]" />
      </div>
      <div className="container-x relative">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12.5px] text-ink-300">
            <Link to="/" className="transition-colors hover:text-gold-300">Home</Link>
            <span className="text-ink-500">/</span>
            <span className="text-gold-300">{eyebrow}</span>
          </nav>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.04] font-semibold text-balance text-white sm:text-5xl lg:text-[3.9rem]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-ink-200/85 sm:text-[17.5px]">{sub}</p>
        </Reveal>
        {children && (
          <Reveal delay={240} className="mt-8">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  Builder trust marquee
 * ------------------------------------------------------------------ */

export function TrustBar() {
  return (
    <section className="border-y border-ink-900/[.07] bg-white/70 py-6">
      <div className="container-x">
        <p className="mb-4 text-center text-[11px] font-bold tracking-[.2em] text-ink-400 uppercase">
          Registered with every major Texas builder · Over 46 brands statewide
        </p>
        <Marquee items={BUILDERS.slice(0, 14).map((b) => b.name)} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  Recent Rebates Live Ticker Marquee (Animation & Social Proof)
 * ------------------------------------------------------------------ */

export function RecentRebatesTicker() {
  const doubled = [...RECENT_REBATES, ...RECENT_REBATES];
  return (
    <div className="relative overflow-hidden border-b border-gold-500/20 bg-gradient-to-r from-ink-950 via-ink-900 to-ink-950 py-3 text-white">
      <div className="flex w-max animate-marquee items-center gap-8">
        {doubled.map((item, idx) => (
          <div key={`${item.city}-${idx}`} className="flex items-center gap-3 text-[13px]">
            <span className="flex h-2 w-2 rounded-full bg-mint-400 animate-pulse" />
            <span className="font-semibold text-gold-300">{item.rebate} rebate</span>
            <span className="text-ink-300">({item.builder} in {item.city})</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-ink-400 font-mono">{item.time}</span>
            <span className="text-white/20">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Stats band
 * ------------------------------------------------------------------ */

export function StatsBand({ light = true }: { light?: boolean }) {
  return (
    <section className={cn("relative overflow-hidden", light ? "bg-ink-950" : "bg-white")}>
      <div className="container-x grid grid-cols-2 gap-8 py-12 sm:py-14 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 90}>
            <StatCounter
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              label={s.label}
              decimals={s.prefix ? 1 : 0}
              light={light}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  Rebate calculator with multiple use-cases
 * ------------------------------------------------------------------ */

export function RebateCalculator({ dark = false }: { dark?: boolean }) {
  const [price, setPrice] = useState(575000);
  const [rate, setRate] = useState(3);
  const [strategy, setStrategy] = useState<"closing" | "buydown" | "cash" | "options">("closing");

  const rebate = Math.round((price * rate) / 100);
  const closingHelp = Math.round(rebate * 0.7);
  const buydownPower = `${(rebate / 10000).toFixed(1)} discount points (saves ~$${Math.round(rebate * 0.024)}/mo)`;
  const box = dark ? "bg-white/[.06] ring-white/10" : "bg-white ring-ink-900/[.07]";

  return (
    <div className={cn("rounded-3xl p-6 ring-1 sm:p-8", dark ? "bg-white/[.04] ring-white/10" : "bg-cream ring-ink-900/[.07]")}>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex items-center justify-between">
            <span className={cn("text-[12px] font-bold tracking-wide uppercase", dark ? "text-ink-200" : "text-ink-500")}>
              Home purchase price
            </span>
            <span className={cn("font-display text-2xl font-semibold", dark ? "text-gold-300" : "text-ink-900")}>{usd(price)}</span>
          </div>
          <input
            type="range"
            min={250000}
            max={1200000}
            step={5000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            aria-label="Home purchase price"
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-gold-400/40 to-gold-500 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:ring-4 [&::-webkit-slider-thumb]:ring-gold-400"
          />
          <div className={cn("mt-2 flex justify-between text-[11.5px]", dark ? "text-ink-400" : "text-ink-400")}>
            <span>$250K</span>
            <span>$575K (avg)</span>
            <span>$1.2M+</span>
          </div>

          <div className="mt-7">
            <span className={cn("text-[12px] font-bold tracking-wide uppercase", dark ? "text-ink-200" : "text-ink-500")}>
              Rebate percentage
            </span>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { r: 3, l: "3.0% Rebate", d: "Standard on most builders" },
                { r: 2.5, l: "2.5% Rebate", d: "Perry / Highland / Weekley" },
                { r: 2, l: "2.0% Rebate", d: "Custom / Luxury $850K+" },
              ].map((o) => (
                <button
                  key={o.r}
                  onClick={() => setRate(o.r)}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-all duration-300",
                    rate === o.r
                      ? "border-gold-500 bg-gold-50 ring-2 ring-gold-400/30"
                      : dark
                        ? "border-white/15 hover:border-white/40"
                        : "border-ink-200 hover:border-ink-400"
                  )}
                >
                  <span className={cn("block text-[14px] font-bold", dark ? "text-white" : "text-ink-900")}>{o.r}% cash</span>
                  <span className={cn("block text-[11px] leading-tight mt-0.5", dark ? "text-ink-300" : "text-ink-500")}>{o.l}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <span className={cn("text-[12px] font-bold tracking-wide uppercase", dark ? "text-ink-200" : "text-ink-500")}>
              How would you like to apply your rebate?
            </span>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { id: "closing", label: "Closing Costs", icon: "doc" },
                { id: "buydown", label: "Rate Buydown", icon: "bolt" },
                { id: "options", label: "Design Credit", icon: "builder" },
                { id: "cash", label: "Credit to Buyer", icon: "cash" },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setStrategy(st.id as typeof strategy)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center text-[12px] font-semibold transition-all duration-200",
                    strategy === st.id
                      ? "border-gold-500 bg-gold-400/15 text-gold-700 font-bold"
                      : dark
                        ? "border-white/10 text-ink-300 hover:bg-white/5"
                        : "border-ink-200 text-ink-600 hover:bg-ink-50"
                  )}
                >
                  <Icon name={st.icon} className="h-4 w-4" />
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          <p className={cn("mt-6 text-[12px] leading-relaxed", dark ? "text-ink-300/70" : "text-ink-400")}>
            Full rebate is formally disclosed on Line 506 / Section L of your Closing Disclosure. Non-taxable reduction in basis under IRS Revenue Ruling 2007-21.
          </p>
        </div>

        <div className="space-y-3">
          <div className={cn("rounded-2xl p-6 ring-1", box)}>
            <div className="flex items-center justify-between">
              <p className={cn("text-[12px] font-bold tracking-wide uppercase", dark ? "text-gold-300" : "text-gold-700")}>
                Your estimated cash back
              </p>
              <Pill className="bg-mint-500/15 text-mint-600 ring-mint-500/30">TREC Licensed</Pill>
            </div>
            <p className={cn("mt-2 font-display text-5xl font-semibold sm:text-6xl text-mint-600")}>
              {usd(rebate)}
            </p>
            <div className="mt-5 space-y-2.5 border-t border-dashed border-ink-900/10 pt-4 text-[13.5px]">
              {[
                { k: "Title, Escrow & Closing covered", v: usd(closingHelp) },
                { k: "Permanent Rate Buydown", v: buydownPower },
                { k: "Or Check Credit at Title", v: usd(rebate) },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between gap-3">
                  <span className={dark ? "text-ink-300" : "text-ink-500"}>{r.k}</span>
                  <span className={cn("font-bold", dark ? "text-white" : "text-ink-900")}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
          <LeadForm
            source="rebate-calculator"
            compact
            preset={{ budget: price >= 850000 ? "$850K+" : price >= 650000 ? "$650K – $850K" : price >= 500000 ? "$500K – $650K" : price >= 350000 ? "$350K – $500K" : "Under $350K" }}
            title="Lock in this cash back"
            sub="Send this breakdown to your phone + get the matching quick move-in inventory."
            showTimeline={false}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Interactive HUD-1 / Closing Statement Viewer (for Rebates Page)
 * ------------------------------------------------------------------ */

export function Hud1InteractiveViewer() {
  const [activeTab, setActiveTab] = useState<"cd" | "hud">("cd");
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-ink-900/[.08]">
      <div className="flex items-center justify-between border-b border-ink-900/10 bg-ink-950 px-6 py-4 text-white">
        <div>
          <p className="text-[11px] font-bold tracking-[.18em] text-gold-300 uppercase">Official Disclosure Simulation</p>
          <h3 className="font-display text-xl font-semibold text-white">Line-by-Line Rebate on Closing Statement</h3>
        </div>
        <div className="flex gap-1.5 rounded-lg bg-white/10 p-1">
          <button
            onClick={() => setActiveTab("cd")}
            className={cn("rounded-md px-3 py-1 text-[12px] font-bold transition", activeTab === "cd" ? "bg-gold-600 text-white" : "text-white hover:bg-white/10")}
          >
            Closing Disclosure (CD)
          </button>
          <button
            onClick={() => setActiveTab("hud")}
            className={cn("rounded-md px-3 py-1 text-[12px] font-bold transition", activeTab === "hud" ? "bg-gold-400 text-ink-950" : "text-white hover:bg-white/10")}
          >
            HUD-1 Form
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 font-mono text-[13px] bg-slate-50/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-500 font-sans font-bold uppercase text-[11px]">
            <span>Section / Line Item Description</span>
            <span>Amount</span>
          </div>

          <div className="flex items-center justify-between py-2 text-slate-700">
            <span>K. Total Due from Borrower at Closing (Purchase Price + Prepaids)</span>
            <span className="font-bold font-mono">$602,450.00</span>
          </div>

          <div className="flex items-center justify-between py-2 text-slate-700">
            <span>L. 01 Deposit (Earnest Money Paid)</span>
            <span className="font-mono text-slate-500">-$5,000.00</span>
          </div>

          <div className="flex items-center justify-between py-2 text-slate-700">
            <span>L. 02 Principal Amount of New Loan(s)</span>
            <span className="font-mono text-slate-500">-$480,000.00</span>
          </div>

          <div className="flex items-center justify-between py-2 text-slate-700">
            <span>L. 04 Builder Flex Cash Incentive Credit</span>
            <span className="font-mono text-slate-500">-$15,000.00</span>
          </div>

          {/* HIGHLIGHTED LINE ITEM FOR THE REBATE */}
          <div className="animate-pulse-ring-slow rounded-xl bg-gold-100/90 border-2 border-gold-400 p-3 text-ink-950 font-sans shadow-md">
            <div className="flex items-center justify-between font-mono">
              <span className="flex items-center gap-2 font-bold text-[14px] text-ink-950">
                <Icon name="check" className="h-4 w-4 text-mint-600" />
                {activeTab === "cd"
                  ? "Section L (Line 08): Broker Commission Rebate (Texas New Home Rebates)"
                  : "Line 506 / 206: Real Estate Broker Rebate to Buyer"}
              </span>
              <span className="text-lg font-extrabold text-mint-700">-$17,397.00</span>
            </div>
            <p className="mt-1 text-[12px] text-ink-600 font-sans">
              ★ Disclosed formally to lender & title company. Directly reduces total cash required to close.
            </p>
          </div>

          <div className="flex items-center justify-between border-t-2 border-slate-900 pt-3 text-[15px] font-bold text-ink-950 font-sans">
            <span>Final Cash from Borrower to Close</span>
            <span className="font-mono text-xl text-emerald-700">$85,053.00 (Saved $32,397 Total)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  How it works timeline
 * ------------------------------------------------------------------ */

export function StepsTimeline({ dark = false, steps = GUIDE_STEPS.slice(0, 4) }: { dark?: boolean; steps?: typeof GUIDE_STEPS }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal key={s.n} delay={i * 90}>
          <div
            className={cn(
              "group relative h-full overflow-hidden rounded-2xl p-6 ring-1 transition-all duration-500 hover:-translate-y-1.5",
              dark ? "bg-white/[.05] ring-white/10 hover:bg-white/[.08]" : "bg-white ring-ink-900/[.07] hover:shadow-[0_30px_60px_-40px_rgba(6,15,29,.5)]"
            )}
          >
            <span className="font-display text-4xl font-semibold text-gold-500/40 transition-colors duration-500 group-hover:text-gold-500">
              {s.n}
            </span>
            <h3 className={cn("mt-3 text-[17px] font-semibold", dark ? "text-white" : "text-ink-900")}>{s.title}</h3>
            <p className={cn("mt-2 text-[13.5px] leading-relaxed", dark ? "text-ink-300/85" : "text-ink-600")}>{s.desc}</p>
            <span className="absolute right-5 bottom-5 grid h-9 w-9 place-items-center rounded-full bg-gold-400/15 text-gold-600 transition-all duration-500 group-hover:bg-gold-400 group-hover:text-ink-950">
              <Icon name={s.icon} className="h-4 w-4" />
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Homepage Testimonial Showcase with Filter Tabs & Live Carousel
 * ------------------------------------------------------------------ */

export function HomeTestimonialsShowcase() {
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeIdx, setActiveIdx] = useState(0);

  const filtered = activeRegion === "All"
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.region === activeRegion || t.badge.includes(activeRegion));

  const current = filtered[activeIdx % filtered.length] || TESTIMONIALS[0];

  useEffect(() => {
    setActiveIdx(0);
  }, [activeRegion]);

  return (
    <div className="space-y-8">
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {["All", "DFW", "Houston", "Austin", "Hill Country", "San Antonio", "Valley"].map((reg) => (
          <button
            key={reg}
            onClick={() => setActiveRegion(reg)}
            className={cn(
              "rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-300",
              activeRegion === reg
                ? "bg-gold-400 text-ink-950 shadow-md scale-105"
                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
            )}
          >
            {reg === "All" ? "★ All Texas Stories" : reg}
          </button>
        ))}
      </div>

      {/* Featured Testimonial Card */}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        <div className="relative overflow-hidden rounded-3xl bg-white/10 p-8 ring-1 ring-white/15 backdrop-blur sm:p-10 text-white">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-gold-400/20 px-3.5 py-1 text-[11px] font-extrabold text-gold-300 uppercase tracking-wider ring-1 ring-gold-400/30">
              {current.badge} · {current.date}
            </span>
            <div className="flex gap-1 text-gold-400">
              {Array.from({ length: current.stars }).map((_, s) => (
                <svg key={s} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
                </svg>
              ))}
            </div>
          </div>

          <blockquote className="animate-pop mt-6 font-display text-xl leading-relaxed sm:text-2xl text-white">
            “{current.quote}”
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3">
              <SmartImage src={current.image} alt={current.name} ratio="aspect-square" className="h-14 w-14 rounded-full ring-2 ring-gold-400" />
              <div>
                <p className="font-bold text-white text-[16px]">{current.name}</p>
                <p className="text-[13px] text-ink-300">{current.city} · {current.community}</p>
                <p className="text-[11.5px] text-gold-300/90 font-medium">Builder: {current.builder}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-mint-500/20 to-mint-600/10 p-4 ring-1 ring-mint-500/40 text-right">
              <p className="text-[11px] font-bold uppercase tracking-wider text-mint-300">Cash Back Received</p>
              <p className="font-display text-3xl font-extrabold text-mint-400">{current.rebate}</p>
              <p className="text-[11px] text-ink-300">({current.rebatePct} of {current.price})</p>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex gap-2">
              {filtered.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Testimonial ${idx + 1}`}
                  onClick={() => setActiveIdx(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    idx === activeIdx % filtered.length ? "w-8 bg-gold-400" : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveIdx((p) => (p === 0 ? filtered.length - 1 : p - 1))}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-gold-600 transition"
                aria-label="Previous story"
              >
                <Icon name="arrow" className="h-4 w-4 rotate-180" />
              </button>
              <button
                onClick={() => setActiveIdx((p) => (p + 1) % filtered.length)}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-ink-950 transition"
                aria-label="Next story"
              >
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail gallery */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
          {filtered.slice(0, 4).map((t, idx) => (
            <button
              key={t.name}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 ring-1",
                idx === activeIdx % filtered.length
                  ? "bg-white/20 ring-2 ring-gold-400 scale-[1.02]"
                  : "bg-white/5 ring-white/10 hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-2.5">
                <SmartImage src={t.image} alt={t.name} ratio="aspect-square" className="h-10 w-10 rounded-full" />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold text-white">{t.name}</p>
                  <p className="truncate text-[11px] text-ink-300">{t.city}</p>
                </div>
              </div>
              <p className="mt-2 text-xs font-semibold text-mint-400">{t.rebate} Rebate</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Testimonial slider (backward compatibility + about page)
 * ------------------------------------------------------------------ */

export function TestimonialSlider({ light = false }: { light?: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 7000);
    return () => window.clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
      <div className={cn("relative overflow-hidden rounded-3xl p-7 ring-1 sm:p-10", light ? "bg-white/[.05] ring-white/10" : "bg-white ring-ink-900/[.07]")}>
        <Icon name="quote" className={cn("h-10 w-10", light ? "text-gold-400/40" : "text-gold-500/30")} />
        <blockquote key={i} className="animate-pop mt-4 font-display text-xl leading-snug text-balance sm:text-[26px]">
          <span className={light ? "text-white" : "text-ink-900"}>“{t.quote}”</span>
        </blockquote>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className={cn("text-[15px] font-bold", light ? "text-white" : "text-ink-900")}>{t.name}</p>
            <p className={cn("text-[13px]", light ? "text-ink-300" : "text-ink-500")}>{t.city} · {t.community}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold tracking-[.14em] text-gold-600 uppercase">Cash back</p>
            <p className="font-display text-2xl font-semibold text-mint-600">{t.rebate}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Review ${idx + 1}`}
                onClick={() => setI(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  idx === i ? "w-8 bg-gold-500" : light ? "w-2.5 bg-white/25" : "w-2.5 bg-ink-900/15"
                )}
              />
            ))}
          </div>
          <Stars />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {TESTIMONIALS.slice(0, 4).map((x, idx) => (
          <button
            key={x.name}
            onClick={() => setI(idx)}
            className={cn(
              "group relative overflow-hidden rounded-2xl ring-1 transition-all duration-500 text-left",
              idx === i ? "ring-2 ring-gold-500" : "ring-white/10 opacity-70 hover:opacity-100"
            )}
          >
            <SmartImage src={x.image} alt={x.name} ratio="aspect-square" imgClassName="group-hover:scale-105" />
            <span className="absolute inset-x-2 bottom-2 truncate rounded-lg bg-ink-950/70 px-2 py-1 text-[11px] font-bold text-white backdrop-blur">
              {x.city} · {x.rebate}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Comparison
 * ------------------------------------------------------------------ */

export function ComparisonTable() {
  const rows = [
    { k: "Who negotiates for you", a: "Builder's sales rep (represents builder)", b: "Your licensed TX advisor (represents you)" },
    { k: "Cash back at closing", a: "$0 (Builder keeps the 3% budget)", b: "2% – 3% of final price ($10K–$25K back)" },
    { k: "Incentive benchmarking", a: "They know, you don't", b: "Side-by-side analysis of all 46 builders" },
    { k: "Independent inspections", a: "Builder's city inspector (~12 min)", b: "4 third-party milestone inspections" },
    { k: "Contract addenda review", a: "Standard 'take it or leave it'", b: "Line-by-line review before you sign" },
    { k: "Cost to you", a: "Free (builder takes maximum margin)", b: "100% Free + Thousands in your pocket" },
  ];
  return (
    <div className="overflow-hidden rounded-3xl ring-1 ring-ink-900/[.08]">
      <div className="grid grid-cols-[1.3fr_1fr_1.2fr] bg-ink-950 text-white">
        <div className="px-4 py-4 text-[12px] font-bold tracking-[.14em] text-ink-300 uppercase sm:px-6">What you get</div>
        <div className="px-4 py-4 text-[12px] font-bold tracking-[.14em] text-ink-300 uppercase sm:px-6">Going alone</div>
        <div className="flex items-center gap-2 bg-gold-400/15 px-4 py-4 text-[12px] font-bold tracking-[.14em] text-gold-300 uppercase sm:px-6">
          <Icon name="star" className="h-3.5 w-3.5" /> With Texas New Home Rebates
        </div>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.k}
          className={cn("grid grid-cols-[1.3fr_1fr_1.2fr] border-t border-ink-900/[.06]", i % 2 ? "bg-white" : "bg-cream")}
        >
          <div className="px-4 py-4 text-[13.5px] font-semibold text-ink-900 sm:px-6 sm:text-[14.5px]">{r.k}</div>
          <div className="flex items-start gap-2 px-4 py-4 text-[13px] text-ink-400 sm:px-6">
            <Icon name="close" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
            {r.a}
          </div>
          <div className="flex items-start gap-2 bg-gold-400/[.08] px-4 py-4 text-[13px] font-medium text-ink-800 sm:px-6">
            <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-600" />
            {r.b}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  FAQ accordion
 * ------------------------------------------------------------------ */

export function FaqAccordion({ items = FAQ, light = false }: { items?: typeof FAQ; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-ink-900/[.08] overflow-hidden rounded-3xl bg-white ring-1 ring-ink-900/[.07]">
      {items.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-gold-50/60 sm:px-7"
          >
            <span className={cn("text-[15px] font-semibold sm:text-[16.5px]", light ? "text-white" : "text-ink-900")}>{f.q}</span>
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-400",
                open === i ? "rotate-45 bg-gold-400 text-ink-950" : "bg-ink-900/[.06] text-ink-600"
              )}
            >
              <Icon name="plus" className="h-4 w-4" />
            </span>
          </button>
          <div className={cn("grid overflow-hidden transition-all duration-500", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <div className="min-h-0">
              <p className="px-5 pb-6 text-[14.5px] leading-relaxed text-ink-600 sm:px-7">{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  CTA split (lead form + content)
 * ------------------------------------------------------------------ */

export function CtaSplit({
  title,
  sub,
  bullets,
  image,
  source = "cta-split",
  flip = false,
}: {
  title: string;
  sub: string;
  bullets: string[];
  image: string;
  source?: string;
  flip?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-mint-500/10 blur-3xl" />
      </div>
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal variant={flip ? "right" : "left"} className={cn(flip && "lg:order-2")}>
          <Eyebrow className="border-white/25 bg-white/10 text-gold-200">Next step</Eyebrow>
          <h2 className="mt-5 font-display text-3xl leading-tight font-semibold text-balance text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-200/85">{sub}</p>
          <ul className="mt-7 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[14.5px] text-ink-100">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint-500/20 text-mint-400">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={SITE.phoneHref} variant="light" size="lg" icon="phone">
              {SITE.phone}
            </Button>
            <Button to="/new-homes" variant="ghost" size="lg" className="text-white hover:bg-white/10" icon="arrow">
              Search listings
            </Button>
          </div>
          <div className="mt-8">
            <SmartImage src={image} alt="New construction homes in Texas" ratio="aspect-[16/9]" className="rounded-2xl ring-1 ring-white/10" />
          </div>
        </Reveal>
        <Reveal variant={flip ? "left" : "right"} delay={120} className={cn(flip && "lg:order-1")}>
          <LeadForm source={source} title="Get My Rebate Estimate" sub="Licensed Texas advisors. Same-day response. Zero pressure." />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  Featured listings strip
 * ------------------------------------------------------------------ */

export function FeaturedStrip({ count = 6 }: { count?: number }) {
  const { open } = useLead();
  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Live MLS VOW feed · 110+ Homes"
            title={<>Fresh quick move-ins across Texas</>}
            sub="Synced hourly from IDXBroker PRO. Every home shows your estimated cash back — that's money the builder already budgeted."
          />
          <Reveal delay={200}>
            <Button to="/new-homes" variant="ink" size="lg" icon="arrow">
              Open all 110+ listings
            </Button>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LISTINGS.slice(0, count).map((l, i) => (
            <Reveal key={l.slug} delay={i * 70}>
              <HomeListingCard slug={l.slug} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-10 flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-white p-6 ring-1 ring-ink-900/[.07]">
          <p className="text-[14.5px] text-ink-600">
            Can't find your specific floor plan? Send your wish list and we'll text you matching specs immediately.
          </p>
          <Button onClick={() => open("featured-strip")} size="sm" icon="arrow">
            Send my wish list
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* small wrapper so we can lazy-import ListingCard without circular deps */
function HomeListingCard({ slug }: { slug: string }) {
  const l = LISTINGS.find((x) => x.slug === slug)!;
  return (
    <Link to={`/listing/${l.slug}`} className="card-hover group block overflow-hidden rounded-2xl bg-white ring-1 ring-ink-900/[.07]">
      <div className="relative">
        <SmartImage src={l.images[0]} alt={`${l.plan} in ${l.community}`} ratio="aspect-[4/3]" imgClassName="group-hover:scale-[1.06]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
          <span className="font-display text-2xl font-semibold text-white">{usd(l.price)}</span>
          <Pill className="bg-mint-500 text-white ring-mint-500">+{usd(l.rebate)} cash back</Pill>
        </div>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-bold tracking-[.14em] text-gold-700 uppercase">{l.builder}</p>
        <h3 className="mt-1 font-display text-[17px] font-semibold text-ink-900">{l.community}</h3>
        <p className="mt-1 text-[13.5px] text-ink-500">{l.city}, TX</p>
        <div className="mt-4 flex items-center gap-4 text-[13px] font-semibold text-ink-700">
          <span className="flex items-center gap-1.5"><Icon name="bed" className="h-4 w-4 text-ink-400" />{l.beds} beds</span>
          <span className="flex items-center gap-1.5"><Icon name="bath" className="h-4 w-4 text-ink-400" />{l.baths} baths</span>
          <span className="flex items-center gap-1.5"><Icon name="sqft" className="h-4 w-4 text-ink-400" />{l.sqft.toLocaleString()} sqft</span>
        </div>
      </div>
    </Link>
  );
}
