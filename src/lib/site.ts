export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://shtefai.vercel.app'

export const SHARED_OG_IMAGE_PATH = '/images/og-image.png'
export const PUBLISHER_LOGO_PATH = '/favicon/android-chrome-512x512.png'
export const FAVICON_PATH = '/favicon/favicon.ico'
export const FAVICON_16_PATH = '/favicon/favicon-16x16.png'
export const FAVICON_32_PATH = '/favicon/favicon-32x32.png'
export const APPLE_TOUCH_ICON_PATH = '/favicon/apple-touch-icon.png'

export const getAbsoluteUrl = (path: string) => new URL(path, SITE_URL).toString()

export const getPostUrl = (slug: string) => getAbsoluteUrl(`/blog-detail/${slug}`)
