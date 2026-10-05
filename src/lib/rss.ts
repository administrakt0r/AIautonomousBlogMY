import fs from 'node:fs/promises'
import path from 'node:path'

import { marked } from 'marked'

import { type BlogPost, sortedBlogPosts } from '../assets/data/blog-posts.ts'
import { SITE_URL, getPostUrl } from './site.ts'

export const stripMdxBoilerplate = (source: string): string =>
  source
    .replace(/^---[\s\S]*?---\s*/u, '')
    .replace(/^\s*import\s.+$/gmu, '')
    .replace(/^\s*export\s.+$/gmu, '')
    .trim()

export const toCdata = (value: string): string =>
  `<![CDATA[${value.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`

export const toRssDate = (value: string | number | Date): string =>
  new Date(value).toUTCString()

export type GetPostHtmlOptions = {
  contentDir?: string
  fileReader?: (filePath: string) => Promise<string>
}

export const getPostHtml = async (
  post: Pick<BlogPost, 'slug' | 'description'>,
  options: GetPostHtmlOptions = {}
): Promise<string> => {
  const contentDir = options.contentDir ?? path.resolve(process.cwd(), 'src', 'content')
  const fileReader = options.fileReader ?? ((p: string) => fs.readFile(p, 'utf8'))
  const filePath = path.join(contentDir, `${post.slug}.mdx`)

  try {
    const fileContent = await fileReader(filePath)
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

export type GenerateRssXmlOptions = {
  siteUrl?: string
  contentDir?: string
  fileReader?: (filePath: string) => Promise<string>
  buildDate?: Date
}

export const generateRssXml = async (
  posts: BlogPost[] = sortedBlogPosts.slice(0, 10),
  options: GenerateRssXmlOptions = {}
): Promise<string> => {
  const siteUrl = options.siteUrl ?? SITE_URL
  const buildDate = options.buildDate ?? new Date()

  const itemsXml = await Promise.all(
    posts.map(async (post) => {
      const postUrl = getPostUrl(post.slug, siteUrl)

      const contentHtml = await getPostHtml(post, {
        contentDir: options.contentDir,
        fileReader: options.fileReader,
      })

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

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>ShtefAI Blog</title>',
    `    <link>${siteUrl}</link>`,
    '    <description>Your Daily AI Intelligence Source</description>',
    '    <language>en</language>',
    `    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${new URL('/rss.xml', siteUrl).toString()}" rel="self" type="application/rss+xml"/>`,
    itemsXml.join('\n'),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}
