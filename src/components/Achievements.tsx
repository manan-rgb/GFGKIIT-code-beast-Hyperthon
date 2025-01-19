import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';
import type { UserAchievement } from '../types';

const achievements: UserAchievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Make your first donation',
    icon: 'Star',
    progress: 100,
    completed: true,
  },
  {
    id: '2',
    name: 'Regular Donor',
    description: 'Donate for 5 consecutive weeks',
    icon: 'Award',
    progress: 60,
    completed: false,
  },
  {
    id: '3',
    name: 'Community Champion',
    description: 'Help feed 100 people',
    icon: 'Trophy',
    progress: 75,
    completed: false,
  },
];

const IconMap = {
  Star,
  Trophy,
  Award,
};

export default function Achievements() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Achievements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const Icon = IconMap[achievement.icon as keyof typeof IconMap];
          
          return (
            <div
              key={achievement.id}
              className={`p-6 rounded-lg border-2 ${
                achievement.completed
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-2 rounded-full ${
                  achievement.completed
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      {achievement.progress}%
                    </span>
                  </div>
                  {achievement.completed && (
                    <div className="text-xs font-semibold inline-block text-emerald-600">
                      Completed!
                    </div>
                  )}
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${achievement.progress}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      achievement.completed ? 'bg-emerald-500' : 'bg-emerald-300'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}