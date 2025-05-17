import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Menu } from 'lucide-react';

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-4">
          <Menu />
        </button>
        {sidebarOpen && (
          <div className="space-y-4">
            <button className="text-left w-full px-2 py-1 bg-blue-500 text-white rounded">🏠 Home</button>
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

      {/* Main Chat UI */}
      <div className="flex flex-col flex-1 max-w-5xl mx-auto bg-gray-50 border rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 shadow">
          <h1 className="text-xl font-bold">Chat Assistant</h1>
          <p className="text-sm text-blue-100">Online | Ready to help</p>
        </div>

        {/* Input area */}
        <div className="border-t border-gray-300 p-4 bg-white">
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100"><Paperclip size={20} /></button>
            <div className="flex-1 mx-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={1}
              />
            </div>
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100"><Mic size={20} /></button>
            <button
              onClick={handleSendMessage}
              className={`p-2 ml-2 rounded-full ${
                inputValue.trim() ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}
              disabled={!inputValue.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
