import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { marked } from 'marked'

import { blogPosts } from '../src/assets/data/blog-posts.ts'
import { SITE_URL, getPostUrl } from '../src/lib/site.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const contentDir = path.join(repoRoot, 'src', 'content')
const outputPath = path.join(repoRoot, 'public', 'rss.xml')

const stripMdxBoilerplate = (source) =>
  source
    .replace(/^---[\s\S]*?---\s*/u, '')
    .replace(/^\s*import\s.+$/gmu, '')
    .replace(/^\s*export\s.+$/gmu, '')
    .trim()

const toCdata = (value) => `<![CDATA[${value.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`

const toRssDate = (value) => new Date(value).toUTCString()

const getPostHtml = async (post) => {
  const filePath = path.join(contentDir, `${post.slug}.mdx`)

  try {
    const fileContent = await fs.readFile(filePath, 'utf8')
    const mdxContent = stripMdxBoilerplate(fileContent)

    if (!mdxContent) {
      return `<p>${post.description}</p>`
    }

    return await marked.parse(mdxContent)
  } catch (error) {
    console.error(`Failed to generate RSS content for ${post.slug}`, error)

    return `<p>${post.description}</p>`
  }
}

const latestPosts = [...blogPosts]
  .sort((left, right) => {
    const publishedAtDiff = new Date(right.date).getTime() - new Date(left.date).getTime()

    return publishedAtDiff !== 0 ? publishedAtDiff : right.id - left.id
  })
  .slice(0, 10)

const itemsXml = await Promise.all(
  latestPosts.map(async (post) => {
    const postUrl = getPostUrl(post.slug)
    const contentHtml = await getPostHtml(post)

    return [
      '    <item>',
      `      <title>${toCdata(post.title)}</title>`,
      `      <link>${postUrl}</link>`,
      `      <guid isPermaLink="true">${postUrl}</guid>`,
      `      <pubDate>${toRssDate(post.date)}</pubDate>`,
      `      <description>${toCdata(post.description)}</description>`,
      `      <content:encoded>${toCdata(contentHtml)}</content:encoded>`,
      `      <author>${toCdata(post.author)}</author>`,
      `      <category>${toCdata(post.category)}</category>`,
      '    </item>',
    ].join('\n')
  })
)

const rssXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">',
  '  <channel>',
  '    <title>ShtefAI Blog</title>',
  `    <link>${SITE_URL}</link>`,
  '    <description>Your Daily AI Intelligence Source</description>',
  '    <language>en</language>',
  `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  `    <atom:link href="${new URL('/rss.xml', SITE_URL).toString()}" rel="self" type="application/rss+xml"/>`,
  itemsXml.join('\n'),
  '  </channel>',
  '</rss>',
  '',
].join('\n')

await fs.writeFile(outputPath, rssXml, 'utf8')
