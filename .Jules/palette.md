## 2025-05-14 - [Breadcrumb State Synchronization]
**Learning:** In Client Components that manage complex filtering state (like the Blog listing), breadcrumbs that point to the parent page should not just be passive links. Navigating "up" to the listing page via a breadcrumb is often an intent to "start over," and failing to reset filter/search states can leave the user in a confusing, narrow view.
**Action:** Always wrap breadcrumb navigation in state-reset logic when the target is a filtered list managed by the same or a parent component.

## 2025-05-14 - [Accessible Async Form Feedback]
**Learning:** Visual spinners for async operations (like "Sending...") are invisible to screen readers unless explicitly announced. Using aria-live="polite" on the status container ensures that the state change is communicated without interrupting the user's flow.
**Action:** Wrap loading/status indicators in aria-live="polite" regions in all submission forms.

## 2026-04-12 - [Keyboard Shortcuts for Primary Actions]
**Learning:** Adding a keyboard shortcut (like `/`) to focus the primary search input on a content-heavy page (like a blog listing) significantly improves efficiency for power users. However, it's crucial to provide a visual hint (like a `<kbd>` element) so the feature is discoverable, and to ensure the shortcut listener ignores events when the user is already focused on an input to avoid unexpected behavior.
**Action:** When adding search shortcuts, include a discoverable visual hint and use input-aware guards in the event listener.
