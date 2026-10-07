import { useState } from "react";
import { cn } from "@/utils/cn";
import { Icon, Reveal, SectionHeading, Button, Pill, SmartImage } from "@/components/ui";
import { SITE, TEAM, FAQ } from "@/data/content";
import { REGIONS } from "@/data/listings";
import { FaqAccordion, PageHero } from "@/components/sections";
import { LeadForm } from "@/components/LeadForm";
import { Seo } from "@/components/Seo";
import { HERO_IMAGES, IMG, pick } from "@/data/media";

const CHANNELS = [
  { i: "phone", t: "Call us", d: SITE.phone, sub: "Fastest — 8am to 8pm CT", href: SITE.phoneHref },
  { i: "social", t: "Text us", d: SITE.phone, sub: "Typical reply in 4 minutes", href: `sms:${SITE.phone.replace(/[^0-9]/g, "")}` },
  { i: "mail", t: "Email us", d: SITE.email, sub: "Same-day response", href: `mailto:${SITE.email}` },
  { i: "clock", t: "Office hours", d: "Mon–Sat 8–8 · Sun 11–6", sub: "Central Time", href: undefined },
];

export default function Contact() {
  const [region, setRegion] = useState<string | null>(null);

  return (
    <>
      <Seo path="/contact" />
      <PageHero
        eyebrow="Contact"
        title={<>Talk to a licensed Texas new-home advisor</>}
        sub="No call center, no lead reselling. You'll reach a named advisor who can tell you your rebate number, the best live incentive, and which quick move-ins actually fit."
        image={HERO_IMAGES.keys}
      />

      {/* channels + form */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {CHANNELS.map((c, i) => (
                <Reveal key={c.t} delay={i * 80}>
                  {c.href ? (
                    <a href={c.href} className="card-hover group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07]">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-950 text-gold-300 transition-colors duration-500 group-hover:bg-gold-600 group-hover:text-white">
                        <Icon name={c.i} className="h-5 w-5" />
                      </span>
                      <p className="mt-4 text-[12px] font-bold tracking-[.14em] text-ink-400 uppercase">{c.t}</p>
                      <p className="mt-1 text-[16px] font-bold text-ink-900">{c.d}</p>
                      <p className="mt-1 text-[12.5px] text-ink-500">{c.sub}</p>
                    </a>
                  ) : (
                    <div className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07]">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-950 text-gold-300">
                        <Icon name={c.i} className="h-5 w-5" />
                      </span>
                      <p className="mt-4 text-[12px] font-bold tracking-[.14em] text-ink-400 uppercase">{c.t}</p>
                      <p className="mt-1 text-[15px] font-bold text-ink-900">{c.d}</p>
                      <p className="mt-1 text-[12.5px] text-ink-500">{c.sub}</p>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>

            {/* region picker */}
            <Reveal delay={200} className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07]">
              <p className="text-[12px] font-bold tracking-[.14em] text-ink-500 uppercase">Pick your region for a direct line</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(region === r.id ? null : r.id)}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-all duration-300",
                      region === r.id ? "border-gold-500 bg-gold-50 text-gold-800 ring-1 ring-gold-400/40" : "border-ink-200 text-ink-600 hover:border-ink-400"
                    )}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
              {region && (
                <div className="animate-pop mt-5 rounded-2xl bg-ink-950 p-5">
                  <p className="text-[11px] font-bold tracking-[.14em] text-gold-300 uppercase">Your advisor</p>
                  <div className="mt-3 flex items-center gap-3">
                    <SmartImage src={TEAM[REGIONS.findIndex((r) => r.id === region) % TEAM.length].img} alt="Advisor" ratio="aspect-square" className="h-14 w-14 rounded-full" />
                    <div>
                      <p className="text-[15px] font-bold text-white">{TEAM[REGIONS.findIndex((r) => r.id === region) % TEAM.length].name}</p>
                      <p className="text-[12.5px] text-ink-300">{REGIONS.find((r) => r.id === region)?.name} · responds in ~9 min</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button href={SITE.phoneHref} size="sm" icon="phone">Call now</Button>
                    <Button href={`sms:${SITE.phone.replace(/[^0-9]/g, "")}?body=Region: ${region}`} size="sm" variant="light">Text instead</Button>
                  </div>
                </div>
              )}
            </Reveal>

            {/* map + address */}
            <Reveal delay={260} className="mt-6 overflow-hidden rounded-3xl ring-1 ring-ink-900/[.07]">
              <div className="relative">
                <SmartImage src={pick(IMG.city, 2, 1200, 700)} alt="Austin, Texas" ratio="aspect-[16/9]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <p className="text-[11px] font-bold tracking-[.14em] text-gold-300 uppercase">Headquarters</p>
                  <p className="mt-1 text-[15px] font-bold">{SITE.address}</p>
                  <p className="text-[12.5px] text-ink-200">Serving all 254 Texas counties · remote closings available</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={320} className="mt-6 flex flex-wrap gap-2">
              {["TREC #9007124", "Equal Housing", "TAR Member", "Not a builder affiliate"].map((t) => (
                <Pill key={t} className="bg-white text-ink-600 ring-ink-900/10">{t}</Pill>
              ))}
            </Reveal>
          </div>

          {/* form */}
          <Reveal variant="right" delay={120} className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              source="contact-page"
              title="Send us your target region"
              sub="We'll reply with your rebate estimate, the current incentive packages, and a quick move-in list — usually the same day."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Avg. first reply", v: "9 min" },
                { k: "Avg. rebate", v: "$14,850" },
                { k: "Buyer cost", v: "$0" },
              ].map((s) => (
                <div key={s.k} className="rounded-2xl bg-white p-4 text-center ring-1 ring-ink-900/[.07]">
                  <p className="font-display text-xl font-semibold text-ink-900">{s.v}</p>
                  <p className="mt-0.5 text-[11.5px] text-ink-500">{s.k}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* faq */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Before you call"
            title={<>Quick answers to the most common questions</>}
            align="center"
          />
          <Reveal delay={140} className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={FAQ.slice(0, 6)} />
          </Reveal>
        </div>
      </section>

      {/* team strip */}
      <section className="bg-cream py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Who you'll meet" title={<>Four advisors, one number</>} align="center" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="group h-full overflow-hidden rounded-3xl bg-white ring-1 ring-ink-900/[.07]">
                  <SmartImage src={t.img} alt={t.name} ratio="aspect-[4/5]" imgClassName="group-hover:scale-[1.04]" />
                  <div className="p-4">
                    <p className="text-[15px] font-bold text-ink-900">{t.name}</p>
                    <p className="text-[12.5px] text-ink-500">{t.role}</p>
                    <p className="mt-1 text-[11.5px] font-semibold text-gold-700">{t.region}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
