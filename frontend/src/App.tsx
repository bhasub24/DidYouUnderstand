import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Home, Mic, Menu, ArrowLeft, MoveLeft, HomeIcon } from 'lucide-react';
import './App.css';
import Input from './input';
import { AnimatedMessage } from './floated-animation';

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [floatingMessage, setFloatingMessage] = useState<string | null>(null);

  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    const newUserMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! This is a demo response from the chatbot UI.",
        sender: "bot"
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="parentdiv flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`sidebar transition-all duration-300 bg-gray-100 p-4 ${sidebarOpen ? "w-64" : "w-16"} shadow-lg`}>
        <div className='flex'>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebar-button mb-4 border border-transparent hover:border-gray-300 transition-colors duration-200">
          <MoveLeft className='left-arrow' />
        </button>
        </div>
        {sidebarOpen && (
          <div className="space-y-4">
            <div className='flex'>
            <button className="flex home-button text-left w-full px-2 py-1 bg-blue-500 text-white rounded">
              <HomeIcon className='home-icon'/> 
              <div className="home-text">
                Home
              </div>
            </button>
            </div>
            <div className="mt-4">
              <h2 className="font-bold text-gray-700 mb-2">Learning Sessions</h2>
              <ul className="space-y-2">
                <li><button className="text-left w-full text-blue-600 hover:underline">Intro to PPO</button></li>
                <li><button className="text-left w-full text-blue-600 hover:underline">Generalized Advantage Estimation</button></li>
                <li><button className="text-left w-full text-blue-600 hover:underline">Clipped Surrogate Loss</button></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Chat Messages Area */}
        <div className="flex-1 flex flex-col justify-center px-6">
          <div className="w-full max-w-3xl mx-auto">
            {messages.length === 1 ? (
              // Welcome state - single message centered
              <div className="text-center mb-8">
                <div className="inline-block border-gray-300 rounded-lg px-4 py-3 bg-white shadow-sm">
                  <p className="text-gray-800 text-lg">{messages[0].text}</p>
                </div>
              </div>
            ) : (
              // Conversation state - messages in chat format
              <div className="space-y-4 mb-8">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-sm px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 max-w-sm px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Fixed at bottom */}
        <div className="p-6 bg-white border-gray-100">
          <div className="w-full max-w-3xl mx-auto">
            <div className="block items-center bg-white border-gray-300 rounded-full px-4 py-2.5 shadow-sm">
              
              {/* Input field */}
              <Input />
 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
