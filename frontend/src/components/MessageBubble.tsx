import React from 'react';
import type { Message } from '../types';
import { Bot, User, BookOpen, HelpCircle, CheckSquare } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const getMessageIcon = () => {
    if (isUser) return <User className="w-4 h-4" />;
    
    switch (message.messageType) {
      case 'explanation':
        return <BookOpen className="w-4 h-4" />;
      case 'question':
        return <HelpCircle className="w-4 h-4" />;
      case 'assessment':
        return <CheckSquare className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'
      }`}>
        {getMessageIcon()}
      </div>
      
      <div className={`max-w-2xl px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-blue-500 text-white ml-auto' 
          : 'bg-white border border-gray-200 text-gray-800'
      }`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        
        {message.relatedConcepts && message.relatedConcepts.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200 border-opacity-20">
            <div className="flex flex-wrap gap-1">
              {message.relatedConcepts.map(concept => (
                <span key={concept} className={`px-2 py-1 text-xs rounded-full ${
                  isUser ? 'bg-blue-400 bg-opacity-50' : 'bg-gray-100 text-gray-600'
                }`}>
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <p className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};