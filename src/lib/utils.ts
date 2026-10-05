import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * ⚡ Bolt: Fast single-pass initial extraction without intermediate array allocations.
 */
export function getInitials(name: string): string {
  if (!name) return ''
  let initials = ''
  let inWord = false

  for (let i = 0; i < name.length; i++) {
    const code = name.charCodeAt(i)

    if (code > 32) {
      if (!inWord) {
        initials += name[i].toUpperCase()
        inWord = true
      }
    } else {
      inWord = false
    }
  }

  return initials
}
