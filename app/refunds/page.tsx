'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  RefreshCw,
  Shield,
  Star,
  ThumbsUp
} from 'lucide-react';

const RefundsPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const refundPolicies = [
    {
      id: 'satisfaction',
      title: '100% Satisfaction Guarantee',
      icon: Star,
      description: 'If you\'re not completely satisfied with our cleaning, we\'ll make it right.',
      details: [
        'We will return within 24 hours to re-clean any unsatisfactory areas at no charge',
        'If still unsatisfied after our return visit, we will provide a full refund',
        'Must be reported within 24 hours of service completion',
        'Applies to all regular, deep, and move-in/move-out cleaning services',
        'Photo documentation may be requested for quality assurance'
      ],
      timeframe: '24 hours to report issues',
      refundAmount: 'Full refund available'
    },
    {
      id: 'cancellation',
      title: 'Cancellation Refunds',
      icon: Calendar,
      description: 'Cancel your appointment and receive a refund based on our cancellation policy.',
      details: [
        'Cancellations 24+ hours in advance: Full refund',
        'Cancellations 12-24 hours in advance: 50% refund',
        'Cancellations less than 12 hours: No refund available',
        'Weather-related cancellations by Aura: Full refund',
        'Emergency cancellations will be reviewed case-by-case'
      ],
      timeframe: 'Based on cancellation timing',
      refundAmount: 'Varies by timing'
    },
    {
      id: 'service-failure',
      title: 'Service Failure Policy',
      icon: AlertTriangle,
      description: 'If we fail to provide the agreed-upon service due to our error.',
      details: [
        'Team arrives more than 2 hours late without notice: 25% refund',
        'Service cannot be completed due to our equipment failure: Full refund',
        'Wrong service type provided: Re-service + 50% refund',
        'Team fails to show up without 24-hour notice: Full refund + service credit',
        'Damage to property due to negligence: Full refund + repair coverage'
      ],
      timeframe: 'Immediate upon occurrence',
      refundAmount: 'Varies by situation'
    },
    {
      id: 'subscription',
      title: 'Recurring Service Refunds',
      icon: RefreshCw,
      description: 'For customers with weekly, bi-weekly, or monthly cleaning subscriptions.',
      details: [
        'Cancel subscription anytime with 48 hours notice',
        'Unused prepaid services will be refunded within 7 business days',
        'Promotional discounts may affect refund amounts',
        'One-time service add-ons are non-refundable once completed',
        'Paused subscriptions can be resumed within 90 days'
      ],
      timeframe: '48 hours notice required',
      refundAmount: 'Prorated refund'
    }
  ];

  const refundProcess = [
    {
      step: 1,
      title: 'Report Issue or Request',
      description: 'Contact us within the specified timeframe for your situation',
      icon: Phone,
      action: 'Call (512) 781-0527 or email'
    },
    {
      step: 2,
      title: 'Issue Review',
      description: 'We review your request and may schedule a return visit if applicable',
      icon: CheckCircle,
      action: 'Response within 2 hours'
    },
    {
      step: 3,
      title: 'Resolution Attempt',
      description: 'For satisfaction issues, we attempt to resolve with a return cleaning',
      icon: RefreshCw,
      action: 'Same or next day return'
    },
    {
      step: 4,
      title: 'Refund Processing',
      description: 'If refund is approved, payment is processed back to original method',
      icon: CreditCard,
      action: '3-5 business days'
    }
  ];

  const nonRefundableItems = [
    'Services completed to satisfaction (no quality issues reported within 24 hours)',
    'Cancellations made less than 12 hours before appointment',
    'Additional services requested and completed during the visit',
    'Travel fees for remote locations (if applicable)',
    'Third-party service fees (payment processing fees)'
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Refund Policy | Aura Spring Cleaning Austin TX - 100% Satisfaction Guarantee</title>
      <meta name="description" content="Refund Policy for Aura Spring Cleaning. 100% satisfaction guarantee, flexible cancellation policy, and transparent refund process for Austin cleaning services." />
      <meta name="keywords" content="refund policy, satisfaction guarantee, aura spring cleaning, austin cleaning service, money back guarantee, cancellation refund" />
      <meta name="robots" content="index, follow" />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <DollarSign className="w-16 h-16 text-emerald-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Refund Policy
            </h1>
            <p className="text-xl text-emerald-100 mb-4">
              100% satisfaction guaranteed - your peace of mind is our priority
            </p>
            <p className="text-lg text-emerald-200">
              Last updated: {currentDate}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-emerald-50 rounded-xl p-8 border border-emerald-200"
          >
            <h2 className="text-2xl font-bold text-gray-500 mb-4 flex items-center gap-2">
              <ThumbsUp className="w-6 h-6 text-emerald-600" />
              Our Commitment to You
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              At Aura Spring Cleaning, we stand behind every service with a 100% satisfaction 
              guarantee. We believe that exceptional cleaning service should give you complete 
              peace of mind, which is why we've created a comprehensive refund policy that 
              protects your investment.
            </p>
            <p className="text-gray-400 leading-relaxed">
              This policy outlines exactly when and how refunds are processed, ensuring 
              transparency and fairness for all our Austin-area customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Refund Policies */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-500 mb-4">
              Refund Scenarios
            </h2>
            <p className="text-lg text-gray-400">
              Clear guidelines for different refund situations
            </p>
          </div>

          <div className="space-y-6">
            {refundPolicies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                  <div className="flex items-center gap-3">
                    <policy.icon className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">
                      {policy.title}
                    </h3>
                  </div>
                  <p className="text-emerald-100 mt-2">{policy.description}</p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {policy.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-400 leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-gray-500">Timeframe:</span>
                      <span className="text-sm text-gray-400">{policy.timeframe}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-gray-500">Refund Amount:</span>
                      <span className="text-sm text-gray-400">{policy.refundAmount}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Process */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-4">
              How Our Refund Process Works
            </h3>
            <p className="text-lg text-gray-400">
              Simple, transparent steps to ensure quick resolution
            </p>
          </motion.div>

          <div className="space-y-6">
            {refundProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h4 className="text-lg font-bold text-gray-500 mb-2 flex items-center gap-2">
                    <step.icon className="w-5 h-5 text-emerald-600" />
                    {step.title}
                  </h4>
                  <p className="text-gray-400 mb-2">{step.description}</p>
                  <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                    {step.action}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-Refundable Items */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-yellow-50 rounded-xl p-8 border border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                Non-Refundable Items
              </h3>
              <p className="text-gray-400 mb-6">
                The following items are generally not eligible for refunds:
              </p>
              
              <ul className="space-y-3">
                {nonRefundableItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Even for items listed as non-refundable, we may make 
                  exceptions in extraordinary circumstances. Contact us to discuss your specific situation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Method Information */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
                Refund Processing Times
              </h3>
              <p className="text-gray-400 mb-6">
                Refunds are processed back to your original payment method:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-500 mb-3">Credit Cards</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Processing time: 3-5 business days</li>
                    <li>• May take additional 1-2 days to appear on statement</li>
                    <li>• Refunds appear as credits on your statement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-500 mb-3">Other Payment Methods</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Debit cards: 3-5 business days</li>
                    <li>• PayPal: 1-3 business days</li>
                    <li>• Cash payments: Check mailed within 5 business days</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4">
                Dispute Resolution
              </h3>
              <p className="text-gray-400 mb-4">
                If you disagree with our refund decision, we offer a fair dispute resolution process:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Request supervisor review within 48 hours of decision</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Provide additional documentation if available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Final decision communicated within 72 hours</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-6">
              Need to Request a Refund?
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              Our customer service team is ready to help resolve any issues quickly and fairly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:5127810527"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call (512) 781-0527
              </a>
              <a
                href="mailto:Refunds@AuraSpringCleaning.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 border-2 border-emerald-500 font-semibold rounded-lg hover:bg-emerald-50 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Email Refunds Team
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
              <h4 className="font-semibold text-gray-500 mb-2">Quick Response Guarantee</h4>
              <div className="flex items-center justify-center gap-2 text-emerald-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Response within 2 hours during business hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/terms"
              className="text-emerald-600 hover:text-teal-600 font-semibold"
            >
              Terms of Service
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/privacy"
              className="text-emerald-600 hover:text-teal-600 font-semibold"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/booking"
              className="text-emerald-600 hover:text-teal-600 font-semibold"
            >
              Book Service
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/"
              className="text-emerald-600 hover:text-teal-600 font-semibold"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RefundsPage;