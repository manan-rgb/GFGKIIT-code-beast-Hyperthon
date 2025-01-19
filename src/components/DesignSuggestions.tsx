import React from 'react';
import { DesignPreferences, DesignSuggestion } from '../types';
import { Palette, Type, Layout, Box } from 'lucide-react';

const generateSuggestions = (preferences: DesignPreferences): DesignSuggestion => {
  // This is a simplified version - you can expand this logic based on your needs
  const suggestions: Record<string, DesignSuggestion> = {
    'Modern & Minimal': {
      colors: ['#ffffff', '#000000', '#f0f0f0', '#333333'],
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      layout: 'Minimal grid-based layout with plenty of whitespace',
      components: ['Clean navigation', 'Card components', 'Minimal forms'],
      rationale: 'A clean, modern design that emphasizes content and usability',
    },
    'Bold & Vibrant': {
      colors: ['#2563eb', '#f97316', '#ffffff', '#1e293b'],
      typography: {
        headingFont: 'Montserrat',
        bodyFont: 'Open Sans',
      },
      layout: 'Dynamic asymmetrical grid with bold visual elements',
      components: ['Animated cards', 'Bold CTAs', 'Interactive elements'],
      rationale: 'Engaging and energetic design that captures attention',
    },
    // Add more presets as needed
  };

  return suggestions[preferences.colorPreference] || suggestions['Modern & Minimal'];
};

export default function DesignSuggestions({ preferences }: { preferences: DesignPreferences }) {
  const suggestion = generateSuggestions(preferences);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Design Recommendations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Palette className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Color Palette</h3>
          </div>
          <div className="flex space-x-4">
            {suggestion.colors.map((color, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-16 h-16 rounded-lg shadow-inner"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-600 mt-2">{color}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Type className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Typography</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-gray-600">Heading Font</h4>
              <p className="text-lg font-semibold">{suggestion.typography.headingFont}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-600">Body Font</h4>
              <p className="text-lg font-semibold">{suggestion.typography.bodyFont}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Layout className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Layout Recommendation</h3>
          </div>
          <p className="text-gray-700">{suggestion.layout}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Box className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">Suggested Components</h3>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            {suggestion.components.map((component, index) => (
              <li key={index}>{component}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Design Rationale</h3>
        <p className="text-gray-700">{suggestion.rationale}</p>
      </div>
    </div>
  );
}