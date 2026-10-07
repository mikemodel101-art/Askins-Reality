import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { Icon, Reveal, SectionHeading, Button, Pill, SmartImage } from "@/components/ui";
import { Link, usd } from "@/lib/router";
import { COMMUNITIES, LISTINGS, REGIONS, regionById } from "@/data/listings";
import { CtaSplit, TrustBar, PageHero } from "@/components/sections";
import { useLead } from "@/components/LeadForm";
import { Seo } from "@/components/Seo";
import { HERO_IMAGES, IMG, pick } from "@/data/media";

export default function Communities() {
  const { open } = useLead();
  const [region, setRegion] = useState<string | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      COMMUNITIES.filter((c) => {
        if (region && c.regionId !== region) return false;
        if (budget && c.priceFrom > budget) return false;
        if (q && !`${c.name} ${c.city} ${c.builders.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [region, budget, q]
  );

  return (
    <>
      <Seo path="/communities" />
      <PageHero
        eyebrow="Communities"
        title={<>Master-planned communities, mapped and priced</>}
        sub="380+ active new-construction communities across 10 Texas regions — with builder rosters, amenity packages, school zones and your cash back on every home."
        image={HERO_IMAGES.family}
      >
        <div className="flex flex-col gap-2 rounded-2xl bg-white/[.07] p-2 ring-1 ring-white/15 backdrop-blur sm:flex-row sm:max-w-xl">
          <div className="flex flex-1 items-center gap-2.5 px-3">
            <Icon name="search" className="h-4 w-4 shrink-0 text-gold-300" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search community, city or builder…"
              aria-label="Search communities"
              className="w-full bg-transparent py-3 text-[15px] text-white placeholder:text-ink-300/70 focus:outline-none"
            />
          </div>
          <span className="sr-only">Community results</span>
          <span className="grid place-items-center rounded-xl bg-gold-600 px-5 py-3 text-[13.5px] font-bold text-white">
            {list.length} matches
          </span>
        </div>
      </PageHero>

      <section className="bg-cream py-12 lg:py-16">
        <div className="container-x">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setRegion(null)}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300",
                !region ? "border-ink-900 bg-ink-900 text-white" : "border-ink-200 text-ink-600 hover:border-ink-400"
              )}
            >
              All regions
            </button>
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setRegion(region === r.id ? null : r.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300",
                  region === r.id ? "border-ink-900 bg-ink-900 text-white" : "border-ink-200 text-ink-600 hover:border-ink-400"
                )}
              >
                {r.name}
              </button>
            ))}
            <span className="mx-1 hidden h-6 w-px bg-ink-200 sm:block" />
            {[
              { l: "Under $400K", v: 400000 },
              { l: "Under $550K", v: 550000 },
              { l: "Under $700K", v: 700000 },
            ].map((b) => (
              <button
                key={b.l}
                onClick={() => setBudget(budget === b.v ? null : b.v)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300",
                  budget === b.v ? "border-gold-500 bg-gold-50 text-gold-800 ring-1 ring-gold-400/40" : "border-ink-200 text-ink-600 hover:border-ink-400"
                )}
              >
                {b.l}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c, i) => (
              <Reveal key={c.name} delay={(i % 6) * 70}>
                <article className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-900/[.07]">
                  <div className="relative">
                    <SmartImage src={c.image} alt={`${c.name} in ${c.city}, Texas`} ratio="aspect-[16/11]" imgClassName="group-hover:scale-[1.07]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                    <div className="absolute inset-x-4 bottom-4">
                      <p className="text-[11px] font-bold tracking-[.14em] text-gold-300 uppercase">{regionById(c.regionId)?.name}</p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-white">{c.name}</h3>
                    </div>
                    <span className="absolute top-4 right-4 rounded-full bg-white/95 px-3 py-1 text-[11.5px] font-bold text-ink-900">
                      {c.homes.toLocaleString()} homes
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-semibold text-ink-900">From {usd(c.priceFrom)}</span>
                      <span className="text-ink-500">{c.sqftFrom.toLocaleString()}+ sqft</span>
                    </div>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-ink-600">{c.note}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.amenities.map((a) => (
                        <span key={a} className="rounded-full bg-cream px-2.5 py-1 text-[11.5px] font-semibold text-ink-600 ring-1 ring-ink-900/[.05]">
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 border-t border-ink-900/[.07] pt-4">
                      <p className="text-[11.5px] font-bold tracking-[.14em] text-ink-400 uppercase">Builders</p>
                      <p className="mt-1 text-[13.5px] font-semibold text-ink-800">{c.builders.join(" · ")}</p>
                    </div>
                    <div className="mt-auto flex gap-2 pt-5">
                      <Link
                        to={`/new-homes?region=${c.regionId}`}
                        className="flex-1 rounded-full bg-ink-900 px-4 py-2.5 text-center text-[13px] font-bold text-white transition-colors hover:bg-ink-800"
                      >
                        See homes
                      </Link>
                      <button
                        onClick={() => open(`community-${c.name}`)}
                        aria-label={`Get info for ${c.name}`}
                        className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/15 text-ink-600 transition-colors hover:border-gold-500 hover:text-gold-700"
                      >
                        <Icon name="cash" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {list.length === 0 && (
            <div className="mt-8 rounded-3xl bg-white p-10 text-center ring-1 ring-ink-900/[.07]">
              <h3 className="font-display text-2xl font-semibold text-ink-900">No communities match</h3>
              <p className="mt-2 text-[14.5px] text-ink-600">Try a wider budget or clear the region filter — we track 380+ communities statewide.</p>
              <Button
                onClick={() => {
                  setRegion(null);
                  setBudget(null);
                  setQ("");
                }}
                className="mt-5"
                variant="outline"
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <TrustBar />

      {/* amenity spotlight */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Amenity spotlight"
            title={<>What your rebate buys besides the house</>}
            sub="Communities in our network compete on lifestyle. Here are the amenity packages buyers ask about most."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { i: "globe", t: "Crystal lagoons", d: "Man-made swim lagoons with white-sand beaches in Celina, Katy and Santa Rita Ranch.", img: pick(IMG.air, 4, 800, 600) },
              { i: "star", t: "Golf & pickleball", d: "PGA-adjacent courses, 20+ court complexes and league programming built into the HOA.", img: pick(IMG.air, 2, 800, 600) },
              { i: "pin", t: "Trail networks", d: "18–40 miles of paved trails connecting schools, pools and retail without a car.", img: pick(IMG.ext, 6, 800, 600) },
              { i: "team", t: "Full-time lifestyle", d: "On-site directors running 200+ events a year — food trucks to outdoor movies.", img: pick(IMG.life, 5, 800, 600) },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 90}>
                <div className="card-hover h-full overflow-hidden rounded-3xl bg-cream ring-1 ring-ink-900/[.07]">
                  <SmartImage src={x.img} alt={x.t} ratio="aspect-[4/3]" />
                  <div className="p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-950 text-gold-300">
                      <Icon name={x.i} className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="mt-4 text-[17px] font-semibold text-ink-900">{x.t}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{x.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* region summary */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-20">
        <div className="container-x relative grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <Pill className="border-white/15 bg-white/10 text-white ring-white/20">Regional snapshot</Pill>
            <h2 className="mt-5 font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Where the inventory actually is right now
            </h2>
            <p className="mt-4 text-[15.5px] text-ink-200/85">
              Live counts from our MLS VOW feed, plus the average cash back our buyers are receiving in each region.
            </p>
            <Button to="/new-homes?view=map" className="mt-7" size="lg" icon="map">
              Open the interactive map
            </Button>
          </Reveal>
          <Reveal variant="right" delay={120} className="grid gap-3 sm:grid-cols-2">
            {REGIONS.map((r, i) => {
              const rs = LISTINGS.filter((l) => l.regionId === r.id);
              const avg = Math.round(rs.reduce((s, l) => s + l.rebate, 0) / Math.max(1, rs.length));
              return (
                <Link
                  key={r.id}
                  to={`/new-homes?region=${r.id}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-white/[.05] p-4 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[.09]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span>
                    <span className="block text-[14.5px] font-bold text-white">{r.name}</span>
                    <span className="block text-[12px] text-ink-300">{rs.length} homes · avg {usd(avg, true)} back</span>
                  </span>
                  <Icon name="arrow" className="h-4 w-4 shrink-0 text-gold-400 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>

      <CtaSplit
        title="Tell us the lifestyle you want. We'll match the community."
        sub="Commute, schools, lot size, amenities, timeline — we'll send three communities that fit, with incentive packages and your rebate already calculated."
        bullets={[
          "Three matched communities in 24 hours",
          "Builder roster + current incentives",
          "School zone and tax estimate included",
          "Rebate calculated on every home",
        ]}
        image={pick(IMG.air, 3, 1200, 800)}
        source="communities-footer"
        flip
      />
    </>
  );
}
