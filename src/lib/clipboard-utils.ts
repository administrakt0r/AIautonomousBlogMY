/**
 * Utility to copy text to clipboard with error handling.
 * Returns true if copy succeeded, false otherwise.
 */
export async function copyTextToClipboard(
  text: string,
  errorMessagePrefix = 'Failed to copy: '
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)

    return true
  } catch (err) {
    console.error(errorMessagePrefix, err)

    return false
  }
}
