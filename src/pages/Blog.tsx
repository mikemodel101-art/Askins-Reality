import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { Icon, Reveal, SectionHeading, Button, Pill, SmartImage, Eyebrow } from "@/components/ui";
import { Link, useRouter } from "@/lib/router";
import { BLOG_CATEGORIES, POSTS } from "@/data/listings";
import { SITE } from "@/data/content";
import { CtaSplit, PageHero } from "@/components/sections";
import { useLead } from "@/components/LeadForm";
import { Seo } from "@/components/Seo";
import { HERO_IMAGES } from "@/data/media";

const AI_TOOLS = [
  { i: "ai", t: "AI Blog Creator", d: "Drafts from live MLS changes + market data, then a licensed advisor reviews before publish." },
  { i: "chip", t: "AI Page Builder", d: "New city, builder and community pages generated with schema and internal links in seconds." },
  { i: "feed", t: "Auto social push", d: "Each post publishes to Facebook, Instagram, LinkedIn and X with UTM-tagged links." },
  { i: "target", t: "SEO autopilot", d: "Titles, meta, canonicals and sitemap regenerate on every content update." },
];

export function Blog() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const posts = useMemo(
    () =>
      POSTS.filter((p) => {
        if (cat !== "All" && p.category !== cat) return false;
        if (q && !`${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [cat, q]
  );
  const [featured, ...rest] = posts;

  return (
    <>
      <Seo path="/blog" />
      <PageHero
        eyebrow="Blog"
        title={<>Texas new-construction intel, published weekly</>}
        sub="Market reports, incentive breakdowns, financing strategy and buyer checklists — written by advisors, accelerated by our AI content pipeline."
        image={HERO_IMAGES.houston}
      />

      <section className="bg-cream py-12 lg:py-16">
        <div className="container-x">
          {/* controls */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="hide-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {BLOG_CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300",
                    cat === c ? "border-ink-900 bg-ink-900 text-white" : "border-ink-200 text-ink-600 hover:border-ink-400"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 ring-1 ring-ink-900/[.07] lg:w-80">
              <Icon name="search" className="h-4 w-4 shrink-0 text-ink-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="w-full bg-transparent text-[14px] text-ink-900 placeholder:text-ink-400 focus:outline-none"
              />
            </div>
          </div>

          {/* featured */}
          {featured && (
            <Reveal className="mt-8">
              <Link
                to={`/blog/${featured.slug}`}
                className="card-hover group grid overflow-hidden rounded-3xl bg-white ring-1 ring-ink-900/[.07] lg:grid-cols-2"
              >
                <div className="relative">
                  <SmartImage src={featured.image} alt={featured.title} ratio="aspect-[16/11] lg:aspect-auto lg:h-full" imgClassName="group-hover:scale-[1.05]" />
                  <span className="absolute top-4 left-4 rounded-full bg-gold-600 px-3 py-1 text-[11px] font-extrabold tracking-wide text-white uppercase">
                    Featured · {featured.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-9">
                  <p className="text-[12.5px] text-ink-400">{featured.date} · {featured.read} min read · {featured.author}</p>
                  <h2 className="mt-3 font-display text-2xl leading-snug font-semibold text-ink-900 transition-colors group-hover:text-gold-700 sm:text-[2rem]">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{featured.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {featured.tags.map((t) => (
                      <span key={t} className="rounded-full bg-cream px-2.5 py-1 text-[11.5px] font-semibold text-ink-600">#{t}</span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-gold-700">
                    Read the article <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* grid */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Link to={`/blog/${p.slug}`} className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-900/[.07]">
                  <div className="relative">
                    <SmartImage src={p.image} alt={p.title} ratio="aspect-[16/10]" imgClassName="group-hover:scale-[1.07]" />
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-ink-900">{p.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[12px] text-ink-400">{p.date} · {p.read} min</p>
                    <h3 className="mt-2 font-display text-[18.5px] leading-snug font-semibold text-ink-900 transition-colors group-hover:text-gold-700">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-ink-600">{p.excerpt}</p>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-gold-700">
                      Read more <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="mt-8 rounded-3xl bg-white p-10 text-center ring-1 ring-ink-900/[.07]">
              <h3 className="font-display text-2xl font-semibold text-ink-900">No articles found</h3>
              <p className="mt-2 text-[14.5px] text-ink-600">Try a different category or search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* ai pipeline */}
      <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-20">
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <Eyebrow className="border-white/25 bg-white/10 text-gold-200">Why we publish so often</Eyebrow>
              <h2 className="mt-5 font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
                Builder incentives change weekly. Our content keeps up.
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-200/85">
                A four-person brokerage can't out-write a newsroom — but a tight AI pipeline plus licensed review can. Every
                article starts from real feed changes and real contracts, then gets a human read before it ships.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button to="/contact" size="lg" icon="arrow">Subscribe to the brief</Button>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {AI_TOOLS.map((t, i) => (
                <Reveal key={t.t} delay={i * 80}>
                  <div className="h-full rounded-2xl bg-white/[.05] p-5 ring-1 ring-white/10">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint-500/15 text-mint-400">
                      <Icon name={t.i} className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="mt-4 text-[15.5px] font-bold text-white">{t.t}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-300/85">{t.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSplit
        title="Reading about it? Let's price your actual rebate."
        sub="One form, one advisor, one number. Then you can keep researching with real data instead of national averages."
        bullets={[
          "Rebate estimate in one business day",
          "Builder incentive comparison",
          "Quick move-in shortlist",
          "No cost, no obligation",
        ]}
        image={HERO_IMAGES.home}
        source="blog-footer"
        flip
      />
    </>
  );
}

/* ------------------------------------------------------------------ *
 *  Single post
 * ------------------------------------------------------------------ */

export function BlogPost({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const { open } = useLead();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="bg-cream pt-40 pb-24">
        <div className="container-x text-center">
          <h1 className="font-display text-4xl font-semibold text-ink-900">Article not found</h1>
          <Button to="/blog" className="mt-6" icon="arrow">Back to the blog</Button>
        </div>
      </section>
    );
  }

  const related = POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  const fallback = POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        path={`/blog/${post.slug}`}
        title={`${post.title} | Texas New Home Rebates`}
        description={post.excerpt}
        keywords={post.tags.join(", ") + ", texas new construction"}
        image={post.image}
        jsonLd={{
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
          publisher: { "@type": "Organization", name: SITE.name },
        }}
      />

      <section className="relative overflow-hidden bg-ink-950 pt-28 pb-14 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0">
          <SmartImage src={post.image} alt="" ratio="h-full" eager className="absolute inset-0 h-full" imgClassName="animate-pan" />
          <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/92 to-ink-950/65" />
        </div>
        <div className="container-x relative max-w-3xl">
          <Reveal>
            <button onClick={() => navigate("/blog")} className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-300 transition-colors hover:text-gold-300">
              <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" /> All articles
            </button>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Pill className="border-gold-400/30 bg-gold-400/15 text-gold-200 ring-gold-400/30">{post.category}</Pill>
              <Pill className="border-white/15 bg-white/10 text-white ring-white/20">{post.read} min read</Pill>
              <Pill className="border-white/15 bg-white/10 text-white ring-white/20">{post.date}</Pill>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-5 text-3xl leading-[1.08] font-semibold text-balance text-white sm:text-4xl lg:text-[3.1rem]">{post.title}</h1>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-400 font-display text-[16px] font-bold text-ink-950">
                {post.author.split(" ").map((n) => n[0]).join("")}
              </span>
              <div>
                <p className="text-[14px] font-bold text-white">{post.author}</p>
                <p className="text-[12.5px] text-ink-300">Licensed TX advisor · {SITE.name}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="max-w-3xl">
            <Reveal>
              <p className="border-l-4 border-gold-400 pl-5 font-display text-xl leading-relaxed text-ink-800 sm:text-[22px]">
                {post.excerpt}
              </p>
            </Reveal>
            <div className="mt-8 space-y-5">
              {post.body.map((para, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className="text-[16px] leading-[1.85] text-ink-700">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10">
              <div className="rounded-3xl bg-ink-950 p-7">
                <p className="text-[11px] font-bold tracking-[.16em] text-gold-300 uppercase">Talk to an advisor</p>
                <p className="mt-3 font-display text-2xl leading-snug font-semibold text-white">
                  Want these numbers run against your target community?
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button onClick={() => open(`blog-${post.slug}`)} icon="arrow">Get my rebate estimate</Button>
                  <Button href={SITE.phoneHref} variant="light" icon="phone">{SITE.phone}</Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-bold tracking-[.14em] text-ink-400 uppercase">Tagged</span>
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-ink-600 ring-1 ring-ink-900/[.07]">
                  #{t}
                </span>
              ))}
            </Reveal>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-900/[.07]">
              <p className="text-[11px] font-bold tracking-[.16em] text-gold-700 uppercase">Weekly brief</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">
                Incentive changes, price drops and new phase releases — every Thursday, one email.
              </p>
              <Button onClick={() => open("blog-sidebar")} className="mt-4" full size="sm" icon="arrow">
                Subscribe
              </Button>
            </div>
            <div className="overflow-hidden rounded-3xl ring-1 ring-ink-900/[.07]">
              <SmartImage src={HERO_IMAGES.kitchen} alt="New construction kitchen" ratio="aspect-[4/3]" />
              <div className="bg-white p-5">
                <p className="text-[14.5px] font-bold text-ink-900">Most-read this month</p>
                <ul className="mt-3 space-y-2.5">
                  {fallback.map((p) => (
                    <li key={p.slug}>
                      <Link to={`/blog/${p.slug}`} className="text-[13.5px] leading-snug text-ink-600 transition-colors hover:text-gold-700">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Keep reading" title={<>Related articles</>} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(related.length ? related : fallback).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link to={`/blog/${p.slug}`} className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl bg-cream ring-1 ring-ink-900/[.07]">
                  <SmartImage src={p.image} alt={p.title} ratio="aspect-[16/10]" imgClassName="group-hover:scale-[1.06]" />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[12px] text-ink-400">{p.category} · {p.read} min</p>
                    <h3 className="mt-2 font-display text-[18px] leading-snug font-semibold text-ink-900 transition-colors group-hover:text-gold-700">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
