'use client';

import { useState } from 'react';
import { MetaTags } from '@/components/SEO/MetaTags';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Console Ninja will show these inline
    console.group('📧 Contact Form Submission');
    console.log('Customer:', formData.name);
    console.log('Phone:', formData.phone);
    console.log('Service:', formData.service || 'Not specified');
    console.log('Sending to Valerie:', 'valerie@auraspringcleaning.com');
    console.time('Form submission');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        console.log('✅ Success! Valerie notified at (512) 781-0527');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        console.error('❌ Failed to send to Valerie');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setSubmitStatus('error');
    } finally {
      console.timeEnd('Form submission');
      console.groupEnd();
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MetaTags 
        title="Contact Us | Aura Spring Cleaning Austin"
        description="Get in touch with Austin's premier cleaning service. Call (737) 330-1489 or fill out our contact form for a free quote."
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-green-600" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:7373301489" className="text-blue-600 hover:underline">
                      (737) 330-1489
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="text-green-600" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@auraspringcleaning.com" className="text-blue-600 hover:underline">
                      info@auraspringcleaning.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="text-green-600" />
                  <div>
                    <p className="font-semibold">Service Area</p>
                    <p>Austin, TX & Surrounding Areas</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="text-green-600" />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p>Mon-Fri: 8AM-6PM</p>
                    <p>Sat-Sun: 9AM-5PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
                  Thank you! We'll get back to you within 24 hours.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                  Something went wrong. Please try again or call us directly.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border rounded"
                />
                
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border rounded"
                />
                
                <input
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 border rounded"
                />
                
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full p-3 border rounded"
                >
                  <option value="">Select Service</option>
                  <option value="regular">Regular Cleaning</option>
                  <option value="deep">Deep Cleaning</option>
                  <option value="move">Move In/Out</option>
                  <option value="airbnb">Airbnb Cleaning</option>
                </select>
                
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 border rounded"
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}