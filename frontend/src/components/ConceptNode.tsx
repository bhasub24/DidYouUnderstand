import React from 'react';
import type { Concept } from '../types';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface ConceptNodeProps {
  concept: Concept;
  onClick: (concept: Concept) => void;
  isSelected: boolean;
}

export const ConceptNode: React.FC<ConceptNodeProps> = ({ concept, onClick, isSelected }) => {
  const getMasteryColor = (level: number) => {
    if (level >= 80) return 'bg-emerald-500';
    if (level >= 60) return 'bg-amber-500';
    if (level >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getMasteryIcon = (level: number) => {
    if (level >= 80) return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    if (level >= 40) return <AlertCircle className="w-4 h-4 text-amber-600" />;
    return <Circle className="w-4 h-4 text-red-600" />;
  };

  return (
    <div
      onClick={() => onClick(concept)}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{concept.name}</h3>
        {getMasteryIcon(concept.masteryLevel)}
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{concept.description}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Mastery</span>
          <span>{concept.masteryLevel}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getMasteryColor(concept.masteryLevel)}`}
            style={{ width: `${concept.masteryLevel}%` }}
          />
        </div>
      </div>
      
      {concept.prerequisites.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">Prerequisites: {concept.prerequisites.length}</p>
        </div>
      )}
    </div>
  );
};