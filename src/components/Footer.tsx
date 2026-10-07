import { useState } from "react";
import { cn } from "@/utils/cn";
import { Link } from "@/lib/router";
import { Icon, Reveal, Button } from "./ui";
import { SITE } from "@/data/content";
import { REGIONS } from "@/data/listings";
import { useLead } from "./LeadForm";

const COLUMNS = [
  {
    title: "Buy",
    links: [
      { label: "Search New Homes", to: "/new-homes" },
      { label: "Interactive Map Search", to: "/new-homes?view=map" },
      { label: "Quick Move-Ins", to: "/new-homes?status=quick" },
      { label: "New Home Communities", to: "/communities" },
      { label: "Buyer Guide", to: "/buyer-guide" },
    ],
  },
  {
    title: "Rebates",
    links: [
      { label: "How Rebates Work", to: "/rebates" },
      { label: "Rebate Calculator", to: "/rebates#calculator" },
      { label: "Builder Incentives", to: "/rebates#builders" },
      { label: "Rebate FAQ", to: "/rebates#faq" },
      { label: "Blog & Market Data", to: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Team", to: "/about#team" },
      { label: "Platform Engine", to: "/about#platform" },
      { label: "Reviews", to: "/about#reviews" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function Footer() {
  const { open } = useLead();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-200">
      {/* CTA band */}
      <div className="relative border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-mint-500/10 blur-3xl" />
        </div>
        <div className="container-x relative grid gap-8 py-14 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-16">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[.18em] text-gold-300 uppercase">Ready when you are</p>
            <h2 className="mt-3 font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Find the home. Keep <span className="gold-text">up to 3%</span> of it.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-ink-300">
              Free rebate estimate, best-live-incentive report, and a quick move-in list for your target region — delivered
              by a licensed Texas advisor, not a call center.
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap gap-3 lg:justify-end">
            <Button onClick={() => open("footer-cta")} size="lg" icon="arrow">
              Get my rebate estimate
            </Button>
            <Button href={SITE.phoneHref} variant="light" size="lg" icon="phone">
              {SITE.phone}
            </Button>
          </Reveal>
        </div>
      </div>

      {/* main footer grid */}
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.4fr] lg:gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="relative block h-11 w-10 shrink-0">
              <svg viewBox="0 0 40 46" className="h-full w-full" aria-hidden="true">
                <path d="M20 2 36 10v14c0 10-7 18-16 20C11 42 4 34 4 24V10l16-8Z" fill="#d92626" stroke="#7f1d1d" strokeWidth="1.5" />
                <circle cx="20" cy="12" r="3.2" fill="#fff" />
                <text x="20" y="34" textAnchor="middle" fontSize="17" fontWeight="900" fill="#fff" fontFamily="Manrope, sans-serif">$</text>
              </svg>
            </span>
            <span className="leading-none">
              <span className="block text-[14px] font-extrabold tracking-tight text-white">Texas New Home</span>
              <span className="block text-[22px] leading-tight font-black tracking-tight text-gold-400">
                REBATES<span className="text-[13px] font-extrabold text-white">.com</span>
              </span>
              <span className="mt-0.5 block text-[8.5px] font-extrabold tracking-[.16em] text-ink-300">
                DFW DALLAS / FT. WORTH
              </span>
            </span>
          </Link>
          <p className="mt-2 font-script text-2xl text-gold-300">Buy Smart, Save Thousands.</p>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink-300/85">
            {SITE.group} — helping North Texas buyers navigate new construction since {SITE.since}. We register you with
            the builder, negotiate the incentives, and hand a portion of our commission back to you at closing.
          </p>
          <div className="mt-6 space-y-2.5 text-[13.5px]">
            <a href={SITE.phoneHref} className="flex items-center gap-2.5 text-ink-200 transition-colors hover:text-gold-300">
              <Icon name="phone" className="h-4 w-4 text-gold-400" /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-ink-200 transition-colors hover:text-gold-300">
              <Icon name="mail" className="h-4 w-4 text-gold-400" /> {SITE.email}
            </a>
            <p className="flex items-start gap-2.5 text-ink-300/85">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {SITE.address}
            </p>
          </div>
          <div className="mt-6 flex gap-2.5">
            {SITE.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/[.07] text-ink-200 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-600 hover:text-white"
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-[11.5px] font-extrabold tracking-[.18em] text-gold-400 uppercase">{col.title}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="group inline-flex items-center gap-1.5 text-[14px] text-ink-300 transition-colors hover:text-white">
                    <span className="h-1 w-0 rounded-full bg-gold-400 transition-all duration-300 group-hover:w-2.5" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-[11.5px] font-extrabold tracking-[.18em] text-gold-400 uppercase">Weekly builder intel</h3>
          <p className="mt-5 text-[13.5px] leading-relaxed text-ink-300/85">
            AI-assisted market briefs: incentive changes, price drops and new phase releases across Texas — every Thursday.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) setSent(true);
            }}
            className="mt-4"
          >
            <div className="flex items-center gap-2 rounded-full bg-white/[.07] p-1.5 ring-1 ring-white/15 transition focus-within:ring-gold-400/60">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@email.com"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-3.5 py-2 text-[13.5px] text-white placeholder:text-ink-400 focus:outline-none"
              />
              <button
                type="submit"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-400 text-ink-950 transition-transform hover:scale-105"
                aria-label="Subscribe"
              >
                <Icon name={sent ? "check" : "arrow"} className="h-4 w-4" />
              </button>
            </div>
            <p className={cn("mt-2 text-[12px]", sent ? "text-mint-400" : "text-ink-400")}>
              {sent ? "You're subscribed — first brief lands Thursday." : "No spam. One email per week."}
            </p>
          </form>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {["Follow Up Boss", "HubSpot", "kvCORE", "IDXBroker PRO"].map((t) => (
              <span key={t} className="rounded-full bg-white/[.06] px-2.5 py-1 text-[10.5px] font-semibold text-ink-300 ring-1 ring-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* region links */}
      <div className="container-x border-t border-white/10 py-8">
        <p className="text-[11px] font-bold tracking-[.18em] text-gold-400 uppercase">Popular Texas markets</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {REGIONS.flatMap((r) => r.cities.slice(0, 3)).map((c, i) => (
            <Link key={`${c}-${i}`} to="/new-homes" className="text-[13px] text-ink-300/80 transition-colors hover:text-gold-300">
              New Homes in {c}, TX
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-[12.5px] text-ink-400 lg:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved. {SITE.license}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-1.5">
              <Icon name="shield" className="h-3.5 w-3.5 text-mint-400" /> Equal Housing Opportunity
            </span>
            {["Privacy Policy", "Terms", "Accessibility", "TREC Information"].map((l) => (
              <a key={l} href="#/contact" className="transition-colors hover:text-white">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="h-16 lg:h-0" />
    </footer>
  );
}
