import React, { useState } from 'react';
import { SessionsPage } from './components/SessionsPage';
import { LearningInterface } from './components/LearningInterface';
import type { LearningSession, Resource } from './types';

type AppState = 'sessions' | 'learning';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('sessions');
  const [currentSession, setCurrentSession] = useState<LearningSession | undefined>();
  const [currentTopic, setCurrentTopic] = useState<string | undefined>();
  const [currentResource, setCurrentResource] = useState<Resource | undefined>();

  const handleStartSession = (session?: LearningSession, topic?: string, resource?: Resource) => {
    setCurrentSession(session);
    setCurrentTopic(topic);
    setCurrentResource(resource);
    setCurrentView('learning');
  };

  const handleBackToSessions = () => {
    setCurrentView('sessions');
    setCurrentSession(undefined);
    setCurrentTopic(undefined);
    setCurrentResource(undefined);
  };

  return (
    <div className="h-screen">
      {currentView === 'sessions' ? (
        <SessionsPage onStartSession={handleStartSession} />
      ) : (
        <LearningInterface
          session={currentSession}
          topic={currentTopic}
          resource={currentResource}
          onBack={handleBackToSessions}
        />
      )}
    </div>
  );
}

export default App;
