import React, { useState } from 'react';
import type { LearningSession, Resource } from '../types';
import { SessionCard } from './SessionCard';
import { ResourceCard } from './ResourceCard';
import { Plus, Upload, Search, BookOpen, Sparkles, X } from 'lucide-react';
import { learningSessions, suggestedResources } from '../data/sessions';

interface SessionsPageProps {
  onStartSession: (session?: LearningSession, topic?: string, resource?: Resource) => void;
}

export const SessionsPage: React.FC<SessionsPageProps> = ({ onStartSession }) => {
  const [showNewSession, setShowNewSession] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [showResources, setShowResources] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleStartWithFile = () => {
    if (selectedFile) {
      onStartSession(undefined, selectedFile.name);
    }
  };

  const handleStartWithTopic = () => {
    if (newTopic.trim()) {
      setShowResources(true);
    }
  };

  const handleResourceSelect = (resource: Resource) => {
    onStartSession(undefined, newTopic, resource);
  };

  const handleContinueSession = (session: LearningSession) => {
    onStartSession(session);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome back to your learning journey
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Continue where you left off or start a new learning session with Professor Alex
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setShowNewSession(true)}
            className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Start New Session</span>
          </button>
        </div>

        {/* New Session Modal */}
        {showNewSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Start New Session</h2>
                <button
                  onClick={() => setShowNewSession(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* File Upload Option */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Upload Learning Material</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload a PDF, document, or any file you want to learn from
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors inline-block"
                  >
                    Choose File
                  </label>
                  {selectedFile && (
                    <div className="mt-3">
                      <p className="text-sm text-green-600">Selected: {selectedFile.name}</p>
                      <button
                        onClick={handleStartWithFile}
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Start Learning
                      </button>
                    </div>
                  )}
                </div>

                {/* Topic Input Option */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Search className="w-5 h-5 text-gray-400 mr-2" />
                    <h3 className="font-semibold text-gray-800">Learn a Topic</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Tell us what you want to learn and we'll find resources for you
                  </p>
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="e.g., React Hooks, Machine Learning, Python..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleStartWithTopic}
                    disabled={!newTopic.trim()}
                    className="mt-3 w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Find Resources
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resources Modal */}
        {showResources && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Suggested Resources for "{newTopic}"</h2>
                <button
                  onClick={() => setShowResources(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {suggestedResources.map(resource => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onSelect={handleResourceSelect}
                  />
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">Pro Tip</span>
                </div>
                <p className="text-sm text-blue-700">
                  Select a resource that matches your current skill level for the best learning experience.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Learning Sessions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            Your Learning Sessions
          </h2>
          
          {learningSessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No learning sessions yet</h3>
              <p className="text-gray-500">Start your first session to begin your learning journey</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningSessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onContinue={handleContinueSession}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};