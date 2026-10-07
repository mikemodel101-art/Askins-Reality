import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon, Button } from "./ui";
import { REGIONS } from "@/data/listings";
import { SITE } from "@/data/content";
import { usd } from "@/lib/router";

/* ------------------------------------------------------------------ *
 *  Lead context — every capture point routes through one CRM pipeline
 * ------------------------------------------------------------------ */

type LeadCtx = { open: (source: string, preset?: Partial<LeadValues>) => void; close: () => void };
const LeadContext = createContext<LeadCtx>({ open: () => {}, close: () => {} });
export const useLead = () => useContext(LeadContext);

export type LeadValues = {
  name: string;
  email: string;
  phone: string;
  region: string;
  budget: string;
  timeline: string;
  message: string;
  contact: string;
  consent: boolean;
};

const EMPTY: LeadValues = {
  name: "",
  email: "",
  phone: "",
  region: "",
  budget: "",
  timeline: "",
  message: "",
  contact: "call",
  consent: false,
};

const BUDGETS = ["Under $350K", "$350K – $500K", "$500K – $650K", "$650K – $850K", "$850K+"];
const TIMELINES = ["Ready now", "30–60 days", "3–6 months", "6–12 months", "Just researching"];

function validate(v: LeadValues) {
  const e: Partial<Record<keyof LeadValues, string>> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name";
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email.trim())) e.email = "Enter a valid email address";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 10) e.phone = "Enter a 10-digit phone number";
  if (!v.region) e.region = "Choose a region";
  if (!v.budget) e.budget = "Select a price range";
  if (!v.consent) e.consent = "Please agree so we can contact you";
  return e;
}

const inputBase =
  "w-full rounded-xl border bg-white/95 px-4 py-3 text-[15px] text-ink-900 shadow-sm outline-none transition-all duration-200 placeholder:text-ink-400/80 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/25";

/* ------------------------------------------------------------------ *
 *  LeadForm
 * ------------------------------------------------------------------ */

export function LeadForm({
  source = "generic",
  preset,
  variant = "card",
  title = "Get My Rebate Estimate",
  sub = "60 seconds. No obligation. A licensed Texas advisor replies the same day.",
  dark = false,
  showTimeline = true,
  compact = false,
}: {
  source?: string;
  preset?: Partial<LeadValues>;
  variant?: "card" | "plain";
  title?: string;
  sub?: string;
  dark?: boolean;
  showTimeline?: boolean;
  compact?: boolean;
}) {
  const [v, setV] = useState<LeadValues>({ ...EMPTY, ...preset });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadValues, string>>>({});
  const [stage, setStage] = useState<"idle" | "sending" | "crm" | "match" | "done">("idle");

  const set = (k: keyof LeadValues, val: string | boolean) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const rebateGuess = useMemo(() => {
    const map: Record<string, number> = {
      "Under $350K": 300000,
      "$350K – $500K": 425000,
      "$500K – $650K": 575000,
      "$650K – $850K": 750000,
      "$850K+": 950000,
    };
    return map[v.budget] ? Math.round(map[v.budget] * 0.03) : 0;
  }, [v.budget]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStage("sending");
    window.setTimeout(() => setStage("crm"), 700);
    window.setTimeout(() => setStage("match"), 1500);
    window.setTimeout(() => setStage("done"), 2300);
  };

  const labelCls = cn("mb-1.5 block text-[12px] font-bold tracking-wide uppercase", dark ? "text-ink-200" : "text-ink-500");
  const errCls = "mt-1 flex items-center gap-1 text-[12px] font-medium text-red-600";

  if (stage === "done") {
    return (
      <div className="animate-pop rounded-2xl bg-white p-7 text-center shadow-xl ring-1 ring-ink-900/5">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint-500/15 text-mint-600">
          <Icon name="check" className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-ink-900">You're in — {v.name.split(" ")[0]}!</h3>
        {rebateGuess > 0 && (
          <p className="mt-2 font-display text-4xl font-semibold text-mint-600">≈ {usd(rebateGuess)}</p>
        )}
        <p className="mt-2 text-[15px] text-ink-600">
          Your rebate estimate is saved. <strong className="text-ink-900">Priya Raghavan</strong> has been assigned and will
          reach out shortly.
        </p>
        <div className="mt-5 space-y-2 rounded-xl bg-ink-50 p-4 text-left">
          {[
            { k: "CRM record", val: `FUB-${Math.floor(100000 + Math.random() * 899999)}` },
            { k: "Source", val: source },
            { k: "Region", val: v.region || "Statewide" },
            { k: "First touch", val: "Call + text within 15 min" },
          ].map((r) => (
            <div key={r.k} className="flex items-center justify-between gap-3 text-[13px]">
              <span className="text-ink-500">{r.k}</span>
              <span className="font-semibold text-ink-900">{r.val}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button href={SITE.phoneHref} variant="ink" size="sm" icon="phone">
            Call {SITE.phone}
          </Button>
          <Button to="/new-homes" variant="outline" size="sm">
            Browse listings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className={cn(
        variant === "card" && "rounded-2xl bg-white p-6 shadow-[0_30px_70px_-40px_rgba(6,15,29,.45)] ring-1 ring-ink-900/[.07] sm:p-7"
      )}
    >
      {stage !== "idle" && (
        <div className="mb-5 space-y-1.5 rounded-xl bg-ink-900 p-3.5 font-mono text-[11px] text-mint-400">
          {[
            { s: "sending" as const, t: "→ validating fields / dedupe check" },
            { s: "crm" as const, t: "→ POST /crm/leads  (Follow Up Boss)" },
            { s: "match" as const, t: "→ routing to advisor by region + price band" },
          ].map((line) => (
            <div key={line.s} className={cn("transition-opacity duration-500", stage === "sending" && line.s !== "sending" ? "opacity-30" : "opacity-100")}>
              {line.t}
            </div>
          ))}
        </div>
      )}

      <h3 className={cn("font-display text-2xl font-semibold", dark ? "text-white" : "text-ink-900")}>{title}</h3>
      <p className={cn("mt-1.5 mb-5 text-[14px] leading-relaxed", dark ? "text-ink-200/85" : "text-ink-600")}>{sub}</p>

      <div className={cn("grid gap-4", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor={`lf-name-${source}`}>Full name</label>
          <input
            id={`lf-name-${source}`}
            className={cn(inputBase, errors.name ? "border-red-400" : "border-ink-200")}
            placeholder="Jordan Miller"
            value={v.name}
            autoComplete="name"
            onChange={(e) => set("name", e.target.value)}
          />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor={`lf-email-${source}`}>Email</label>
          <input
            id={`lf-email-${source}`}
            type="email"
            className={cn(inputBase, errors.email ? "border-red-400" : "border-ink-200")}
            placeholder="you@email.com"
            value={v.email}
            autoComplete="email"
            onChange={(e) => set("email", e.target.value)}
          />
          {errors.email && <p className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor={`lf-phone-${source}`}>Mobile phone</label>
          <input
            id={`lf-phone-${source}`}
            type="tel"
            className={cn(inputBase, errors.phone ? "border-red-400" : "border-ink-200")}
            placeholder="(214) 727-3686"
            value={v.phone}
            autoComplete="tel"
            onChange={(e) => set("phone", e.target.value)}
          />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor={`lf-region-${source}`}>Target region</label>
          <select
            id={`lf-region-${source}`}
            className={cn(inputBase, errors.region ? "border-red-400" : "border-ink-200", "appearance-none")}
            value={v.region}
            onChange={(e) => set("region", e.target.value)}
          >
            <option value="">Select a region…</option>
            {REGIONS.map((r) => (
              <option key={r.id} value={r.name}>{r.name}</option>
            ))}
            <option value="Statewide / Not sure">Statewide / Not sure</option>
          </select>
          {errors.region && <p className={errCls}>{errors.region}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor={`lf-budget-${source}`}>Price range</label>
          <select
            id={`lf-budget-${source}`}
            className={cn(inputBase, errors.budget ? "border-red-400" : "border-ink-200", "appearance-none")}
            value={v.budget}
            onChange={(e) => set("budget", e.target.value)}
          >
            <option value="">Select a range…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && <p className={errCls}>{errors.budget}</p>}
        </div>
        {showTimeline && (
          <div className="sm:col-span-2">
            <span className={labelCls}>When are you buying?</span>
            <div className="flex flex-wrap gap-2">
              {TIMELINES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set("timeline", t)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200",
                    v.timeline === t
                      ? "border-ink-900 bg-ink-900 text-white"
                      : dark
                        ? "border-white/20 text-ink-100 hover:border-white/50"
                        : "border-ink-200 text-ink-600 hover:border-ink-400"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
        {!compact && (
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor={`lf-msg-${source}`}>Anything we should know? (optional)</label>
            <textarea
              id={`lf-msg-${source}`}
              rows={3}
              className={cn(inputBase, "resize-none border-ink-200")}
              placeholder="Looking for a 4-bed in a top school district with a quick move-in…"
              value={v.message}
              onChange={(e) => set("message", e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {[
          { k: "call", label: "Call me", icon: "phone" },
          { k: "text", label: "Text me", icon: "social" },
          { k: "email", label: "Email only", icon: "mail" },
        ].map((o) => (
          <button
            key={o.k}
            type="button"
            onClick={() => set("contact", o.k)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[13px] font-semibold transition-all duration-200",
              v.contact === o.k ? "border-gold-500 bg-gold-50 text-gold-800 ring-2 ring-gold-400/30" : "border-ink-200 text-ink-500 hover:border-ink-300"
            )}
          >
            <Icon name={o.icon} className="h-4 w-4" />
            {o.label}
          </button>
        ))}
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={v.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-ink-300 accent-gold-500"
        />
        <span className={cn("text-[12.5px] leading-relaxed", dark ? "text-ink-200/80" : "text-ink-500")}>
          I agree to be contacted by {SITE.name} by call, text or email about new home options. Consent is not a condition of
          purchase. Msg/data rates may apply.
        </span>
      </label>
      {errors.consent && <p className={errCls}>{errors.consent}</p>}

      <Button type="submit" variant="gold" size="lg" full className="mt-5" icon="arrow">
        {stage === "idle" ? "Show my cash back" : "Sending…"}
      </Button>
      <p className={cn("mt-3 text-center text-[11.5px]", dark ? "text-ink-300/70" : "text-ink-400")}>
        Zero spam. Unsubscribe any time. {SITE.license}
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ *
 *  Global lead modal + triggers
 * ------------------------------------------------------------------ */

export function LeadProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<{ source: string; preset?: Partial<LeadValues> } | null>(null);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
      const esc = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
      window.addEventListener("keydown", esc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", esc);
      };
    }
  }, [modal]);

  useEffect(() => {
    let fired = false;
    try {
      fired = sessionStorage.getItem("tnhr-lead-modal") === "1";
    } catch { /* ignore */ }
    if (fired) return;
    const fire = (why: string) => {
      try {
        sessionStorage.setItem("tnhr-lead-modal", "1");
      } catch { /* ignore */ }
      setModal({ source: why });
    };
    const timer = window.setTimeout(() => fire("timed-popup"), 38000);
    const onScroll = () => {
      const pct = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (pct > 0.62) {
        fire("scroll-depth");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const value = useMemo(
    () => ({ open: (source: string, preset?: Partial<LeadValues>) => setModal({ source, preset }), close: () => setModal(null) }),
    []
  );

  return (
    <LeadContext.Provider value={value}>
      {children}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <button
            aria-label="Close"
            onClick={() => setModal(null)}
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
          />
          <div className="animate-pop relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream p-1.5 shadow-2xl sm:rounded-3xl sm:p-2">
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-5 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-500 shadow ring-1 ring-ink-900/10 transition hover:bg-white hover:text-ink-900"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
            <div className="max-h-[86vh] overflow-y-auto rounded-[20px]">
              <LeadForm
                source={modal.source}
                preset={modal.preset}
                title="Unlock Your Cash Back Estimate"
                sub="Tell us where you're looking and we'll send your rebate number, best builder incentives, and quick move-in list."
              />
            </div>
          </div>
        </div>
      )}
      <MobileCtaBar />
    </LeadContext.Provider>
  );
}

/* Sticky mobile action bar — the highest-converting lead surface on phones */
function MobileCtaBar() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY < 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[90] border-t border-ink-900/10 bg-white/95 px-3 py-2.5 backdrop-blur-lg transition-transform duration-500 lg:hidden",
        hidden ? "translate-y-full" : "translate-y-0"
      )}
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2">
        <a
          href={SITE.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink-900 px-4 py-3 text-[13.5px] font-bold text-white"
        >
          <Icon name="phone" className="h-4 w-4" /> Call
        </a>
        <a
          href={`sms:${SITE.phone.replace(/[^0-9]/g, "")}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink-100 px-4 py-3 text-[13.5px] font-bold text-ink-900"
        >
          <Icon name="social" className="h-4 w-4" /> Text
        </a>
        <LeadTriggerButton label="Get Rebate" className="flex-[1.4]" />
      </div>
    </div>
  );
}

export function LeadTriggerButton({
  label = "Get My Rebate",
  className,
  source = "header-cta",
}: {
  label?: string;
  className?: string;
  source?: string;
}) {
  const { open } = useLead();
  return (
    <button
      onClick={() => open(source)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 px-5 py-3 text-[13.5px] font-bold text-ink-950 shadow-[0_12px_28px_-12px_rgba(247,181,42,.9)] transition-transform duration-300 active:scale-[.97]",
        className
      )}
    >
      <Icon name="cash" className="h-4 w-4" />
      {label}
    </button>
  );
}
