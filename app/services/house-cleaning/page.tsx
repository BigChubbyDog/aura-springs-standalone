'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Bath,
  Bed,
  Calculator,
  Calendar,
  CheckCircle,
  ChefHat,
  Clock,
  Heart,
  Home,
  Leaf,
  Lock,
  Phone,
  RefreshCw,
  Shield,
  Sofa,
  Sparkles,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const HouseCleaningPage = () => {
  const [frequency, setFrequency] = useState('biweekly');
  const [homeSize, setHomeSize] = useState('3bed');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Correct discounts from pricingService.ts
  const frequencies = [
    { id: 'weekly', name: 'Weekly', discount: '20%', popular: true },
    { id: 'biweekly', name: 'Bi-Weekly', discount: '15%', popular: false },
    { id: 'monthly', name: 'Monthly', discount: '10%', popular: false },
    { id: 'onetime', name: 'One-Time', discount: '0%', popular: false },
  ];

  // Pricing based on pricingService.ts - Base: $150 for 3BR/2BA up to 1300sqft
  const homeSizes = [
    {
      id: 'studio',
      name: 'Studio',
      basePrice: 100, // Smaller than base
      time: '1-1.5 hours',
      sqft: '<600',
    },
    {
      id: '1bed',
      name: '1 Bed/1 Bath',
      basePrice: 125, // Smaller than base
      time: '1.5-2 hours',
      sqft: '600-900',
    },
    {
      id: '2bed',
      name: '2 Bed/2 Bath',
      basePrice: 125, // 2BR/2BA < base bedrooms
      time: '2-2.5 hours',
      sqft: '900-1200',
    },
    {
      id: '3bed',
      name: '3 Bed/2 Bath',
      basePrice: 150, // Base price
      time: '2.5-3 hours',
      sqft: '1200-1800',
    },
    {
      id: '4bed',
      name: '4+ Bed/3+ Bath',
      basePrice: 200, // Base + $25/bedroom + $25/bathroom
      time: '3-4 hours',
      sqft: '1800+',
    },
  ];

  const getPrice = () => {
    const home = homeSizes.find(h => h.id === homeSize);
    const freq = frequencies.find(f => f.id === frequency);
    if (!home || !freq) return 160;

    const discount = parseInt(freq.discount) / 100;
    const baseTotal = home.basePrice * (1 - discount);
    const addOnsTotal = selectedAddOns.reduce((sum, addOnName) => {
      const addOn = addOns.find(a => a.name === addOnName);
      return sum + (addOn ? addOn.price : 0);
    }, 0);

    return Math.round(baseTotal + addOnsTotal);
  };

  const roomByRoom = [
    {
      room: 'Kitchen',
      icon: ChefHat,
      color: 'from-green-400 to-green-600',
      tasks: [
        'Deep clean all appliances inside and out',
        'Sanitize countertops and backsplash',
        'Clean and organize cabinets and pantry',
        'Scrub sink and faucets to shine',
        'Mop and sanitize floors',
        'Clean light fixtures and switches',
        'Empty and sanitize trash bins',
        'Wipe down walls and baseboards',
      ],
    },
    {
      room: 'Living Room',
      icon: Sofa,
      color: 'from-blue-400 to-blue-600',
      tasks: [
        'Dust all surfaces and electronics',
        'Sparkles upholstery and under cushions',
        'Clean windows and mirrors',
        'Sparkles and mop floors',
        'Dust ceiling fans and light fixtures',
        'Organize entertainment center',
        'Clean fireplace (if applicable)',
        'Sanitize remote controls and switches',
      ],
    },
    {
      room: 'Bedrooms',
      icon: Bed,
      color: 'from-purple-400 to-purple-600',
      tasks: [
        'Change and make beds with fresh linens',
        'Dust all furniture and surfaces',
        'Clean mirrors and windows',
        'Sparkles carpets and under beds',
        'Organize closets and dressers',
        'Clean ceiling fans',
        'Sanitize light switches and door handles',
        'Fresh room deodorizing',
      ],
    },
    {
      room: 'Bathrooms',
      icon: Bath,
      color: 'from-cyan-400 to-cyan-600',
      tasks: [
        'Scrub and disinfect toilets thoroughly',
        'Deep clean showers and bathtubs',
        'Clean and disinfect sinks and counters',
        'Scrub tile grout and remove mildew',
        'Polish mirrors and fixtures',
        'Mop and disinfect floors',
        'Organize cabinets and drawers',
        'Replace toilet brushes (upon request)',
      ],
    },
  ];

  const addOns = [
    { name: 'Deep Oven Cleaning', price: 40, time: '+35 min', icon: ChefHat },
    {
      name: 'Refrigerator Deep Clean',
      price: 40,
      time: '+35 min',
      icon: ChefHat,
    },
    {
      name: 'Window Cleaning (Interior Only)',
      price: 45,
      time: '+45 min',
      icon: Sparkles,
    },
    {
      name: 'Laundry Service (2 loads)',
      price: 35,
      time: '+30 min',
      icon: RefreshCw,
    },
    { name: 'Garage Organization', price: 55, time: '+50 min', icon: Home },
    { name: 'Basement Cleaning', price: 45, time: '+40 min', icon: Home },
    { name: 'Pet Hair Removal', price: 25, time: '+20 min', icon: Heart },
    {
      name: 'Carpet Deep Cleaning',
      price: 70,
      time: '+60 min',
      icon: Sparkles,
    },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "Austin's #1 Rated",
      description: 'Top-rated house cleaning service with 500+ 5-star reviews',
    },
    {
      icon: Shield,
      title: 'Bonded & Insured',
      description: 'Full insurance coverage and background-checked cleaners',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Pet and child-safe cleaning products available',
    },
    {
      icon: Clock,
      title: 'Always On Time',
      description: 'Punctual service with real-time arrival notifications',
    },
    {
      icon: Heart,
      title: 'Happiness Guaranteed',
      description: "100% satisfaction or we'll re-clean for free",
    },
    {
      icon: Lock,
      title: 'Secure & Trusted',
      description: 'Keyless entry options and trusted by 1000+ Austin homes',
    },
  ];

  const testimonials = [
    {
      name: 'Jennifer Rodriguez',
      location: 'Tarrytown',
      rating: 5,
      text: 'Best house cleaning service in Austin! They transformed my home and saved me hours every week.',
      service: 'Bi-Weekly House Cleaning',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    },
    {
      name: 'Michael Chen',
      location: 'Mueller',
      rating: 5,
      text: 'Professional, thorough, and they use eco-friendly products. My kids and pets are safe!',
      service: 'Weekly House Cleaning',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    },
    {
      name: 'Amanda Foster',
      location: 'Hyde Park',
      rating: 5,
      text: "The attention to detail is incredible. They clean areas I didn't even think about!",
      service: 'Monthly Deep Clean',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-purple-400/20" />

        <div className="container relative mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <Sparkles className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">
                Austin's Premier House Cleaning Service
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Professional House Cleaning
              </span>
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-gray-400">
              Transform your home into a spotless sanctuary. From cozy condos to
              spacious family homes, we deliver meticulous cleaning that gives
              you back your time and peace of mind.
            </p>

            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/booking"
                className="btn-primary inline-flex items-center gap-2"
              >
                Book Your Cleaning <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#pricing"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Calculator className="h-5 w-5" /> Check Pricing
              </Link>
            </div>

            <div className="mx-auto grid max-w-2xl grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">2,000+</div>
                <div className="text-gray-400">Homes Cleaned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">4.9★</div>
                <div className="text-gray-400">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-gray-400">Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Room by Room Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Room-by-Room Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Every corner of your home, meticulously cleaned
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {roomByRoom.map((room, index) => (
              <motion.div
                key={room.room}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg transition-all hover:shadow-xl"
              >
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br p-3 ${room.color} mb-4`}
                >
                  <room.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-500">
                  {room.room}
                </h3>
                <ul className="space-y-2">
                  {room.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-gray-400">{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section
        id="pricing"
        className="bg-gradient-to-b from-purple-50 to-white py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                Transparent Pricing Calculator
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Customize your cleaning plan and see instant pricing
            </p>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl bg-white p-8 shadow-2xl">
              {/* Frequency Selection */}
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-gray-500">
                  Select Cleaning Frequency
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {frequencies.map(freq => (
                    <button
                      key={freq.id}
                      onClick={() => setFrequency(freq.id)}
                      className={`relative rounded-xl border-2 p-4 transition-all ${
                        frequency === freq.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {freq.popular && (
                        <span className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-green-500 to-purple-500 px-2 py-1 text-xs text-white">
                          Popular
                        </span>
                      )}
                      <div className="font-semibold text-gray-500">
                        {freq.name}
                      </div>
                      <div className="font-bold text-green-600">
                        {freq.discount} off
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Home Size Selection */}
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-gray-500">
                  Select Home Size
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
                  {homeSizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setHomeSize(size.id)}
                      className={`rounded-xl border-2 p-4 transition-all ${
                        homeSize === size.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-500">
                        {size.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {size.sqft} sq ft
                      </div>
                      <div className="text-sm text-purple-600">{size.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-gray-500">
                  Optional Add-Ons
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {addOns.map(addon => (
                    <label
                      key={addon.name}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                        selectedAddOns.includes(addon.name)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addon.name)}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedAddOns([
                                ...selectedAddOns,
                                addon.name,
                              ]);
                            } else {
                              setSelectedAddOns(
                                selectedAddOns.filter(a => a !== addon.name)
                              );
                            }
                          }}
                          className="h-5 w-5 text-green-500"
                        />
                        <div>
                          <div className="font-medium text-gray-500">
                            {addon.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {addon.time}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-green-600">
                        +${addon.price}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Display */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-gradient-to-r from-green-500 to-purple-500 p-8 text-center text-white"
              >
                <div className="mb-2 text-2xl">Your Estimated Price</div>
                <div className="mb-4 text-6xl font-bold">${getPrice()}</div>
                <div className="text-lg opacity-90">
                  {frequencies.find(f => f.id === frequency)?.name} Cleaning
                </div>
                <Link
                  href="/booking"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-purple-600 transition-transform hover:scale-105"
                >
                  Book This Plan <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Why Austin Chooses Aura
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Excellence in every detail, trust in every visit
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-green-100 to-purple-100 p-4 transition-transform group-hover:scale-110">
                  <item.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-500">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                What Our Customers Say
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Join thousands of happy Austin homeowners
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-500">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                <div className="mb-3 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="italic text-gray-400">"{testimonial.text}"</p>
                <div className="mt-4 text-sm font-medium text-purple-600">
                  {testimonial.service}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-purple-600 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="mb-4 text-4xl font-bold">
              Ready for a Spotless Home?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Book your house cleaning today and enjoy a cleaner, healthier home
              tomorrow
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-purple-600 transition-transform hover:scale-105"
              >
                <Calendar className="h-5 w-5" />
                Schedule Your Cleaning
              </Link>
              <a
                href="tel:512-781-0527"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-3 font-semibold text-white transition-all hover:bg-white hover:text-purple-600"
              >
                <Phone className="h-5 w-5" />
                Call (512) 781-0527
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Free Estimates</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Insured & Bonded</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HouseCleaningPage;
