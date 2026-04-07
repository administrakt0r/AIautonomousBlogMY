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

## 2026-03-31 - Semantic Link-Button Nesting
**Learning:** Wrapping a `<button>` inside an `<a>` tag (often via `Link`) is invalid HTML and causes React hydration warnings. The correct pattern for shadcn/Radix components is to use `asChild` on the UI component (e.g., `<Button asChild>`) and wrap the `<Link>`.
**Action:** Always use `asChild` on `Button` when it wraps a `Link` to maintain semantic integrity and prevent console errors.

## 2026-03-31 - Contextual Navigation Tooltips
**Learning:** Generic "Previous" and "Next" navigation links can be ambiguous. Adding `Tooltip` components that display the specific title of the destination post provides immediate clarity and delight for users before they commit to a click.
**Action:** Enhance directional navigation with contextual tooltips showing the target content's title.

## 2026-04-05 - Shareable Filter States via URL Hash
**Learning:** For single-page archive views with tabs or filters, keeping the UI state isolated to React memory makes filtered views unshareable and breaks browser navigation expectations. Synchronizing filtering state with the URL hash (e.g., `#category-Topic`) enables deep linking and a more robust user experience.
**Action:** Always sync significant UI filter states with URL fragments or query parameters to support shareability and browser history.

## 2026-04-05 - Inline Action Feedback
**Learning:** Simple utility actions like "Copy Link" provide a high ROI for user sharing but require immediate, unambiguous feedback. Combining icon state changes (e.g., Link to Check) with a persistent "Copied!" tooltip ensures users feel confident the action was successful without intrusive alerts.
**Action:** Provide dual visual feedback (icon + tooltip/toast) for non-obvious background actions like clipboard copying.

## 2026-04-07 - Accessible Async Form Feedback
**Learning:** Newsletter or contact forms often lack semantic clarity and visual confirmation. Providing a hidden `Label` (`sr-only`) for all inputs, a clear loading state (e.g., `Loader2Icon`), and a success message within an `aria-live="polite"` container ensures both sighted and screen-reader users understand the form's status.
**Action:** Always pair interactive forms with accessible labels, visual loading indicators, and ARIA-announced success states to eliminate user uncertainty during async operations.
