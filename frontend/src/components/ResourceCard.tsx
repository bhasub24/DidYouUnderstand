import React from 'react';
import type { Resource } from '../types';
import { ExternalLink, FileText, Video, BookOpen, Code } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  onSelect: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onSelect }) => {
  const getResourceIcon = () => {
    switch (resource.type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-500" />;
      case 'tutorial':
        return <Code className="w-5 h-5 text-green-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-blue-500" />;
    }
  };

  const getDifficultyColor = () => {
    switch (resource.difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-amber-100 text-amber-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
         onClick={() => onSelect(resource)}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getResourceIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-800 truncate">{resource.title}</h4>
            <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
          <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor()}`}>
              {resource.difficulty}
            </span>
            <span className="text-xs text-gray-500 capitalize">{resource.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};