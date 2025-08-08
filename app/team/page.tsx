'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Star,
  Clock,
  Shield,
  Heart,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Quote,
  Briefcase,
  Calendar,
  Target,
  Zap,
  Coffee,
  Dog,
  Music
} from 'lucide-react';

const TeamPage = () => {
  const founders = [
    {
      name: 'Dustin Allan',
      role: 'Co-Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500',
      bio: 'With 12+ years in Austin real estate and business development, Dustin brings deep local market knowledge and operational expertise to Aura Spring Cleaning.',
      expertise: ['Business Strategy', 'Operations Management', 'Customer Relations', 'Local Market Expertise'],
      austinLife: 'Paddleboarding at sunrise on Lady Bird Lake, hiking the Greenbelt with his dogs',
      email: 'dustin@auraspringcleaning.com',
      quote: 'Austin deserves a cleaning service that understands the lifestyle. We\'re not just cleaning homes - we\'re giving people time back to enjoy this amazing city.',
      achievements: ['12+ Years Real Estate Experience', 'Local Business Leader', 'Community Volunteer']
    },
    {
      name: 'Valerie Boatman',
      role: 'Co-Founder & COO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500',
      bio: 'Valerie brings precision, care, and attention to detail that ensures every home becomes a true sanctuary. Her operational excellence drives our quality standards.',
      expertise: ['Quality Assurance', 'Team Training', 'Client Experience', 'Operational Excellence'],
      austinLife: 'Morning yoga at Zilker Park, exploring farmers markets, live music on Rainey Street',
      email: 'valerie@auraspringcleaning.com',
      quote: 'Every home should be a retreat from the world. We create spaces that restore your energy and peace of mind.',
      achievements: ['Operations Excellence Award', 'Team Leadership Expert', 'Customer Service Champion']
    }
  ];

  const teamMembers = [
    {
      name: 'Maria Rodriguez',
      role: 'Lead Cleaning Specialist',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c27b5ecf?q=80&w=500',
      experience: '8 years',
      specialties: ['Deep Cleaning', 'Luxury Condos', 'Eco-Friendly Products'],
      quote: 'I take pride in making every home sparkle. Your satisfaction is my mission.',
      languages: ['English', 'Spanish']
    },
    {
      name: 'Jennifer Chen',
      role: 'Senior Cleaning Specialist',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500',
      experience: '6 years',
      specialties: ['Move-in/Move-out', 'Airbnb Turnovers', 'Detail Work'],
      quote: 'Every detail matters. I clean every home like it\'s my own.',
      languages: ['English', 'Mandarin']
    },
    {
      name: 'Sarah Johnson',
      role: 'Cleaning Specialist',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500',
      experience: '4 years',
      specialties: ['Regular Maintenance', 'Pet-Friendly Homes', 'Green Cleaning'],
      quote: 'Creating clean, healthy spaces where families can thrive.',
      languages: ['English']
    },
    {
      name: 'Amanda White',
      role: 'Customer Success Manager',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500',
      experience: '5 years',
      specialties: ['Client Relations', 'Scheduling', 'Quality Assurance'],
      quote: 'Your experience matters. I\'m here to ensure everything is perfect.',
      languages: ['English']
    },
    {
      name: 'Carlos Mendoza',
      role: 'Operations Coordinator',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500',
      experience: '7 years',
      specialties: ['Team Coordination', 'Supply Management', 'Route Optimization'],
      quote: 'Behind every great clean is great teamwork and organization.',
      languages: ['English', 'Spanish']
    },
    {
      name: 'Lisa Park',
      role: 'Quality Inspector',
      image: 'https://images.unsplash.com/photo-1580894736036-7c91db0c5aa0?q=80&w=500',
      experience: '3 years',
      specialties: ['Quality Control', 'Training', 'Standards Development'],
      quote: 'Excellence isn\'t an act, it\'s a habit. We perfect every detail.',
      languages: ['English', 'Korean']
    }
  ];

  const teamValues = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Every team member is background-checked, bonded, and insured for your peace of mind.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We maintain the highest standards through continuous training and quality assurance.'
    },
    {
      icon: Heart,
      title: 'Care & Respect',
      description: 'We treat every home and family with the utmost care and respect they deserve.'
    },
    {
      icon: Clock,
      title: 'Reliability',
      description: 'Consistent, punctual service you can count on, every single time.'
    }
  ];

  const stats = [
    { number: '15,000+', label: 'Hours of Training', sublabel: 'Continuous education' },
    { number: '500+', label: 'Happy Families', sublabel: 'Served monthly' },
    { number: '4.9★', label: 'Customer Rating', sublabel: 'Consistently excellent' },
    { number: '100%', label: 'Background Checked', sublabel: 'Safety guaranteed' }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Our Team | Aura Spring Cleaning Austin TX - Meet Our Expert Cleaning Professionals</title>
      <meta name="description" content="Meet the expert cleaning professionals at Aura Spring Cleaning. Background-checked, trained, and insured team members dedicated to exceptional service in Austin, Texas." />
      <meta name="keywords" content="cleaning team austin, professional cleaners, aura spring cleaning staff, experienced cleaning professionals, austin cleaning experts, dustin allan, valerie boatman" />
      <meta name="robots" content="index, follow" />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#7c9768] via-green-600 to-emerald-600">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Users className="w-16 h-16 text-green-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-green-100 mb-4 max-w-3xl mx-auto">
              The passionate professionals who transform Austin homes into pristine sanctuaries
            </p>
            <p className="text-lg text-green-200">
              Background-checked • Trained • Insured • Local Austin Experts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Stats */}
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
                className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
              >
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-500">{stat.label}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-500">Meet Our </span>
              <span className="text-green-600">Founders</span>
            </h2>
            <p className="text-xl text-gray-400">
              Austin locals with a passion for excellence and community
            </p>
          </motion.div>
          
          <div className="space-y-16">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-cols-2' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={500}
                      height={600}
                      className="rounded-xl shadow-2xl object-cover"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg">
                      <Briefcase className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-500 mb-2">{founder.name}</h3>
                    <p className="text-xl text-green-600 font-semibold mb-4">{founder.role}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                    <Quote className="w-6 h-6 text-green-600 mb-3" />
                    <p className="text-lg italic text-gray-400 leading-relaxed">
                      "{founder.quote}"
                    </p>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {founder.bio}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-500 mb-2">Areas of Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {founder.expertise.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <Coffee className="w-4 h-4" />
                        Austin Life:
                      </h4>
                      <p className="text-blue-700 text-sm">{founder.austinLife}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-500">Achievements:</h4>
                      <ul className="space-y-1">
                        {founder.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <Award className="w-4 h-4 text-green-600" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <a 
                      href={`mailto:${founder.email}`}
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
                    >
                      <Mail className="w-4 h-4" />
                      {founder.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-green-100">
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center text-white border border-white/20"
              >
                <value.icon className="w-12 h-12 mx-auto mb-4 text-green-200" />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-green-100 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-500">Our Amazing </span>
              <span className="text-green-600">Team Members</span>
            </h2>
            <p className="text-xl text-gray-400">
              Experienced professionals dedicated to your satisfaction
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-green-300">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-500">
                      {member.experience} experience
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-500 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, i) => (
                        <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <Quote className="w-4 h-4 text-green-600 mb-2" />
                    <p className="text-sm italic text-gray-400">
                      "{member.quote}"
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-500 text-sm mb-1">Languages:</h4>
                    <div className="flex gap-2">
                      {member.languages.map((language, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Standards */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gray-500">Our </span>
              <span className="text-green-600">Hiring Standards</span>
            </h2>
            <p className="text-lg text-gray-400">
              We maintain the highest standards to ensure your safety and satisfaction
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Background Checks', description: 'Comprehensive criminal background screening' },
              { icon: CheckCircle, title: 'Reference Verification', description: 'Previous employer and personal references' },
              { icon: Star, title: 'Skills Assessment', description: 'Practical cleaning skills evaluation' },
              { icon: Award, title: 'Ongoing Training', description: 'Continuous education and certification' }
            ].map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
              >
                <standard.icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-bold text-gray-500 mb-2">{standard.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{standard.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            We're always looking for passionate professionals who share our values
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Target className="w-5 h-5" />
              View Career Opportunities
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call About Jobs
            </a>
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
              Get to Know Us Better
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              Have questions about our team or want to meet us? We'd love to connect!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                Our Story
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 border-2 border-green-600 font-semibold rounded-lg hover:bg-green-50 transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Schedule Service
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;