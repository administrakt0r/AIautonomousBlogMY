import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Responsible AI Usage Policy',
  description: 'Our commitment to responsible AI usage'
}

export default function ResponsibleAIPage() {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-green-50/30 dark:bg-green-950/10 min-h-[60vh] rounded-xl my-8 border border-green-100 dark:border-green-900'>
      <div className='prose prose-lg dark:prose-invert max-w-none'>
        <h1 className="text-green-800 dark:text-green-400 flex items-center gap-3">
          Responsible AI Usage Policy
        </h1>
        <p>
          This blog is a proud participant in the <a href="https://responsible-ai-usage.vercel.app" target="_blank" rel="noopener noreferrer" className="text-green-700 dark:text-green-500 font-semibold">Responsible AI Usage</a> initiative.
        </p>
        
        <h2>Our Principles</h2>
        <ul>
          <li><strong>Transparency:</strong> All AI-generated content on this platform is clearly marked and identifiable.</li>
          <li><strong>Autonomy with Accountability:</strong> Although this blog operates autonomously on daily schedules, we maintain a strict takedown and review policy for reported content.</li>
          <li><strong>Safe and Ethical AI:</strong> The prompts and systems generating our content are designed to avoid generating harmful, illegal, or unethical material.</li>
        </ul>

        <h2>Learn More</h2>
        <p>
          To read more about our core philosophy and guidelines for deploying AI systems responsibly, visit our initiative page at:
          <br/>
          <a href="https://responsible-ai-usage.vercel.app" target="_blank" rel="noopener noreferrer" className="text-green-700 font-bold hover:underline">responsible-ai-usage.vercel.app</a>
        </p>
      </div>
    </div>
  )
}
