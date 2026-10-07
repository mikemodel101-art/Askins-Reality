import { useState } from "react";
import { cn } from "@/utils/cn";
import { Icon, Reveal, Button, Pill, SmartImage, SectionHeading } from "@/components/ui";
import { Link, usd, num, useNavigate } from "@/lib/router";
import { LISTINGS, STATUS_META, listingBySlug, regionById } from "@/data/listings";
import { LeadForm } from "@/components/LeadForm";
import { TexasMap } from "@/components/TexasMap";
import { Seo } from "@/components/Seo";
import { SITE, TEAM } from "@/data/content";

export default function ListingDetail({ slug }: { slug: string }) {
  const l = listingBySlug(slug);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  if (!l) {
    return (
      <section className="bg-cream pt-40 pb-24">
        <div className="container-x text-center">
          <h1 className="font-display text-4xl font-semibold text-ink-900">Listing not found</h1>
          <p className="mt-3 text-ink-600">This home may have gone under contract. Our feed updates hourly.</p>
          <Button to="/new-homes" className="mt-6" icon="arrow">Back to search</Button>
        </div>
      </section>
    );
  }

  const region = regionById(l.regionId);
  const st = STATUS_META[l.status];
  const agent = TEAM[1];
  const similar = LISTINGS.filter((x) => x.regionId === l.regionId && x.slug !== l.slug).slice(0, 3);

  return (
    <>
      <Seo
        path={`/listing/${l.slug}`}
        title={`${l.plan} in ${l.community}, ${l.city} TX | ${usd(l.price)} + ${usd(l.rebate)} Back`}
        description={`New construction ${l.beds}-bed, ${l.baths}-bath home by ${l.builder} in ${l.community}, ${l.city}, Texas. ${num(l.sqft)} sqft. Get ${usd(l.rebate)} cash back at closing.`}
        keywords={`${l.city} new homes, ${l.builder} ${l.plan}, ${l.community} ${l.city}, new construction ${l.city} texas`}
        image={l.images[0]}
        jsonLd={{
          "@type": "Residence",
          name: `${l.plan} · ${l.community}`,
          address: { "@type": "PostalAddress", addressLocality: l.city, addressRegion: "TX", addressCountry: "US" },
          numberOfBedrooms: l.beds,
          numberOfBathroomsTotal: Math.floor(l.baths),
          floorSize: { "@type": "QuantitativeValue", value: l.sqft, unitCode: "FTK" },
        }}
      />

      {/* gallery + summary */}
      <section className="bg-cream pt-24 pb-10 lg:pt-32">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-ink-500">
              <Link to="/" className="hover:text-gold-700">Home</Link>
              <span>/</span>
              <Link to="/new-homes" className="hover:text-gold-700">New Homes</Link>
              <span>/</span>
              <Link to={`/new-homes?region=${l.regionId}`} className="hover:text-gold-700">{region?.name}</Link>
              <span>/</span>
              <span className="font-semibold text-ink-800">{l.community}</span>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
            <Reveal variant="zoom">
              <div className="overflow-hidden rounded-3xl ring-1 ring-ink-900/[.07]">
                <SmartImage src={l.images[active]} alt={`${l.plan} ${l.city} Texas`} ratio="aspect-[16/11]" eager />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {l.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActive(i)}
                    className={cn(
                      "overflow-hidden rounded-xl ring-1 transition-all duration-300",
                      active === i ? "ring-2 ring-gold-500" : "ring-ink-900/[.07] opacity-75 hover:opacity-100"
                    )}
                  >
                    <SmartImage src={img} alt={`${l.community} photo ${i + 1}`} ratio="aspect-[4/3]" />
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal variant="right" delay={100}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07] sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill className={st.className}>{st.label}</Pill>
                  <Pill className="bg-ink-900/5 text-ink-600 ring-ink-900/10">MLS# {l.mls}</Pill>
                  <Pill className="bg-mint-500/15 text-mint-600 ring-mint-500/30">{l.dom} days on market</Pill>
                </div>
                <h1 className="mt-4 font-display text-3xl leading-tight font-semibold text-ink-900 sm:text-[2.4rem]">
                  {usd(l.price)}
                </h1>
                <p className="mt-2 text-[15px] text-ink-600">
                  {l.plan} · {l.community}
                  <br />
                  {l.city}, Texas · {region?.name}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-cream p-4 text-center">
                  {[
                    { i: "bed", v: l.beds, s: "beds" },
                    { i: "bath", v: l.baths, s: "baths" },
                    { i: "sqft", v: num(l.sqft), s: "sqft" },
                  ].map((x) => (
                    <div key={x.s}>
                      <Icon name={x.i} className="mx-auto h-5 w-5 text-gold-600" />
                      <p className="mt-1.5 text-[17px] font-bold text-ink-900">{x.v}</p>
                      <p className="text-[11.5px] text-ink-500">{x.s}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-mint-500/10 p-5 ring-1 ring-mint-500/25">
                  <p className="text-[11px] font-bold tracking-[.16em] text-mint-600 uppercase">Your cash back at closing</p>
                  <p className="mt-1 font-display text-4xl font-semibold text-mint-600">{usd(l.rebate)}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
                    {l.rebatePct}% of purchase price, courtesy of the builder's co-op commission. Covers closing costs, a rate
                    buydown, or arrives as a credit to you.
                  </p>
                </div>

                <dl className="mt-6 space-y-2.5 text-[13.5px]">
                  {([
                    ["Builder", l.builder],
                    ["Plan", l.plan],
                    ["Garage", `${l.garage}-car`],
                    ["Lot", l.lot],
                    ["HOA", `$${l.hoa}/mo`],
                    ["Price / sqft", `$${l.pricePerSqft}`],
                  ] as [string, string][]).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between border-b border-dashed border-ink-900/10 pb-2">
                      <dt className="text-ink-500">{k}</dt>
                      <dd className="font-semibold text-ink-900">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Button href={SITE.phoneHref} size="md" icon="phone">Call advisor</Button>
                  <Button href={`sms:${SITE.phone.replace(/[^0-9]/g, "")}?body=Tour request: ${l.plan} in ${l.community} (${l.mls})`} variant="outline" size="md">
                    Text for a tour
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* details */}
      <section className="bg-cream pb-16">
        <div className="container-x grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          <div className="space-y-6">
            <Reveal className="rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07] sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-ink-900">About this home</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
                {l.builder} presents the {l.plan} in {l.community} — {num(l.sqft)} square feet with {l.beds} bedrooms and{" "}
                {l.baths} baths in {l.city}, Texas. This {st.label.toLowerCase()} home sits on a {l.lot} lot and includes a{" "}
                {l.garage}-car garage at ${l.pricePerSqft} per square foot.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                {l.community} is one of {region?.name}'s most active master-planned communities, with resort-scale amenities and
                continued phase releases. Homes in this community have averaged strong absorption, so incentives change quickly —
                we verify the current package before you write.
              </p>
              <h3 className="mt-7 text-[12px] font-bold tracking-[.14em] text-ink-500 uppercase">Highlights</h3>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {l.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-[14px] text-ink-700">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-mint-600" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80} className="rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07] sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-ink-900">Schools & location</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Elementary", v: l.schools.el },
                  { k: "Middle", v: l.schools.mid },
                  { k: "High", v: l.schools.high },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl bg-cream p-4 ring-1 ring-ink-900/[.05]">
                    <p className="text-[11px] font-bold tracking-[.14em] text-gold-700 uppercase">{s.k}</p>
                    <p className="mt-1 text-[14px] font-semibold text-ink-900">{s.v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-ink-900/[.07]">
                <TexasMap listings={[l]} activeRegion={l.regionId} onSelectRegion={() => {}} className="rounded-2xl" />
              </div>
              <p className="mt-3 text-[12.5px] text-ink-400">
                Map position is approximate. School attendance zones should be verified with the district before contracting.
              </p>
            </Reveal>

            <Reveal delay={120} className="rounded-3xl bg-ink-950 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold tracking-[.16em] text-gold-300 uppercase">Rebate math</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-white">
                    {usd(l.price)} × {l.rebatePct}% = <span className="text-mint-400">{usd(l.rebate)}</span>
                  </p>
                  <p className="mt-2 max-w-lg text-[13.5px] text-ink-300">
                    Disclosed on your settlement statement. No fee to you, no reduction in builder incentives, no fine print.
                  </p>
                </div>
                <Button to="/rebates" variant="light" icon="arrow">How it works</Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07]">
              <div className="flex items-center gap-3 border-b border-ink-900/10 pb-5">
                <SmartImage src={agent.img} alt={agent.name} ratio="aspect-square" className="h-14 w-14 rounded-full" />
                <div>
                  <p className="text-[15px] font-bold text-ink-900">{agent.name}</p>
                  <p className="text-[12.5px] text-ink-500">{agent.role}</p>
                  <p className="text-[11.5px] text-gold-700">{agent.license}</p>
                </div>
              </div>
              <div className="pt-5">
                <LeadForm
                  source={`listing-${l.mls}`}
                  compact
                  showTimeline={false}
                  preset={{ budget: l.price >= 850000 ? "$850K+" : l.price >= 650000 ? "$650K – $850K" : l.price >= 500000 ? "$500K – $650K" : l.price >= 350000 ? "$350K – $500K" : "Under $350K" }}
                  title="Tour this home"
                  sub={`Get the ${usd(l.rebate)} rebate breakdown plus the current ${l.builder} incentive package.`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* similar */}
      <section className="bg-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="More in " title={<>{region?.name} new construction</>} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <button
                  onClick={() => {
                    navigate(`/listing/${s.slug}`);
                    window.scrollTo({ top: 0 });
                  }}
                  className="card-hover group w-full overflow-hidden rounded-2xl bg-cream text-left ring-1 ring-ink-900/[.07]"
                >
                  <SmartImage src={s.images[0]} alt={s.community} ratio="aspect-[4/3]" imgClassName="group-hover:scale-[1.06]" />
                  <div className="p-5">
                    <p className="font-display text-xl font-semibold text-ink-900">{usd(s.price)}</p>
                    <p className="mt-1 text-[13.5px] text-ink-600">{s.plan} · {s.city}</p>
                    <p className="mt-2 text-[12.5px] font-bold text-mint-600">+{usd(s.rebate)} cash back</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export { LISTINGS };
