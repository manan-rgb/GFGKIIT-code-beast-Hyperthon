'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

type Language = 'en' | 'es' | 'fr'

type Translations = {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    'Food Waste Reduction Network': 'Food Waste Reduction Network',
    'Home': 'Home',
    'Map': 'Map',
    'Dashboard': 'Dashboard',
    'Community': 'Community',
    'Connecting surplus food to those in need': 'Connecting surplus food to those in need',
    // Add more translations as needed
  },
  es: {
    'Food Waste Reduction Network': 'Red de Reducción de Desperdicio de Alimentos',
    'Home': 'Inicio',
    'Map': 'Mapa',
    'Dashboard': 'Panel',
    'Community': 'Comunidad',
    'Connecting surplus food to those in need': 'Conectando el excedente de alimentos con los necesitados',
    // Add more translations as needed
  },
  fr: {
    'Food Waste Reduction Network': 'Réseau de Réduction du Gaspillage Alimentaire',
    'Home': 'Accueil',
    'Map': 'Carte',
    'Dashboard': 'Tableau de Bord',
    'Community': 'Communauté',
    'Connecting surplus food to those in need': 'Connecter les surplus alimentaires aux personnes dans le besoin',
    // Add more translations as needed
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = useCallback((key: string) => {
    return translations[language][key] || key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

