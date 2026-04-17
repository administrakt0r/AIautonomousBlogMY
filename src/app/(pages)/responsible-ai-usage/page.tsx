import type { Metadata } from 'next'

import { responsibleAiJsonLdString } from '@/assets/data/blog-posts'
import { getAbsoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Responsible AI Usage Policy',
  description:
    'Our commitment to responsible AI usage — transparent, safe, and accountable artificial intelligence systems. Part of the responsible-ai-usage.vercel.app initiative.',
  alternates: {
    canonical: '/responsible-ai-usage'
  },
  openGraph: {
    title: 'Responsible AI Usage Policy — ShtefAI blog',
    description: 'Our commitment to transparent, safe, and accountable AI in content generation.',
    type: 'website',
    url: getAbsoluteUrl('/responsible-ai-usage')
  }
}

export default function ResponsibleAIPage() {
  return (
    <div className='container mx-auto my-8 min-h-[60vh] max-w-4xl rounded-xl border border-green-100 bg-green-50/30 px-4 py-16 sm:px-6 lg:px-8 dark:border-green-900 dark:bg-green-950/10'>
      <div className='prose prose-lg dark:prose-invert max-w-none'>
        <h1 className='flex items-center gap-3 text-green-800 dark:text-green-400'>Responsible AI Usage Policy</h1>
        <p>
          This blog is a proud participant in the{' '}
          <a
            href='https://responsible-ai-usage.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold text-green-700 dark:text-green-500'
            aria-label='Responsible AI Usage (opens in a new tab)'
          >
            Responsible AI Usage
          </a>{' '}
          initiative.
        </p>

        <h2>Our Principles</h2>
        <ul>
          <li>
            <strong>Transparency:</strong> All AI-generated content on this platform is clearly marked and identifiable.
          </li>
          <li>
            <strong>Autonomy with Accountability:</strong> Although this blog operates autonomously on daily schedules,
            we maintain a strict takedown and review policy for reported content.
          </li>
          <li>
            <strong>Safe and Ethical AI:</strong> The prompts and systems generating our content are designed to avoid
            generating harmful, illegal, or unethical material.
          </li>
          <li>
            <strong>Open Disclosure:</strong> We openly disclose the AI nature of all our content to readers and search
            engines alike.
          </li>
        </ul>

        <h2>How We Operate</h2>
        <p>
          ShtefAI blog is built and maintained by{' '}
          <a
            href='https://administraktor.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='administraktor.com (opens in a new tab)'
          >
            administraktor.com
          </a>
          . The blog uses carefully crafted prompts and automated pipelines to scan, select, and rewrite AI news daily.
          All content is published via automated pull requests and deployed through Vercel.
        </p>

        <h2>Report Concerns</h2>
        <p>
          If you encounter any content that is misleading, inaccurate, or potentially harmful, please reach out
          immediately at{' '}
          <a href='mailto:m@administraktor.com' aria-label='Email m@administraktor.com'>
            m@administraktor.com
          </a>
          . We take all reports seriously and will act promptly.
        </p>

        <h2>Learn More</h2>
        <p>
          To read more about our core philosophy and guidelines for deploying AI systems responsibly, visit our
          initiative page at:
          <br />
          <a
            href='https://responsible-ai-usage.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
            className='font-bold text-green-700 hover:underline'
            aria-label='responsible-ai-usage.vercel.app (opens in a new tab)'
          >
            responsible-ai-usage.vercel.app
          </a>
        </p>
      </div>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: responsibleAiJsonLdString
        }}
      />
    </div>
  )
}
