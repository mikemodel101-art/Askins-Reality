import { useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { REGIONS, LISTINGS, type Listing, STATUS_META } from "@/data/listings";
import { Icon, Pill } from "./ui";
import { usd } from "@/lib/router";

/* ------------------------------------------------------------------ *
 *  Texas outline (simplified state border) + equirectangular projection
 * ------------------------------------------------------------------ */

const BORDER: [number, number][] = [
  [-103.04, 36.5], [-100.0, 36.5], [-100.0, 34.56], [-99.2, 34.42], [-98.6, 34.16], [-97.9, 34.12],
  [-97.45, 33.9], [-96.6, 33.95], [-95.6, 33.88], [-94.6, 33.75], [-94.04, 33.55], [-94.04, 32.5],
  [-94.04, 31.9], [-93.85, 31.2], [-93.7, 30.4], [-93.72, 30.05], [-93.85, 29.68], [-94.1, 29.6],
  [-94.75, 29.35], [-95.1, 29.1], [-95.55, 28.9], [-96.4, 28.58], [-96.8, 28.3], [-97.2, 27.92],
  [-97.4, 27.55], [-97.35, 27.05], [-97.15, 26.55], [-97.15, 25.95], [-97.55, 26.3], [-98.1, 26.35],
  [-98.6, 26.6], [-99.1, 26.9], [-99.45, 27.5], [-99.5, 28.0], [-99.05, 28.4], [-99.45, 28.9],
  [-100.05, 29.3], [-100.65, 29.3], [-101.4, 29.75], [-102.3, 29.85], [-102.9, 29.3], [-103.35, 29.25],
  [-104.0, 29.3], [-104.55, 29.65], [-105.05, 29.95], [-105.6, 30.25], [-106.05, 30.55], [-106.5, 31.0],
  [-106.55, 31.5], [-106.45, 31.76], [-106.6, 32.0], [-103.06, 32.0], [-103.04, 34.0], [-103.04, 36.5],
];

const LON_MIN = -106.65;
const LAT_MAX = 36.5;
const COS = Math.cos((31.2 * Math.PI) / 180);
const K = 90.3;
const W = 1000;
const H = 970;

const project = (lng: number, lat: number) => ({
  x: (lng - LON_MIN) * COS * K,
  y: (LAT_MAX - lat) * K,
});

const STATE_PATH =
  BORDER.map((p, i) => {
    const { x, y } = project(p[0], p[1]);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ") + " Z";

/* ------------------------------------------------------------------ *
 *  Interactive map
 * ------------------------------------------------------------------ */

export function TexasMap({
  listings,
  activeRegion,
  onSelectRegion,
  hovered,
  onHover,
  className,
}: {
  listings: Listing[];
  activeRegion: string | null;
  onSelectRegion: (id: string | null) => void;
  hovered?: string | null;
  onHover?: (slug: string | null) => void;
  className?: string;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    LISTINGS.forEach((l) => (m[l.regionId] = (m[l.regionId] ?? 0) + 1));
    return m;
  }, []);

  const visible = listings.length;

  const reset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };
  const focus = (id: string) => {
    const r = REGIONS.find((x) => x.id === id);
    if (!r) return;
    const { x, y } = project(r.lng, r.lat);
    setZoom(2.1);
    setPan({ x: W / 2 - x * 2.1, y: H / 2 - y * 2.1 });
    onSelectRegion(id);
  };

  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-ink-950 ring-1 ring-white/10", className)}>
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-mint-500/10 blur-3xl" />
      </div>

      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* ------- map canvas ------- */}
        <div
          className="relative h-[360px] touch-pan-y select-none sm:h-[440px] lg:h-[560px] lg:cursor-grab"
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            setPan({
              x: drag.current.px + (e.clientX - drag.current.x),
              y: drag.current.py + (e.clientY - drag.current.y),
            });
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerLeave={() => (drag.current = null)}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-full w-full"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transition: drag.current ? "none" : "transform .6s cubic-bezier(.16,1,.3,1)" }}
          >
            <defs>
              <linearGradient id="tx" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1b3459" />
                <stop offset="55%" stopColor="#12233f" />
                <stop offset="100%" stopColor="#0c1a2e" />
              </linearGradient>
              <linearGradient id="txActive" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f7b52a" />
                <stop offset="100%" stopColor="#ec9411" />
              </linearGradient>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="10" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path d={STATE_PATH} fill="none" stroke="#ef3434" strokeOpacity={0.3} strokeWidth={2} transform="translate(0,10)" filter="url(#glow)" />
            <path
              d={STATE_PATH}
              fill="url(#tx)"
              stroke="#5f7ea8"
              strokeWidth={1.6}
              className="transition-[stroke] duration-500"
            />

            {/* region hotspots */}
            {REGIONS.map((r) => {
              const p = project(r.lng, r.lat);
              const active = activeRegion === r.id;
              const c = counts[r.id] ?? 0;
              return (
                <g
                  key={r.id}
                  transform={`translate(${p.x},${p.y})`}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    active ? onSelectRegion(null) : focus(r.id);
                  }}
                >
                  {active && <circle r={26} fill="#f7b52a" opacity={0.25} className="animate-pulse-ring" />}
                  <circle
                    r={active ? 13 : 8.5}
                    fill={active ? "url(#txActive)" : "#f7b52a"}
                    fillOpacity={active ? 1 : 0.85}
                    stroke="#060f1d"
                    strokeWidth={1.5}
                    className="transition-all duration-300"
                  />
                  <text
                    y={4.2}
                    textAnchor="middle"
                    className="pointer-events-none font-sans"
                    fontSize={active ? 10 : 8}
                    fontWeight={800}
                    fill="#060f1d"
                  >
                    {c}
                  </text>
                  <text
                    y={active ? 30 : -14}
                    textAnchor="middle"
                    fontSize={active ? 15 : 12}
                    fontWeight={700}
                    fill={active ? "#f7b52a" : "#c6d4e7"}
                    className="pointer-events-none"
                    style={{ paintOrder: "stroke", stroke: "#060f1d", strokeWidth: 3.5 }}
                  >
                    {r.short}
                  </text>
                </g>
              );
            })}

            {/* listing pins */}
            {listings.map((l) => {
              const p = project(l.lng, l.lat);
              const isHover = hovered === l.slug;
              return (
                <g
                  key={l.slug}
                  transform={`translate(${p.x},${p.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => onHover?.(l.slug)}
                  onMouseLeave={() => onHover?.(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.hash = `#/listing/${l.slug}`;
                  }}
                >
                  <circle
                    r={isHover ? 7 : 4}
                    fill={l.status === "quick" ? "#34d399" : l.status === "ucs" ? "#f7b52a" : "#97aecb"}
                    stroke="#060f1d"
                    strokeWidth={isHover ? 2 : 1}
                    className="transition-all duration-200"
                  />
                  {isHover && (
                    <g transform="translate(12,-26)">
                      <rect x={0} y={0} width={168} height={52} rx={9} fill="#fbf8f3" opacity={0.97} />
                      <text x={11} y={20} fontSize={13} fontWeight={800} fill="#0d1b2f">
                        {usd(l.price)}
                      </text>
                      <text x={11} y={38} fontSize={11} fill="#42628e">
                        {l.city} · {l.beds} bd · {l.sqft.toLocaleString()} sqft
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* map chrome */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Pill className="bg-white/10 text-white ring-white/20 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-400" /> {visible} homes on map
            </Pill>
            <Pill className="bg-white/10 text-white ring-white/20 backdrop-blur">
              <Icon name="feed" className="h-3.5 w-3.5" /> MLS VOW · synced 6 min ago
            </Pill>
          </div>

          <div className="absolute right-4 bottom-4 flex flex-col gap-1.5">
            {[
              { label: "zoom in", icon: "plus", fn: () => setZoom((z) => Math.min(3, +(z + 0.4).toFixed(2))) },
              { label: "zoom out", icon: "minus", fn: () => setZoom((z) => Math.max(1, +(z - 0.4).toFixed(2))) },
              { label: "reset", icon: "target", fn: reset },
            ].map((b) => (
              <button
                key={b.label}
                aria-label={b.label}
                onClick={b.fn}
                className="grid h-9 w-9 place-items-center rounded-xl bg-white/12 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/25"
              >
                <Icon name={b.icon} className="h-4 w-4" />
              </button>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 hidden flex-col gap-1 rounded-xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur sm:flex">
            {[
              { c: "#34d399", l: "Quick move-in" },
              { c: "#f7b52a", l: "Under construction" },
              { c: "#97aecb", l: "To-be-built" },
            ].map((x) => (
              <span key={x.l} className="flex items-center gap-2 text-[11px] font-semibold text-white/85">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: x.c }} />
                {x.l}
              </span>
            ))}
          </div>
        </div>

        {/* ------- region rail ------- */}
        <aside className="border-t border-white/10 bg-ink-950/60 p-4 lg:border-t-0 lg:border-l lg:p-5">
          <p className="text-[11px] font-bold tracking-[.16em] text-gold-300 uppercase">Texas regions</p>
          <div className="mt-3 space-y-1.5">
            {REGIONS.map((r) => {
              const active = activeRegion === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => (active ? (onSelectRegion(null), reset()) : focus(r.id))}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-300",
                    active ? "bg-gold-400/15 ring-1 ring-gold-400/40" : "hover:bg-white/[.06]"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[11px] font-bold transition-colors",
                      active ? "bg-gold-500 text-white" : "bg-white/10 text-ink-200"
                    )}
                  >
                    {counts[r.id] ?? 0}
                  </span>
                  <span className="min-w-0">
                    <span className={cn("block truncate text-[13.5px] font-semibold", active ? "text-gold-200" : "text-white")}>
                      {r.name}
                    </span>
                    <span className="block truncate text-[11.5px] text-ink-300/70">
                      {r.cities.slice(0, 3).join(" · ")}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          {activeRegion && (
            <button
              onClick={() => {
                onSelectRegion(null);
                reset();
              }}
              className="mt-4 w-full rounded-xl border border-white/20 px-3 py-2.5 text-[13px] font-semibold text-white transition hover:bg-white/10"
            >
              Clear region filter
            </button>
          )}
          <p className="mt-4 border-t border-white/10 pt-4 text-[11.5px] leading-relaxed text-ink-300/60">
            Drag to pan · use +/− to zoom · click a pin to open the listing. Status colors follow the live MLS VOW feed.
          </p>
        </aside>
      </div>
    </div>
  );
}

export const STATUS_LEGEND = STATUS_META;
