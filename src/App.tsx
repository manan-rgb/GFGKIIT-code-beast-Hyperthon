import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Map from './components/Map';
import CommunityStats from './components/CommunityStats';
import Achievements from './components/Achievements';

function App() {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<'dashboard' | 'map' | 'community'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sprout className="w-12 h-12 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('appName')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('tagline')}
          </p>
        </header>

        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'map' && <Map />}
        {activeView === 'community' && (
          <div className="space-y-8">
            <CommunityStats />
            <Achievements />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;