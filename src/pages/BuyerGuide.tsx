import { useState } from "react";
import { cn } from "@/utils/cn";
import { Icon, Reveal, SectionHeading, Button, Pill, Eyebrow, SmartImage } from "@/components/ui";
import { GUIDE_STEPS, FINANCE_OPTIONS, FAQ as GUIDE_FAQ } from "@/data/content";
import { FaqAccordion, CtaSplit, TrustBar } from "@/components/sections";
import { RebateCalculator } from "@/components/sections";
import { Seo } from "@/components/Seo";
import { HERO_IMAGES, IMG, pick } from "@/data/media";
import { PageHero } from "@/components/sections";
import { useLead } from "@/components/LeadForm";

const CHECKLIST = [
  { group: "Before you tour", items: ["Get pre-approved (builder lender + your own lender)", "Register with us so your rebate is protected", "Set your all-in monthly budget including taxes + HOA", "Shortlist 3–5 communities with a commute test"] },
  { group: "During the contract", items: ["Verify the incentive package in writing", "Review builder addenda for option-period deadlines", "Confirm earnest money holder and refund conditions", "Negotiate structural + design credits before signing"] },
  { group: "During construction", items: ["Independent foundation inspection", "Pre-dry-in and pre-drywall inspections", "Track phase releases for better lots", "Log warranty items as you see them"] },
  { group: "Before closing", items: ["Final walk with punch list documented", "Review closing disclosure against your estimate", "Confirm rebate appears on the settlement statement", "File your homestead exemption after move-in"] },
];

const MILESTONES = [
  { t: "Slab / foundation", d: "Weeks 0–2", i: "builder" },
  { t: "Frame & dry-in", d: "Weeks 3–7", i: "builder" },
  { t: "Mechanicals & drywall", d: "Weeks 8–13", i: "shield" },
  { t: "Finishes & trim", d: "Weeks 14–20", i: "star" },
  { t: "Final & closing", d: "Weeks 21–26", i: "key" },
];

export default function BuyerGuide() {
  const { open } = useLead();
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (k: string) => setChecked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const pct = Math.round((checked.length / CHECKLIST.reduce((s, c) => s + c.items.length, 0)) * 100);

  return (
    <>
      <Seo path="/buyer-guide" />
      <PageHero
        eyebrow="Buyer Guide"
        title={<>The Texas new construction playbook</>}
        sub="Eight steps, four inspections, one rebate. Everything we walk our buyers through — published in full so you know exactly what happens next."
        image={HERO_IMAGES.build}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/buyer-guide#process" size="lg" icon="steps">See the 8 steps</Button>
          <Button onClick={() => open("guide-hero")} variant="light" size="lg" icon="arrow">Get the PDF checklist</Button>
        </div>
      </PageHero>

      {/* process */}
      <section id="process" className="scroll-mt-24 bg-cream py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="The 8-step process"
            title={<>Tour to title, without the surprises</>}
            sub="New construction has different rules than resale: builder contracts, addenda, phase releases and warranty timelines. Here's the sequence."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GUIDE_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <div className="card-hover group relative h-full overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07]">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-semibold text-gold-500/30 transition-colors duration-500 group-hover:text-gold-500">
                      {s.n}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-gold-700 transition-colors duration-500 group-hover:bg-gold-600 group-hover:text-white">
                      <Icon name={s.icon} className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-[17.5px] font-semibold text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* construction timeline */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <SmartImage src={pick(IMG.build, 2, 1600, 900)} alt="" ratio="h-full" className="absolute inset-0 h-full" imgClassName="animate-pan" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/95 to-ink-950/70" />
        </div>
        <div className="container-x relative">
          <SectionHeading
            light
            eyebrow="Construction milestones"
            title={<>What happens in the {26} weeks between contract and keys</>}
            sub="We attend every milestone inspection and send you a photo report the same day."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.t} delay={i * 80}>
                <div className="relative h-full rounded-2xl bg-white/[.05] p-5 ring-1 ring-white/10">
                  {i < MILESTONES.length - 1 && (
                    <span className="absolute top-1/2 -right-3 hidden h-6 w-6 -translate-y-1/2 place-items-center text-gold-400/60 lg:grid">
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  )}
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
                    <Icon name={m.i} className="h-4.5 w-4.5" />
                  </span>
                  <p className="mt-4 text-[11px] font-bold tracking-[.14em] text-gold-300 uppercase">{m.d}</p>
                  <p className="mt-1.5 text-[15.5px] font-semibold text-white">{m.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* financing */}
      <section id="financing" className="scroll-mt-24 bg-white py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Financing center"
            title={<>Compare the loan programs builders push — honestly</>}
            sub="Builder lenders offer great headline rates funded by incentives. Sometimes they win. Sometimes your own lender plus a price cut wins. We model both."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FINANCE_OPTIONS.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="card-hover h-full rounded-3xl bg-cream p-6 ring-1 ring-ink-900/[.07]">
                  <p className="text-[12px] font-bold tracking-[.14em] text-gold-700 uppercase">{f.rate}</p>
                  <h3 className="mt-2 text-[18px] font-semibold text-ink-900">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{f.note}</p>
                  <p className="mt-4 flex items-center gap-2 border-t border-ink-900/[.07] pt-4 text-[12.5px] font-semibold text-mint-600">
                    <Icon name="check" className="h-3.5 w-3.5" /> {f.good}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-10">
            <RebateCalculator />
          </Reveal>
        </div>
      </section>

      {/* interactive checklist */}
      <section id="checklist" className="scroll-mt-24 bg-cream py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="Interactive checklist"
              title={<>Track your own progress</>}
              sub="Tap items as you complete them. Progress saves for this session — the full printable version ships in our welcome packet."
            />
            <Reveal delay={160} className="mt-8">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07]">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold tracking-[.14em] text-ink-500 uppercase">Your progress</p>
                  <span className="font-display text-2xl font-semibold text-ink-900">{pct}%</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-mint-500 transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-4 text-[13.5px] text-ink-600">
                  {checked.length} of {CHECKLIST.reduce((s, c) => s + c.items.length, 0)} items complete
                </p>
                <Button onClick={() => open("checklist")} className="mt-5" full icon="arrow">
                  Email me this checklist
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="space-y-5">
            {CHECKLIST.map((g, gi) => (
              <Reveal key={g.group} delay={gi * 90}>
                <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07]">
                  <h3 className="flex items-center gap-2.5 text-[16.5px] font-semibold text-ink-900">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-100 text-[12px] font-extrabold text-gold-800">
                      {gi + 1}
                    </span>
                    {g.group}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((it) => {
                      const on = checked.includes(it);
                      return (
                        <li key={it}>
                          <button
                            onClick={() => toggle(it)}
                            className={cn(
                              "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-300",
                              on ? "bg-mint-500/[.08]" : "hover:bg-ink-50"
                            )}
                          >
                            <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors", on ? "border-mint-500 bg-mint-500 text-white" : "border-ink-300")}>
                              {on && <Icon name="check" className="h-3 w-3" />}
                            </span>
                            <span className={cn("text-[14px] transition-colors", on ? "text-ink-400 line-through" : "text-ink-700")}>{it}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* warranty */}
      <section id="warranty" className="scroll-mt-24 bg-white py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal variant="left">
            <Eyebrow>Warranty & care</Eyebrow>
            <h2 className="mt-5 font-display text-3xl leading-tight font-semibold text-ink-900 sm:text-4xl">
              Year one, year two, year ten
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
              Texas builders carry a statutory warranty plus their own written coverage. We file your year-one claims at month
              10 so nothing expires before it's fixed.
            </p>
            <div className="mt-8 space-y-3">
              {[
                { t: "Year 1 — Workmanship & materials", d: "Drywall nail pops, trim gaps, door adjustment, paint touch-up. We schedule a full walkthrough at month 10.", i: "shield" },
                { t: "Year 2 — Systems & delivery", d: "HVAC, plumbing and electrical distribution issues plus any component that failed in year one.", i: "chip" },
                { t: "Year 10 — Structural", d: "Foundation and structural components, backed by the state's Residential Construction Liability Act.", i: "builder" },
              ].map((w) => (
                <div key={w.t} className="flex gap-4 rounded-2xl bg-cream p-5 ring-1 ring-ink-900/[.06]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-300">
                    <Icon name={w.i} className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-ink-900">{w.t}</p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ink-600">{w.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal variant="right" delay={120} className="grid grid-cols-2 gap-4">
            {[pick(IMG.build, 5, 700, 900), pick(IMG.build, 0, 700, 900), pick(IMG.ext, 7, 700, 900), pick(IMG.int, 3, 700, 900)].map((src, i) => (
              <div key={i} className={cn("overflow-hidden rounded-2xl ring-1 ring-ink-900/[.07]", i % 3 === 0 && "row-span-1")}>
                <SmartImage src={src} alt="New construction detail" ratio="aspect-[4/5]" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <TrustBar />

      {/* faq */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="New build questions"
              title={<>Answers before you sign anything</>}
              sub="These are the questions that come up in nearly every first conversation."
            />
            <Reveal delay={180} className="mt-8 flex flex-wrap gap-2">
              {["Builder contracts", "Property taxes", "Option periods", "Appraisals", "Rate locks"].map((t) => (
                <Pill key={t} className="bg-white text-ink-600 ring-ink-900/10">{t}</Pill>
              ))}
            </Reveal>
          </div>
          <Reveal delay={120}>
            <FaqAccordion items={GUIDE_FAQ.slice(0, 6)} />
          </Reveal>
        </div>
      </section>

      <CtaSplit
        title="Get the welcome packet + rebate registration in one step"
        sub="Printable checklist, incentive comparison worksheet, inspection schedule, and your rebate registration — sent in a single email."
        bullets={[
          "Printable 8-step checklist",
          "Incentive comparison worksheet",
          "Milestone inspection calendar",
          "Rebate registration same day",
        ]}
        image={HERO_IMAGES.kitchen}
        source="buyer-guide-footer"
      />
    </>
  );
}
