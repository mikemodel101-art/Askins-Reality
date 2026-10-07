import { useState } from "react";
import { Icon, Reveal, SectionHeading, Button, Pill, Eyebrow, SmartImage } from "@/components/ui";
import { BUILDERS, REGIONS } from "@/data/listings";
import {
  FaqAccordion,
  ComparisonTable,
  RebateCalculator,
  CtaSplit,
  StepsTimeline,
  TrustBar,
  StatsBand,
  Hud1InteractiveViewer,
  PageHero,
} from "@/components/sections";
import { useLead } from "@/components/LeadForm";
import { Seo } from "@/components/Seo";
import { HERO_IMAGES, IMG, photo, pick } from "@/data/media";

const CASE_STUDIES = [
  {
    title: "$629,900 Celina Family Home",
    buyer: "Megan & Chris Alvarez",
    builder: "Highland Homes",
    location: "Mustang Lakes, Celina TX",
    price: "$629,900",
    rebateAmt: "$18,897",
    rebatePct: "3.0%",
    builderIncentive: "$22,000 design studio credit",
    howUsed: "Applied $12,500 toward title/escrow fees + $6,397 toward 2/1 rate buydown.",
    outcome: "Brought $0 in closing costs to the title company and reduced initial monthly payment by $380/mo.",
    img: photo(IMG.life[1], 800, 600),
  },
  {
    title: "$579,900 First-Time Buyer in Katy",
    buyer: "Deshawn & Tanya Carter",
    builder: "Perry Homes",
    location: "Cross Creek Ranch, Katy TX",
    price: "$579,900",
    rebateAmt: "$17,397",
    rebatePct: "3.0%",
    builderIncentive: "$15,000 flex cash",
    howUsed: "Stacked $17,397 broker rebate with $15,000 builder incentive.",
    outcome: "Total closing concessions reached $32,397. Buyer paid only $1,400 out of pocket at closing.",
    img: photo(IMG.life[3], 800, 600),
  },
  {
    title: "$845,000 PGA Corridor Luxury Build",
    buyer: "Brett & Sarah Henderson",
    builder: "David Weekley Homes",
    location: "Fields – Falcon Ranch, Frisco TX",
    price: "$845,000",
    rebateAmt: "$21,125",
    rebatePct: "2.5%",
    builderIncentive: "$35,000 options credit",
    howUsed: "Applied to permanent 1.25% mortgage interest rate buydown for 30-year loan.",
    outcome: "Saved $512 every month for 360 months ($184,320 total interest savings over life of loan).",
    img: photo(IMG.life[0], 800, 600),
  },
  {
    title: "$429,900 Veteran VA Loan in Cibolo",
    buyer: "Capt. Michael & Lisa Vance",
    builder: "D.R. Horton",
    location: "Windmill Farms, Cibolo TX",
    price: "$429,900",
    rebateAmt: "$12,897",
    rebatePct: "3.0%",
    builderIncentive: "$10,000 closing help",
    howUsed: "100% VA financing with $0 down payment. Rebate refunded earnest deposit + added backyard fence.",
    outcome: "Walked away from title company with a $3,500 check refunding earnest money deposit in full.",
    img: photo(IMG.life[5], 800, 600),
  },
];

const STRATEGIES = [
  {
    icon: "doc",
    title: "1. Wipe Out Closing Costs",
    desc: "Title policy, escrow reserves, lender origination fees, appraisal, and survey fees can total $10,000–$16,000. Your rebate pays these directly on the Closing Disclosure so you bring almost nothing to closing.",
    badge: "Most Popular",
  },
  {
    icon: "bolt",
    title: "2. Permanent Mortgage Rate Buydown",
    desc: "Use your $15,000–$25,000 rebate to purchase discount points from your lender. Lowering your interest rate by 1.0% to 1.5% reduces your payment by $350–$600/month for the full 30-year mortgage term.",
    badge: "Long-Term Value",
  },
  {
    icon: "builder",
    title: "3. Upgrade Design Studio Options",
    desc: "Apply the cash rebate toward structural and interior upgrades: gourmet kitchen appliances, freestanding soaking tub, 8-foot interior doors, or extended outdoor living spaces.",
    badge: "Home Equity",
  },
  {
    icon: "cash",
    title: "4. Check Credit at Closing",
    desc: "Depending on your loan program and allowable seller concession limits, surplus funds can be credited back directly to you at the title company or wired after loan funding.",
    badge: "Maximum Cash",
  },
];

export default function Rebates() {
  const { open } = useLead();
  const [builderSearch, setBuilderSearch] = useState("");

  const filteredBuilders = BUILDERS.filter((b) =>
    b.name.toLowerCase().includes(builderSearch.toLowerCase()) ||
    b.incentive.toLowerCase().includes(builderSearch.toLowerCase())
  );

  return (
    <>
      <Seo path="/rebates" />
      <PageHero
        eyebrow="Builder Rebates"
        title={<>The builder already budgeted your agent's commission. <span className="gold-text">Take it back.</span></>}
        sub="Texas law explicitly allows licensed brokerages to pass cash back to buyers. On a $500,000 new construction home that's $10,000–$15,000 — disclosed on your settlement statement, with zero fee or cost to you."
        image={HERO_IMAGES.keys}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/rebates#calculator" size="lg" icon="calc">Calculate my cash back</Button>
          <Button onClick={() => open("rebates-hero")} variant="light" size="lg" icon="arrow">
            Get my rebate breakdown
          </Button>
        </div>
      </PageHero>

      <TrustBar />

      {/* Rebate math overview */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Rebate math, no fine print"
            title={<>Where the 3% actually comes from</>}
            sub="Builders market their homes at full retail and reserve a 3% co-op commission for the buyer's agent. We simply return most of ours to you."
            align="center"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                n: "01",
                icon: "builder",
                t: "Builder budgets 3%",
                d: "Every production builder reserves roughly 3% of the sales price for the buyer's agent in their standard marketing pro-forma. Walking in unrepresented does not discount the price — the builder keeps it.",
              },
              {
                n: "02",
                icon: "doc",
                t: "We register you first",
                d: "Before your first model home visit, we submit your buyer registration electronically. This locks your rebate in writing and protects you from losing representation rights.",
              },
              {
                n: "03",
                icon: "cash",
                t: "You collect thousands at closing",
                d: "2.0% to 3.0% of your final purchase price returns directly to you on Line 506 / Section L of your Closing Disclosure — reducing cash-to-close or paying down your loan balance.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="card-hover group relative h-full overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-ink-900/[.07]">
                  <span className="font-display text-5xl font-semibold text-gold-500/25 transition-colors duration-500 group-hover:text-gold-500/60">
                    {s.n}
                  </span>
                  <span className="mt-4 grid h-12 w-12 place-items-center rounded-xl bg-ink-950 text-gold-300 transition-colors duration-500 group-hover:bg-gold-600 group-hover:text-white">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[19px] font-semibold text-ink-900">{s.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-600">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive HUD-1 / Closing Statement */}
      <section id="hud1" className="scroll-mt-24 bg-white py-16 lg:py-24 border-y border-ink-900/[.07]">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <Reveal>
              <Eyebrow>100% Legal & Disclosed</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-tight font-semibold text-ink-900 sm:text-4xl">
                See exactly how your rebate appears on the Closing Disclosure
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
                There are no side deals or under-the-table arrangements. In Texas, broker rebates are approved by the Texas Real Estate Commission (TREC Rule §535.147) and explicitly written into your title escrow instructions.
              </p>
              
              <div className="mt-6 space-y-3">
                {[
                  "Appears in Section L (Line 08) or Line 506 of HUD-1",
                  "Approved in advance by your mortgage underwriter",
                  "Reduces your required cash-to-close dollar-for-dollar",
                  "100% non-taxable adjustment to purchase price (IRS 2007-21)",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm font-semibold text-ink-800">
                    <Icon name="check" className="h-4 w-4 mt-0.5 text-mint-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button onClick={() => open("rebate-hud1")} size="lg" icon="arrow">
                  Request personalized rebate sheet
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <Hud1InteractiveViewer />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Rebate Calculator Section */}
      <section id="calculator" className="scroll-mt-24 bg-cream py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Interactive Calculator"
            title={<>Calculate your cash back on any Texas build</>}
            sub="Slide to your target price and see how much cash you keep. Then send the breakdown to yourself to lock it in."
          />
          <Reveal delay={140} className="mt-10">
            <RebateCalculator />
          </Reveal>
        </div>
      </section>

      {/* 4 Ways to use your rebate */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Rebate Strategies"
            title={<>Four powerful ways to deploy your cash back</>}
            sub="You decide how your funds are applied at title. Here is how our buyers maximize their financial return:"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STRATEGIES.map((st, i) => (
              <Reveal key={st.title} delay={i * 80}>
                <div className="card-hover h-full flex flex-col rounded-3xl bg-cream p-6 ring-1 ring-ink-900/[.07]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-950 text-gold-300">
                      <Icon name={st.icon} className="h-5 w-5" />
                    </span>
                    <Pill className="bg-gold-400/20 text-gold-800 ring-gold-400/30">{st.badge}</Pill>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{st.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 flex-1">{st.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Real Buyer Case Studies */}
      <section className="bg-cream py-16 lg:py-24 border-t border-ink-900/[.07]">
        <div className="container-x">
          <SectionHeading
            eyebrow="Real Case Studies"
            title={<>How 4 Texas families put $12K–$21K back in their pockets</>}
            sub="Real purchase prices, real builders, and exact numbers from executed settlement statements."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {CASE_STUDIES.map((cs, i) => (
              <Reveal key={cs.title} delay={i * 90}>
                <div className="card-hover overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink-900/[.07] flex flex-col h-full">
                  <div className="relative">
                    <SmartImage src={cs.img} alt={cs.title} ratio="aspect-[16/10]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs font-bold text-gold-300 uppercase tracking-wider">{cs.location}</p>
                        <h3 className="text-xl font-display font-bold text-white">{cs.title}</h3>
                      </div>
                      <div className="rounded-xl bg-mint-500 px-3 py-1.5 text-white font-extrabold text-sm shadow-md">
                        {cs.rebateAmt} Back
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-sm text-ink-700">
                      <div className="flex justify-between py-1 border-b border-ink-100">
                        <span className="text-ink-500">Buyer:</span>
                        <span className="font-bold text-ink-900">{cs.buyer}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-ink-100">
                        <span className="text-ink-500">Builder & Incentive:</span>
                        <span className="font-semibold text-ink-900">{cs.builder} ({cs.builderIncentive})</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-ink-100">
                        <span className="text-ink-500">Purchase Price:</span>
                        <span className="font-mono font-bold text-ink-900">{cs.price}</span>
                      </div>
                      <p className="text-xs text-ink-600 pt-2"><strong className="text-ink-900">How used:</strong> {cs.howUsed}</p>
                      <p className="text-xs text-mint-700 font-semibold bg-mint-50 p-3 rounded-xl border border-mint-200">
                        ✓ {cs.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Step Process */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-24">
        <div className="container-x relative">
          <SectionHeading
            light
            eyebrow="From first click to funded"
            title={<>Six steps, and you never pay us a single dollar</>}
            sub="The entire rebate process runs parallel to your construction milestones — there is zero extra paperwork on your end."
          />
          <div className="mt-12">
            <StepsTimeline dark steps={[
              { n: "01", icon: "doc", title: "Register online", desc: "60-second form. We submit electronic buyer registrations to every builder you plan to tour." },
              { n: "02", icon: "search", title: "Shortlist with us", desc: "Interactive map search + 110+ live listings. We confirm live builder incentives before you drive." },
              { n: "03", icon: "builder", title: "Tour & negotiate", desc: "We attend model tours, evaluate builder lots, and negotiate structural & design credits." },
              { n: "04", icon: "calc", title: "Model true monthly cost", desc: "Base price, lot premium, options, taxes, insurance, and HOA — minus your rebate." },
              { n: "05", icon: "shield", title: "Inspect 4 milestones", desc: "Independent inspections at slab, pre-drywall, final walkthrough, and 11-month warranty." },
              { n: "06", icon: "cash", title: "Close & keep the cash", desc: "Full rebate credited on Line 506 / Section L of your Closing Disclosure. Simple & clean." },
            ]} />
          </div>
        </div>
      </section>

      <StatsBand />

      {/* 18 Builder Incentive Board */}
      <section id="builders" className="scroll-mt-24 bg-cream py-16 lg:py-24">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              eyebrow="Live Builder Board · 18 Brands"
              title={<>Current incentives & rebate percentages by builder</>}
              sub="Incentives shift weekly based on quarterly Wall Street targets. We verify each builder's current package before you write."
            />
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Filter builders (e.g. Perry, Highland)..."
                value={builderSearch}
                onChange={(e) => setBuilderSearch(e.target.value)}
                className="w-full rounded-full border border-ink-200 bg-white px-4 py-2.5 text-sm focus:border-gold-400 focus:outline-none shadow-sm"
              />
            </div>
          </div>

          <Reveal delay={120} className="mt-10 overflow-hidden rounded-3xl ring-1 ring-ink-900/[.08]">
            <div className="hidden bg-ink-950 text-white lg:grid lg:grid-cols-[1.2fr_.7fr_1.1fr_1.3fr_1fr]">
              {["Builder", "Our Rebate", "Active Builder Incentive", "Where They Build", "Homes / Year"].map((h) => (
                <div key={h} className="px-5 py-4 text-[11.5px] font-bold tracking-[.14em] uppercase">{h}</div>
              ))}
            </div>
            <div className="divide-y divide-ink-900/[.07] bg-white">
              {filteredBuilders.map((b, i) => (
                <Reveal key={b.slug} delay={Math.min(i * 30, 300)}>
                  <div className="grid gap-3 px-5 py-4 transition-colors duration-200 hover:bg-gold-50/60 lg:grid-cols-[1.2fr_.7fr_1.1fr_1.3fr_1fr] lg:items-center">
                    <div>
                      <p className="text-[15px] font-bold text-ink-900">{b.name}</p>
                      <p className="text-[12px] text-ink-500">{b.hq}</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-mint-500/15 px-3 py-1 text-[13px] font-extrabold text-mint-700">
                        {b.rebatePct}% Cash Back
                      </span>
                    </div>
                    <p className="text-[13px] font-semibold text-ink-800">{b.incentive}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {b.regions.slice(0, 4).map((r) => (
                        <span key={r} className="rounded-full bg-ink-900/[.05] px-2 py-0.5 text-[11px] font-semibold text-ink-600">
                          {REGIONS.find((x) => x.id === r)?.short ?? r}
                        </span>
                      ))}
                      {b.regions.length > 4 && <span className="text-[11px] font-semibold text-ink-400">+{b.regions.length - 4}</span>}
                    </div>
                    <p className="text-[13px] text-ink-500">{b.homesPerYear}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* IRS Legality & Tax Treatment */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Eyebrow>Federal Tax Guidance</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-tight font-semibold text-ink-900 sm:text-4xl">
                Is your rebate taxable? <span className="text-mint-600">No.</span>
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-600">
                <p>
                  Under <strong className="text-ink-900">IRS Revenue Ruling 2007-21</strong> and consistent Private Letter Rulings, real estate broker rebates paid or credited to a homebuyer are categorized as an <strong className="text-ink-900">adjustment to the purchase price</strong> (reduction in basis), not gross taxable income.
                </p>
                <p>
                  You will <strong className="text-ink-900">not</strong> receive a Form 1099-MISC from our brokerage. If you buy a home for $600,000 and receive an $18,000 rebate, your adjusted tax basis becomes $582,000.
                </p>
                <p>
                  Because primary residences qualify for up to $500,000 in capital gains exclusions for married couples under Section 121, you keep the full financial benefit without an income tax hit.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl ring-1 ring-white/10">
              <span className="rounded-full bg-gold-400/20 px-3 py-1 text-xs font-bold text-gold-300 uppercase tracking-wider">
                TREC Rule §535.147
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">Texas Real Estate Commission Compliance</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">
                The state of Texas is one of 40 US states that officially encourage and protect real estate commission rebates to foster consumer competition.
              </p>
              <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-xs text-ink-300">
                <div className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-mint-400 shrink-0" />
                  <span>Licensed under TREC Brokerage License #9007124</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-mint-400 shrink-0" />
                  <span>Fully disclosed to lender prior to loan document preparation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-mint-400 shrink-0" />
                  <span>Documented in settlement statements by licensed Texas title companies</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Side by Side"
            title={<>Walking into a sales center alone vs. With us</>}
            sub="See how representation changes every financial aspect of your new home purchase."
          />
          <Reveal delay={120} className="mt-10">
            <ComparisonTable />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-white py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Rebate FAQ"
              title={<>Everything buyers ask before registering</>}
              sub="Still have questions? Call or text us directly — a licensed advisor answers immediately."
            />
          </div>
          <Reveal delay={120}>
            <FaqAccordion />
          </Reveal>
        </div>
      </section>

      <CtaSplit
        title="Register before your first model visit — that's the whole rule."
        sub="Send us the builders and communities on your list. We submit the registrations, confirm the current incentive packages, and hold your rebate from day one."
        bullets={[
          "Same-day builder registration",
          "Incentive verification before you tour",
          "Rebate estimate on every home",
          "Zero cost, zero obligation",
        ]}
        image={pick(IMG.ext, 6, 1200, 800)}
        source="rebates-footer"
      />
    </>
  );
}
