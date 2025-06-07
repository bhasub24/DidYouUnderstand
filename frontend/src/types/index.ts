export interface Concept {
  id: string;
  name: string;
  description: string;
  masteryLevel: number; // 0-100
  prerequisites: string[];
  relatedConcepts: string[];
  category: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'professor';
  timestamp: Date;
  relatedConcepts?: string[];
  messageType?: 'explanation' | 'question' | 'assessment' | 'normal';
}

export interface LearningSession {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  lastAccessed: Date;
  progress: number;
  totalConcepts: number;
  masteredConcepts: number;
  subject: string;
  hasAttachment: boolean;
  attachmentName?: string;
}

export interface LearningPath {
  id: string;
  name: string;
  concepts: string[];
  currentStep: number;
  progress: number;
}

export interface Assessment {
  id: string;
  conceptId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'pdf' | 'article' | 'video' | 'tutorial';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}