'use client';

import { useState } from 'react';
import { MetaTags } from '@/components/SEO/MetaTags';
import { ChevronDown, ChevronUp, Phone, Mail, Clock, DollarSign, Shield, Home } from 'lucide-react';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: 'General Questions',
      icon: <Home className="h-6 w-6" />,
      questions: [
        {
          question: 'What areas do you serve in Austin?',
          answer: 'We proudly serve all of Austin and surrounding areas including Downtown, The Domain, West Lake Hills, Zilker, Tarrytown, Round Rock, Cedar Park, and Georgetown. We specialize in luxury high-rise condos and Airbnb properties.'
        },
        {
          question: 'Are you licensed and insured?',
          answer: 'Yes! Aura Spring Cleaning is fully licensed, bonded, and insured. We carry comprehensive liability insurance and all our cleaners are background-checked and professionally trained.'
        },
        {
          question: 'Do I need to be home during the cleaning?',
          answer: 'No, you don\'t need to be home. Many of our clients provide us with access instructions or lockbox codes. We\'re happy to work with your schedule and preferences.'
        },
        {
          question: 'What cleaning products do you use?',
          answer: 'We use eco-friendly, non-toxic cleaning products that are safe for children and pets. If you have specific product preferences or allergies, we\'re happy to accommodate your needs.'
        }
      ]
    },
    {
      title: 'Booking & Scheduling',
      icon: <Clock className="h-6 w-6" />,
      questions: [
        {
          question: 'How do I book a cleaning service?',
          answer: 'You can book online through our website, call us at (737) 330-1489, or fill out our contact form. We\'ll get back to you within 24 hours to confirm your appointment.'
        },
        {
          question: 'How far in advance should I book?',
          answer: 'We recommend booking at least 48 hours in advance, but we often have same-day availability. For move-in/out cleanings or deep cleans, we suggest booking 1 week ahead.'
        },
        {
          question: 'Can I schedule recurring cleanings?',
          answer: 'Absolutely! We offer weekly, bi-weekly, and monthly recurring cleaning services at discounted rates. Regular clients also get priority scheduling.'
        },
        {
          question: 'What if I need to cancel or reschedule?',
          answer: 'We understand plans change. Please give us at least 24 hours notice to cancel or reschedule without any fees. Same-day cancellations may incur a fee.'
        }
      ]
    },
    {
      title: 'Pricing & Payment',
      icon: <DollarSign className="h-6 w-6" />,
      questions: [
        {
          question: 'How much does a cleaning cost?',
          answer: 'Our pricing starts at $150 for standard cleaning, $225 for deep cleaning, and $270 for move-in/out cleaning. Final price depends on home size and specific needs. Use our online calculator for an instant quote!'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, Venmo, Zelle, and cash. Payment is due after the service is completed to your satisfaction.'
        },
        {
          question: 'Do you offer any discounts?',
          answer: 'Yes! We offer discounts for recurring services (10% for bi-weekly, 5% for monthly), first-time customers (15% off), and referrals. Military and senior discounts available.'
        },
        {
          question: 'Is tipping expected?',
          answer: 'Tipping is never required but always appreciated. If you\'re happy with your service, a 15-20% tip is customary in the cleaning industry.'
        }
      ]
    },
    {
      title: 'Service Details',
      icon: <Shield className="h-6 w-6" />,
      questions: [
        {
          question: 'What\'s included in a standard cleaning?',
          answer: 'Standard cleaning includes dusting all surfaces, vacuuming carpets and rugs, mopping floors, cleaning bathrooms (toilets, showers, sinks), kitchen cleaning (counters, stovetop, microwave exterior), and trash removal.'
        },
        {
          question: 'What\'s the difference between standard and deep cleaning?',
          answer: 'Deep cleaning includes everything in standard cleaning plus: baseboards, light fixtures, inside appliances, window sills, door frames, cabinet fronts, and detailed grout cleaning. It\'s perfect for first-time cleanings or spring cleaning.'
        },
        {
          question: 'Do you clean Airbnb properties?',
          answer: 'Yes! We specialize in Airbnb turnovers with same-day service available. We\'ll ensure your property is guest-ready with fresh linens, restocked supplies, and thorough cleaning between stays.'
        },
        {
          question: 'What should I do to prepare for a cleaning?',
          answer: 'Please pick up personal items, secure valuables, and provide clear access instructions. The more clutter-free your space, the more thorough our cleaning can be. Let us know about any special instructions or areas of focus.'
        }
      ]
    }
  ];

  let questionIndex = 0;

  return (
    <>
      <MetaTags 
        title="FAQ | Frequently Asked Questions | Aura Spring Cleaning"
        description="Get answers to common questions about our cleaning services, pricing, scheduling, and more. Austin's trusted cleaning service."
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Find answers to common questions about our cleaning services. Can't find what you're looking for? Contact us directly!
          </p>

          {/* FAQ Sections */}
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-green-600">{category.icon}</div>
                <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
              </div>
              
              <div className="space-y-3">
                {category.questions.map((item, itemIndex) => {
                  const currentIndex = questionIndex++;
                  const isOpen = openItems.includes(currentIndex);
                  
                  return (
                    <div
                      key={itemIndex}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(currentIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                      >
                        <span className="font-semibold text-gray-800">{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still Have Questions CTA */}
          <div className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="mb-6">
              Our friendly team is here to help! Reach out to us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:7373301489"
                className="flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                <Phone className="h-5 w-5" />
                (737) 330-1489
              </a>
              <a
                href="/contact"
                className="flex items-center justify-center gap-2 bg-green-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-900 transition"
              >
                <Mail className="h-5 w-5" />
                Contact Form
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Ready to book?</p>
            <div className="flex justify-center gap-4">
              <a
                href="/booking"
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                Book a Cleaning
              </a>
              <a
                href="/pricing"
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                View Pricing
              </a>
              <a
                href="/services"
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}