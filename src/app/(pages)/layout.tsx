import type { ReactNode } from 'react'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { BackToTop } from '@/components/blocks/back-to-top'

import type { NavigationSection } from '@/components/blocks/menu-navigation'

const navigationData: NavigationSection[] = [
  {
    title: 'Home',
    href: '/#home',
    sectionId: 'home'
  },
  {
    title: 'Latest',
    href: '/#categories',
    sectionId: 'categories'
  },
  {
    title: 'About me',
    href: '/about',
    sectionId: 'about'
  }
]

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='flex h-full w-full min-w-0 flex-col'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* ⚡ Bolt: Sentinel element for BackToTop component.
          Positioned 300px from the top to trigger the visibility of the "Back to Top" button. */}
      <div id='back-to-top-sentinel' className='pointer-events-none absolute top-[300px] h-px w-full' aria-hidden='true' />

      {/* Main Content */}
      <main id='main-content' tabIndex={-1} className='flex flex-col'>
        {children}
      </main>

      <BackToTop />

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default PagesLayout
