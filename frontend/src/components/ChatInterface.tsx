import React, { useState, useRef, useEffect } from 'react';
import type { Message, Concept, LearningSession, Resource } from '../types';
import { MessageBubble } from './MessageBubble';
import { Lightbulb, HelpCircle, FileText } from 'lucide-react';

interface ChatInterfaceProps {
  selectedConcept: Concept | null;
  onConceptMentioned: (conceptIds: string[]) => void;
  session?: LearningSession;
  topic?: string;
  resource?: Resource;
  externalMessages?: any[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  selectedConcept, 
  onConceptMentioned,
  session,
  topic,
  resource,
  externalMessages = []
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, externalMessages]);

  useEffect(() => {
    // Initialize with welcome message based on context
    let welcomeMessage = "Hello! I'm Professor Alex, your personal learning companion.";
    
    if (session) {
      welcomeMessage = `Welcome back! Let's continue with your ${session.title} session. You've mastered ${session.masteredConcepts} out of ${session.totalConcepts} concepts so far.`;
    } else if (topic && resource) {
      welcomeMessage = `Great! Let's start learning about ${topic} using the resource "${resource.title}". I'll guide you through the concepts step by step.`;
    } else if (topic) {
      welcomeMessage = `Perfect! Let's dive into ${topic}. I'll help you understand the key concepts and build your knowledge progressively.`;
    }

    const initialMessage: Message = {
      id: '1',
      content: welcomeMessage,
      sender: 'professor',
      timestamp: new Date(),
      messageType: 'normal'
    };

    setMessages([initialMessage]);
  }, [session, topic, resource]);

  useEffect(() => {
    if (selectedConcept) {
      const conceptMessage: Message = {
        id: Date.now().toString(),
        content: `Let's focus on ${selectedConcept.name}! Based on your current mastery level of ${selectedConcept.masteryLevel}%, I can see ${
          selectedConcept.masteryLevel < 60 
            ? "there's room for improvement. Let me break this down step by step."
            : "you're doing well, but let's reinforce your understanding."
        } ${selectedConcept.description}`,
        sender: 'professor',
        timestamp: new Date(),
        relatedConcepts: [selectedConcept.name],
        messageType: 'explanation'
      };
      setMessages(prev => [...prev, conceptMessage]);
    }
  }, [selectedConcept]);

  // Add external messages from movable chat
  useEffect(() => {
    if (externalMessages.length > 0) {
      const lastMessage = externalMessages[externalMessages.length - 1];
      setMessages(prev => [...prev, lastMessage]);

      // Simulate professor response
      setTimeout(() => {
        const responses = [
          "Great question! Let me explain this concept in a way that builds on what you already know.",
          "I can see you're thinking about this carefully. Let's break it down into smaller steps.",
          "That's an excellent observation! This connects to several other concepts we've discussed.",
          "Let me guide you through this step by step. Understanding this will unlock several other important concepts."
        ];

        const professorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          sender: 'professor',
          timestamp: new Date(),
          messageType: 'explanation'
        };

        setMessages(prev => [...prev, professorMessage]);
      }, 1000);
    }
  }, [externalMessages]);

  const quickActions = [
    { icon: HelpCircle, text: "I don't understand", action: () => {} },
    { icon: Lightbulb, text: "Show example", action: () => {} },
    { icon: FileText, text: "Summarize", action: () => {} },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 mt-16">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">PA</span>
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-gray-800">Professor Alex</h1>
            <p className="text-sm text-gray-600">Your AI Learning Companion</p>
          </div>
          {selectedConcept && (
            <div className="ml-auto bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-blue-800">
                Focus: {selectedConcept.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="absolute bottom-20 left-6 right-80">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm"
              >
                <action.icon className="w-4 h-4 text-gray-600" />
                <span>{action.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};