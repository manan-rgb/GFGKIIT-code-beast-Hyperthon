'use client'

import dynamic from 'next/dynamic'
import { useLanguage } from '../contexts/LanguageContext'

const DynamicMap = dynamic(() => import('../components/Map'), {
  ssr: false
})

export default function MapPage() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('Donation Locations')}</h1>
      <DynamicMap />
    </div>
  )
}

