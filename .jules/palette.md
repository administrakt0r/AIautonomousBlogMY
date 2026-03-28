## 2026-03-28 - Sticky Header Needs a Skip Route
**Learning:** This app uses a shared sticky header across content-heavy pages, so keyboard users need a fast path past repeated navigation and into the article or archive body.
**Action:** Keep a global skip link wired to the shared `<main>` landmark in the pages layout whenever navigation stays persistent across routes.

## 2026-03-28 - Search Needs Persistent Context
**Learning:** The homepage archive relies on search and filters, and placeholder-only inputs are too fragile once users start navigating with assistive tech or revisit the control after changing filters.
**Action:** Pair searchable archives with a persistent label and a live results summary so users always know what the field does and what changed.
