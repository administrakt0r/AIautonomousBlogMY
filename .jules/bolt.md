# Bolt's Journal - Critical Learnings Only

## 2026-03-30 - Server Component Hooks Error
**Learning:** Attempting to use Client Component hooks like `useMemo` in Next.js Server Components causes build errors.
**Action:** Move expensive data processing (sorting, slicing) outside the component function or pre-process data at the source for Server Components.
