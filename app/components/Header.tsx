'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageSelector from './LanguageSelector'
import { useLanguage } from '../contexts/LanguageContext'

const Header = () => {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <header className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          {t('Food Waste Reduction Network')}
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className={pathname === '/' ? 'font-bold' : ''}>
                {t('Home')}
              </Link>
            </li>
            <li>
              <Link href="/map" className={pathname === '/map' ? 'font-bold' : ''}>
                {t('Map')}
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className={pathname === '/dashboard' ? 'font-bold' : ''}>
                {t('Dashboard')}
              </Link>
            </li>
            <li>
              <Link href="/community" className={pathname === '/community' ? 'font-bold' : ''}>
                {t('Community')}
              </Link>
            </li>
          </ul>
        </nav>
        <LanguageSelector />
      </div>
    </header>
  )
}

export default Header

