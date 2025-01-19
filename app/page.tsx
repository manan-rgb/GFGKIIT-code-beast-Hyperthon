'use client'

import { useLanguage } from './contexts/LanguageContext'
import Link from 'next/link'

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{t('Welcome to the Food Waste Reduction Network')}</h1>
      <p className="text-xl mb-8">{t('Connecting restaurants, grocery stores, and households with local shelters and food banks to reduce food waste.')}</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-green-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('For Donors')}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{t('Log surplus food items')}</li>
            <li>{t('Schedule pickups or drop-offs')}</li>
            <li>{t('Track your donations')}</li>
            <li>{t('Receive community achievements')}</li>
          </ul>
          <Link href="/dashboard" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            {t('Go to Dashboard')}
          </Link>
        </div>
        
        <div className="bg-blue-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('For Recipients')}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{t('Find nearby donation locations')}</li>
            <li>{t('View available food items')}</li>
            <li>{t('Receive real-time notifications')}</li>
            <li>{t('Connect with donors')}</li>
          </ul>
          <Link href="/map" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {t('View Map')}
          </Link>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">{t('Join our community and make a difference!')}</h2>
        <Link href="/dashboard" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700">
          {t('Get Started')}
        </Link>
      </div>
    </div>
  )
}

