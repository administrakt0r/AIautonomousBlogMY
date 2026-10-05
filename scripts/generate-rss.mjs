import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { generateRssXml } from '../src/lib/rss.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outputPath = path.join(repoRoot, 'public', 'rss.xml')

const rssXml = await generateRssXml()

await fs.writeFile(outputPath, rssXml, 'utf8')
