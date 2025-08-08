'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Mail, 
  Phone,
  Cookie,
  Share2,
  AlertCircle,
  CheckCircle,
  UserCheck,
  FileText
} from 'lucide-react';

const PrivacyPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal identification information (name, address, phone number, email)',
        'Property details and access information for service delivery',
        'Payment information processed securely through third-party providers',
        'Service preferences and special requests',
        'Communication records for customer service purposes',
        'Website usage data through cookies and analytics (with consent)'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'Schedule and provide cleaning services at your property',
        'Process payments and maintain billing records',
        'Communicate about appointments, changes, and service updates',
        'Improve our services based on customer feedback',
        'Send marketing communications (with your consent)',
        'Ensure safety and security of our team and customers',
        'Comply with legal and regulatory requirements'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Share2,
      content: [
        'We never sell your personal information to third parties',
        'Limited sharing with service providers (payment processors, scheduling software)',
        'Background check companies for employee screening',
        'Insurance providers when necessary for claims',
        'Legal authorities when required by law',
        'Business partners for integrated services (with your consent)',
        'All third parties are bound by confidentiality agreements'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        'Industry-standard encryption for all data transmission',
        'Secure servers with regular security updates and monitoring',
        'Limited access to personal information on need-to-know basis',
        'Regular security audits and vulnerability assessments',
        'Secure disposal of physical documents and digital data',
        'Employee training on privacy and data protection',
        'Incident response procedures for any security breaches'
      ]
    },
    {
      id: 'cookies-tracking',
      title: 'Cookies & Website Tracking',
      icon: Cookie,
      content: [
        'Essential cookies for website functionality and security',
        'Analytics cookies to understand website usage (Google Analytics)',
        'Marketing cookies for advertising (with your consent)',
        'You can control cookie preferences through your browser settings',
        'Some features may not work if cookies are disabled',
        'Third-party cookies from social media and advertising platforms'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: UserCheck,
      content: [
        'Access: Request copies of your personal information',
        'Correction: Request corrections to inaccurate information',
        'Deletion: Request deletion of your personal information',
        'Portability: Request transfer of your data to another service',
        'Opt-out: Unsubscribe from marketing communications',
        'Complaints: File complaints with relevant privacy authorities',
        'These rights may be subject to certain legal limitations'
      ]
    }
  ];

  const dataRetention = [
    { type: 'Customer Records', period: '7 years after last service', reason: 'Business and tax purposes' },
    { type: 'Payment Information', period: '3 years', reason: 'Financial records and disputes' },
    { type: 'Marketing Data', period: 'Until opt-out', reason: 'Ongoing marketing consent' },
    { type: 'Website Analytics', period: '26 months', reason: 'Google Analytics standard retention' },
    { type: 'Communication Records', period: '3 years', reason: 'Customer service and quality assurance' }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Privacy Policy | Aura Spring Cleaning Austin TX - Data Protection</title>
      <meta name="description" content="Privacy Policy for Aura Spring Cleaning. Learn how we protect your personal information, secure your data, and respect your privacy rights in Austin, Texas." />
      <meta name="keywords" content="privacy policy, data protection, aura spring cleaning, austin cleaning service, customer privacy, secure cleaning service" />
      <meta name="robots" content="index, follow" />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#443474] via-purple-600 to-[#7c9768]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-purple-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-purple-100 mb-4">
              Your privacy is our priority. Here's how we protect your information.
            </p>
            <p className="text-lg text-purple-200">
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
            className="bg-purple-50 rounded-xl p-8 border border-purple-200"
          >
            <h2 className="text-2xl font-bold text-gray-500 mb-4">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              At Aura Spring Cleaning, we understand that when you invite us into your home, 
              you're entrusting us with more than just your cleaning needs - you're sharing 
              your personal space and information. We take this responsibility seriously.
            </p>
            <p className="text-gray-400 leading-relaxed">
              This Privacy Policy explains how we collect, use, protect, and handle your 
              personal information when you use our cleaning services or visit our website. 
              We are committed to transparency and giving you control over your information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
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
                <div className="bg-gradient-to-r from-[#443474] to-purple-600 p-6">
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
                        <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
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

      {/* Data Retention Schedule */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-6 text-center">
              Data Retention Schedule
            </h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-500">Information Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-500">Retention Period</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-500">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataRetention.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-400 font-medium">{item.type}</td>
                        <td className="py-3 px-4 text-gray-400">{item.period}</td>
                        <td className="py-3 px-4 text-gray-400 text-sm">{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Third Party Services */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4 flex items-center gap-2">
                <Share2 className="w-6 h-6 text-blue-600" />
                Third-Party Services We Use
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-500 mb-2">Payment Processing</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Stripe (credit cards)</li>
                    <li>• Square (mobile payments)</li>
                    <li>• PayPal (online payments)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-500 mb-2">Analytics & Marketing</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Google Analytics</li>
                    <li>• Facebook Pixel</li>
                    <li>• Microsoft Clarity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-500 mb-2">Communication</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Azure Communication Services</li>
                    <li>• Microsoft Graph API</li>
                    <li>• Email service providers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-500 mb-2">Business Tools</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Microsoft Dynamics 365</li>
                    <li>• SharePoint</li>
                    <li>• Azure cloud services</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4">
                Children's Privacy
              </h3>
              <p className="text-gray-400 mb-4">
                Our services are not intended for children under 18. We do not knowingly 
                collect personal information from children under 18. If we learn that we 
                have collected personal information from a child under 18, we will delete 
                that information promptly.
              </p>
              <p className="text-gray-400">
                If you believe we may have collected information from a child under 18, 
                please contact us immediately.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-8 border border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-500 mb-4">
                Changes to This Policy
              </h3>
              <p className="text-gray-400 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in 
                our practices, services, or legal requirements. We will notify you of any 
                material changes by posting the updated policy on our website.
              </p>
              <p className="text-gray-400">
                We encourage you to review this Privacy Policy periodically to stay 
                informed about how we protect your information.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-6">
              Questions About Your Privacy?
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              We're committed to transparency. Contact us with any privacy-related questions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:5127810527"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#443474] to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call (512) 781-0527
              </a>
              <a
                href="mailto:Privacy@AuraSpringCleaning.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#443474] border-2 border-[#443474] font-semibold rounded-lg hover:bg-[#443474] hover:text-white transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Email Privacy Team
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h4 className="font-semibold text-gray-500 mb-2">Privacy Officer</h4>
              <p className="text-gray-400">
                Aura Spring Cleaning<br />
                Privacy Compliance Department<br />
                Austin, TX<br />
                Privacy@AuraSpringCleaning.com
              </p>
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
              className="text-[#443474] hover:text-purple-600 font-semibold"
            >
              Terms of Service
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/cookies"
              className="text-[#443474] hover:text-purple-600 font-semibold"
            >
              Cookie Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/"
              className="text-[#443474] hover:text-purple-600 font-semibold"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPage;