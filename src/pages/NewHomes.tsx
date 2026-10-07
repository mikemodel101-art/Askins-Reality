import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { Icon, Reveal, Button, Pill, SmartImage } from "@/components/ui";
import { Link, usd, useRouter } from "@/lib/router";
import {
  BUILDERS,
  LISTINGS,
  PRICE_MAX,
  PRICE_MIN,
  REGIONS,
  STATUS_META,
  filterListings,
  regionById,
  type Filters,
  type Status,
} from "@/data/listings";
import { ListingCard, PriceRange, ChipGroup } from "@/components/listing-ui";
import { TexasMap } from "@/components/TexasMap";
import { CtaSplit, TrustBar } from "@/components/sections";
import { useLead } from "@/components/LeadForm";
import { Seo } from "@/components/Seo";
import { HERO_IMAGES, IMG, pick } from "@/data/media";

const SQFT_STEPS = [0, 1500, 1800, 2200, 2600, 3000, 3500, 4500];

export default function NewHomes() {
  const { route } = useRouter();
  const { open } = useLead();

  const q = route.query;
  const [filters, setFilters] = useState<Filters>({
    minPrice: q.get("min") ? Number(q.get("min")) : PRICE_MIN,
    maxPrice: q.get("max") ? Number(q.get("max")) : PRICE_MAX,
    beds: q.get("beds") ? Number(q.get("beds")) : 0,
    minSqft: 0,
    regions: q.get("region") ? [q.get("region")!] : [],
    builders: q.get("builder") ? [q.get("builder")!] : [],
    statuses: q.get("status") ? [q.get("status") as Status] : [],
    sort: "new",
    q: q.get("q") ?? "",
  });
  const [view, setView] = useState<"grid" | "map" | "split">(q.get("view") === "map" ? "map" : "split");
  const [hovered, setHovered] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [visible, setVisible] = useState(12);

  const results = useMemo(() => filterListings(LISTINGS, filters), [filters]);
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => {
    setFilters((p) => ({ ...p, [k]: v }));
    setVisible(12);
  };
  const toggleIn = (k: "regions" | "builders" | "statuses", v: string) => {
    const arr = filters[k] as string[];
    set(k, (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]) as Filters[typeof k]);
  };
  const reset = () =>
    setFilters({
      minPrice: PRICE_MIN,
      maxPrice: PRICE_MAX,
      beds: 0,
      minSqft: 0,
      regions: [],
      builders: [],
      statuses: [],
      sort: "new",
      q: "",
    });

  const activeCount =
    (filters.beds ? 1 : 0) +
    (filters.minSqft ? 1 : 0) +
    filters.regions.length +
    filters.builders.length +
    filters.statuses.length +
    (filters.minPrice > PRICE_MIN || filters.maxPrice < PRICE_MAX ? 1 : 0);

  const activeRegion = filters.regions.length === 1 ? filters.regions[0] : null;

  return (
    <>
      <Seo path="/new-homes" />

      {/* ---------- search hero ---------- */}
      <section className="relative overflow-hidden bg-ink-950 pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0">
          <SmartImage src={HERO_IMAGES.aerial} alt="" ratio="h-full" eager className="absolute inset-0 h-full" imgClassName="animate-pan" />
          <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/92 to-ink-950/70" />
        </div>
        <div className="container-x relative">
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12.5px] text-ink-300">
              <Link to="/" className="transition-colors hover:text-gold-300">Home</Link>
              <span className="text-ink-500">/</span>
              <span className="text-gold-300">New Homes</span>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-5xl lg:text-[3.6rem]">
              New construction homes across <span className="gold-text">all of Texas</span>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-4 max-w-2xl text-[16.5px] text-ink-200/85">
              Live MLS VOW feed via IDXBroker PRO. Filter by price, beds and square footage — every result shows your cash back.
            </p>
          </Reveal>
          <Reveal delay={220} className="mt-8">
            <div className="flex max-w-3xl flex-col gap-2 rounded-2xl bg-white/[.07] p-2 ring-1 ring-white/15 backdrop-blur sm:flex-row">
              <div className="flex flex-1 items-center gap-2.5 px-3">
                <Icon name="search" className="h-4.5 w-4.5 shrink-0 text-gold-300" />
                <input
                  value={filters.q}
                  onChange={(e) => set("q", e.target.value)}
                  placeholder="Search city, community or builder…"
                  aria-label="Search listings"
                  className="w-full bg-transparent py-3 text-[15px] text-white placeholder:text-ink-300/70 focus:outline-none"
                />
              </div>
              <Button onClick={() => setView("split")} icon="search" className="shrink-0">
                Search homes
              </Button>
            </div>
          </Reveal>
          <Reveal delay={300} className="mt-6 flex flex-wrap gap-2">
            {[
              { label: "Under $400K", fn: () => { set("maxPrice", 400000); set("minPrice", PRICE_MIN); } },
              { label: "4+ bedrooms", fn: () => set("beds", 4) },
              { label: "Quick move-ins", fn: () => set("statuses", ["quick" as Status]) },
              { label: "3,000+ sqft", fn: () => set("minSqft", 3000) },
              { label: "DFW", fn: () => set("regions", ["dfw"]) },
              { label: "Austin", fn: () => set("regions", ["austin"]) },
            ].map((c) => (
              <button
                key={c.label}
                onClick={c.fn}
                className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-ink-100 transition-all duration-300 hover:border-gold-400 hover:bg-white/10 hover:text-white"
              >
                {c.label}
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- results ---------- */}
      <section className="bg-cream pt-8 pb-16 lg:pb-24">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
            {/* ---------- filters ---------- */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center justify-between gap-3 lg:hidden">
                <button
                  onClick={() => setShowFilters(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-3.5 text-[14px] font-bold text-white"
                >
                  <Icon name="filter" className="h-4 w-4" /> Filters {activeCount > 0 && `(${activeCount})`}
                </button>
                <ViewToggle view={view} setView={setView} compact />
              </div>

              <div
                className={cn(
                  "mt-3 lg:mt-0 lg:block",
                  showFilters ? "fixed inset-0 z-[96] bg-ink-950/60 backdrop-blur-sm" : "hidden"
                )}
              >
                <div
                  className={cn(
                    "ml-auto flex h-full w-full max-w-[380px] flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-400 lg:ml-0 lg:h-auto lg:w-full lg:max-w-none lg:translate-x-0 lg:rounded-2xl lg:ring-1 lg:ring-ink-900/[.07]",
                    showFilters ? "translate-x-0" : "translate-x-full"
                  )}
                >
                  <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4 lg:hidden">
                    <span className="font-display text-lg font-bold text-ink-900">Filters</span>
                    <button onClick={() => setShowFilters(false)} aria-label="Close filters" className="grid h-9 w-9 place-items-center rounded-lg bg-ink-900/5 text-ink-700">
                      <Icon name="close" className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-6 overflow-y-auto p-5">
                    <PriceRange min={filters.minPrice} max={filters.maxPrice} bounds={[PRICE_MIN, PRICE_MAX]} onChange={(a, b) => { set("minPrice", a); set("maxPrice", b); }} />

                    <div>
                      <span className="mb-2 block text-[12px] font-bold tracking-wide text-ink-500 uppercase">Bedrooms</span>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[0, 2, 3, 4, 5].map((b) => (
                          <button
                            key={b}
                            onClick={() => set("beds", b)}
                            className={cn(
                              "rounded-xl border py-2.5 text-[13px] font-bold transition-all duration-200",
                              filters.beds === b ? "border-ink-900 bg-ink-900 text-white" : "border-ink-200 text-ink-600 hover:border-ink-400"
                            )}
                          >
                            {b === 0 ? "Any" : `${b}+`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[12px] font-bold tracking-wide text-ink-500 uppercase">Square footage</span>
                        <span className="rounded-full bg-ink-900 px-2.5 py-1 text-[11.5px] font-bold text-white">
                          {filters.minSqft === 0 ? "Any" : `${filters.minSqft.toLocaleString()}+ sqft`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={SQFT_STEPS.length - 1}
                        step={1}
                        value={SQFT_STEPS.indexOf(filters.minSqft) === -1 ? 0 : SQFT_STEPS.indexOf(filters.minSqft)}
                        onChange={(e) => set("minSqft", SQFT_STEPS[Number(e.target.value)])}
                        aria-label="Minimum square footage"
                        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-200 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold-500 [&::-webkit-slider-thumb]:bg-white"
                      />
                      <div className="mt-2 flex justify-between text-[11px] text-ink-400">
                        <span>Any</span>
                        <span>4,500+</span>
                      </div>
                    </div>

                    <div>
                      <span className="mb-2 block text-[12px] font-bold tracking-wide text-ink-500 uppercase">Region</span>
                      <div className="space-y-1">
                        {REGIONS.map((r) => {
                          const on = filters.regions.includes(r.id);
                          return (
                            <button
                              key={r.id}
                              onClick={() => toggleIn("regions", r.id)}
                              className={cn(
                                "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13.5px] transition-all duration-200",
                                on ? "bg-gold-50 font-semibold text-ink-900 ring-1 ring-gold-400/40" : "text-ink-600 hover:bg-ink-50"
                              )}
                            >
                              <span className={cn("grid h-4 w-4 shrink-0 place-items-center rounded border", on ? "border-gold-500 bg-gold-500 text-white" : "border-ink-300")}>
                                {on && <Icon name="check" className="h-3 w-3" />}
                              </span>
                              {r.name}
                              <span className="ml-auto text-[11.5px] text-ink-400">
                                {LISTINGS.filter((l) => l.regionId === r.id).length}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="builder-filter" className="mb-2 block text-[12px] font-bold tracking-wide text-ink-500 uppercase">
                        Builder
                      </label>
                      <select
                        id="builder-filter"
                        value={filters.builders[0] ?? ""}
                        onChange={(e) => set("builders", e.target.value ? [e.target.value] : [])}
                        className="w-full appearance-none rounded-xl border border-ink-200 bg-white px-4 py-3 text-[14px] text-ink-900 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 focus:outline-none"
                      >
                        <option value="">All builders</option>
                        {BUILDERS.map((b) => (
                          <option key={b.slug} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>

                    <ChipGroup<Status>
                      label="Home status"
                      value={filters.statuses}
                      onChange={(v) => set("statuses", v)}
                      options={[
                        { value: "quick", label: "Quick move-in" },
                        { value: "ucs", label: "Under construction" },
                        { value: "tbb", label: "To-be-built" },
                      ]}
                    />

                    <button onClick={reset} className="w-full rounded-full border border-ink-200 py-2.5 text-[13.5px] font-bold text-ink-600 transition-colors hover:border-ink-900 hover:text-ink-900">
                      Reset all filters
                    </button>
                  </div>

                  <div className="border-t border-ink-900/10 bg-white p-4 lg:hidden">
                    <Button onClick={() => setShowFilters(false)} full size="lg">
                      Show {results.length} homes
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-3 hidden rounded-2xl bg-ink-950 p-5 lg:block">
                <p className="font-display text-[17px] font-semibold text-white">Save this search</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-300">
                  Instant alerts when a matching home hits the MLS VOW feed — usually before the builder updates their site.
                </p>
                <Button onClick={() => open("save-search")} full size="sm" className="mt-4">
                  Create alert
                </Button>
              </div>
            </aside>

            {/* ---------- listings ---------- */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink-900/[.07]">
                <div>
                  <p className="text-[15px] font-bold text-ink-900">
                    {results.length} home{results.length === 1 ? "" : "s"} available
                    {activeRegion && <span className="text-ink-500"> in {regionById(activeRegion)?.name}</span>}
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-ink-500">
                    Avg. cash back {usd(Math.round(results.reduce((s, l) => s + l.rebate, 0) / Math.max(1, results.length)))} · synced 6 min ago
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden items-center gap-2 lg:flex">
                    <ViewToggle view={view} setView={setView} />
                  </div>
                  <label className="sr-only" htmlFor="sort">Sort results</label>
                  <select
                    id="sort"
                    value={filters.sort}
                    onChange={(e) => set("sort", e.target.value as Filters["sort"])}
                    className="appearance-none rounded-full border border-ink-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-ink-700 focus:border-gold-400 focus:outline-none"
                  >
                    <option value="new">Newest</option>
                    <option value="price-asc">Price ↑</option>
                    <option value="price-desc">Price ↓</option>
                    <option value="sqft-desc">Largest</option>
                  </select>
                </div>
              </div>

              {activeCount > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {filters.regions.map((r) => (
                    <FilterChip key={r} label={regionById(r)?.name ?? r} onClear={() => toggleIn("regions", r)} />
                  ))}
                  {filters.statuses.map((s) => (
                    <FilterChip key={s} label={STATUS_META[s as Status].label} onClear={() => toggleIn("statuses", s)} />
                  ))}
                  {filters.builders.map((b) => (
                    <FilterChip key={b} label={b} onClear={() => toggleIn("builders", b)} />
                  ))}
                  {filters.beds > 0 && <FilterChip label={`${filters.beds}+ beds`} onClear={() => set("beds", 0)} />}
                  {filters.minSqft > 0 && <FilterChip label={`${filters.minSqft.toLocaleString()}+ sqft`} onClear={() => set("minSqft", 0)} />}
                  <button onClick={reset} className="text-[12.5px] font-bold text-gold-700 underline underline-offset-4">
                    Clear all
                  </button>
                </div>
              )}

              {view !== "map" && (
                <div className={cn("mt-5 grid gap-5", view === "split" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
                  {results.slice(0, visible).map((l, i) => (
                    <ListingCard
                      key={l.slug}
                      l={l}
                      onHover={setHovered}
                      saved={saved.includes(l.slug)}
                      onToggleSave={(slug) => setSaved((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]))}
                      delay={(i % 6) * 60}
                    />
                  ))}
                </div>
              )}

              {view === "map" && (
                <div className="mt-5">
                  <TexasMap
                    listings={results}
                    activeRegion={activeRegion}
                    onSelectRegion={(id) => set("regions", id ? [id] : [])}
                    hovered={hovered}
                    onHover={setHovered}
                  />
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {results.slice(0, 6).map((l) => (
                      <Link
                        key={l.slug}
                        to={`/listing/${l.slug}`}
                        onMouseEnter={() => setHovered(l.slug)}
                        onMouseLeave={() => setHovered(null)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 transition-all duration-300",
                          hovered === l.slug ? "ring-gold-500" : "ring-ink-900/[.07] hover:ring-ink-900/20"
                        )}
                      >
                        <SmartImage src={l.images[0]} alt={l.community} ratio="aspect-square" className="w-20 shrink-0 rounded-xl" />
                        <div className="min-w-0">
                          <p className="truncate text-[14px] font-bold text-ink-900">{usd(l.price)}</p>
                          <p className="truncate text-[12.5px] text-ink-500">{l.plan} · {l.city}</p>
                          <p className="mt-1 truncate text-[11.5px] font-semibold text-mint-600">+{usd(l.rebate)} cash back</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.length === 0 && (
                <div className="mt-6 rounded-2xl bg-white p-10 text-center ring-1 ring-ink-900/[.07]">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-50 text-gold-600">
                    <Icon name="search" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink-900">No homes match those filters</h3>
                  <p className="mx-auto mt-2 max-w-md text-[14.5px] text-ink-600">
                    Our advisors see off-market and pre-release inventory that never hits the public feed. Tell us what you need.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button onClick={reset} variant="outline">Reset filters</Button>
                    <Button onClick={() => open("no-results")} icon="arrow">Send my wish list</Button>
                  </div>
                </div>
              )}

              {view !== "map" && results.length > visible && (
                <div className="mt-8 text-center">
                  <Button onClick={() => setVisible((v) => v + 9)} variant="outline" size="lg" icon="arrow">
                    Load {Math.min(9, results.length - visible)} more homes
                  </Button>
                  <p className="mt-3 text-[13px] text-ink-500">
                    Showing {Math.min(visible, results.length)} of {results.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* region cards */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl leading-tight font-semibold text-ink-900 sm:text-4xl">
              Or start from a Texas region
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {REGIONS.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <button
                  onClick={() => {
                    set("regions", [r.id]);
                    setView("split");
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="group relative block h-56 w-full overflow-hidden rounded-2xl text-left ring-1 ring-ink-900/[.07]"
                >
                  <SmartImage src={pick(IMG.air, i + 1, 600, 600)} alt={r.name} ratio="h-full" className="h-full" imgClassName="group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                  <span className="absolute inset-x-4 bottom-4">
                    <span className="block font-display text-[19px] font-semibold text-white">{r.name}</span>
                    <span className="mt-0.5 block text-[12px] text-ink-200">{LISTINGS.filter((l) => l.regionId === r.id).length} homes · from {usd(Math.min(...LISTINGS.filter((l) => l.regionId === r.id).map((l) => l.price)), true)}</span>
                  </span>
                  <span className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSplit
        title="Want the inventory that never hits the public feed?"
        sub="Builders hold pre-release homes, spec inventory and unadvertised incentives. Tell us your target and we'll send the full list — with your rebate attached to each one."
        bullets={[
          "Off-market & pre-release inventory",
          "Incentive comparison across 46 builders",
          "Rebate estimate on every home we send",
          "Weekly alerts, cancel any time",
        ]}
        image={pick(IMG.build, 0, 1200, 800)}
        source="new-homes-footer"
        flip
      />
    </>
  );
}

/* ------------------------------------------------------------------ */

function ViewToggle({ view, setView, compact }: { view: "grid" | "map" | "split"; setView: (v: "grid" | "map" | "split") => void; compact?: boolean }) {
  const opts: { k: "grid" | "map" | "split"; icon: string; label: string }[] = [
    { k: "split", icon: "grid", label: "Split" },
    { k: "grid", icon: "list", label: "Grid" },
    { k: "map", icon: "map", label: "Map" },
  ];
  return (
    <div className={cn("flex gap-1 rounded-full bg-white p-1 ring-1 ring-ink-900/[.07]", compact && "shrink-0")}>
      {opts.map((o) => (
        <button
          key={o.k}
          onClick={() => setView(o.k)}
          aria-label={o.label}
          title={o.label}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-2 text-[12.5px] font-bold transition-all duration-300",
            view === o.k ? "bg-ink-900 text-white" : "text-ink-500 hover:bg-ink-50"
          )}
        >
          <Icon name={o.icon} className="h-3.5 w-3.5" />
          {!compact && o.label}
        </button>
      ))}
    </div>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <Pill className="bg-ink-900 text-white ring-ink-900">
      {label}
      <button onClick={onClear} aria-label={`Remove ${label}`} className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-white/20">
        <Icon name="close" className="h-3 w-3" />
      </button>
    </Pill>
  );
}

export { NewHomes };
