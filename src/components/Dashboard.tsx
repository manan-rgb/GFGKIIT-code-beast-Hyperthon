import React, { useState } from 'react';
import { Calendar, Package, Clock, AlertCircle } from 'lucide-react';
import type { DonationItem } from '../types';
import { format } from 'date-fns';

export default function Dashboard() {
  const [donations] = useState<DonationItem[]>([]);
  const [newDonation, setNewDonation] = useState<Partial<DonationItem>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donation submission
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Log New Donation</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., Fresh Vegetables"
                value={newDonation.itemName || ''}
                onChange={(e) => setNewDonation(prev => ({ ...prev, itemName: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Amount"
                  value={newDonation.quantity || ''}
                  onChange={(e) => setNewDonation(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={newDonation.category || ''}
                  onChange={(e) => setNewDonation(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Select Category</option>
                  <option value="produce">Fresh Produce</option>
                  <option value="dairy">Dairy</option>
                  <option value="bakery">Bakery</option>
                  <option value="canned">Canned Goods</option>
                  <option value="prepared">Prepared Meals</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={newDonation.expiryDate || ''}
                onChange={(e) => setNewDonation(prev => ({ ...prev, expiryDate: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Schedule Donation
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Donations</h2>
          
          {donations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No donations logged yet. Start by adding a new donation above!
            </div>
          ) : (
            <div className="space-y-4">
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Package className="w-6 h-6 text-emerald-500" />
                    <div>
                      <h3 className="font-semibold">{donation.itemName}</h3>
                      <p className="text-sm text-gray-600">
                        {donation.quantity} units · {donation.category}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(donation.expiryDate), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {donation.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Urgent Needs</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 text-red-600 mb-2">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-semibold">High Priority</h3>
              </div>
              <p className="text-gray-800">Fresh produce needed at St. Mary's Food Bank</p>
              <p className="text-sm text-gray-600 mt-1">Posted 2 hours ago</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Stats</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">This Month</span>
              <span className="font-semibold">23 Donations</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Food Saved</span>
              <span className="font-semibold">450 lbs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">People Helped</span>
              <span className="font-semibold">180</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}