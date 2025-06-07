import React, { useState, useRef, useEffect } from 'react';
import { Send, Move, Minimize2, Maximize2 } from 'lucide-react';

interface MovableChatProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const MovableChat: React.FC<MovableChatProps> = ({ onSendMessage, disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState({ x: 50, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = ((e.clientX - dragOffset.x) / window.innerWidth) * 100;
      const newY = ((e.clientY - dragOffset.y) / window.innerHeight) * 100;
      
      setPosition({
        x: Math.max(0, Math.min(70, newX)),
        y: Math.max(0, Math.min(90, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleSend = () => {
    if (!inputValue.trim() || disabled) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={chatRef}
      className={`fixed z-50 transition-all duration-300 ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: isMinimized ? 'scale(0.8)' : 'scale(1)',
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden min-w-80 max-w-md">
        {/* Header */}
        <div 
          className="bg-gradient-to-r from-blue-500 to-emerald-500 p-3 cursor-grab active:cursor-grabbing flex items-center justify-between"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2">
            <Move className="w-4 h-4 text-white" />
            <span className="text-white font-medium text-sm">Ask Professor Alex</span>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Chat Input */}
        {!isMinimized && (
          <div className="p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question or describe what you're struggling with..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={2}
                  disabled={disabled}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || disabled}
                className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Drag the header to move this chat box anywhere on screen
            </div>
          </div>
        )}
      </div>
    </div>
  );
};