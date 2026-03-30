## 2026-03-28 - Sticky Header Needs a Skip Route
**Learning:** This app uses a shared sticky header across content-heavy pages, so keyboard users need a fast path past repeated navigation and into the article or archive body.
**Action:** Keep a global skip link wired to the shared `<main>` landmark in the pages layout whenever navigation stays persistent across routes.

## 2026-03-28 - Search Needs Persistent Context
**Learning:** The homepage archive relies on search and filters, and placeholder-only inputs are too fragile once users start navigating with assistive tech or revisit the control after changing filters.
**Action:** Pair searchable archives with a persistent label and a live results summary so users always know what the field does and what changed.

## 2026-03-29 - Form Feedback and Icon Accessibility
**Learning:** High-touch interactive components like contact forms and social links often lack immediate visual feedback for async actions or sufficient context for screen readers. Using `required` attributes and visual indicators (`*`) is essential for clear form expectations, and icon-only buttons need `aria-label` or `Tooltip` wrappers to be usable by everyone.
**Action:** Always include loading and success states for async forms to prevent user frustration. Use `Tooltip` for action icons and `aria-label` for navigation icons to ensure accessibility without cluttering the UI.

## 2026-03-30 - Stretched Link Pattern for Cards
**Learning:** Using `onClick` on `div` elements for navigation breaks accessibility (no real link) and SEO. The "stretched link" pattern (Link inside title with `after:absolute after:inset-0`) provides a better experience while allowing nested interactive elements (like category badges) to remain clickable via `z-index` adjustments.
**Action:** Use real `Link` components for card navigation. Wrap the title in the link and use pseudo-elements to expand the hit area. Set `relative z-10` on any nested interactive elements.
