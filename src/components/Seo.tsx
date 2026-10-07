import { useEffect } from "react";
import { SEO_MAP } from "@/data/content";

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export type SeoInput = {
  title?: string;
  description?: string;
  keywords?: string;
  path: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
};

/**
 * Automated SEO: every route declares (or inherits) metadata, canonical tags,
 * Open Graph + Twitter cards, and JSON-LD structured data — generated from the
 * same source that renders the page, so content and metadata never drift.
 */
export function Seo({ title, description, keywords, path, image, jsonLd }: SeoInput) {
  const jsonKey = JSON.stringify(jsonLd ?? null);
  useEffect(() => {
    const base = SEO_MAP[path] ?? SEO_MAP["/"];
    const finalTitle = title ?? base.title;
    const finalDesc = description ?? base.description;
    const finalKeywords = keywords ?? base.keywords;
    const finalImage = image ?? "https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg?auto=compress&cs=tinysrgb&w=1200";
    const canonical = `https://www.texasnewhomerebates.com${path === "/" ? "/" : path}`;

    document.title = finalTitle;
    upsertMeta('meta[name="description"]', { name: "description", content: finalDesc });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: finalKeywords });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: finalTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: finalDesc });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: finalImage });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: finalTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: finalDesc });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: finalImage });
    upsertLink("canonical", canonical);

    const crumbs = path.split("/").filter(Boolean);
    const graph: Record<string, unknown>[] = [
      {
        "@type": base.schema,
        name: finalTitle,
        description: finalDesc,
        url: canonical,
        ...(path === "/" ? { potentialAction: { "@type": "SearchAction", target: "https://www.texasnewhomerebates.com/#/new-homes", "query-input": "required name=query" } } : {}),
      },
    ];
    if (crumbs.length) {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.texasnewhomerebates.com/" },
          ...crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: c.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
            item: `https://www.texasnewhomerebates.com/#/${crumbs.slice(0, i + 1).join("/")}`,
          })),
        ],
      });
    }
    if (jsonLd) graph.push(jsonLd);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoRoute = path;
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, keywords, path, image, jsonKey]);

  return null;
}
