import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Link, useRouter } from "@/lib/router";
import { NAV, SITE } from "@/data/content";
import { Icon } from "./ui";
import { useLead } from "./LeadForm";

const NAV_ORDER = ["/", "/new-homes", "/rebates", "/communities", "/buyer-guide", "/about", "/blog", "/contact"];
const HEADER_NAV = [...NAV].sort((a, b) => NAV_ORDER.indexOf(a.to) - NAV_ORDER.indexOf(b.to));

/* Price-tag logo matching the TexasNewHomeRebates.com brand */
export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className={cn("brand-logo group flex shrink-0 items-center gap-2.5", compact && "brand-logo-compact")}>
      <span className="brand-logo-tag relative block h-11 w-10 shrink-0">
        <svg viewBox="0 0 52 76" className="h-full w-full drop-shadow-md" aria-hidden="true">
          <path d="M25 22 C9 12 10 1 16 3 C24 6 30 20 25 24" fill="none" stroke="#777" strokeWidth="1.7" />
          <g transform="rotate(-12 26 43)">
            <path d="M17 15 40 30V69H7V30Z" fill="#e2e4e7" stroke="#777" strokeWidth="1" />
            <path d="M17 19 36 32V65H11V32Z" fill="#ef0014" stroke="#fff" strokeWidth="1.5" />
            <circle cx="20" cy="28" r="2.3" fill="#fff" />
            <text x="23" y="57" textAnchor="middle" fontSize="32" fontWeight="700" fill="#fff" fontFamily="Georgia, serif">$</text>
          </g>
        </svg>
      </span>
      <span className="leading-none">
        <span className="brand-logo-name block text-[13px] font-extrabold tracking-tight text-ink-800 sm:text-[15px]">
          Texas New Home
        </span>
        <span className="brand-logo-rebates block text-[22px] leading-[1.05] font-black tracking-tight text-gold-600 sm:text-[26px]">
          REBATES<span className="brand-logo-domain text-[13px] font-extrabold text-ink-800 sm:text-[15px]">.com</span>
        </span>
        {!compact && (
          <span className="brand-logo-region mt-1 block border-t-2 border-gold-600 pt-0.5 text-[9px] font-extrabold tracking-[.14em] text-ink-800">
            DFW DALLAS / FT. WORTH
          </span>
        )}
      </span>
    </Link>
  );
}

export function Header() {
  const { route } = useRouter();
  const { open } = useLead();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [accordion, setAccordion] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const activeTop = NAV.find((n) => route.path === n.to || route.path.startsWith(`${n.to}/`))?.label;

  useEffect(() => {
    setDrawer(false);
    setOpenMenu(null);
  }, [route.hash]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="reference-site-header">
        <div className="reference-header-inner">
          <div className="reference-header-brand">
            <BrandLogo />
          </div>

          <div className="reference-header-contact">
            <p className="reference-header-tagline" aria-label={SITE.tagline}>
              Buy Smart, <span className="underline decoration-gold-500 decoration-2 underline-offset-8">Save Thousands.</span>
              <sup className="text-[11px] text-ink-500">®</sup>
            </p>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={SITE.phoneHref}
              className="reference-header-phone hidden items-center gap-2 text-[19px] font-black tracking-tight text-gold-600 md:flex"
            >
              <span className="grid h-8 w-8 place-items-center">
                <Icon name="phone" className="h-6 w-6" />
              </span>
              {SITE.phone}
            </a>
            <a
              href={SITE.phoneHref}
              aria-label={`Call ${SITE.phone}`}
              className="grid h-10 w-10 place-items-center rounded-full bg-gold-600 text-white md:hidden"
            >
              <Icon name="phone" className="h-4.5 w-4.5" />
            </a>
            <button
              onClick={() => open("header-schedule")}
              className="reference-header-schedule hidden items-center gap-2 rounded-md bg-gold-600 px-4 py-2.5 text-[12px] font-extrabold tracking-wide text-white uppercase transition-colors hover:bg-gold-500 sm:flex"
            >
              <Icon name="calendar" className="h-4 w-4" />
              Schedule a Consultation
            </button>
            <button
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-lg bg-ink-900/[.06] text-ink-900 lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
          </div>
          </div>

        <nav
          className="reference-header-navigation"
          aria-label="Main navigation"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="reference-header-nav-inner">
            <ul className="reference-header-links">
              {HEADER_NAV.map((item) => {
                const active = activeTop === item.label;
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
                    onFocus={() => setOpenMenu(item.children ? item.label : null)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
                    }}
                  >
                    <Link
                      to={item.to}
                      className={cn(
                        "reference-header-link relative flex items-center gap-1 font-bold transition-colors",
                        active ? "text-gold-600" : "text-ink-800 hover:text-gold-600"
                      )}
                    >
                      {item.label}
                      {item.children && (
                        <svg viewBox="0 0 24 24" className={cn("h-3 w-3 transition-transform duration-300", openMenu === item.label && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={2.4}>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      )}
                      {active && <span className="absolute inset-x-1 bottom-0 h-[2px] rounded-full bg-gold-600" />}
                    </Link>
                    {item.children && (
                      <div
                        className={cn(
                          "absolute top-full z-50 w-[430px] pt-1 transition-all duration-300",
                          item.to === "/about" ? "right-0" : "left-1/2 -translate-x-1/2",
                          openMenu === item.label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                        )}
                      >
                        <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-2 shadow-[0_40px_80px_-40px_rgba(7,22,55,.5)]">
                          {item.children.map((c) => (
                            <Link key={c.label} to={c.to} className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gold-50">
                              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink-50 text-ink-600 transition-colors group-hover:bg-gold-600 group-hover:text-white">
                                <Icon name={c.icon ?? "sparkle"} className="h-4 w-4" />
                              </span>
                              <span>
                                <span className="block text-[14px] font-bold text-ink-900">{c.label}</span>
                                {c.desc && <span className="block text-[12.5px] text-ink-500">{c.desc}</span>}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <Link
              to="/new-homes"
              aria-label="Search homes"
              className="reference-header-search grid place-items-center text-ink-700 transition-colors hover:text-gold-600"
            >
              <Icon name="search" className="h-5 w-5" />
            </Link>
          </div>
        </nav>
        </div>

        {/* scroll progress */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-transparent">
          <div className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-ink-600 transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={cn("fixed inset-0 z-[95] lg:hidden", drawer ? "pointer-events-auto" : "pointer-events-none")}
        inert={!drawer}
        aria-hidden={!drawer}
      >
        <div
          onClick={() => setDrawer(false)}
          className={cn("absolute inset-0 bg-ink-950/60 backdrop-blur-sm transition-opacity duration-400", drawer ? "opacity-100" : "opacity-0")}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
            drawer ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4">
            <BrandLogo compact />
            <button onClick={() => setDrawer(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-xl bg-ink-900/[.06] text-ink-700">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-3">
            {HEADER_NAV.map((item) => (
              <div key={item.label} className="border-b border-ink-900/[.06] last:border-0">
                <div className="flex items-center">
                  <Link to={item.to} className="flex-1 px-2 py-3.5 text-[16px] font-bold text-ink-900">
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setAccordion(accordion === item.label ? null : item.label)}
                      aria-label={`Toggle ${item.label}`}
                      className="grid h-9 w-9 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-900/5"
                    >
                      <svg viewBox="0 0 24 24" className={cn("h-4 w-4 transition-transform duration-300", accordion === item.label && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={2.2}>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && (
                  <div className={cn("grid overflow-hidden transition-all duration-400", accordion === item.label ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]")}>
                    <div className="min-h-0">
                      <div className="ml-2 space-y-0.5 border-l-2 border-gold-500/40 pl-3">
                        {item.children.map((c) => (
                          <Link key={c.label} to={c.to} className="flex items-center gap-2.5 rounded-lg py-2 text-[14px] text-ink-600">
                            <Icon name={c.icon ?? "sparkle"} className="h-3.5 w-3.5 text-gold-600" />
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="space-y-3 border-t border-ink-900/10 bg-ink-50 p-5">
            <button
              onClick={() => open("mobile-drawer")}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-gold-600 px-5 py-3.5 text-[14px] font-extrabold tracking-wide text-white uppercase"
            >
              <Icon name="cash" className="h-4 w-4" />
              Calculate My Rebate
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 rounded-md bg-ink-900 px-4 py-3 text-[13px] font-bold text-white">
                <Icon name="phone" className="h-4 w-4" /> Call
              </a>
              <a href={`sms:${SITE.phone.replace(/[^0-9]/g, "")}`} className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-[13px] font-bold text-ink-900 ring-1 ring-ink-900/10">
                <Icon name="social" className="h-4 w-4" /> Text
              </a>
            </div>
            <p className="text-center font-script text-xl text-ink-700">Buy Smart, Save Thousands.</p>
          </div>
        </div>
      </div>
    </>
  );
}
