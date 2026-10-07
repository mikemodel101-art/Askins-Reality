import { cn } from "@/utils/cn";
import { Icon, Pill, SmartImage } from "./ui";
import { Link } from "@/lib/router";
import { usd, num } from "@/lib/router";
import { STATUS_META, type Listing } from "@/data/listings";

export function ListingCard({
  l,
  onHover,
  saved,
  onToggleSave,
  delay = 0,
}: {
  l: Listing;
  onHover?: (slug: string | null) => void;
  saved?: boolean;
  onToggleSave?: (slug: string) => void;
  delay?: number;
}) {
  const st = STATUS_META[l.status];
  return (
    <article
      onMouseEnter={() => onHover?.(l.slug)}
      onMouseLeave={() => onHover?.(null)}
      style={{ animationDelay: `${delay}ms` }}
      className="card-hover animate-pop group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink-900/[.07]"
    >
      <Link to={`/listing/${l.slug}`} className="relative block">
        <SmartImage
          src={l.images[0]}
          alt={`${l.plan} in ${l.community}, ${l.city} TX`}
          ratio="aspect-[4/3]"
          imgClassName="group-hover:scale-[1.06]"
          overlay="bg-gradient-to-t from-ink-950/70 via-ink-950/5 to-transparent"
        />
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <span className="font-display text-2xl font-semibold text-white drop-shadow">{usd(l.price)}</span>
          <span className="rounded-full bg-mint-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-lg">
            +{usd(l.rebate)} back
          </span>
        </div>
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Pill className={cn("bg-white/95 backdrop-blur", st.className)}>{st.label}</Pill>
          {l.dom < 12 && <Pill className="bg-ink-950/80 text-white ring-white/20">New · {l.dom}d</Pill>}
        </div>
      </Link>

      <button
        aria-label="Save listing"
        onClick={() => onToggleSave?.(l.slug)}
        className={cn(
          "absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-all duration-300",
          saved ? "bg-red-500 text-white" : "bg-white/85 text-ink-500 hover:bg-white hover:text-red-500"
        )}
      >
        <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
          <path d="M12 20s-7-4.3-7-9.3A4 4 0 0 1 12 7a4 4 0 0 1 7 3.7c0 5-7 9.3-7 9.3Z" />
        </svg>
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-bold tracking-[.14em] text-gold-700 uppercase">{l.builder}</p>
        <h3 className="mt-1 font-display text-lg leading-snug font-semibold text-ink-900">
          <Link to={`/listing/${l.slug}`} className="transition-colors hover:text-gold-600">
            {l.plan} · {l.community}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-[13.5px] text-ink-500">
          <Icon name="pin" className="h-3.5 w-3.5 shrink-0 text-ink-400" />
          {l.city}, Texas
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-ink-900/[.07] py-3 text-center">
          {[
            { icon: "bed", v: l.beds, s: "bd" },
            { icon: "bath", v: l.baths, s: "ba" },
            { icon: "sqft", v: num(l.sqft), s: "sqft" },
          ].map((x) => (
            <div key={x.s}>
              <div className="flex items-center justify-center gap-1.5 text-[15px] font-bold text-ink-900">
                <Icon name={x.icon} className="h-4 w-4 text-ink-400" />
                {x.v}
                <span className="text-[11px] font-semibold text-ink-400">{x.s}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-[12.5px] text-ink-500">
          <span>${l.pricePerSqft}/sqft</span>
          <span>Lot {l.lot}</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            to={`/listing/${l.slug}`}
            className="flex-1 rounded-full bg-ink-900 px-4 py-2.5 text-center text-[13px] font-bold text-white transition-colors hover:bg-ink-800"
          >
            View details
          </Link>
          <a
            href="#/contact"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/15 text-ink-600 transition-colors hover:border-gold-500 hover:text-gold-700"
            aria-label="Request a tour"
          >
            <Icon name="key" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 *  Dual-handle price range
 * ------------------------------------------------------------------ */

export function PriceRange({
  min,
  max,
  onChange,
  bounds,
  step = 10000,
}: {
  min: number;
  max: number;
  bounds: [number, number];
  step?: number;
  onChange: (min: number, max: number) => void;
}) {
  const [lo, hi] = bounds;
  const pctA = ((min - lo) / (hi - lo)) * 100;
  const pctB = ((max - lo) / (hi - lo)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[12px] font-bold tracking-wide text-ink-500 uppercase">Price range</span>
        <span className="rounded-full bg-ink-900 px-2.5 py-1 text-[11.5px] font-bold text-white">
          {usd(min, true)} – {max >= hi ? `${usd(hi, true)}+` : usd(max, true)}
        </span>
      </div>
      <div className="relative h-9">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-ink-200" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500"
          style={{ left: `${pctA}%`, width: `${Math.max(2, pctB - pctA)}%` }}
        />
        {[min, max].map((val, i) => (
          <input
            key={i}
            type="range"
            min={lo}
            max={hi}
            step={step}
            value={val}
            aria-label={i === 0 ? "Minimum price" : "Maximum price"}
            onChange={(e) => {
              const nv = Number(e.target.value);
              if (i === 0) onChange(Math.min(nv, max - step), max);
              else onChange(min, Math.max(nv, min + step));
            }}
            className="pointer-events-none absolute top-0 h-9 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-115 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold-500 [&::-moz-range-thumb]:bg-white"
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Chip group helper
 * ------------------------------------------------------------------ */

export function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T[];
  onChange: (v: T[]) => void;
}) {
  const toggle = (v: T) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <div>
      <span className="mb-2 block text-[12px] font-bold tracking-wide text-ink-500 uppercase">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => toggle(o.value)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-all duration-200",
              value.includes(o.value)
                ? "border-ink-900 bg-ink-900 text-white"
                : "border-ink-200 text-ink-600 hover:border-ink-400 hover:bg-ink-50"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
