import React from 'react';
import type { Concept } from '../types';
import { ConceptNode } from './ConceptNode';
import { TrendingUp, Target, BookOpen } from 'lucide-react';

interface ConceptTrackerProps {
  concepts: Concept[];
  selectedConcept: Concept | null;
  onConceptSelect: (concept: Concept) => void;
}

export const ConceptTracker: React.FC<ConceptTrackerProps> = ({ 
  concepts, 
  selectedConcept, 
  onConceptSelect 
}) => {
  const overallProgress = Math.round(
    concepts.reduce((sum, concept) => sum + concept.masteryLevel, 0) / concepts.length
  );

  const needsWork = concepts.filter(c => c.masteryLevel < 60).length;
  const mastered = concepts.filter(c => c.masteryLevel >= 80).length;

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Learning Progress
        </h2>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-gray-800">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-emerald-600">{mastered}</div>
            <div className="text-xs text-gray-600">Mastered</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-amber-600">{needsWork}</div>
            <div className="text-xs text-gray-600">Needs Work</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <BookOpen className="w-4 h-4 mr-2" />
          Concepts
        </h3>
      </div>

      <div className="space-y-3">
        {concepts.map(concept => (
          <ConceptNode
            key={concept.id}
            concept={concept}
            onClick={onConceptSelect}
            isSelected={selectedConcept?.id === concept.id}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          Recommended Focus
        </h4>
        <p className="text-sm text-blue-700">
          Work on <strong>Loops</strong> and <strong>Functions</strong> to improve your programming foundation.
        </p>
      </div>
    </div>
  );
};