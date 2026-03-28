import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

import { blogPosts } from '../src/assets/data/blog-posts.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const publicDir = path.join(repoRoot, 'public')
const outputDir = path.join(publicDir, 'images', 'posts')
const logoPath = path.join(publicDir, 'shteflogo.svg')

const presets = [
  {
    backgroundStart: '#1e1e2f',
    backgroundEnd: '#3a0ca3',
    accent: '#ccff00',
    glowOne: 'rgba(204, 255, 0, 0.16)',
    glowTwo: 'rgba(147, 51, 234, 0.22)',
  },
  {
    backgroundStart: '#0f172a',
    backgroundEnd: '#059669',
    accent: '#9ef7d6',
    glowOne: 'rgba(16, 185, 129, 0.18)',
    glowTwo: 'rgba(110, 231, 183, 0.2)',
  },
  {
    backgroundStart: '#171717',
    backgroundEnd: '#b91c1c',
    accent: '#fca5a5',
    glowOne: 'rgba(248, 113, 113, 0.18)',
    glowTwo: 'rgba(239, 68, 68, 0.2)',
  },
  {
    backgroundStart: '#1e1b4b',
    backgroundEnd: '#be185d',
    accent: '#f9a8d4',
    glowOne: 'rgba(244, 114, 182, 0.16)',
    glowTwo: 'rgba(192, 132, 252, 0.18)',
  },
  {
    backgroundStart: '#2e1065',
    backgroundEnd: '#c2410c',
    accent: '#fdba74',
    glowOne: 'rgba(251, 146, 60, 0.18)',
    glowTwo: 'rgba(216, 180, 254, 0.18)',
  },
]

const hashString = (value) => {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash)
  }

  return Math.abs(hash)
}

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const wrapTitle = (title) => {
  const words = title.split(/\s+/u)
  const maxCharsPerLine = title.length > 95 ? 20 : title.length > 72 ? 23 : 26
  const lines = []
  let currentLine = ''

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word

    if (nextLine.length <= maxCharsPerLine || currentLine.length === 0) {
      currentLine = nextLine
      continue
    }

    lines.push(currentLine)
    currentLine = word
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  if (lines.length <= 4) {
    return lines
  }

  const compactedLines = [...lines.slice(0, 3)]

  compactedLines.push(lines.slice(3).join(' '))

  return compactedLines
}

const getFontSize = (lineCount, longestLineLength) => {
  if (lineCount >= 4 || longestLineLength > 28) return 54
  if (lineCount === 3 || longestLineLength > 24) return 62

  return 72
}

const getTitleLinesSvg = (title) => {
  const lines = wrapTitle(title)
  const longestLineLength = Math.max(...lines.map(line => line.length))
  const fontSize = getFontSize(lines.length, longestLineLength)
  const lineHeight = Math.round(fontSize * 1.18)
  const firstLineY = 282 - ((lines.length - 1) * lineHeight) / 2

  return lines
    .map(
      (line, index) => `
        <text
          x="600"
          y="${firstLineY + index * lineHeight}"
          text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif"
          font-size="${fontSize}"
          font-weight="800"
          fill="#ffffff"
          letter-spacing="-1.2"
        >${escapeXml(line)}</text>`
    )
    .join('')
}

const getOgSvg = ({ category, title, logoDataUri, preset }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-gradient" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${preset.backgroundStart}" />
      <stop offset="100%" stop-color="${preset.backgroundEnd}" />
    </linearGradient>
    <filter id="blur-64" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="64" />
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg-gradient)" />
  <circle cx="160" cy="120" r="180" fill="${preset.glowOne}" filter="url(#blur-64)" />
  <circle cx="1010" cy="520" r="220" fill="${preset.glowTwo}" filter="url(#blur-64)" />
  <rect x="330" y="68" width="540" height="70" rx="35" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.20)" />
  <image href="${logoDataUri}" x="364" y="86" width="34" height="34" />
  <text x="425" y="110" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="${preset.accent}">
    ShtefAI blog
  </text>
  <text x="600" y="166" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="rgba(255,255,255,0.78)" letter-spacing="3.2">
    ${escapeXml(category.toUpperCase())}
  </text>
  ${getTitleLinesSvg(title)}
  <line x1="90" y1="538" x2="1110" y2="538" stroke="rgba(255,255,255,0.18)" />
  <text x="90" y="580" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="500" fill="rgba(255,255,255,0.66)">
    shtefai.vercel.app
  </text>
  <text x="1110" y="580" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="500" fill="rgba(255,255,255,0.66)">
    Written by Shtef
  </text>
</svg>`

const ensureOutputDirectory = async () => {
  await fs.mkdir(outputDir, { recursive: true })
}

const removeStaleImages = async () => {
  const currentFiles = await fs.readdir(outputDir)
  const validFiles = new Set(blogPosts.map(post => `${post.slug}.png`))

  await Promise.all(
    currentFiles
      .filter(fileName => fileName.endsWith('.png') && !validFiles.has(fileName))
      .map(fileName => fs.unlink(path.join(outputDir, fileName)))
  )
}

const generatePostImages = async () => {
  await ensureOutputDirectory()

  const logoSvg = await fs.readFile(logoPath, 'utf8')
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`

  await Promise.all(
    blogPosts.map(async (post) => {
      const preset = presets[hashString(post.title) % presets.length]

      const svg = getOgSvg({
        category: post.category,
        title: post.title,
        logoDataUri,
        preset,
      })

      await sharp(Buffer.from(svg))
        .png()
        .toFile(path.join(outputDir, `${post.slug}.png`))
    })
  )

  await removeStaleImages()
}

await generatePostImages()
