'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User,
  Calendar,
  Clock,
  Home,
  Sparkles,
  DollarSign,
  Check,
  ChevronRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  options?: string[];
  isTyping?: boolean;
}

interface BookingData {
  step: 'initial' | 'service' | 'bedrooms' | 'frequency' | 'addOns' | 'date' | 'time' | 'contact' | 'confirm';
  service?: string;
  bedrooms?: number;
  bathrooms?: number;
  frequency?: string;
  addOns?: string[];
  date?: string;
  time?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({ step: 'initial' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasGreeted, setHasGreeted] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      const initialMessage: Message = {
        id: '1',
        text: "Hi! I'm your Aura Spring booking assistant! 🏠✨ I can help you book a cleaning service right here in the chat. Plus, you'll get $5 off for booking online! Would you like to schedule a cleaning?",
        sender: 'bot',
        timestamp: new Date(),
        options: ['Book a Cleaning', 'Get a Quote', 'Ask a Question', 'View Services']
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, hasGreeted]);

  const calculatePrice = (data: Partial<BookingData>): number => {
    let basePrice = 89; // Studio base
    
    if (data.bedrooms === 1) basePrice = 109;
    else if (data.bedrooms === 2) basePrice = 139;
    else if (data.bedrooms === 3) basePrice = 169;
    else if (data.bedrooms && data.bedrooms >= 4) basePrice = 199;

    // Add-on prices
    let addOnTotal = 0;
    if (data.addOns?.includes('deep-clean')) addOnTotal += 50;
    if (data.addOns?.includes('inside-oven')) addOnTotal += 25;
    if (data.addOns?.includes('inside-fridge')) addOnTotal += 25;
    if (data.addOns?.includes('laundry')) addOnTotal += 20;
    if (data.addOns?.includes('windows')) addOnTotal += 30;
    if (data.addOns?.includes('garage')) addOnTotal += 35;

    const subtotal = basePrice + addOnTotal;
    
    // Frequency discount
    let discount = 0;
    if (data.frequency === 'weekly') discount = 0.15;
    else if (data.frequency === 'biweekly') discount = 0.10;
    else if (data.frequency === 'monthly') discount = 0.05;
    
    const discountAmount = subtotal * discount;
    const firstTimeDiscount = 5; // $5 off for booking online
    
    return Math.max(subtotal - discountAmount - firstTimeDiscount, 49);
  };

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(0)}`;
  };

  const handleOptionClick = (option: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Process the option
    setTimeout(() => {
      processUserInput(option);
    }, 500);
  };

  const processUserInput = (input: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const lowerInput = input.toLowerCase();
      let response: Message;

      // Handle booking flow
      if (lowerInput.includes('book') || lowerInput.includes('schedule') || bookingData.step !== 'initial') {
        handleBookingFlow(input);
        return;
      }

      // Handle other queries
      if (lowerInput.includes('quote') || lowerInput.includes('price')) {
        response = {
          id: Date.now().toString(),
          text: "I'll help you get a personalized quote! Our prices start at $89 for studios. To give you an exact price, I'll need to know about your space. Would you like to start booking?",
          sender: 'bot',
          timestamp: new Date(),
          options: ['Start Booking', 'See Price List', 'Ask Another Question']
        };
      } else if (lowerInput.includes('services')) {
        response = {
          id: Date.now().toString(),
          text: "We offer: ✨ Standard Cleaning, 🏠 Deep Cleaning, 📦 Move In/Out, 🏢 Airbnb Turnover, and recurring services (weekly, bi-weekly, monthly). All with eco-friendly products!",
          sender: 'bot',
          timestamp: new Date(),
          options: ['Book Standard Clean', 'Book Deep Clean', 'Learn More']
        };
      } else if (lowerInput.includes('contact')) {
        response = {
          id: Date.now().toString(),
          text: "You can reach us at:\n📱 Text: (737) 330-1489\n✉️ Email: hello@auraspringcleaning.com\nOr book right here for instant confirmation and $5 off!",
          sender: 'bot',
          timestamp: new Date(),
          options: ['Book Now', 'Continue Chatting']
        };
      } else {
        response = {
          id: Date.now().toString(),
          text: "I'm here to help! You can book a cleaning, get a quote, or ask me anything about our services. What would you like to do?",
          sender: 'bot',
          timestamp: new Date(),
          options: ['Book a Cleaning', 'Get Pricing', 'Our Services', 'Contact Info']
        };
      }

      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleBookingFlow = (input: string) => {
    let response: Message;
    const lowerInput = input.toLowerCase();

    switch (bookingData.step) {
      case 'initial':
        setBookingData({ ...bookingData, step: 'service' });
        response = {
          id: Date.now().toString(),
          text: "Great! Let's get you scheduled. What type of cleaning do you need?",
          sender: 'bot',
          timestamp: new Date(),
          options: ['Standard Cleaning', 'Deep Cleaning', 'Move In/Out', 'Airbnb Turnover']
        };
        break;

      case 'service':
        const service = lowerInput.includes('deep') ? 'Deep Cleaning' :
                       lowerInput.includes('move') ? 'Move In/Out' :
                       lowerInput.includes('airbnb') ? 'Airbnb Turnover' : 'Standard Cleaning';
        setBookingData({ ...bookingData, service, step: 'bedrooms' });
        response = {
          id: Date.now().toString(),
          text: `Perfect! ${service} selected. How many bedrooms do you have?`,
          sender: 'bot',
          timestamp: new Date(),
          options: ['Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4+ Bedrooms']
        };
        break;

      case 'bedrooms':
        const bedrooms = lowerInput.includes('studio') ? 0 :
                        lowerInput.includes('1') ? 1 :
                        lowerInput.includes('2') ? 2 :
                        lowerInput.includes('3') ? 3 : 4;
        setBookingData({ ...bookingData, bedrooms, step: 'frequency' });
        response = {
          id: Date.now().toString(),
          text: "How often would you like us to clean? Recurring services get discounts!",
          sender: 'bot',
          timestamp: new Date(),
          options: ['One Time', 'Weekly (15% off)', 'Bi-Weekly (10% off)', 'Monthly (5% off)']
        };
        break;

      case 'frequency':
        const frequency = lowerInput.includes('weekly') && !lowerInput.includes('bi') ? 'weekly' :
                         lowerInput.includes('bi-weekly') || lowerInput.includes('biweekly') ? 'biweekly' :
                         lowerInput.includes('monthly') ? 'monthly' : 'onetime';
        setBookingData({ ...bookingData, frequency, step: 'addOns' });
        response = {
          id: Date.now().toString(),
          text: "Would you like any add-on services? (You can select multiple or skip)",
          sender: 'bot',
          timestamp: new Date(),
          options: ['Deep Clean +$50', 'Inside Oven +$25', 'Inside Fridge +$25', 'Skip Add-ons']
        };
        break;

      case 'addOns':
        const addOns: string[] = [];
        if (lowerInput.includes('deep')) addOns.push('deep-clean');
        if (lowerInput.includes('oven')) addOns.push('inside-oven');
        if (lowerInput.includes('fridge')) addOns.push('inside-fridge');
        setBookingData({ ...bookingData, addOns, step: 'date' });
        
        const price = calculatePrice({ ...bookingData, addOns });
        response = {
          id: Date.now().toString(),
          text: `Great! Your estimated price is ${formatPrice(price)} (includes $5 online discount!). When would you like your cleaning?`,
          sender: 'bot',
          timestamp: new Date(),
          options: ['Today', 'Tomorrow', 'This Week', 'Next Week']
        };
        break;

      case 'date':
        const date = lowerInput.includes('today') ? 'Today' :
                    lowerInput.includes('tomorrow') ? 'Tomorrow' :
                    lowerInput.includes('this week') ? 'This Week' : 'Next Week';
        setBookingData({ ...bookingData, date, step: 'time' });
        response = {
          id: Date.now().toString(),
          text: "What time works best for you?",
          sender: 'bot',
          timestamp: new Date(),
          options: ['Morning (8AM-12PM)', 'Afternoon (12PM-4PM)', 'Evening (4PM-7PM)']
        };
        break;

      case 'time':
        const time = lowerInput.includes('morning') ? 'Morning' :
                    lowerInput.includes('afternoon') ? 'Afternoon' : 'Evening';
        setBookingData({ ...bookingData, time, step: 'contact' });
        response = {
          id: Date.now().toString(),
          text: "Almost done! I'll need your contact information. Please type your full name:",
          sender: 'bot',
          timestamp: new Date()
        };
        break;

      case 'contact':
        if (!bookingData.name) {
          setBookingData({ ...bookingData, name: input });
          response = {
            id: Date.now().toString(),
            text: `Thanks ${input}! Now, what's your email address?`,
            sender: 'bot',
            timestamp: new Date()
          };
        } else if (!bookingData.email) {
          setBookingData({ ...bookingData, email: input });
          response = {
            id: Date.now().toString(),
            text: "Great! What's your phone number?",
            sender: 'bot',
            timestamp: new Date()
          };
        } else if (!bookingData.phone) {
          setBookingData({ ...bookingData, phone: input });
          response = {
            id: Date.now().toString(),
            text: "Finally, what's your service address?",
            sender: 'bot',
            timestamp: new Date()
          };
        } else if (!bookingData.address) {
          setBookingData({ ...bookingData, address: input, step: 'confirm' });
          const finalPrice = calculatePrice(bookingData);
          response = {
            id: Date.now().toString(),
            text: `Perfect! Here's your booking summary:\n\n📅 ${bookingData.date} - ${bookingData.time}\n🏠 ${bookingData.service}\n🛏️ ${bookingData.bedrooms} bedroom(s)\n🔄 ${bookingData.frequency === 'onetime' ? 'One Time' : bookingData.frequency}\n💰 Total: ${formatPrice(finalPrice)}\n📍 ${input}\n\nShall I confirm this booking?`,
            sender: 'bot',
            timestamp: new Date(),
            options: ['Confirm Booking', 'Make Changes', 'Cancel']
          };
        }
        break;

      case 'confirm':
        if (lowerInput.includes('confirm')) {
          // Here you would normally send to your backend
          response = {
            id: Date.now().toString(),
            text: `🎉 Booking confirmed! You've saved $5 by booking online!\n\nWe'll send a confirmation to ${bookingData.email} and text ${bookingData.phone}.\n\nOur team will arrive ${bookingData.date} during the ${bookingData.time} window.\n\nThank you for choosing Aura Spring Cleaning!`,
            sender: 'bot',
            timestamp: new Date(),
            options: ['Book Another', 'Done']
          };
          // Reset booking data
          setTimeout(() => {
            setBookingData({ step: 'initial' });
          }, 2000);
        } else if (lowerInput.includes('change')) {
          setBookingData({ step: 'initial' });
          response = {
            id: Date.now().toString(),
            text: "No problem! Let's start over. What would you like to change?",
            sender: 'bot',
            timestamp: new Date(),
            options: ['Start New Booking', 'Cancel']
          };
        } else {
          setBookingData({ step: 'initial' });
          response = {
            id: Date.now().toString(),
            text: "No worries! Feel free to book whenever you're ready. Is there anything else I can help you with?",
            sender: 'bot',
            timestamp: new Date(),
            options: ['Start New Booking', 'Ask a Question', 'Close Chat']
          };
        }
        break;

      default:
        response = {
          id: Date.now().toString(),
          text: "I'm here to help! Would you like to book a cleaning?",
          sender: 'bot',
          timestamp: new Date(),
          options: ['Book a Cleaning', 'Get a Quote', 'Our Services']
        };
    }

    setMessages(prev => [...prev, response]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    setTimeout(() => {
      processUserInput(inputValue);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#7c9768] to-[#8ca778] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#7c9768] to-[#8ca778] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="w-8 h-8" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-bold">Aura Booking Assistant</h3>
                  <p className="text-xs text-white/80">Book & Save $5 Online!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Bot className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.text}</p>
                      </div>
                      {message.options && (
                        <div className="mt-2 space-y-1">
                          {message.options.map((option, i) => (
                            <button
                              key={i}
                              onClick={() => handleOptionClick(option)}
                              className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors text-sm"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-gradient-to-r from-[#7c9768] to-[#8ca778] text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                💰 Save $5 by booking online!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}