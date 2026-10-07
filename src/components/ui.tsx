import { useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Link, useCountUp, useInView, useReveal } from "@/lib/router";

/* ------------------------------------------------------------------ *
 *  Icons
 * ------------------------------------------------------------------ */

const P: Record<string, ReactNode> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></>,
  map: <><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></>,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="8.5" r="1.4" /></>,
  pin: <><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></>,
  cash: <><rect x="2" y="6" width="20" height="12" rx="2.5" /><circle cx="12" cy="12" r="2.6" /><path d="M6 12h.01M18 12h.01" /></>,
  calc: <><rect x="4" y="2.5" width="16" height="19" rx="2.5" /><path d="M8 7h8M8 12h2M12 12h2M16 12h.01M8 16.5h2M12 16.5h2M16 16.5h.01" /></>,
  builder: <><path d="M3 21h18M5 21V9l7-5 7 5v12" /><path d="M9 21v-6h6v6" /></>,
  faq: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9.2a2.5 2.5 0 1 1 3.4 2.4c-.6.3-1 .9-1 1.6v.3" /><path d="M12 17h.01" /></>,
  steps: <><path d="M4 19h4V9H4v10ZM10 19h4V4h-4v15ZM16 19h4v-7h-4v7Z" /></>,
  doc: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  shield: <path d="M12 2.5 4.5 5.5v6c0 5 3.2 8.6 7.5 10 4.3-1.4 7.5-5 7.5-10v-6L12 2.5Z" />,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />,
  chip: <><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5 8 8M16 16l2.5 2.5M18.5 5.5 16 8M8 16l-2.5 2.5" /></>,
  team: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path d="M16 5.2a3.2 3.2 0 0 1 0 6M17 14.8c2.4.5 4 2.4 4 5.2" /></>,
  quote: <path d="M9 6c-3 1.4-5 4.2-5 7.6V18h6v-6H6.6C6.8 9.8 8 8.3 10 7.4L9 6Zm11 0c-3 1.4-5 4.2-5 7.6V18h6v-6h-3.4c.2-2.2 1.4-3.7 3.4-4.6L20 6Z" />,
  phone: <path d="M6.5 3h3l1.5 4-2 1.5a11 11 0 0 0 6 6L16.5 12l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4 6.2 2 2 0 0 1 6.5 3Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></>,
  check: <path d="m4.5 12.5 5 5L20 7" />,
  arrow: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
  arrowUp: <><path d="M12 20V5" /><path d="m6 11 6-6 6 6" /></>,
  bed: <><path d="M3 18v-7h13a5 5 0 0 1 5 5v2M3 11V6" /><path d="M3 18h18" /><circle cx="7" cy="8.5" r="1.8" /></>,
  bath: <><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" /><path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4c1.2 0 2 .7 2.3 1.7" /></>,
  sqft: <><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M8 3.5v17M3.5 8h17" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  filter: <path d="M4 6h16l-6 7v6l-4-2v-4L4 6Z" />,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  list: <path d="M4 6h16M4 12h16M4 18h16" />,
  sparkle: <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.9L12 18.4l-1.8-5.7L4.5 10.8 10.2 9 12 3.5Z" />,
  facebook: <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.5 1.6-1.5h1.6V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H7.5v3h2.8v8h3.2Z" />,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17" cy="7" r="1.1" /></>,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10.5 9.5 5 2.5-5 2.5v-5Z" /></>,
  linkedin: <><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M7.5 10v7M7.5 7.2v.1M11.5 17v-4a2.3 2.3 0 0 1 4.6 0v4" /></>,
  x: <path d="m4 4 7 8.7L4.4 20h2.2l5.2-6 4.9 6H20l-7.2-9L19.4 4h-2.2l-4.8 5.6L8 4H4Z" />,
  crm: <><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" /><path d="M7 7h.01M7 17h.01" /></>,
  feed: <><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1.6" /></>,
  social: <><circle cx="7" cy="8" r="3" /><circle cx="17" cy="6" r="2.6" /><circle cx="16" cy="17" r="3" /><path d="m9.5 9.8 4.2 5M9.8 7.4l4.6-.8" /></>,
  ai: <><rect x="5" y="5" width="14" height="14" rx="4" /><path d="M9.5 9.5 12 15l2.5-5.5M8 13h8" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>,
  home: <><path d="M4 11 12 4.5 20 11v8.5a1 1 0 0 1-1 1h-4.5V15h-5v5.5H5a1 1 0 0 1-1-1V11Z" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M8 3v4M16 3v4M3.5 10h17" /></>,
  chevR: <path d="m9 5 7 7-7 7" />,
  trophy: <><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 5H4a1 1 0 0 0-1 1c0 2.5 2 4 4.5 4M17 5h3a1 1 0 0 1 1 1c0 2.5-2 4-4.5 4M12 14v4M8.5 20h7M10 18h4" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 4h3v3" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3.5 9h17M3.5 15h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {P[name] ?? P.sparkle}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 *  SmartImage — lazy, blur-in, graceful fallback (never a broken icon)
 * ------------------------------------------------------------------ */

export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  ratio = "aspect-[4/3]",
  eager = false,
  overlay,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  eager?: boolean;
  overlay?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={cn("relative overflow-hidden bg-ink-100", ratio, className)}>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-ink-200 via-cream to-gold-100 transition-opacity duration-700",
          loaded && !failed ? "opacity-0" : "opacity-100",
          failed && "from-ink-800 via-ink-900 to-ink-950"
        )}
      />
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-[900ms] ease-out",
            loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md",
            imgClassName
          )}
        />
      )}
      {failed && (
        <div className="absolute inset-0 grid place-items-center text-center">
          <div className="px-4">
            <Icon name="home" className="mx-auto h-8 w-8 text-gold-300/70" />
            <p className="mt-2 text-xs font-medium tracking-wide text-white/70 uppercase">{alt}</p>
          </div>
        </div>
      )}
      {overlay && <div className={cn("absolute inset-0", overlay)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Reveal wrapper
 * ------------------------------------------------------------------ */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "zoom";
  as?: "div" | "section" | "li" | "article" | "header" | "aside";
};

export function Reveal({ children, className, delay = 0, variant = "up", as = "div" }: RevealProps) {
  const ref = useReveal();
  const variantClass =
    variant === "left" ? "reveal-left" : variant === "right" ? "reveal-right" : variant === "zoom" ? "reveal-zoom" : "reveal";
  const Tag = as as "div";
  return (
    <Tag ref={ref} className={cn(variantClass, className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 *  Buttons
 * ------------------------------------------------------------------ */

type BtnProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "ink" | "outline" | "ghost" | "light" | "mint";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: string;
  full?: boolean;
  type?: "button" | "submit";
};

const VARIANTS: Record<string, string> = {
  gold: "bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white shadow-[0_14px_34px_-14px_rgba(217,38,38,.85)] hover:shadow-[0_20px_44px_-14px_rgba(217,38,38,.95)] hover:brightness-110",
  ink: "bg-ink-900 text-cream hover:bg-ink-800",
  mint: "bg-mint-500 text-white hover:bg-mint-600",
  outline: "border border-ink-900/20 text-ink-900 hover:border-ink-900/60 hover:bg-ink-900/[.04]",
  ghost: "text-ink-700 hover:bg-ink-900/[.06]",
  light: "bg-white/12 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20",
};

const SIZES: Record<string, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

export function Button({
  children,
  to,
  href,
  onClick,
  variant = "gold",
  size = "md",
  className,
  icon,
  full,
  type = "button",
}: BtnProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
    VARIANTS[variant],
    SIZES[size],
    full && "w-full",
    className
  );
  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  if (to) return <Link to={to} className={classes}>{inner}</Link>;
  if (href)
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 *  Section heading + eyebrow + pill
 * ------------------------------------------------------------------ */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50/80 px-3.5 py-1.5 text-[11px] font-bold tracking-[.16em] text-gold-700 uppercase",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow className={light ? "border-white/25 bg-white/10 text-gold-200" : undefined}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={cn(
            "mt-5 text-3xl leading-[1.08] font-semibold text-balance sm:text-4xl lg:text-[2.9rem]",
            light ? "text-white" : "text-ink-900"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={160}>
          <p className={cn("mt-4 text-base leading-relaxed sm:text-[17px]", light ? "text-ink-200/85" : "text-ink-600/90")}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ring-1", className)}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 *  Animated stat counter
 * ------------------------------------------------------------------ */

export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  decimals = 0,
  light = false,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  light?: boolean;
}) {
  const { ref, inView } = useInView(0.4);
  const n = useCountUp(value, 1800, inView);
  return (
    <div ref={ref}>
      <div className={cn("font-display text-4xl font-semibold sm:text-[2.7rem]", light ? "text-white" : "text-ink-900")}>
        {prefix}
        <span>{n.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}</span>
        {suffix}
      </div>
      <p className={cn("mt-1.5 text-[13px] leading-snug font-medium", light ? "text-ink-300" : "text-ink-500")}>{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Logo marquee
 * ------------------------------------------------------------------ */

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex w-max animate-marquee items-center gap-10 sm:gap-14">
        {doubled.map((it, i) => (
          <span
            key={`${it}-${i}`}
            className="font-display text-lg font-semibold whitespace-nowrap text-ink-400 transition-colors duration-300 hover:text-ink-700 sm:text-xl"
          >
            {it}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent" />
    </div>
  );
}

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
        </svg>
      ))}
    </div>
  );
}
