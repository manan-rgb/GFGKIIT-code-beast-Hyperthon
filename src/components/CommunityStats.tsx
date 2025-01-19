import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, ShoppingBag, Utensils, Heart } from 'lucide-react';
import type { CommunityStats } from '../types';

const mockData = [
  { month: 'Jan', donations: 65 },
  { month: 'Feb', donations: 85 },
  { month: 'Mar', donations: 120 },
  { month: 'Apr', donations: 90 },
  { month: 'May', donations: 110 },
  { month: 'Jun', donations: 95 },
];

const stats: CommunityStats = {
  totalDonations: 565,
  foodSaved: 2800,
  activeDonors: 120,
  impactedPeople: 450,
};

export default function CommunityStats() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Total Donations</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{stats.totalDonations}</span>
            <span className="ml-2 text-sm text-gray-500">items</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Utensils className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Food Saved</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{stats.foodSaved}</span>
            <span className="ml-2 text-sm text-gray-500">lbs</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Active Donors</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{stats.activeDonors}</span>
            <span className="ml-2 text-sm text-gray-500">this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">People Helped</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{stats.impactedPeople}</span>
            <span className="ml-2 text-sm text-gray-500">reached</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Monthly Donations</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="donations" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}