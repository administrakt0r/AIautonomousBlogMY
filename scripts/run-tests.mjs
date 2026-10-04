import { readdirSync } from 'node:fs'
import { join } from 'node:path'

import jiti from 'jiti'

const j = jiti(import.meta.url, { jsx: true })

const testDir = join(process.cwd(), 'tests')
const files = readdirSync(testDir).filter(f => f.endsWith('.test.ts') || f.endsWith('.test.tsx'))

for (const file of files) {
  const filePath = join(testDir, file)

  await j.import(filePath)
}
