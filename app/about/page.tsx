'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Clock, Heart, TreePine, Waves, Dog, Coffee,
  CheckCircle, Calendar, Phone, Mail, Timer,
  Bike, Music,
  Sparkles, Shield, User
} from 'lucide-react';

const AboutPage = () => {
  const austinActivities = [
    {
      icon: Waves,
      title: 'Lady Bird Lake',
      activities: ['Paddleboarding', 'Kayaking', 'Trail Running'],
      time: '3 hours saved = 1 lake adventure'
    },
    {
      icon: TreePine,
      title: 'Barton Creek Greenbelt',
      activities: ['Hiking', 'Rock Climbing', 'Swimming Holes'],
      time: '4 hours saved = Full trail experience'
    },
    {
      icon: Dog,
      title: 'Zilker Park',
      activities: ['Dog Park Fun', 'Kite Festival', 'ACL Music'],
      time: '2 hours saved = Quality pet time'
    },
    {
      icon: Coffee,
      title: 'South Congress',
      activities: ['Brunch Dates', 'Live Music', 'Gallery Hopping'],
      time: '3 hours saved = Perfect Sunday'
    },
    {
      icon: Music,
      title: 'Live Music Capital',
      activities: ['6th Street', 'Red River', 'Mohawk'],
      time: '4 hours saved = Night out with friends'
    },
    {
      icon: Bike,
      title: 'Austin Trails',
      activities: ['Cycling', 'Running', 'Nature Walks'],
      time: '2 hours saved = Morning workout'
    }
  ];

  const timeValueProps = [
    {
      hours: '5-7',
      label: 'Hours Per Week',
      description: 'Average time spent cleaning',
      icon: Clock
    },
    {
      hours: '260+',
      label: 'Hours Per Year',
      description: 'That\'s 32 work days!',
      icon: Calendar
    },
    {
      hours: '∞',
      label: 'Memories Made',
      description: 'Time with loved ones',
      icon: Heart
    }
  ];

  const founders = [
    {
      name: 'Dustin Allan',
      role: 'Co-Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&h=800&fit=crop', // Professional male headshot placeholder
      bio: 'With 12+ years in Austin real estate and a passion for the city\'s outdoor lifestyle, Dustin founded Aura to give Austinites more time to enjoy what makes our city special.',
      favorites: 'Paddleboarding at sunrise, Greenbelt hiking with the dogs',
      email: 'Dustin@AuraSpringCleaning.com'
    },
    {
      name: 'Valerie Boatman',
      role: 'Co-Founder & COO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&h=800&fit=crop', // Professional female headshot placeholder
      bio: 'Valerie believes everyone deserves a sanctuary to return to after exploring Austin. Her mission: create peaceful, pristine spaces that restore your energy.',
      favorites: 'Yoga at Zilker, Sunday farmers markets, live music on Rainey',
      email: 'Valerie@AuraSpringCleaning.com'
    }
  ];

  const stats = [
    { number: '15,000+', label: 'Hours Given Back', sublabel: 'To Austin families' },
    { number: '2,500+', label: 'Happy Adventurers', sublabel: 'More time outdoors' },
    { number: '500+', label: 'Dog Park Visits', sublabel: 'Enabled monthly' },
    { number: '4.9★', label: 'Peace of Mind', sublabel: 'Guaranteed quality' }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>About Aura Spring - We Give You Time Back | Austin TX</title>
      <meta name="description" content="We're not just cleaners, we're time creators. While we transform your home into a sanctuary, you're paddleboarding Lady Bird Lake or hiking the Greenbelt. Discover Austin's time-saving cleaning service." />
      <meta name="keywords" content="austin time saving cleaning, lady bird lake, greenbelt hiking, austin lifestyle, luxury cleaning service, dustin allan, valerie boatman, time back austin" />
      
      {/* Hero Section - Time is Everything */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Austin Skyline Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1562979314-b12da349521f?q=80&w=2940)',
            filter: 'brightness(0.3)'
          }}
        />
        
        {/* Floating Time Icons */}
        <div className="absolute inset-0">
          {[Clock, Waves, TreePine, Dog, Coffee, Music].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Icon className="w-20 h-20" />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white"
        >
          {/* Large Prominent Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <Image
                src="/images/AuraClean.svg"
                alt="Aura Spring Cleaning"
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            We Don't Just Clean Homes
            <span className="block text-green-400 mt-4">
              We Give You Time Back
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed"
          >
            While we're transforming your home into a pristine sanctuary, 
            you're paddleboarding Lady Bird Lake, hiking the Greenbelt, 
            or making memories at Zilker Park with your loved ones.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl font-bold text-green-400 mb-4"
          >
            Your time is priceless. We protect it.
          </motion.div>
          
          {/* Time Value Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto"
          >
            {timeValueProps.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-3xl font-bold">{stat.hours}</div>
                <div className="text-sm font-semibold">{stat.label}</div>
                <div className="text-xs text-gray-300 mt-1">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* The Austin Lifestyle Section */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-500">What Will You Do </span>
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                With Your Time Back?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every cleaning session gives you 3-5 hours to experience the best of Austin. 
              That's a full afternoon at the Greenbelt or a perfect brunch on South Congress.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {austinActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <activity.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-500">{activity.title}</h3>
                </div>
                
                <div className="space-y-2 mb-4">
                  {activity.activities.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-green-600">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-gray-500">Your Home is Your </span>
                <span className="text-green-600">Sanctuary</span>
              </h2>
              
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                In a city as vibrant as Austin, your home should be your peaceful retreat. 
                A place where the energy of 6th Street fades into tranquility, where the 
                dust from mountain biking trails stays outside, and where you can truly 
                recharge after paddleboarding at sunset.
              </p>
              
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                <strong>But here's what we discovered:</strong> Austinites were spending their 
                precious weekends cleaning instead of exploring. Missing perfect weather days 
                scrubbing bathrooms. Choosing chores over connections.
              </p>
              
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                That's why we created Aura Spring Cleaning - to give you back what matters most: 
                <span className="font-bold text-green-600"> your time</span>. Time for sunrise 
                yoga at Zilker. Time for discovering new food trucks. Time for floating the river 
                with friends. Time for living the Austin lifestyle you moved here for.
              </p>
              
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <p className="text-lg font-semibold text-gray-500 mb-2">
                  "Life is meant to be lived, not cleaned away."
                </p>
                <p className="text-sm text-gray-400">- The Aura Philosophy</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2000"
                  alt="Beautiful Austin home interior"
                  className="rounded-xl shadow-2xl w-full h-auto"
                />
                
                {/* Overlay Cards */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-xl p-4 border-2 border-green-500"
                >
                  <Timer className="w-6 h-6 text-green-600 mb-2" />
                  <p className="font-bold text-gray-500">5 Hours Saved</p>
                  <p className="text-sm text-gray-400">Every week</p>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                  className="absolute -top-4 -right-4 bg-green-500 text-white rounded-lg shadow-xl p-4"
                >
                  <Waves className="w-6 h-6 mb-2" />
                  <p className="font-bold">52 Lake Days</p>
                  <p className="text-sm">Per year gained</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Time Creators (Founders) */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-500">Meet Your </span>
              <span className="text-green-600">Time Creators</span>
            </h2>
            <p className="text-xl text-gray-400">
              Austin locals who understand the value of weekend adventures
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{founder.name}</h3>
                    <p className="text-green-400">{founder.role}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {founder.bio}
                  </p>
                  
                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-green-700 mb-1">Austin Favorites:</p>
                    <p className="text-sm text-gray-400">{founder.favorites}</p>
                  </div>
                  
                  <a 
                    href={`mailto:${founder.email}`}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
                  >
                    <Mail className="w-4 h-4" />
                    {founder.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              The Aura Impact
            </h2>
            <p className="text-xl text-green-100">
              Measuring success in adventures enabled, not just homes cleaned
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center text-white border border-white/20"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-semibold">{stat.label}</div>
                <div className="text-sm text-green-200 mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-gray-500">The Aura </span>
              <span className="text-green-600">Promise</span>
            </h2>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-xl">
              <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                Every time you book with Aura, you're not just getting a clean home. 
                You're getting time to live your Austin dream. Time to explore every 
                trail, try every taco, catch every sunset, and make every memory.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <h3 className="font-bold text-gray-500 mb-2">100% Trust</h3>
                  <p className="text-sm text-gray-400">Licensed, insured, background-checked</p>
                </div>
                <div className="text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-bold text-gray-500 mb-2">Pristine Results</h3>
                  <p className="text-sm text-gray-400">Your sanctuary, perfectly maintained</p>
                </div>
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                  <h3 className="font-bold text-gray-500 mb-2">Time Freedom</h3>
                  <p className="text-sm text-gray-400">Live your life, we'll handle the rest</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Your Time Back?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            This weekend, be on the lake instead of cleaning the house
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Your Time Freedom
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
          
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-green-300" />
              <span>Lake Days Enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <TreePine className="w-5 h-5 text-green-300" />
              <span>Trails Conquered</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-300" />
              <span>Memories Made</span>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutPage;