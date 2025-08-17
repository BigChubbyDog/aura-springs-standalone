'use client';

import { useState } from 'react';
import { X, Download, CheckCircle, Mail, Sparkles } from 'lucide-react';

interface EmailCaptureProps {
  variant?: 'popup' | 'inline' | 'sidebar' | 'exit-intent';
  delay?: number; // Delay before showing popup (in ms)
  onClose?: () => void;
}

export default function EmailCapture({ variant = 'popup', delay = 5000, onClose }: EmailCaptureProps) {
  const [isVisible, setIsVisible] = useState(variant === 'inline');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Show popup after delay
  useState(() => {
    if (variant === 'popup' && !hasInteracted) {
      const timer = setTimeout(() => {
        // Check if user hasn't already signed up or recently dismissed
        const hasSignedUp = localStorage.getItem('email_capture_completed');
        const lastDismissed = localStorage.getItem('email_capture_dismissed');
        
        // Don't show if signed up
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
    }
  }, [variant, delay, hasInteracted]);

  // Exit intent detection
  useState(() => {
    if (variant === 'exit-intent') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasInteracted) {
          const hasSignedUp = localStorage.getItem('email_capture_completed');
          const lastDismissed = localStorage.getItem('email_capture_dismissed');
          
          // Don't show if signed up
          if (hasSignedUp) return;
          
          // Don't show if dismissed in the last 7 days
          if (lastDismissed) {
            const dismissedDate = new Date(lastDismissed);
            const daysSinceDismissed = (new Date().getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
            if (daysSinceDismissed < 7) return;
          }
          
          setIsVisible(true);
          setHasInteracted(true);
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [variant, hasInteracted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Track conversion events
      if (typeof window !== 'undefined') {
        // Google Analytics
        if (window.gtag) {
          window.gtag('event', 'generate_lead', {
            currency: 'USD',
            value: 10, // Estimated value of lead
          });
        }

        // Meta Pixel - Track Lead event
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Cleaning Checklist Download',
            content_category: 'Lead Magnet',
            value: 150.00, // Average customer value
            currency: 'USD',
          });
        }

        // Google Ads
        if (window.gtag && process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) {
          window.gtag('event', 'conversion', {
            send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL}`,
            value: 10,
            currency: 'USD',
          });
        }
      }

      // Send to API endpoint
      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          source: 'cleaning-checklist',
          variant,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      // Mark as completed
      localStorage.setItem('email_capture_completed', 'true');
      localStorage.setItem('email_capture_date', new Date().toISOString());

      // Show success state
      setIsSuccess(true);

      // Redirect to the checklist page after a short delay
      setTimeout(() => {
        window.location.href = '/resources/cleaning-checklist';
      }, 2000);

    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Email capture error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setHasInteracted(true);
    // Store dismissal in localStorage to prevent showing again too soon
    localStorage.setItem('email_capture_dismissed', new Date().toISOString());
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const content = (
    <div className={`bg-white rounded-2xl shadow-2xl ${variant === 'popup' ? 'p-8 max-w-lg w-full' : 'p-6'}`}>
      {/* Close button for popup */}
      {variant === 'popup' && (
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {!isSuccess ? (
        <>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-sage-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Get Your Free Cleaning Checklist!
            </h3>
            <p className="text-gray-600">
              Join 5,000+ Austin homeowners who keep their homes spotless with our Ultimate Room-by-Room Cleaning Checklist
            </p>
          </div>

          {/* Benefits */}
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Professional cleaning techniques for every room</span>
            </li>
            <li className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Time-saving tips from cleaning experts</span>
            </li>
            <li className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Printable format for easy reference</span>
            </li>
            <li className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span>Plus: 20% off your first cleaning service!</span>
            </li>
          </ul>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-sage-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Get Free Checklist
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                No Thanks
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </>
      ) : (
        // Success state
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Success! Here's Your Checklist
          </h3>
          <p className="text-gray-600 mb-4">
            We're taking you to your free cleaning checklist now. We've also sent a copy to your email along with your 20% off coupon!
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to your checklist...
          </p>
        </div>
      )}
    </div>
  );

  // Render based on variant
  if (variant === 'popup' || variant === 'exit-intent') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
        {content}
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="absolute -left-12 top-1/2 transform -translate-y-1/2 rotate-90 bg-sage-600 text-white px-4 py-2 rounded-t-lg shadow-lg hover:bg-sage-700 transition-colors"
        >
          <Mail className="w-5 h-5 inline mr-2" />
          Free Checklist
        </button>
        <div className={`transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
          {content}
        </div>
      </div>
    );
  }

  // Inline variant
  return content;
}

// Extend window interface
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}