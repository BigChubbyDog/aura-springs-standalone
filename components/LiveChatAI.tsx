'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, Phone, Mail, AlertCircle, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  name?: string;
  isEscalation?: boolean;
}

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
}

export default function LiveChatAI({ 
  position = 'bottom-right',
  primaryColor = '#7c9768'
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! 👋 I\'m Aura, your AI cleaning assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      name: 'Aura AI'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sessionId] = useState(`chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [isEscalated, setIsEscalated] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history from localStorage
  useEffect(() => {
    const savedChat = localStorage.getItem('chat_history_ai');
    if (savedChat) {
      const parsed = JSON.parse(savedChat);
      setMessages(parsed.messages || []);
      setUserName(parsed.userName || '');
      setUserEmail(parsed.userEmail || '');
      setUserPhone(parsed.userPhone || '');
      setHasStartedChat(parsed.hasStartedChat || false);
    }

    // Show chat widget after delay
    const timer = setTimeout(() => {
      if (!savedChat) {
        setUnreadCount(1);
      }
    }, 15000); // Show after 15 seconds

    // Check AI status
    fetch('/api/chat')
      .then(res => res.json())
      .then(data => setIsConnected(data.status === 'online'))
      .catch(() => setIsConnected(false));

    return () => clearTimeout(timer);
  }, []);

  // Save chat history
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('chat_history_ai', JSON.stringify({
        messages,
        userName,
        userEmail,
        userPhone,
        hasStartedChat,
        sessionId,
        timestamp: Date.now()
      }));
    }
  }, [messages, userName, userEmail, userPhone, hasStartedChat, sessionId]);

  // Handle opening chat
  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
    
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ai_chat_opened', {
        event_category: 'engagement',
      });
    }
  };

  // Send message to AI
  const sendMessage = async () => {
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

    try {
      // Prepare conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));

      // Call AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputText,
          sessionId,
          userName,
          userEmail,
          userPhone,
          conversationHistory,
          isNewChat: messages.length === 1
        })
      });

      const data = await response.json();
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
        name: 'Aura AI'
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Handle escalation
      if (data.shouldEscalate) {
        setIsEscalated(true);
        
        // Add escalation message
        if (data.escalationMessage) {
          const escalationMsg: Message = {
            id: (Date.now() + 2).toString(),
            text: data.escalationMessage,
            sender: 'bot',
            timestamp: new Date(),
            name: 'System',
            isEscalation: true
          };
          setMessages(prev => [...prev, escalationMsg]);
        }
      }

    } catch (error) {
      console.error('AI Chat error:', error);
      
      // Fallback message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I\'m having trouble connecting. Please call (512) 781-0527 for immediate assistance.',
        sender: 'bot',
        timestamp: new Date(),
        name: 'System'
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsConnected(false);
    } finally {
      setIsTyping(false);
    }

    // Track message
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ai_chat_message', {
        event_category: 'engagement',
      });
    }
  };

  // Start chat with user info
  const startChat = async () => {
    if (!userName.trim()) return;
    
    setHasStartedChat(true);
    
    // Welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Nice to meet you, ${userName}! I\'m powered by AI to help you with all your cleaning needs. What can I help you with today?`,
      sender: 'bot',
      timestamp: new Date(),
      name: 'Aura AI'
    };
    
    setMessages(prev => [...prev, welcomeMessage]);

    // Notify Teams about new chat
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'New chat started',
          sessionId,
          userName,
          userEmail,
          userPhone,
          conversationHistory: [],
          isNewChat: true
        })
      });
    } catch (error) {
      console.error('Failed to notify Teams:', error);
    }
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
          className={`fixed ${positionClasses} z-50 bg-sage-600 text-white rounded-full p-4 shadow-2xl hover:bg-sage-700 transition-all duration-300 hover:scale-110 animate-pulse`}
          aria-label="Open AI chat"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <Bot className="w-3 h-3 absolute -bottom-1 -right-1 bg-white text-sage-600 rounded-full" />
          </div>
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
              <div className={`w-3 h-3 ${isConnected ? 'bg-green-400' : 'bg-yellow-400'} rounded-full animate-pulse`}></div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  Aura AI Assistant
                  <Bot className="w-4 h-4" />
                </h3>
                <p className="text-xs opacity-90">
                  {isEscalated ? 'Connecting to Valerie...' : 'AI-Powered Instant Help'}
                </p>
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
              {/* Connection Status */}
              {!isConnected && (
                <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-xs text-yellow-800">
                    Limited connection. Call (512) 781-0527 for immediate help.
                  </span>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      {message.sender !== 'user' && (
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          {message.name}
                          {message.sender === 'bot' && <Bot className="w-3 h-3" />}
                          {message.isEscalation && <AlertCircle className="w-3 h-3 text-red-500" />}
                        </p>
                      )}
                      <div className={`p-3 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-sage-600 text-white' 
                          : message.isEscalation
                          ? 'bg-red-50 text-red-900 border border-red-200'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
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
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-sage-600 animate-pulse" />
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {!hasStartedChat ? (
                <div className="p-4 border-t">
                  <p className="text-sm text-gray-600 mb-3">Quick start - just enter your name:</p>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && startChat()}
                    className="w-full px-3 py-2 border rounded-lg mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                  <button
                    onClick={startChat}
                    disabled={!userName.trim()}
                    className="w-full bg-sage-600 text-white py-2 rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Bot className="w-4 h-4" />
                    Start AI Chat
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
                      placeholder={isEscalated ? "Valerie will respond soon..." : "Ask me anything..."}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
                      disabled={!isConnected}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputText.trim() || !isConnected}
                      className="bg-sage-600 text-white p-2 rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setInputText('I need a quote for my home')}
                      className="text-xs px-2 py-1 bg-sage-50 text-sage-700 rounded-lg hover:bg-sage-100"
                    >
                      Get Quote
                    </button>
                    <button
                      onClick={() => setInputText('Book cleaning for today')}
                      className="text-xs px-2 py-1 bg-sage-50 text-sage-700 rounded-lg hover:bg-sage-100"
                    >
                      Book Today
                    </button>
                    <button
                      onClick={() => setInputText('Talk to a human')}
                      className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
                    >
                      Human Help
                    </button>
                  </div>

                  {/* Contact Options */}
                  <div className="flex gap-2 mt-2 pt-2 border-t">
                    <a
                      href="tel:512-781-0527"
                      className="flex-1 flex items-center justify-center gap-1 text-xs text-sage-600 hover:text-sage-700 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      Call Valerie
                    </a>
                    <a
                      href="mailto:valerie@auraspringcleaning.com"
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