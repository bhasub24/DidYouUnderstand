import React, { useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { ConceptTracker } from './ConceptTracker';
import { MovableChat } from './MovableChat';
import { concepts } from '../data/concepts';
import type { Concept, LearningSession, Resource } from '../types';
import { ArrowLeft } from 'lucide-react';

interface LearningInterfaceProps {
  session?: LearningSession;
  topic?: string;
  resource?: Resource;
  onBack: () => void;
}

export const LearningInterface: React.FC<LearningInterfaceProps> = ({ 
  session, 
  topic, 
  resource, 
  onBack 
}) => {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const handleConceptSelect = (concept: Concept) => {
    setSelectedConcept(concept);
  };

  const handleConceptMentioned = (conceptIds: string[]) => {
    console.log('Concepts mentioned:', conceptIds);
  };

  const handleMovableChatMessage = (message: string) => {
    // Add message to chat interface
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user' as const,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getSessionTitle = () => {
    if (session) return session.title;
    if (topic && resource) return `Learning ${topic}`;
    if (topic) return `Learning ${topic}`;
    return 'New Learning Session';
  };

  return (
    <div className="h-screen flex bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-40 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Back to Sessions</span>
      </button>

      {/* Session Info */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white shadow-lg rounded-full px-6 py-3">
        <h1 className="text-sm font-semibold text-gray-800">{getSessionTitle()}</h1>
        {resource && (
          <p className="text-xs text-gray-600">Using: {resource.title}</p>
        )}
      </div>

      <ChatInterface 
        selectedConcept={selectedConcept}
        onConceptMentioned={handleConceptMentioned}
        session={session}
        topic={topic}
        resource={resource}
        externalMessages={messages}
      />
      
      <ConceptTracker 
        concepts={concepts}
        selectedConcept={selectedConcept}
        onConceptSelect={handleConceptSelect}
      />

      {/* Movable Chat */}
      <MovableChat onSendMessage={handleMovableChatMessage} />
    </div>
  );
};