import { blogPosts } from '@/assets/data/blog-posts';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export async function GET() {
  const latestPosts = blogPosts.slice(0, 10);
  
  const itemsXml = await Promise.all(latestPosts.map(async (post) => {
    let contentHtml = '';
    
    try {
      const filePath = path.join(process.cwd(), 'src', 'content', `${post.slug}.mdx`);
      
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Strip out frontmatter if any (though these MDX files might not use frontmatter, let's be safe)
        const contentWithoutFrontmatter = fileContent.replace(/---[\s\S]*?---/, '');
        
        // Parse markdown to HTML
        contentHtml = await marked.parse(contentWithoutFrontmatter);
      }
    } catch (e) {
      console.error(`Failed to read content for ${post.slug}`, e);
      contentHtml = `<p>${post.description}</p>`;
    }

    const postUrl = `https://shtefai.vercel.app/blog/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();

    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${postUrl}</link>
        <guid isPermaLink="true">${postUrl}</guid>
        <pubDate>${pubDate}</pubDate>
        <description><![CDATA[${post.description}]]></description>
        <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
        <author><![CDATA[${post.author}]]></author>
        <category><![CDATA[${post.category}]]></category>
      </item>
    `;
  }));

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>ShtefAI Blog</title>
        <link>https://shtefai.vercel.app/blog</link>
        <description>Your Daily AI Intelligence Source</description>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="https://shtefai.vercel.app/rss.xml" rel="self" type="application/rss+xml"/>
        ${itemsXml.join('')}
      </channel>
    </rss>`;

  return new NextResponse(rssXml.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
