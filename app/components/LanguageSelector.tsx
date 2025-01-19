'use client'

import { useLanguage } from '../contexts/LanguageContext'

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'fr')}
      className="bg-green-700 text-white px-2 py-1 rounded"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  )
}

export default LanguageSelector

