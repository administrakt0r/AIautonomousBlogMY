export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://shtefai.vercel.app'

// ⚡ Bolt: Pre-calculate the current year once at module initialization to avoid
// redundant Date object creation on every render of components like the Footer.
export const CURRENT_YEAR = new Date().getFullYear().toString()

export const SHARED_OG_IMAGE_PATH = '/images/og-image.png'
export const PUBLISHER_LOGO_PATH = '/favicon/android-chrome-512x512.png'
export const FAVICON_PATH = '/favicon/favicon.ico'
export const FAVICON_16_PATH = '/favicon/favicon-16x16.png'
export const FAVICON_32_PATH = '/favicon/favicon-32x32.png'
export const APPLE_TOUCH_ICON_PATH = '/favicon/apple-touch-icon.png'

// ⚡ Bolt: Optimized URL generation using string concatenation to avoid the overhead of 'new URL()'.
const CLEAN_SITE_URL = SITE_URL.replace(/\/$/, '')

export const getAbsoluteUrl = (path: string) => `${CLEAN_SITE_URL}/${path.replace(/^\//, '')}`

export const getPostUrl = (slug: string) => `${CLEAN_SITE_URL}/blog-detail/${slug}`
