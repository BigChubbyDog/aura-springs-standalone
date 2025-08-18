'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  MessageSquareText, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'general',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7c9768]/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#7c9768]">Aura Spring</h2>
                <p className="text-sm text-gray-500">Cleaning Excellence</p>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#7c9768] to-[#8ca778] bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to experience the Aura Spring difference? We&apos;re here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Book Online - Primary CTA */}
            <div className="bg-gradient-to-br from-[#7c9768] to-[#6a8556] text-white rounded-2xl p-8 transform hover:scale-105 transition-all">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Book Online</h3>
              <p className="mb-6 text-white/90">
                The fastest way to schedule your cleaning! Get instant confirmation and save $5 on your first booking.
              </p>
              <Link 
                href="/booking"
                className="inline-flex items-center gap-2 bg-white text-[#7c9768] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Text to Teams */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#7c9768]/20">
              <div className="flex items-center justify-center w-16 h-16 bg-[#7c9768]/10 rounded-full mb-6">
                <MessageSquareText className="w-8 h-8 text-[#7c9768]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Text Us</h3>
              <p className="text-gray-600 mb-6">
                Send us a text and we&apos;ll respond right away through Microsoft Teams!
              </p>
              <a 
                href="sms:7373301489"
                className="inline-flex items-center gap-2 text-[#7c9768] font-semibold hover:text-[#6a8556] transition-colors"
              >
                (737) 330-1489 <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-sm text-gray-500 mt-2">SMS enabled for US/Canada</p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Email Us</h3>
              <p className="text-gray-600 mb-6">
                Have questions? We typically respond within 2-4 hours during business hours.
              </p>
              <a 
                href="mailto:hello@auraspringcleaning.com"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                hello@auraspringcleaning.com
              </a>
            </div>
          </div>

          {/* Emergency Contact - Only on Contact Page */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-16">
            <div className="flex items-start gap-4">
              <Phone className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Need Immediate Assistance?</h3>
                <p className="text-gray-700 mb-3">
                  For urgent cleaning needs or last-minute bookings, you can reach Valerie directly:
                </p>
                <a 
                  href="tel:5127810527"
                  className="inline-flex items-center gap-2 text-red-600 font-bold text-lg hover:text-red-700 transition-colors"
                >
                  (512) 781-0527 - Valerie Boatman, Co-Founder
                </a>
                <p className="text-sm text-gray-600 mt-2 italic">
                  Note: For the fastest service and to receive our online booking discount, we recommend using our online booking system.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-2 text-center">Send Us a Message</h2>
              <p className="text-gray-600 text-center mb-8">
                Fill out the form below and we&apos;ll get back to you shortly
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-700">Thank you! We&apos;ll be in touch soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">Something went wrong. Please try again or call us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="standard">Standard Cleaning</option>
                      <option value="deep">Deep Cleaning</option>
                      <option value="moveout">Move In/Out</option>
                      <option value="airbnb">Airbnb Cleaning</option>
                      <option value="commercial">Commercial</option>
                      <option value="subscription">Weekly/Bi-weekly Service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                    placeholder="Tell us about your cleaning needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#7c9768] to-[#8ca778] text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Business Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-[#7c9768] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Service Area</h3>
              <p className="text-gray-600">
                Austin, TX & Surrounding Areas<br />
                Downtown, South Congress, East Austin<br />
                West Lake Hills, Cedar Park, The Domain
              </p>
            </div>

            <div className="text-center">
              <Clock className="w-8 h-8 text-[#7c9768] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Business Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 4:00 PM<br />
                Sunday: By appointment only
              </p>
            </div>

            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-[#7c9768] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Response Time</h3>
              <p className="text-gray-600">
                Online Bookings: Instant confirmation<br />
                Text Messages: Within 30 minutes<br />
                Emails: 2-4 hours during business hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}