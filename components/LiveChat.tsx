'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, Phone, Mail } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  name?: string;
}

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
}

export default function LiveChat({ 
  position = 'bottom-right',
  primaryColor = '#7c9768'
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! 👋 Welcome to Aura Spring Cleaning! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      name: 'Aura Assistant'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history from localStorage
  useEffect(() => {
    const savedChat = localStorage.getItem('chat_history');
    if (savedChat) {
      const parsed = JSON.parse(savedChat);
      setMessages(parsed.messages || []);
      setUserName(parsed.userName || '');
      setUserEmail(parsed.userEmail || '');
      setHasStartedChat(parsed.hasStartedChat || false);
    }

    // Show chat widget after delay
    const timer = setTimeout(() => {
      if (!savedChat) {
        setUnreadCount(1);
      }
    }, 10000); // Show after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  // Save chat history
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('chat_history', JSON.stringify({
        messages,
        userName,
        userEmail,
        hasStartedChat,
        timestamp: Date.now()
      }));
    }
  }, [messages, userName, userEmail, hasStartedChat]);

  // Handle opening chat
  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
    
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chat_opened', {
        event_category: 'engagement',
      });
    }
  };

  // Send message
  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      name: userName || 'You'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Bot response logic
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        name: 'Aura Assistant'
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);

    // Track message
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chat_message_sent', {
        event_category: 'engagement',
      });
    }
  };

  // Get bot response based on user input
  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('how much')) {
      return 'Our pricing starts at $89 for studio apartments, $109 for 1-bedroom, and $139 for 2-bedroom units. We also offer discounts for recurring services! Would you like a custom quote?';
    }
    
    if (lowerInput.includes('book') || lowerInput.includes('schedule') || lowerInput.includes('appointment')) {
      return 'I can help you book a cleaning! You can book online at aurasprings.com/booking or I can connect you with our booking team. What works best for you?';
    }
    
    if (lowerInput.includes('tower') || lowerInput.includes('quincy') || lowerInput.includes('rainey')) {
      return 'Yes! We specialize in cleaning luxury towers near Rainey Street including The Quincy, 70 Rainey, The Shore, and more. We offer special rates for tower residents. Which building are you in?';
    }
    
    if (lowerInput.includes('same day') || lowerInput.includes('today') || lowerInput.includes('emergency')) {
      return 'We do offer same-day service based on availability! Please call us at (512) 781-0527 for immediate booking, or I can have someone call you back. What\'s your phone number?';
    }
    
    if (lowerInput.includes('eco') || lowerInput.includes('green') || lowerInput.includes('chemical')) {
      return 'We exclusively use eco-friendly, non-toxic cleaning products that are safe for your family, pets, and the environment. All our products are biodegradable and EPA-approved!';
    }
    
    if (lowerInput.includes('cancel') || lowerInput.includes('reschedule')) {
      return 'You can cancel or reschedule your cleaning up to 24 hours before your appointment without any fees. Would you like me to help you with that?';
    }
    
    if (lowerInput.includes('thank') || lowerInput.includes('bye') || lowerInput.includes('goodbye')) {
      return 'You\'re welcome! Feel free to reach out anytime. Have a wonderful day! 🌟';
    }
    
    return 'I\'d be happy to help with that! For the quickest assistance, you can call us at (512) 781-0527 or book online. Is there anything specific about our cleaning services you\'d like to know?';
  };

  // Start chat with user info
  const startChat = () => {
    if (!userName.trim() || !userEmail.trim()) return;
    
    setHasStartedChat(true);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: `Nice to meet you, ${userName}! How can I help you today?`,
      sender: 'bot',
      timestamp: new Date(),
      name: 'Aura Assistant'
    }]);

    // Send to backend
    fetch('/api/chat-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, email: userEmail }),
    }).catch(console.error);
  };

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-4 right-4' 
    : 'bottom-4 left-4';

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className={`fixed ${positionClasses} z-50 bg-sage-600 text-white rounded-full p-4 shadow-2xl hover:bg-sage-700 transition-all duration-300 hover:scale-110`}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className={`fixed ${positionClasses} z-50 ${isMinimized ? 'h-14' : 'h-[600px]'} w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-sage-600 to-sage-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-semibold">Aura Spring Cleaning</h3>
                <p className="text-xs opacity-90">We typically reply instantly</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white"
                aria-label="Minimize"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      {message.sender !== 'user' && (
                        <p className="text-xs text-gray-500 mb-1">{message.name}</p>
                      )}
                      <div className={`p-3 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-sage-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {!hasStartedChat ? (
                <div className="p-4 border-t">
                  <p className="text-sm text-gray-600 mb-3">Please provide your details to start chatting:</p>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                  <button
                    onClick={startChat}
                    disabled={!userName.trim() || !userEmail.trim()}
                    className="w-full bg-sage-600 text-white py-2 rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Start Chat
                  </button>
                </div>
              ) : (
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputText.trim()}
                      className="bg-sage-600 text-white p-2 rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-3">
                    <a
                      href="tel:512-781-0527"
                      className="flex-1 flex items-center justify-center gap-1 text-xs text-sage-600 hover:text-sage-700 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      Call Us
                    </a>
                    <a
                      href="mailto:hello@aurasprings.com"
                      className="flex-1 flex items-center justify-center gap-1 text-xs text-sage-600 hover:text-sage-700 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      Email Us
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}