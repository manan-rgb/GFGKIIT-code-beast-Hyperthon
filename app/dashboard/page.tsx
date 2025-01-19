'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

type FoodItem = {
  id: number
  name: string
  quantity: number
  expirationDate: string
}

export default function Dashboard() {
  const { t } = useLanguage()
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, expirationDate: '' })

  const addFoodItem = (e: React.FormEvent) => {
    e.preventDefault()
    setFoodItems([...foodItems, { id: Date.now(), ...newItem }])
    setNewItem({ name: '', quantity: 0, expirationDate: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('User Dashboard')}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('Log Surplus Food')}</h2>
          <form onSubmit={addFoodItem} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">{t('Food Item')}</label>
              <input
                type="text"
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block mb-1">{t('Quantity')}</label>
              <input
                type="number"
                id="quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="expirationDate" className="block mb-1">{t('Expiration Date')}</label>
              <input
                type="date"
                id="expirationDate"
                value={newItem.expirationDate}
                onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              {t('Add Item')}
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('Your Logged Items')}</h2>
          {foodItems.length === 0 ? (
            <p>{t('No items logged yet.')}</p>
          ) : (
            <ul className="space-y-2">
              {foodItems.map((item) => (
                <li key={item.id} className="bg-gray-100 p-3 rounded">
                  <strong>{item.name}</strong> - {item.quantity} units, {t('Expires')}: {item.expirationDate}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">{t('Your Achievements')}</h2>
        {/* Add achievement badges or statistics here */}
        <p>{t('You have donated 50 items so far!')}</p>
      </div>
    </div>
  )
}

