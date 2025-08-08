'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  Calendar, 
  CreditCard, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';

const TermsPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const sections = [
    {
      id: 'services',
      title: 'Services Provided',
      icon: Shield,
      content: [
        'Aura Spring Cleaning provides residential cleaning services in Austin, Texas and surrounding areas.',
        'Services include regular house cleaning, deep cleaning, move-in/move-out cleaning, Airbnb cleaning, commercial cleaning, and post-construction cleaning.',
        'All services are performed by trained, background-checked, and insured professionals.',
        'We reserve the right to refuse service for safety or health concerns.'
      ]
    },
    {
      id: 'booking',
      title: 'Booking & Scheduling',
      icon: Calendar,
      content: [
        'Bookings must be made at least 24 hours in advance, though same-day service may be available.',
        'All appointments are subject to availability and confirmation.',
        'Customers must provide accurate contact information and property access details.',
        'We require someone 18+ to be present during the first cleaning service.'
      ]
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: CreditCard,
      content: [
        'Payment is due at the time of service unless other arrangements have been made.',
        'We accept cash, check, credit cards, and electronic payments.',
        'A 3% processing fee applies to credit card transactions.',
        'Late payments may incur a $25 fee after 30 days.',
        'Returned checks incur a $35 fee plus any bank charges.'
      ]
    },
    {
      id: 'cancellation',
      title: 'Cancellation & Rescheduling',
      icon: AlertTriangle,
      content: [
        'Cancellations must be made at least 24 hours before scheduled service.',
        'Cancellations with less than 24 hours notice may incur a $50 fee.',
        'No-shows will be charged the full service amount.',
        'Weather-related cancellations by Aura Spring Cleaning will not incur fees.',
        'Recurring services can be paused or cancelled with 48 hours notice.'
      ]
    },
    {
      id: 'liability',
      title: 'Liability & Insurance',
      icon: Shield,
      content: [
        'Aura Spring Cleaning is fully licensed, bonded, and insured.',
        'We carry general liability insurance covering damage to your property.',
        'Customers must report any damage or issues within 24 hours of service.',
        'Our liability is limited to the cost of the cleaning service.',
        'We are not responsible for pre-existing damage or wear and tear.',
        'Valuable or fragile items should be secured before our arrival.'
      ]
    },
    {
      id: 'customer',
      title: 'Customer Responsibilities',
      icon: Users,
      content: [
        'Ensure safe and clear access to all areas to be cleaned.',
        'Secure or remove valuable, fragile, or personal items.',
        'Provide working utilities (electricity, water) at the property.',
        'Inform us of any pets, allergies, or special requirements.',
        'Report any issues or concerns within 24 hours of service.',
        'Maintain a respectful environment for our cleaning professionals.'
      ]
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Terms of Service | Aura Spring Cleaning Austin TX</title>
      <meta name="description" content="Terms of Service for Aura Spring Cleaning. Licensed, insured, and professional cleaning services in Austin, Texas. Clear policies for booking, payment, and service delivery." />
      <meta name="robots" content="index, follow" />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#7c9768] via-green-600 to-[#443474]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <FileText className="w-16 h-16 text-green-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-green-100 mb-4">
              Clear, fair terms for Austin's premier cleaning service
            </p>
            <p className="text-lg text-green-200">
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
            className="bg-green-50 rounded-xl p-8 border border-green-200"
          >
            <h2 className="text-2xl font-bold text-gray-500 mb-4">
              Welcome to Aura Spring Cleaning
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              These Terms of Service govern your use of services provided by Aura Spring Cleaning, 
              a professional cleaning service operating in Austin, Texas and surrounding areas. 
              By booking our services, you agree to these terms.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We believe in transparency and fairness. These terms are designed to ensure 
              excellent service delivery while protecting both our customers and our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                id={section.id}
              >
                <div className="bg-gradient-to-r from-[#7c9768] to-green-600 p-6">
                  <div className="flex items-center gap-3">
                    <section.icon className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">
                      {section.title}
                    </h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-400 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Terms */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-purple-50 rounded-xl p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-purple-600" />
                Service Guarantee & Quality Assurance
              </h3>
              <div className="space-y-4 text-gray-400">
                <p>
                  We stand behind our work with a 100% satisfaction guarantee. If you're not 
                  completely satisfied with our service, we will return within 24 hours to 
                  address any concerns at no additional charge.
                </p>
                <p>
                  Our quality assurance program includes regular training, supervision, and 
                  customer feedback reviews to ensure consistent, exceptional service.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4">
                Privacy & Confidentiality
              </h3>
              <div className="space-y-4 text-gray-400">
                <p>
                  We respect your privacy and maintain strict confidentiality regarding your 
                  home and personal information. Our team is trained to maintain professional 
                  discretion at all times.
                </p>
                <p>
                  For more details on how we collect, use, and protect your information, 
                  please see our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-8 border border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4">
                Modification of Terms
              </h3>
              <p className="text-gray-400 mb-4">
                Aura Spring Cleaning reserves the right to modify these terms at any time. 
                Changes will be effective immediately upon posting to our website. Continued 
                use of our services constitutes acceptance of modified terms.
              </p>
              <p className="text-gray-400">
                We will make reasonable efforts to notify customers of significant changes 
                to these terms via email or through our website.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-8 border border-red-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4">
                Dispute Resolution
              </h3>
              <p className="text-gray-400 mb-4">
                Any disputes arising from these terms or our services will first be addressed 
                through good faith negotiations. If resolution cannot be reached, disputes 
                will be resolved through binding arbitration in Travis County, Texas.
              </p>
              <p className="text-gray-400">
                These terms are governed by Texas state law and any applicable federal laws.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-6">
              Questions About Our Terms?
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              We're here to help clarify any questions about our terms of service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5127810527"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7c9768] to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call (512) 781-0527
              </a>
              <a
                href="mailto:Schedule@AuraSpringCleaning.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#7c9768] border-2 border-[#7c9768] font-semibold rounded-lg hover:bg-[#7c9768] hover:text-white transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#7c9768] hover:text-green-600 font-semibold"
          >
            ← Return to Homepage
          </Link>
        </div>
      </section>
    </>
  );
};

export default TermsPage;