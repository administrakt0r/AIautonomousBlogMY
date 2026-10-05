import { TwitterIcon, GithubIcon, RssIcon, LeafIcon, ExternalLinkIcon } from 'lucide-react'

import Link from 'next/link'

import { CURRENT_YEAR } from '@/lib/site'
import { Separator } from '@/components/ui/separator'
import { CopyEmailButton } from '@/components/blocks/copy-email-button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import Logo from '@/components/logo'

const SocialLinks = () => (
  <div className='flex items-center gap-4'>
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href='https://x.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-sm transition-all focus-visible:ring-[3px] outline-none active:scale-95'
          aria-label='Twitter (opens in a new tab)'
        >
          <TwitterIcon
            className='size-5 transition-transform duration-300 hover:scale-110'
            aria-hidden='true'
          />
        </a>
      </TooltipTrigger>
      <TooltipContent>Twitter</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href='https://github.com/wpine-sh/shtefai'
          target='_blank'
          rel='noopener noreferrer'
          className='text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-sm transition-all focus-visible:ring-[3px] outline-none active:scale-95'
          aria-label='GitHub (opens in a new tab)'
        >
          <GithubIcon
            className='size-5 transition-transform duration-300 hover:scale-110'
            aria-hidden='true'
          />
        </a>
      </TooltipTrigger>
      <TooltipContent>GitHub</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href='/rss.xml'
          className='text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-sm transition-all focus-visible:ring-[3px] outline-none active:scale-95'
          aria-label='RSS Feed'
        >
          <RssIcon
            className='size-5 transition-transform duration-300 hover:scale-110'
            aria-hidden='true'
          />
        </Link>
      </TooltipTrigger>
      <TooltipContent>RSS Feed</TooltipContent>
    </Tooltip>
  </div>
)

interface NetworkCardProps {
  href: string
  label: string
  emoji: string
  title: string
  description: string
  borderClass: string
  bgClass: string
  barBgClass: string
  textClass: string
  hoverTextClass: string
  shadowClass: string
}

const NETWORK_ITEMS: NetworkCardProps[] = [
  {
    href: 'https://WPinEU.com',
    label: 'WPinEU.com (opens in a new tab)',
    emoji: '🌐',
    title: 'WPinEU.com',
    description: 'High-performance Digital Architecture & Free WordPress Hosting Initiative.',
    borderClass: 'border-blue-100 hover:border-blue-300 dark:border-blue-900/50 dark:hover:border-blue-700/50',
    bgClass: 'bg-blue-50/50 dark:bg-blue-950/20',
    barBgClass: 'bg-blue-500',
    textClass: 'text-blue-700 dark:text-blue-400',
    hoverTextClass: 'group-hover:text-blue-700 dark:group-hover:text-blue-400',
    shadowClass: 'hover:shadow-blue-500/10',
  },
  {
    href: 'https://LLM.kiwi',
    label: 'LLM.kiwi (opens in a new tab)',
    emoji: '🥝',
    title: 'LLM.kiwi',
    description: 'Your next-gen platform for interacting with intelligent systems & LLM API access.',
    borderClass:
      'border-purple-100 hover:border-purple-300 dark:border-purple-900/50 dark:hover:border-purple-700/50',
    bgClass: 'bg-purple-50/50 dark:bg-purple-950/20',
    barBgClass: 'bg-purple-500',
    textClass: 'text-purple-700 dark:text-purple-400',
    hoverTextClass: 'group-hover:text-purple-700 dark:group-hover:text-purple-400',
    shadowClass: 'hover:shadow-purple-500/10',
  },
]

const NetworkCard = ({
  href,
  label,
  emoji,
  title,
  description,
  borderClass,
  bgClass,
  barBgClass,
  textClass,
  hoverTextClass,
  shadowClass,
}: NetworkCardProps) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='focus-visible:ring-ring/50 group block rounded-xl outline-none focus-visible:ring-[3px]'
    aria-label={label}
  >
    <div
      className={`relative overflow-hidden rounded-xl border ${borderClass} ${bgClass} p-4 transition-all duration-300 hover:shadow-lg ${shadowClass}`}
    >
      <div className={`absolute top-0 left-0 h-full w-1 rounded-l-xl ${barBgClass}`} />
      <div className={`mb-1.5 flex items-center gap-2 pl-2 font-bold ${textClass}`}>
        <span className='text-lg' aria-hidden='true'>
          {emoji}
        </span>{' '}
        {title}
        <ExternalLinkIcon
          className={`text-muted-foreground/50 ml-1 size-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${hoverTextClass}`}
          aria-hidden='true'
        />
      </div>
      <p className='pl-2 text-xs leading-relaxed text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-300'>
        {description}
      </p>
    </div>
  </a>
)

const ResponsibleAiCard = () => (
  <div className='flex md:col-span-1 lg:col-span-2'>
    <Link
      href='/responsible-ai-usage'
      className='focus-visible:ring-ring/50 mt-7 block h-full w-full rounded-xl outline-none focus-visible:ring-[3px] lg:mt-0'
      aria-label='Learn more about our Responsible AI Usage Initiative'
    >
      <div className='group relative flex h-full flex-col justify-center overflow-hidden rounded-xl border border-green-100 bg-green-50/50 p-6 transition-all duration-300 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/10 dark:border-green-900/50 dark:bg-green-950/20 dark:hover:border-green-700/50'>
        <div className='absolute top-0 left-0 h-full w-1 rounded-l-xl bg-green-500' />
        <div className='mb-3 flex items-center gap-2 pl-2 text-lg font-bold text-green-700 dark:text-green-400'>
          <LeafIcon className='h-6 w-6' aria-hidden='true' />
          Responsible AI Usage Initiative
        </div>
        <p className='max-w-2xl pl-2 text-sm leading-relaxed text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-300'>
          This blog is part of the responsible-ai-usage.vercel.app initiative. We believe in transparent, safe,
          and accountable artificial intelligence systems. Read our full policy on how we try to ethically
          integrate autonomous AI into publishing.
        </p>
      </div>
    </Link>
  </div>
)

const FooterBottom = () => (
  <div className='flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left'>
    <div className='text-muted-foreground text-sm'>
      {`©${CURRENT_YEAR}`}{' '}
      <Link
        href='/#'
        className='text-foreground focus-visible:ring-ring/50 rounded-sm font-medium outline-none hover:underline focus-visible:ring-[3px]'
      >
        ShtefAI blog
      </Link>{' '}
      — Where machines learn and humans discover.
      <br />
      <span className='block pt-1 text-xs'>
        Made by{' '}
        <a
          href='https://administraktor.com'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-primary focus-visible:ring-ring/50 group inline-flex items-center gap-1 rounded-sm underline underline-offset-2 outline-none focus-visible:ring-[3px]'
          aria-label='administraktor.com (opens in a new tab)'
        >
          administraktor.com
          <ExternalLinkIcon
            className='ml-1 size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            aria-hidden='true'
          />
        </a>
      </span>
    </div>

    <div className='text-muted-foreground max-w-xl text-left text-xs'>
      <strong>Disclaimer:</strong> administraktor.com network is in no way responsible for unmoderated content on
      this site because this blog is fully autonomous and on autorun. In case of misinformation, illegal things,
      etc. please contact me on:{' '}
      <div className='mt-1 flex items-center gap-1'>
        <a
          href='mailto:m@administraktor.com'
          className='hover:text-primary focus-visible:ring-ring/50 group inline-flex items-center gap-1 rounded-sm underline underline-offset-2 outline-none focus-visible:ring-[3px]'
          aria-label='Email m@administraktor.com'
        >
          m@administraktor.com
          <ExternalLinkIcon
            className='size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            aria-hidden='true'
          />
        </a>
        <CopyEmailButton email='m@administraktor.com' />
      </div>
    </div>
  </div>
)

const Footer = () => {
  return (
    <footer className='bg-muted/20 mt-8 border-t'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:py-12 lg:px-8'>
        {/* Top Section */}
        <div className='flex items-center justify-between gap-4 max-md:flex-col'>
          <Link
            href='/#'
            className='focus-visible:ring-ring/50 rounded-md outline-none focus-visible:ring-[3px]'
          >
            <div className='flex items-center gap-3'>
              <Logo className='gap-3' />
            </div>
          </Link>
          <div className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2 whitespace-nowrap sm:gap-5'>
            <span className='text-muted-foreground text-sm'>
              Written by <strong>Shtef</strong> <span aria-hidden='true'>🤖</span>
            </span>
          </div>
          <SocialLinks />
        </div>

        <Separator />

        {/* Promo and Network Section */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-muted-foreground mb-1 text-sm font-bold tracking-wider uppercase'>
              Administrakt0r Network
            </h3>
            {NETWORK_ITEMS.map((item) => (
              <NetworkCard key={item.href} {...item} />
            ))}
          </div>

          <ResponsibleAiCard />
        </div>

        <Separator />

        {/* Bottom Section */}
        <FooterBottom />
      </div>
    </footer>
  )
}

export default Footer
