import { cn } from "@/utils/cn";
import { Icon, Reveal, SectionHeading, Button, Pill, Eyebrow, SmartImage, StatCounter } from "@/components/ui";
import { INTEGRATIONS, PLATFORM, SITE, STATS, TEAM, TESTIMONIALS } from "@/data/content";
import { CtaSplit, TestimonialSlider, TrustBar, PageHero } from "@/components/sections";
import { Seo } from "@/components/Seo";
import { HERO_IMAGES, IMG, pick } from "@/data/media";
import { BUILDERS, LISTINGS } from "@/data/listings";

const PERFORMANCE = [
  { k: "Largest Contentful Paint", before: "4.8s", after: "0.9s", pct: 81 },
  { k: "Total blocking time", before: "1,240ms", after: "40ms", pct: 97 },
  { k: "Page weight (home)", before: "6.2 MB", after: "0.4 MB", pct: 94 },
  { k: "Mobile PageSpeed score", before: "27", after: "97", pct: 259 },
  { k: "Indexed pages", before: "214", after: "1,600+", pct: 647 },
  { k: "Lead form conversion", before: "1.1%", after: "6.4%", pct: 482 },
];

const SEO_AUTOMATION = [
  { t: "Auto titles & meta", d: "Generated per route from live MLS data — city, builder, price band and rebate all included.", i: "doc" },
  { t: "Structured data", d: "RealEstateAgent, Residence, BreadcrumbList and FAQPage JSON-LD emitted on every page.", i: "chip" },
  { t: "Programmatic pages", d: "City × builder × community combinations generated with unique copy and internal links.", i: "globe" },
  { t: "Sitemap & indexing", d: "Sitemap regenerated on every feed sync; changed URLs pushed for instant re-indexing.", i: "feed" },
  { t: "Image SEO", d: "Descriptive alt text derived from plan, community and city; properly sized and lazy loaded.", i: "target" },
  { t: "Content refresh", d: "Stale pages flagged after 90 days and rewritten by the AI pipeline for human review.", i: "sparkle" },
];

export default function About() {
  return (
    <>
      <Seo path="/about" />
      <PageHero
        eyebrow="About Us"
        title={<>We're the brokerage that <span className="gold-text">gives the commission back</span></>}
        sub="Since 2011 we've represented Texas new-construction buyers against the builder's own sales team — and returned $18.4 million of commission to the people actually buying the house."
        image={HERO_IMAGES.austin}
      >
        <div className="grid max-w-3xl gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} label={s.label} decimals={s.prefix ? 1 : 0} light />
            </div>
          ))}
        </div>
      </PageHero>

      {/* story */}
      <section id="story" className="scroll-mt-24 bg-cream py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal variant="left">
            <div className="relative">
              <SmartImage src={HERO_IMAGES.family} alt="Texas family in front of their new home" ratio="aspect-[4/3]" className="rounded-3xl ring-1 ring-ink-900/[.07]" />
              <div className="absolute -bottom-6 -right-4 w-48 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-ink-900/[.07] sm:-right-8">
                <p className="text-[10.5px] font-bold tracking-[.14em] text-ink-400 uppercase">Since</p>
                <p className="font-display text-4xl font-semibold text-ink-900">2011</p>
                <p className="mt-1 text-[12.5px] leading-snug text-ink-500">Family-owned & Texas-based</p>
              </div>
              <div className="absolute -top-5 -left-4 hidden rounded-2xl bg-ink-950 px-5 py-4 text-white shadow-xl sm:block">
                <p className="font-display text-2xl font-semibold text-gold-300">$18.4M</p>
                <p className="text-[11.5px] text-ink-300">returned to buyers</p>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right" delay={100}>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-5 font-display text-3xl leading-tight font-semibold text-ink-900 sm:text-4xl">
              A model home conversation that never sat right
            </h2>
            <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-ink-600">
              <p>
                In 2004, Mike and Jenee Askins watched a couple sign a $412,000 contract in a model home outside Fort
                Worth. The sales rep thanked them for coming in "unrepresented" — and Mike knew exactly what that meant:
                the 3% commission the builder had budgeted for their agent simply stayed with the builder.
              </p>
              <p>
                That was the whole business model in one sentence. So we built the opposite: a licensed brokerage that
                registers buyers first, negotiates the incentives on their behalf, and returns most of the commission to the
                buyer at closing. No gimmicks, no fee, no strings.
              </p>
              <p>
                Fifteen years later we've closed more than 1,240 new construction homes across all 10 Texas metro regions and
                returned $18.4 million to buyers. The old IDX-VOW website finally caught up this year — rebuilt from the
                ground up with AI-mapped layouts, automated SEO and a lead pipeline that never drops a buyer.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" icon="arrow">Talk to our team</Button>
              <Button to="/rebates" variant="outline" size="lg">How the rebate works</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we operate"
            title={<>Four rules we don't bend</>}
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: "cash", t: "Rebate first", d: "Every recommendation is filtered through one question: does this get the buyer more cash back?" },
              { i: "shield", t: "No dual agency", d: "We never represent the builder. One client, one side, always the buyer." },
              { i: "doc", t: "Everything in writing", d: "Incentives, timelines, warranty terms and rebate amounts — documented before you sign." },
              { i: "team", t: "Advisor, not call center", d: "You work with a named licensed advisor from first click to final walkthrough." },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 80}>
                <div className="card-hover h-full rounded-3xl bg-cream p-6 ring-1 ring-ink-900/[.07]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-950 text-gold-300">
                    <Icon name={v.i} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[17.5px] font-semibold text-ink-900">{v.t}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* platform engine */}
      <section id="platform" className="scroll-mt-24 relative overflow-hidden bg-ink-950 py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />
        </div>
        <div className="container-x relative">
          <SectionHeading
            light
            eyebrow="The platform engine"
            title={<>What replaced our aging VOW-IDX site</>}
            sub="Six months of re-platforming: AI-driven wireframes mapped to every legacy page, automated SEO on each route, AI-assisted page creation, and a Core Web Vitals-first build."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {PLATFORM.map((p, i) => (
              <Reveal key={p.key} delay={i * 90}>
                <div className="card-hover h-full rounded-3xl bg-white/[.04] p-7 ring-1 ring-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="rounded-full bg-gold-400/15 px-2.5 py-1 text-[10.5px] font-bold tracking-[.14em] text-gold-300 uppercase">
                        {p.kicker}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-white">{p.title}</h3>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[.07] text-gold-300">
                      <Icon name="sparkle" className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-300/85">{p.desc}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] text-ink-200">
                        <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-white/10 pt-4 font-display text-3xl font-semibold text-gold-300">{p.metric}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* performance table */}
          <Reveal delay={150} className="mt-12 overflow-hidden rounded-3xl ring-1 ring-white/10">
            <div className="grid grid-cols-[1.4fr_.7fr_.7fr_1fr] bg-white/[.06] text-white">
              {["Metric", "Old IDX site", "This build", "Gain"].map((h) => (
                <div key={h} className="px-4 py-4 text-[11.5px] font-bold tracking-[.14em] uppercase sm:px-6">{h}</div>
              ))}
            </div>
            <div className="divide-y divide-white/[.06] bg-ink-950/60">
              {PERFORMANCE.map((r) => (
                <div key={r.k} className="grid grid-cols-[1.4fr_.7fr_.7fr_1fr] items-center px-4 py-4 sm:px-6">
                  <p className="text-[13.5px] font-semibold text-white sm:text-[14.5px]">{r.k}</p>
                  <p className="text-[13px] text-ink-400 line-through">{r.before}</p>
                  <p className="text-[13.5px] font-bold text-mint-400">{r.after}</p>
                  <div className="flex items-center gap-2">
                    <span className="hidden h-1.5 w-full max-w-[80px] overflow-hidden rounded-full bg-white/10 sm:block">
                      <span className="block h-full rounded-full bg-gradient-to-r from-gold-400 to-mint-500" style={{ width: `${Math.min(100, r.pct / 7)}%` }} />
                    </span>
                    <span className="text-[12px] font-bold text-gold-300">+{r.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* seo automation */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SEO_AUTOMATION.map((s, i) => (
              <Reveal key={s.t} delay={i * 70}>
                <div className="h-full rounded-2xl bg-ink-900/60 p-5 ring-1 ring-white/10">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint-500/15 text-mint-400">
                    <Icon name={s.i} className="h-4.5 w-4.5" />
                  </span>
                  <h4 className="mt-4 text-[15.5px] font-bold text-white">{s.t}</h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-300/85">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* integrations */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INTEGRATIONS.map((g, i) => (
              <Reveal key={g.group} delay={i * 70}>
                <div className="h-full rounded-2xl bg-white/[.05] p-5 ring-1 ring-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-400/15 text-gold-300">
                      <Icon name={g.icon} className="h-4 w-4" />
                    </span>
                    <h4 className="text-[14px] font-bold text-white">{g.group}</h4>
                  </div>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-ink-300/80">{g.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span key={it} className="rounded-full bg-white/[.07] px-2.5 py-1 text-[10.5px] font-semibold text-ink-200 ring-1 ring-white/10">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustBar />

      {/* team */}
      <section id="team" className="scroll-mt-24 bg-cream py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="The team"
            title={<>Licensed Texas advisors, not lead routers</>}
            sub="Four advisors covering all 10 regions, plus a support desk that answers the phone on the second ring."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <div className="card-hover group h-full overflow-hidden rounded-3xl bg-white ring-1 ring-ink-900/[.07]">
                  <div className="relative">
                    <SmartImage src={t.img} alt={t.name} ratio="aspect-[4/5]" imgClassName="group-hover:scale-[1.05]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
                    <div className="absolute inset-x-4 bottom-4">
                      <p className="font-display text-[19px] font-semibold text-white">{t.name}</p>
                      <p className="text-[12.5px] text-gold-300">{t.role}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-bold tracking-[.14em] text-gold-700 uppercase">{t.region}</p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{t.bio}</p>
                    <p className="mt-3 text-[12px] font-semibold text-ink-400">{t.license}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* reviews */}
      <section id="reviews" className="scroll-mt-24 bg-white py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Reviews"
            title={<>1,240 closings, 4.9-star average</>}
            sub="Names, cities and rebate amounts from real buyers — because numbers are easier to trust than adjectives."
          />
          <div className="mt-12">
            <TestimonialSlider />
          </div>
          <Reveal delay={200} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl bg-cream p-5 ring-1 ring-ink-900/[.07]">
                <p className="font-display text-2xl font-semibold text-mint-600">{t.rebate}</p>
                <p className="mt-1 text-[13.5px] font-bold text-ink-900">{t.name}</p>
                <p className="text-[12.5px] text-ink-500">{t.city} · {t.community}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* credentials */}
      <section className="bg-cream py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <Reveal>
            <Pill className="bg-white text-gold-700 ring-gold-400/30">Credentials</Pill>
            <h2 className="mt-4 font-display text-2xl leading-snug font-semibold text-ink-900 sm:text-3xl">
              {SITE.license} · {BUILDERS.length} builder relationships · {LISTINGS.length * 27} live listings
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
              We're a TREC-licensed Texas real estate brokerage. Consumer protection notices, fair housing policy and our
              privacy policy are available on request — and we'll happily explain exactly how your rebate is disclosed to your
              lender before you commit to anything.
            </p>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Equal Housing", "TREC Licensed", "TAR Member", "NAR Member"].map((c) => (
              <div key={c} className={cn("grid h-24 place-items-center rounded-2xl bg-white p-4 text-center ring-1 ring-ink-900/[.07]")}>
                <span className="flex flex-col items-center gap-2">
                  <Icon name="shield" className="h-6 w-6 text-gold-600" />
                  <span className="text-[12px] font-bold text-ink-700">{c}</span>
                </span>
              </div>
            ))}
            <div className="col-span-2 overflow-hidden rounded-2xl sm:col-span-2">
              <SmartImage src={pick(IMG.city, 3, 900, 400)} alt="Downtown Dallas, Texas" ratio="aspect-[2/1]" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSplit
        title="Let's find out what your builder owes you"
        sub="Send us the communities on your list. We'll confirm the rebate, the incentives and the timeline — then you decide."
        bullets={[
          "Named licensed advisor",
          "Same-day rebate estimate",
          "No cost, no obligation",
          "All 254 Texas counties",
        ]}
        image={HERO_IMAGES.dallas}
        source="about-footer"
        flip
      />
    </>
  );
}
