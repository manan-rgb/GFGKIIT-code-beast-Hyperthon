'use client'

import { useLanguage } from '../contexts/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-green-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2023 {t('Food Waste Reduction Network')}</p>
        <p>{t('Connecting surplus food to those in need')}</p>
      </div>
    </footer>
  )
}

export default Footer

