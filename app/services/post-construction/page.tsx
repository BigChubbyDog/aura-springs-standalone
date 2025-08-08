'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  HardHat, 
  Sparkles, 
  CheckCircle,
  AlertTriangle,
  Shield,
  Clock,
  Star,
  Award,
  Phone,
  Calendar,
  Mail,
  MapPin,
  DollarSign,
  Users,
  Zap,
  Eye,
  Wrench,
  Home,
  Building2,
  Hammer,
  Paintbrush,
  Drill
} from 'lucide-react';

const PostConstructionPage = () => {
  const cleaningServices = [
    {
      category: 'Debris & Dust Removal',
      icon: HardHat,
      services: [
        'Construction dust removal from all surfaces',
        'Debris and material cleanup',
        'Drywall dust elimination',
        'Paint splatter and overspray removal',
        'Sawdust and wood shaving cleanup',
        'Hardware and screw removal'
      ]
    },
    {
      category: 'Deep Surface Cleaning',
      icon: Sparkles,
      services: [
        'Window cleaning (inside and outside)',
        'Light fixture and ceiling fan cleaning',
        'Baseboards and trim detailing',
        'Door frame and hardware polishing',
        'Switch plate and outlet cleaning',
        'Vent and HVAC register cleaning'
      ]
    },
    {
      category: 'Floor & Wall Restoration',
      icon: Home,
      services: [
        'Hardwood floor deep cleaning and polishing',
        'Tile and grout restoration',
        'Carpet deep cleaning or removal prep',
        'Wall washing and paint touch-ups',
        'Stain removal from all surfaces',
        'Protective coating application'
      ]
    },
    {
      category: 'Kitchen & Bathroom Detailing',
      icon: Wrench,
      services: [
        'Appliance cleaning inside and out',
        'Cabinet interior and exterior cleaning',
        'Countertop polishing and sealing',
        'Plumbing fixture deep cleaning',
        'Tile backsplash restoration',
        'Mirror and glass surface polishing'
      ]
    },
    {
      category: 'Final Inspection & Touch-ups',
      icon: Eye,
      services: [
        'Comprehensive quality inspection',
        'Detail touch-ups as needed',
        'Client walk-through preparation',
        'Move-in ready certification',
        'Documentation and photography',
        'Warranty and guarantee provision'
      ]
    }
  ];

  const constructionTypes = [
    {
      type: 'New Home Construction',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000',
      description: 'Complete cleaning of newly built homes from foundation to roof',
      features: ['Dust-free move-in ready condition', 'All surfaces detailed', 'HVAC system cleaning', 'Exterior cleanup included'],
      timeframe: '2-4 days',
      pricing: 'Starting at $1,200'
    },
    {
      type: 'Home Renovations',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=2000',
      description: 'Specialized cleaning for kitchen, bathroom, and room renovations',
      features: ['Dust containment removal', 'Paint and material cleanup', 'Fixture restoration', 'Furniture protection'],
      timeframe: '1-2 days',
      pricing: 'Starting at $400'
    },
    {
      type: 'Commercial Construction',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000',
      description: 'Professional cleaning for office buildings, retail spaces, and commercial properties',
      features: ['Large-scale dust removal', 'Industrial equipment cleaning', 'Safety compliance', 'Flexible scheduling'],
      timeframe: '3-7 days',
      pricing: 'Custom quote'
    },
    {
      type: 'Remodeling Projects',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2000',
      description: 'Thorough cleanup after addition, extension, or major remodeling work',
      features: ['Multi-room coordination', 'Progressive cleaning stages', 'Dust barrier removal', 'Final detailing'],
      timeframe: '1-3 days',
      pricing: 'Starting at $600'
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Construction Cleaning Experts',
      description: 'Specialized training and equipment for post-construction challenges'
    },
    {
      icon: Shield,
      title: 'Fully Insured & Licensed',
      description: 'Complete protection for your new investment'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Quick completion so you can move in or open on schedule'
    },
    {
      icon: Star,
      title: 'Move-in Ready Guarantee',
      description: 'Your space will be pristine and ready for immediate use'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Initial Assessment',
      description: 'We evaluate the construction site and create a detailed cleaning plan',
      icon: Eye
    },
    {
      step: 2,
      title: 'Debris Removal',
      description: 'Large debris, materials, and construction waste are removed first',
      icon: HardHat
    },
    {
      step: 3,
      title: 'Dust & Detail Clean',
      description: 'Thorough dust removal and detailed cleaning of all surfaces',
      icon: Sparkles
    },
    {
      step: 4,
      title: 'Final Inspection',
      description: 'Quality check and client walkthrough to ensure perfection',
      icon: CheckCircle
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Post-Construction Cleaning Austin TX | New Home & Renovation Cleanup | Aura Spring</title>
      <meta name="description" content="Professional post-construction cleaning in Austin, TX. Expert debris removal, dust elimination, and move-in ready service for new homes, renovations, and commercial construction projects." />
      <meta name="keywords" content="post construction cleaning austin, construction cleanup austin, new home cleaning austin, renovation cleanup, debris removal austin, construction dust cleaning, move in ready cleaning austin texas" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://aurasprings.com/services/post-construction" />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2940)'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <HardHat className="w-16 h-16 text-orange-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Post-Construction Cleaning
            </h1>
            <p className="text-xl text-orange-100 mb-4 max-w-3xl mx-auto">
              Transform your construction site into a pristine, move-in ready space
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Debris Removal
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Dust Elimination
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Move-in Ready
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Construction Types */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-500">We Clean All Types of </span>
              <span className="text-orange-600">Construction Projects</span>
            </h2>
            <p className="text-xl text-gray-400">
              From new home construction to major renovations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {constructionTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={type.image}
                    alt={type.type}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{type.type}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-400 mb-4 leading-relaxed">{type.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {type.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-orange-200">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{type.timeframe}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-orange-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{type.pricing}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Cleaning Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Our Post-Construction Cleaning Process
            </h2>
            <p className="text-lg text-gray-400">
              Systematic approach ensuring thorough results
            </p>
          </motion.div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${
                  index % 2 === 1 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white">
                    <step.icon className="w-10 h-10" />
                  </div>
                </div>
                
                <div className="flex-grow bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl font-bold text-orange-600">
                      {step.step.toString().padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-500">{step.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive Construction Cleanup Services
            </h2>
            <p className="text-lg text-gray-400">
              Every detail covered for your peace of mind
            </p>
          </motion.div>

          <div className="space-y-8">
            {cleaningServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-500">{service.category}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {service.services.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Aura for Post-Construction Cleaning?
            </h2>
            <p className="text-xl text-orange-100">
              Expertise you can trust for your construction investment
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center text-white border border-white/20"
              >
                <reason.icon className="w-12 h-12 mx-auto mb-4 text-orange-200" />
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-orange-100 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg text-gray-400">
              No hidden fees - just fair, upfront pricing
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-500 mb-4">Residential Projects</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Small renovation (1-2 rooms)</span>
                    <span className="font-semibold">$400-800</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Full home renovation</span>
                    <span className="font-semibold">$1,200-2,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span>New home construction</span>
                    <span className="font-semibold">$1,800-3,500</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-500 mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {[
                    'Complete debris removal',
                    'Dust elimination all surfaces', 
                    'Window cleaning inside/out',
                    'Floor cleaning & protection',
                    'Fixture & hardware cleaning',
                    'Final quality inspection'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-400 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg border-2 border-orange-300">
              <p className="text-lg font-semibold text-gray-500 mb-2">
                Get Your Custom Quote Today
              </p>
              <p className="text-gray-400 mb-4">
                Every construction project is unique. We'll assess your needs and provide a detailed quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make Your Construction Project Move-in Ready?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Professional post-construction cleaning you can trust
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Schedule Assessment
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call (512) 781-0527
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-orange-200" />
              <div className="text-sm font-semibold">Fully Insured</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-200" />
              <div className="text-sm font-semibold">Fast Turnaround</div>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-orange-200" />
              <div className="text-sm font-semibold">Move-in Ready Guarantee</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-400">
              Common questions about our post-construction cleaning service
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'How long does post-construction cleaning take?',
                answer: 'Timeframes vary by project size. Small renovations take 1-2 days, while new home construction can take 2-4 days. We provide accurate estimates during our initial assessment.'
              },
              {
                question: 'Do you clean up paint and construction materials?',
                answer: 'Yes, we remove paint splatters, adhesive residue, construction debris, and dust from all surfaces. However, we don\'t dispose of large construction materials - that should be handled by your contractor.'
              },
              {
                question: 'Can you clean during construction or only after completion?',
                answer: 'We specialize in final post-construction cleaning after work is completed. For ongoing construction cleaning, please discuss your specific needs with our team for a custom solution.'
              },
              {
                question: 'Do you provide cleaning supplies and equipment?',
                answer: 'Yes, we bring all necessary cleaning supplies, equipment, and tools. We use professional-grade products specifically designed for construction cleanup challenges.'
              },
              {
                question: 'Is your team insured for construction site work?',
                answer: 'Absolutely. Our team is fully licensed, bonded, and insured for construction and post-construction cleaning work. We can provide certificates of insurance as needed.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-gray-500 mb-3">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
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
              Questions About Your Construction Project?
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              Our construction cleaning specialists are here to help
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:PostConstruction@AuraSpringCleaning.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Email Specialists
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 border-2 border-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PostConstructionPage;