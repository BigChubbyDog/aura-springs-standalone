'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Star, 
  Quote, 
  ThumbsUp,
  Heart,
  Calendar,
  MapPin,
  Filter,
  CheckCircle,
  Phone,
  Mail,
  Award,
  Users,
  Clock,
  Building2,
  Home,
  Sparkles
} from 'lucide-react';

const TestimonialsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Martinez',
      location: 'Downtown Austin - The Austonian',
      service: 'Regular Cleaning',
      rating: 5,
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c27b5ecf?q=80&w=500',
      quote: 'Aura Spring Cleaning has completely transformed my weekly routine. I used to spend my entire Saturday cleaning, and now I get to spend it paddleboarding on Lady Bird Lake. The team is incredibly professional and my condo has never looked better!',
      highlights: ['Professional Team', 'Reliable Service', 'Great Value'],
      category: 'regular'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'The Domain - Luxury Condos',
      service: 'Airbnb Cleaning',
      rating: 5,
      date: '2024-01-20',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500',
      quote: 'As an Airbnb host with multiple properties in The Domain, Aura has been a game-changer. Their turnaround time is incredible - they can flip my units between guests in just 2 hours. My ratings have improved significantly since switching to them.',
      highlights: ['Fast Turnaround', 'Consistent Quality', 'Airbnb Expertise'],
      category: 'airbnb'
    },
    {
      id: 3,
      name: 'Jennifer Rodriguez',
      location: 'South Congress - Historic Home',
      service: 'Deep Cleaning',
      rating: 5,
      date: '2024-02-01',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500',
      quote: 'After a major home renovation, I needed a deep clean that would tackle construction dust and debris. The Aura team went above and beyond - they even cleaned inside my light fixtures! Worth every penny.',
      highlights: ['Attention to Detail', 'Post-Construction Expertise', 'Thorough Work'],
      category: 'deep'
    },
    {
      id: 4,
      name: 'David Thompson',
      location: 'East Austin - Modern Townhome',
      service: 'Move-in Cleaning',
      rating: 5,
      date: '2024-02-10',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500',
      quote: 'Moving is stressful enough without having to worry about cleaning. Aura took care of everything - both my old place for the deposit return and my new place so it was perfect when we moved in. Seamless experience!',
      highlights: ['Move-in/Move-out', 'Deposit Protection', 'Stress-Free Service'],
      category: 'movein'
    },
    {
      id: 5,
      name: 'Amanda Foster',
      location: 'Westlake Hills - Family Home',
      service: 'Regular Cleaning',
      rating: 5,
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500',
      quote: 'With two young kids and demanding careers, keeping our home clean was overwhelming. The Aura team treats our home like their own - they even organize my kids\' toys! Now our Sundays are for family time, not chores.',
      highlights: ['Family-Friendly', 'Organizing Services', 'Reliable Schedule'],
      category: 'regular'
    },
    {
      id: 6,
      name: 'Robert Kim',
      location: 'Rainey Street - High-rise Condo',
      service: 'Commercial Cleaning',
      rating: 5,
      date: '2024-02-20',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500',
      quote: 'My law firm has used several cleaning services, but Aura is in a league of their own. Professional, discreet, and incredibly thorough. Our clients always comment on how pristine our office looks.',
      highlights: ['Commercial Expertise', 'Professional Discretion', 'Client Satisfaction'],
      category: 'commercial'
    },
    {
      id: 7,
      name: 'Lisa Park',
      location: 'Cedar Park - Suburban Home',
      service: 'Deep Cleaning',
      rating: 5,
      date: '2024-03-01',
      image: 'https://images.unsplash.com/photo-1580894736036-7c91db0c5aa0?q=80&w=500',
      quote: 'I was skeptical about hiring a cleaning service, but after my first deep clean with Aura, I was sold. They found dirt in places I didn\'t even know existed! Now I have them come monthly and my allergies have significantly improved.',
      highlights: ['Health Benefits', 'Monthly Service', 'Eco-Friendly Products'],
      category: 'deep'
    },
    {
      id: 8,
      name: 'Carlos Mendoza',
      location: 'Mueller - New Development',
      service: 'Regular Cleaning',
      rating: 5,
      date: '2024-03-05',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500',
      quote: 'The communication is outstanding - they text when they\'re on their way, they\'re always on time, and they use eco-friendly products which was important to us. Fair pricing for premium service.',
      highlights: ['Great Communication', 'Eco-Friendly', 'Fair Pricing'],
      category: 'regular'
    },
    {
      id: 9,
      name: 'Taylor Wilson',
      location: 'Travis Heights - Bungalow',
      service: 'Airbnb Cleaning',
      rating: 5,
      date: '2024-03-10',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500',
      quote: 'Managing multiple Airbnb properties was becoming overwhelming until I found Aura. They handle all my turnovers flawlessly - restocking supplies, deep cleaning between guests, and even basic maintenance checks. My guest reviews improved immediately!',
      highlights: ['Multi-Property Management', 'Supply Restocking', 'Guest Satisfaction'],
      category: 'airbnb'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Reviews', count: testimonials.length },
    { id: 'regular', label: 'Regular Cleaning', count: testimonials.filter(t => t.category === 'regular').length },
    { id: 'deep', label: 'Deep Cleaning', count: testimonials.filter(t => t.category === 'deep').length },
    { id: 'airbnb', label: 'Airbnb Cleaning', count: testimonials.filter(t => t.category === 'airbnb').length },
    { id: 'movein', label: 'Move-in/out', count: testimonials.filter(t => t.category === 'movein').length },
    { id: 'commercial', label: 'Commercial', count: testimonials.filter(t => t.category === 'commercial').length }
  ];

  const filteredTestimonials = selectedFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedFilter);

  const stats = [
    { number: '4.9★', label: 'Average Rating', sublabel: 'From 500+ reviews' },
    { number: '98%', label: 'Satisfaction Rate', sublabel: 'Customer happiness' },
    { number: '24hrs', label: 'Response Time', sublabel: 'For any concerns' },
    { number: '100%', label: 'Guarantee', sublabel: 'Your satisfaction' }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Customer Testimonials | Aura Spring Cleaning Austin TX - 4.9★ Reviews</title>
      <meta name="description" content="Read authentic reviews from Austin customers. 4.9-star rated cleaning service with 500+ happy customers. See why Austin families choose Aura Spring Cleaning." />
      <meta name="keywords" content="aura spring cleaning reviews, austin cleaning service testimonials, customer reviews, 5 star cleaning service austin, best cleaning service austin texas" />
      <meta name="robots" content="index, follow" />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Star className="w-16 h-16 text-yellow-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Customer Testimonials
            </h1>
            <p className="text-xl text-yellow-100 mb-4 max-w-3xl mx-auto">
              Discover why Austin families trust Aura Spring Cleaning for their homes
            </p>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
              {renderStars(5)}
              <span className="ml-2">4.9 out of 5 stars</span>
            </div>
            <p className="text-lg text-yellow-200 mt-2">
              Based on 500+ verified reviews
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
              >
                <div className="text-3xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-500">{stat.label}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-500 mb-4">
              Filter Reviews by Service
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-white text-gray-400 border border-gray-300 hover:border-orange-500'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-500">{testimonial.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">
                        <MapPin className="w-3 h-3" />
                        <span>{testimonial.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Service Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium mb-4">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {testimonial.service}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-4">
                    <Quote className="w-8 h-8 text-orange-200 absolute -top-2 -left-2" />
                    <p className="text-gray-400 leading-relaxed pl-6 italic">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-4">
                    {testimonial.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-400">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Date */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gray-500">What Our Customers </span>
              <span className="text-orange-600">Love Most</span>
            </h2>
            <p className="text-lg text-gray-400">
              The most commonly mentioned benefits in our reviews
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: 'Time Savings', description: 'Average 5+ hours saved per cleaning', count: '89%' },
              { icon: ThumbsUp, title: 'Reliability', description: 'Always on time and consistent', count: '94%' },
              { icon: Sparkles, title: 'Attention to Detail', description: 'Thorough cleaning every time', count: '96%' },
              { icon: Heart, title: 'Trustworthy Team', description: 'Professional and respectful staff', count: '98%' }
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200"
              >
                <highlight.icon className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <h3 className="text-lg font-bold text-gray-500 mb-2">{highlight.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{highlight.description}</p>
                <div className="text-2xl font-bold text-orange-600">{highlight.count}</div>
                <div className="text-xs text-gray-500">of customers mention this</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a Review CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Love Our Service?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Share your experience and help other Austin families discover great cleaning service
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.google.com/search?q=aura+spring+cleaning+austin+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Star className="w-5 h-5" />
              Leave a Google Review
            </a>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              Book Your Service
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-6">
              Ready to Join Our Happy Customers?
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              Experience the service that Austin families rave about
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5127810527"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call (512) 781-0527
              </a>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 border-2 border-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Book Online
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;