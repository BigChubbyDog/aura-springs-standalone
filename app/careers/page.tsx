'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Award,
  Heart,
  Shield,
  TrendingUp,
  Calendar,
  CheckCircle,
  Star,
  Phone,
  Mail,
  Send,
  FileText,
  Target,
  Coffee,
  Sparkles
} from 'lucide-react';

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: ''
  });

  const jobOpenings = [
    {
      id: 1,
      title: 'House Cleaning Specialist',
      type: 'Full-Time',
      location: 'Austin, TX',
      salary: '$18-24/hour + tips',
      experience: 'Entry Level Welcome',
      description: 'Join our team as a House Cleaning Specialist and help Austin families reclaim their time while maintaining beautiful, pristine homes.',
      responsibilities: [
        'Perform thorough residential cleaning services in luxury homes and condos',
        'Follow detailed cleaning checklists and quality standards',
        'Interact professionally with clients and address special requests',
        'Maintain cleaning equipment and supplies',
        'Work efficiently in team settings',
        'Communicate any issues or concerns promptly'
      ],
      requirements: [
        'Reliable transportation and valid driver\'s license',
        'Ability to lift 25+ pounds and stand for extended periods',
        'Strong attention to detail and pride in quality work',
        'Professional communication skills',
        'Background check and drug screening required',
        'Previous cleaning experience preferred but not required'
      ],
      benefits: [
        'Starting pay $18-24/hour based on experience',
        'Performance bonuses and client tips',
        'Flexible scheduling options',
        'Paid training program',
        'Health insurance contributions',
        'Career advancement opportunities'
      ]
    },
    {
      id: 2,
      title: 'Team Lead / Senior Cleaner',
      type: 'Full-Time',
      location: 'Austin, TX',
      salary: '$22-28/hour + bonuses',
      experience: '2+ Years Experience',
      description: 'Lead a team of cleaning professionals while ensuring exceptional service delivery across Austin\'s most prestigious residential properties.',
      responsibilities: [
        'Lead and mentor a team of 2-4 cleaning specialists',
        'Ensure quality standards are met on every job',
        'Handle complex cleaning challenges and special requests',
        'Train new team members on procedures and standards',
        'Conduct quality inspections and client walk-throughs',
        'Manage team schedules and route optimization'
      ],
      requirements: [
        '2+ years of professional cleaning experience',
        'Leadership and team management skills',
        'Excellent problem-solving abilities',
        'Strong customer service orientation',
        'Ability to work independently and make decisions',
        'Clean driving record and reliable vehicle'
      ],
      benefits: [
        'Starting pay $22-28/hour plus leadership bonuses',
        'Performance-based pay increases',
        'Health and dental insurance',
        'Paid vacation and sick time',
        'Leadership development opportunities',
        'Company vehicle allowance'
      ]
    },
    {
      id: 3,
      title: 'Airbnb Cleaning Specialist',
      type: 'Part-Time/Full-Time',
      location: 'Austin, TX',
      salary: '$20-26/hour + tips',
      experience: '1+ Years Experience',
      description: 'Specialize in rapid turnovers for Airbnb and vacation rental properties, ensuring guests have exceptional experiences.',
      responsibilities: [
        'Complete rapid cleaning turnovers between guests (2-3 hour windows)',
        'Restock amenities and supplies according to property specifications',
        'Perform quality checks and photo documentation',
        'Coordinate with property managers and hosts',
        'Handle last-minute bookings and urgent requests',
        'Maintain high standards despite tight timeframes'
      ],
      requirements: [
        'Experience with vacation rental or hospitality cleaning',
        'Ability to work quickly and efficiently under pressure',
        'Flexible schedule including weekends and holidays',
        'Strong organizational and multitasking skills',
        'Smartphone for communication and photo documentation',
        'Understanding of hospitality standards'
      ],
      benefits: [
        'Higher hourly rates for specialized service',
        'Flexible scheduling to fit your lifestyle',
        'Opportunity for additional weekend/holiday pay',
        'Training on hospitality cleaning standards',
        'Direct relationships with property owners',
        'Performance bonuses for exceptional service'
      ]
    },
    {
      id: 4,
      title: 'Customer Success Coordinator',
      type: 'Full-Time',
      location: 'Austin, TX (Remote Options Available)',
      salary: '$45,000-55,000/year',
      experience: '2+ Years Customer Service',
      description: 'Ensure exceptional customer experiences by coordinating services, managing schedules, and building lasting relationships with Austin families.',
      responsibilities: [
        'Manage customer bookings and schedule coordination',
        'Handle customer inquiries and resolve service issues',
        'Conduct follow-up calls and satisfaction surveys',
        'Coordinate with cleaning teams for special requests',
        'Maintain customer database and service records',
        'Identify opportunities for service improvements'
      ],
      requirements: [
        '2+ years in customer service or hospitality',
        'Excellent written and verbal communication skills',
        'Proficiency with CRM software and scheduling systems',
        'Strong problem-solving and conflict resolution skills',
        'Detail-oriented with strong organizational abilities',
        'Experience in service-based business preferred'
      ],
      benefits: [
        'Competitive salary with performance bonuses',
        'Health, dental, and vision insurance',
        'Paid time off and holidays',
        'Remote work flexibility',
        'Professional development opportunities',
        'Growth path to management roles'
      ]
    }
  ];

  const companyBenefits = [
    {
      icon: DollarSign,
      title: 'Competitive Pay',
      description: 'Above-market wages with regular performance reviews and raises'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear advancement paths from cleaner to team lead to management'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Work-life balance with scheduling that fits your needs'
    },
    {
      icon: Shield,
      title: 'Full Benefits',
      description: 'Health insurance, paid time off, and workers compensation'
    },
    {
      icon: Award,
      title: 'Training & Development',
      description: 'Comprehensive paid training and ongoing skill development'
    },
    {
      icon: Heart,
      title: 'Positive Culture',
      description: 'Supportive team environment where everyone is valued'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit to your backend
    alert('Thank you for your interest! We will contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      message: ''
    });
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Careers | Aura Spring Cleaning Austin TX - Join Our Team</title>
      <meta name="description" content="Join the Aura Spring Cleaning team! Great pay, flexible schedules, full benefits, and career growth opportunities. Now hiring cleaning specialists, team leads, and coordinators in Austin, TX." />
      <meta name="keywords" content="cleaning jobs austin, aura spring cleaning careers, house cleaner jobs, team lead positions, customer service jobs austin, flexible work schedule" />
      <meta name="robots" content="index, follow" />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#443474] via-purple-600 to-[#7c9768]">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Briefcase className="w-16 h-16 text-purple-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-purple-100 mb-4 max-w-3xl mx-auto">
              Build a rewarding career while helping Austin families create beautiful, clean homes
            </p>
            <p className="text-lg text-purple-200">
              Great Pay • Flexible Schedule • Career Growth • Full Benefits
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-500">Why Choose </span>
              <span className="text-purple-600">Aura Spring?</span>
            </h2>
            <p className="text-xl text-gray-400">
              Join Austin's premier cleaning company and grow your career
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-green-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-500 mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Job Openings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Current Job Openings
            </h2>
            <p className="text-lg text-gray-400">
              Find the perfect role that matches your skills and schedule
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-500 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{job.experience}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                      className="mt-4 lg:mt-0 px-6 py-3 bg-gradient-to-r from-purple-600 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      {selectedJob === job.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {selectedJob === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6 pt-6 border-t border-gray-200"
                    >
                      <div>
                        <h4 className="text-lg font-semibold text-gray-500 mb-3">Responsibilities:</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-400 text-sm">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-500 mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Target className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-400 text-sm">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-500 mb-3">Benefits:</h4>
                        <ul className="space-y-2">
                          {job.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-400 text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <a
                          href="#apply"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          <Send className="w-4 h-4" />
                          Apply for This Position
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Testimonial */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616c27b5ecf?q=80&w=150"
                alt="Employee testimonial"
                width={80}
                height={80}
                className="rounded-full mx-auto mb-4"
              />
              <p className="text-xl italic mb-4 leading-relaxed">
                "Working at Aura has been amazing! The flexible schedule lets me take care of my family while building a career I'm proud of. The training was thorough, my teammates are supportive, and I genuinely love helping Austin families."
              </p>
              <div className="text-lg font-semibold">Maria Rodriguez</div>
              <div className="text-purple-200">Lead Cleaning Specialist, 3 years with Aura</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join Our Team?
            </h2>
            <p className="text-lg text-gray-400">
              Submit your application and we'll contact you within 24 hours
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-purple-50 to-green-50 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-500 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-500 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-500 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-gray-500 mb-2">
                    Position of Interest *
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select a position</option>
                    {jobOpenings.map((job) => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                    <option value="other">Other / General Interest</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-semibold text-gray-500 mb-2">
                  Relevant Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 2 years house cleaning, 5 years customer service"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-500 mb-2">
                  Why do you want to work with Aura Spring Cleaning?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your interest in joining our team..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-green-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-6">
              Have Questions About Our Opportunities?
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              Our HR team is here to help you find the perfect fit
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5127810527"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call (512) 781-0527
              </a>
              <a
                href="mailto:Careers@AuraSpringCleaning.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Email HR Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CareersPage;