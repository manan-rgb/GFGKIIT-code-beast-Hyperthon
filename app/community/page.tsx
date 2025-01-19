'use client'

import { useLanguage } from '../contexts/LanguageContext'

export default function Community() {
  const { t } = useLanguage()

  // Dummy data for community insights
  const communityStats = {
    totalFoodSaved: 5000, // in kg
    totalMealsDonated: 15000,
    activeDonors: 500,
    activeRecipients: 50,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('Community Insights')}</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-green-100 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">{communityStats.totalFoodSaved.toLocaleString()} kg</h2>
          <p>{t('Total Food Saved')}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">{communityStats.totalMealsDonated.toLocaleString()}</h2>
          <p>{t('Meals Donated')}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">{communityStats.activeDonors.toLocaleString()}</h2>
          <p>{t('Active Donors')}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">{communityStats.activeRecipients.toLocaleString()}</h2>
          <p>{t('Active Recipients')}</p>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">{t('Recent Activity')}</h2>
        {/* Add a feed of recent donations or success stories */}
        <ul className="space-y-4">
          <li className="bg-gray-100 p-4 rounded">
            <p>{t('Local Restaurant donated 50 meals to Downtown Shelter')}</p>
            <small className="text-gray-500">2 hours ago</small>
          </li>
          <li className="bg-gray-100 p-4 rounded">
            <p>{t('Grocery Store XYZ provided 200kg of fresh produce to Food Bank ABC')}</p>
            <small className="text-gray-500">1 day ago</small>
          </li>
          {/* Add more activity items */}
        </ul>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">{t('Join the Movement!')}</h2>
        <p className="mb-4">{t('Together, we can make a difference in reducing food waste and helping those in need.')}</p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700">
          {t('Sign Up to Donate')}
        </button>
      </div>
    </div>
  )
}

