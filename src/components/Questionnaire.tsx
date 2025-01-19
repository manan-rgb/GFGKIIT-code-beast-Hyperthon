import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Palette, Layout, Box, Type } from 'lucide-react';
import { DesignPreferences } from '../types';

const initialPreferences: DesignPreferences = {
  projectType: '',
  industry: '',
  colorPreference: '',
  stylePreference: '',
  features: [],
};

const questions = [
  {
    id: 'projectType',
    question: 'What type of website are you building?',
    options: ['E-commerce', 'Portfolio', 'Blog', 'Corporate', 'Landing Page'],
  },
  {
    id: 'industry',
    question: 'Which industry is your project in?',
    options: ['Technology', 'Creative', 'Healthcare', 'Education', 'Finance'],
  },
  {
    id: 'colorPreference',
    question: 'What color scheme do you prefer?',
    options: ['Modern & Minimal', 'Bold & Vibrant', 'Earthy & Natural', 'Professional & Corporate', 'Dark & Sleek'],
  },
  {
    id: 'stylePreference',
    question: 'What design style resonates with you?',
    options: ['Minimalist', 'Contemporary', 'Classic', 'Playful', 'Luxurious'],
  },
  {
    id: 'features',
    question: 'Which features are important to you?',
    options: ['Responsive Design', 'Animations', 'Dark Mode', 'Accessibility', 'Fast Loading'],
    multiple: true,
  },
];

export default function Questionnaire({ onComplete }: { onComplete: (prefs: DesignPreferences) => void }) {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<DesignPreferences>(initialPreferences);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setPreferences(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (step === questions.length - 1) {
      onComplete(preferences);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const currentQuestion = questions[step];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">Step {step + 1} of {questions.length}</span>
          <div className="h-2 flex-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{currentQuestion.question}</h2>
      </div>

      <div className="space-y-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => {
              if (currentQuestion.multiple) {
                const current = preferences[currentQuestion.id as keyof DesignPreferences] as string[];
                const updated = current.includes(option)
                  ? current.filter(item => item !== option)
                  : [...(current || []), option];
                handleAnswer(currentQuestion.id, updated);
              } else {
                handleAnswer(currentQuestion.id, option);
                handleNext();
              }
            }}
            className={`w-full p-4 text-left rounded-lg transition-all ${
              currentQuestion.multiple
                ? (preferences[currentQuestion.id as keyof DesignPreferences] as string[])?.includes(option)
                  ? 'bg-blue-50 border-blue-500 border-2'
                  : 'border border-gray-200 hover:border-blue-500'
                : preferences[currentQuestion.id as keyof DesignPreferences] === option
                ? 'bg-blue-50 border-blue-500 border-2'
                : 'border border-gray-200 hover:border-blue-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        )}
        {currentQuestion.multiple && (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-auto"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}