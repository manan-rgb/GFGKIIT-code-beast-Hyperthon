import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Map, Users, Globe } from 'lucide-react';

interface NavbarProps {
  activeView: 'dashboard' | 'map' | 'community';
  onViewChange: (view: 'dashboard' | 'map' | 'community') => void;
}

export default function Navbar({ activeView, onViewChange }: NavbarProps) {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-emerald-600">FoodBridge</span>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => onViewChange('dashboard')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeView === 'dashboard'
                    ? 'border-emerald-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                {t('dashboard')}
              </button>

              <button
                onClick={() => onViewChange('map')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeView === 'map'
                    ? 'border-emerald-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Map className="w-4 h-4 mr-2" />
                {t('map')}
              </button>

              <button
                onClick={() => onViewChange('community')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeView === 'community'
                    ? 'border-emerald-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                {t('community')}
              </button>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <button
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                onClick={() => changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
              >
                <Globe className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}