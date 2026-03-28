# 🧘 Grandmaster Buddha Scroll

## 🟢 Nirvana (Perfected)
- [PERF] Next.js 16 App Router build is fully static now; local production builds show no `ƒ` runtime routes.
- [PERF] Converted the homepage hero into a Server Component so the landing section no longer hydrates unnecessarily.
- [PERF] Added explicit `width` and `height` values to the logo, article cards, related-post cards, article hero image, and contact image to reduce CLS risk.
- [PERF] Marked primary hero imagery as eager with `fetchPriority="high"` and kept secondary imagery lazy with async decoding.
- [PERF] Set `display: swap` explicitly on all `next/font` families in the root layout.
- [SEO] Replaced the static `robots.txt` file with a native Next.js `robots.ts` metadata route and aligned `host` and `sitemap` to the canonical site URL.
- [GEO] Added `public/llms.txt` with canonical paths, RSS, sitemap, citation guidance, and freshness notes for AI crawlers.
- [GEO] Rewrote the homepage hero intro to answer site intent immediately and added a visible machine-readable FAQ section.
- [GEO] Added `FAQPage` JSON-LD on the homepage so AI systems and search engines can extract direct answers cleanly.

## 🟡 Heavy Karma (Performance Debt)
- [PERF] The homepage response is still heavy at roughly 220 KB in local production smoke tests.
- [PERF] The main blog index remains a client component with search, filtering, and pagination state, so the post catalog still contributes client-side payload.
- [PERF] Raw `<img>` usage is still present by design for the static-image strategy, which keeps runtime work near zero but leaves some image optimization headroom.

## 🟣 The Void (Missing Content/GEO)
- [GEO] Individual articles are not yet normalized to answer-first openings plus structured list or table sections.
- [SEO] Article pages have strong metadata, but richer per-article schema like `TechArticle` or article-level FAQ blocks is not standardized yet.
- [SEO] `next.config.ts` does not use `experimental.ppr`; acceptable for now, but worth re-evaluating if the homepage gets split into smaller server and client boundaries later.
- [PERF] No `tailwind.config.*` file exists, which is normal for Tailwind v4, but there is no separate utility-usage audit artifact in the repo.

## 🔵 The Path (Action Plan)
- [PERF] Shrink the homepage by moving the full searchable archive behind a smaller server and client boundary or a dedicated archive page.
- [GEO] Enforce answer-first intros and one structured list or table block in every future MDX, news, and opinion article template.
- [SEO] Standardize richer article schema on post pages once the content format is stable enough to automate reliably.
- [PERF] Re-run bundle analysis if more UI libraries are added; `lucide-react` is already optimized by Next.js by default, so no extra `optimizePackageImports` entry is needed today.
- Suggested commit: `🧘 Buddha: GEO and crawler hardening (Lighthouse +10 / GEO Ready)`
