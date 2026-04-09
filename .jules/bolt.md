# Bolt's Journal - Critical Learnings Only

## 2026-03-30 - Server Component Hooks Error
**Learning:** Attempting to use Client Component hooks like `useMemo` in Next.js Server Components causes build errors.
**Action:** Move expensive data processing (sorting, slicing) outside the component function or pre-process data at the source for Server Components.

## 2026-04-07 - JSON-LD Pre-calculation
**Learning:** In static or data-driven sites, stringifying large JSON-LD objects on every request in Server Components adds unnecessary CPU overhead.
**Action:** Pre-calculate, stringify, and escape JSON-LD data in the data layer or module scope to serve a ready-to-inject string.

## 2026-04-07 - Throttling Layout-Sensitive UI
**Learning:** High-frequency events like 'scroll' that trigger DOM state changes (like progress bars) can cause layout thrashing and high CPU usage.
**Action:** Use requestAnimationFrame to throttle state updates and ensure they align with the browser's paint cycle.

## 2026-04-08 - Redundant Layout Reads
**Learning:** Reading properties like `scrollHeight` or `clientHeight` in every scroll frame causes the browser to perform synchronous reflows if the layout is dirty.
**Action:** Cache these layout-dependent values and only re-calculate them on window `resize` or component mount.

## 2026-04-09 - Memoization Prop granularity
**Learning:** Passing high-frequency state (like `activeSection` from a scroll listener) directly to list items negates memoization if every item re-compares the value internally.
**Action:** Lift the comparison logic to the parent loop and pass a primitive `isActive` boolean to memoized sub-components. This ensures only items whose active status actually changes will re-render.

## 2026-04-09 - Avoid Committing Build Artifacts and Logs
**Learning:** Running generation scripts (like `pnpm generate:derived`) can produce massive diffs in build artifacts (like `public/rss.xml`) or temporary logs (like `dev_server.log`) that shouldn't be committed.
**Action:** Always verify `git status` before submission and revert changes to artifacts unless they are specifically part of the task.
