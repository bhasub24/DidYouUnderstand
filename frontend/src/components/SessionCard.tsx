import React from 'react';
import type { LearningSession } from '../types';
import { BookOpen, Calendar, TrendingUp, Paperclip, Play } from 'lucide-react';

interface SessionCardProps {
  session: LearningSession;
  onContinue: (session: LearningSession) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onContinue }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-emerald-500 to-emerald-600';
    if (progress >= 60) return 'from-blue-500 to-blue-600';
    if (progress >= 40) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {session.subject}
            </span>
            {session.hasAttachment && (
              <Paperclip className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{session.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{session.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Last: {formatDate(session.lastAccessed)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>{session.masteredConcepts}/{session.totalConcepts} concepts</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-800">{session.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(session.progress)} transition-all duration-500`}
              style={{ width: `${session.progress}%` }}
            />
          </div>
        </div>

        {session.hasAttachment && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Paperclip className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{session.attachmentName}</span>
            </div>
          </div>
        )}

        <button
          onClick={() => onContinue(session)}
          className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-md"
        >
          <Play className="w-4 h-4" />
          <span>Continue Learning</span>
        </button>
      </div>
    </div>
  );
};