'use client';

import { useState, useEffect } from 'react';
import { X, Gift, Sparkles } from 'lucide-react';

interface SubtleEmailCaptureProps {
  delay?: number; // Delay before showing (in ms)
}

export default function SubtleEmailCapture({ delay = 8000 }: SubtleEmailCaptureProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user hasn't already signed up
      const hasSignedUp = localStorage.getItem('email_capture_completed');
      const lastDismissed = localStorage.getItem('email_capture_dismissed');
      
      if (hasSignedUp) return;
      
      // Don't show if dismissed in the last 7 days
      if (lastDismissed) {
        const dismissedDate = new Date(lastDismissed);
        const daysSinceDismissed = (new Date().getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceDismissed < 7) return;
      }
      
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('email_capture_dismissed', new Date().toISOString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to API
      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        localStorage.setItem('email_capture_completed', 'true');
        
        // Hide after success
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Email submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  // Minimized state - just a small bubble with blink
  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 left-6 z-40 animate-fadeIn">
        <button
          onClick={() => setIsExpanded(true)}
          className="relative bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group"
        >
          {/* Blinking indicator */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
          </span>
          
          <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold">Get 20% Off + Free Checklist</span>
          <Sparkles className="w-4 h-4 animate-pulse" />
        </button>
        
        {/* Small close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 bg-white text-gray-500 rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close offer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Expanded state - show form
  return (
    <div className="fixed bottom-6 left-6 z-40 animate-slideUp">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm relative">
        <button
          onClick={() => {
            setIsExpanded(false);
            handleClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Gift className="w-6 h-6 text-[#7c9768]" />
                Special Offer!
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Get 20% off your first cleaning + FREE cleaning checklist
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                required
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Get My Discount'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                No spam, unsubscribe anytime
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Success!</h3>
            <p className="text-sm text-gray-600 mt-1">
              Check your email for your discount code
            </p>
          </div>
        )}
      </div>
    </div>
  );
}