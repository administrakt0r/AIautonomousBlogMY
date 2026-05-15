// ⚡ Bolt: Centralized regex cache to avoid redundant RegExp instantiation across components.
const regexCache = new Map<string, RegExp>()

// ⚡ Bolt: Hoist the escape regex to avoid redundant object creation.
const ESCAPE_REGEX = /[.*+?^${}()|[\]\\]/g

/**
 * ⚡ Bolt: Get a cached, case-insensitive, global RegExp for a given search query.
 * Escapes special characters to ensure safe search across titles and descriptions.
 */
export const getSearchRegex = (query: string): RegExp | null => {
  if (!query) return null

  let regex = regexCache.get(query)

  if (!regex) {
    const escapedQuery = query.replace(ESCAPE_REGEX, '\\$&')

    // ⚡ Bolt: Use 'i' for case-insensitive matching. We omit 'g' because
    // when using .test() on a shared regex instance, 'g' would cause it to
    // track lastIndex, leading to incorrect results on subsequent matches.
    // .split() ignores the 'g' flag anyway.
    regex = new RegExp(`(${escapedQuery})`, 'i')
    regexCache.set(query, regex)
  }

  return regex
}
