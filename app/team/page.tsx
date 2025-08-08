'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Coffee,
  Heart,
  Mail,
  Phone,
  Quote,
  Shield,
  Star,
  Target,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TeamPage = () => {
  const founders = [
    {
      name: 'Dustin Allan',
      role: 'Co-Founder & CEO',
      image:
        '/public/Headshots/Headshot_dustin (Instagram Profile Picture) (1).png',
      bio: 'With 12+ years in Austin real estate and business development, Dustin brings deep local market knowledge and operational expertise to Aura Spring Cleaning.',
      expertise: [
        'Business Strategy',
        'Operations Management',
        'Customer Relations',
        'Local Market Expertise',
      ],
      austinLife:
        'Paddleboarding at sunrise on Lady Bird Lake, hiking the Greenbelt with his dogs',
      email: 'dustin@auraspringcleaning.com',
      quote:
        "Austin deserves a cleaning service that understands the lifestyle. We're not just cleaning homes - we're giving people time back to enjoy this amazing city.",
      achievements: [
        '12+ Years Real Estate Experience',
        'Local Business Leader',
        'Community Volunteer',
      ],
    },
    {
      name: 'Valerie Boatman',
      role: 'Co-Founder & COO',
      image: '/public/Headshots/ValerieBoatmanHeadshot.JPG',
      bio: 'Valerie brings precision, care, and attention to detail that ensures every home becomes a true sanctuary. Her operational excellence drives our quality standards.',
      expertise: [
        'Quality Assurance',
        'Team Training',
        'Client Experience',
        'Operational Excellence',
      ],
      austinLife:
        'Morning yoga at Zilker Park, exploring farmers markets, live music on Rainey Street',
      email: 'valerie@auraspringcleaning.com',
      quote:
        'Every home should be a retreat from the world. We create spaces that restore your energy and peace of mind.',
      achievements: [
        'Operations Excellence Award',
        'Team Leadership Expert',
        'Customer Service Champion',
      ],
    },
  ];

  const teamMembers = [
    {
      name: 'Maria Rodriguez',
      role: 'Lead Cleaning Specialist',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616c27b5ecf?q=80&w=500',
      experience: '8 years',
      specialties: ['Deep Cleaning', 'Luxury Condos', 'Eco-Friendly Products'],
      quote:
        'I take pride in making every home sparkle. Your satisfaction is my mission.',
      languages: ['English', 'Spanish'],
    },
    {
      name: 'Jennifer Chen',
      role: 'Senior Cleaning Specialist',
      image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500',
      experience: '6 years',
      specialties: ['Move-in/Move-out', 'Airbnb Turnovers', 'Detail Work'],
      quote: "Every detail matters. I clean every home like it's my own.",
      languages: ['English', 'Mandarin'],
    },
    {
      name: 'Sarah Johnson',
      role: 'Cleaning Specialist',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500',
      experience: '4 years',
      specialties: [
        'Regular Maintenance',
        'Pet-Friendly Homes',
        'Green Cleaning',
      ],
      quote: 'Creating clean, healthy spaces where families can thrive.',
      languages: ['English'],
    },
    {
      name: 'Amanda White',
      role: 'Customer Success Manager',
      image:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500',
      experience: '5 years',
      specialties: ['Client Relations', 'Scheduling', 'Quality Assurance'],
      quote:
        "Your experience matters. I'm here to ensure everything is perfect.",
      languages: ['English'],
    },
    {
      name: 'Carlos Mendoza',
      role: 'Operations Coordinator',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500',
      experience: '7 years',
      specialties: [
        'Team Coordination',
        'Supply Management',
        'Route Optimization',
      ],
      quote: 'Behind every great clean is great teamwork and organization.',
      languages: ['English', 'Spanish'],
    },
    {
      name: 'Lisa Park',
      role: 'Quality Inspector',
      image:
        'https://images.unsplash.com/photo-1580894736036-7c91db0c5aa0?q=80&w=500',
      experience: '3 years',
      specialties: ['Quality Control', 'Training', 'Standards Development'],
      quote: "Excellence isn't an act, it's a habit. We perfect every detail.",
      languages: ['English', 'Korean'],
    },
  ];

  const teamValues = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description:
        'Every team member is background-checked, bonded, and insured for your peace of mind.',
    },
    {
      icon: Star,
      title: 'Excellence',
      description:
        'We maintain the highest standards through continuous training and quality assurance.',
    },
    {
      icon: Heart,
      title: 'Care & Respect',
      description:
        'We treat every home and family with the utmost care and respect they deserve.',
    },
    {
      icon: Clock,
      title: 'Reliability',
      description:
        'Consistent, punctual service you can count on, every single time.',
    },
  ];

  const stats = [
    {
      number: '15,000+',
      label: 'Hours of Training',
      sublabel: 'Continuous education',
    },
    { number: '500+', label: 'Happy Families', sublabel: 'Served monthly' },
    {
      number: '4.9★',
      label: 'Customer Rating',
      sublabel: 'Consistently excellent',
    },
    {
      number: '100%',
      label: 'Background Checked',
      sublabel: 'Safety guaranteed',
    },
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>
        Our Team | Aura Spring Cleaning Austin TX - Meet Our Expert Cleaning
        Professionals
      </title>
      <meta
        name="description"
        content="Meet the expert cleaning professionals at Aura Spring Cleaning. Background-checked, trained, and insured team members dedicated to exceptional service in Austin, Texas."
      />
      <meta
        name="keywords"
        content="cleaning team austin, professional cleaners, aura spring cleaning staff, experienced cleaning professionals, austin cleaning experts, dustin allan, valerie boatman"
      />
      <meta name="robots" content="index, follow" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#7c9768] via-green-600 to-emerald-600 py-20">
        <div className="mx-auto max-w-6xl px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex justify-center">
              <Users className="h-16 w-16 text-green-200" />
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Meet Our Team
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-xl text-green-100">
              The passionate professionals who transform Austin homes into
              pristine sanctuaries
            </p>
            <p className="text-lg text-green-200">
              Background-checked • Trained • Insured • Local Austin Experts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center"
              >
                <div className="mb-2 text-3xl font-bold text-green-600">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-500">
                  {stat.label}
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">
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
                className={`grid items-center gap-12 lg:grid-cols-2 ${
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
                      className="rounded-xl object-cover shadow-2xl"
                    />
                    <div className="absolute -bottom-6 -right-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white shadow-lg">
                      <Briefcase className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                <div
                  className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <div>
                    <h3 className="mb-2 text-3xl font-bold text-gray-500">
                      {founder.name}
                    </h3>
                    <p className="mb-4 text-xl font-semibold text-green-600">
                      {founder.role}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6">
                    <Quote className="mb-3 h-6 w-6 text-green-600" />
                    <p className="text-lg italic leading-relaxed text-gray-400">
                      "{founder.quote}"
                    </p>
                  </div>

                  <p className="leading-relaxed text-gray-400">{founder.bio}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-500">
                        Areas of Expertise:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {founder.expertise.map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4">
                      <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-800">
                        <Coffee className="h-4 w-4" />
                        Austin Life:
                      </h4>
                      <p className="text-sm text-blue-700">
                        {founder.austinLife}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-500">
                        Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {founder.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-400"
                          >
                            <Award className="h-4 w-4 text-green-600" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={`mailto:${founder.email}`}
                      className="inline-flex items-center gap-2 font-semibold text-green-600 hover:text-green-700"
                    >
                      <Mail className="h-4 w-4" />
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
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-white"
          >
            <h2 className="mb-4 text-3xl font-bold">Our Core Values</h2>
            <p className="text-xl text-green-100">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/20 bg-white/10 p-6 text-center text-white backdrop-blur-md"
              >
                <value.icon className="mx-auto mb-4 h-12 w-12 text-green-200" />
                <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                <p className="leading-relaxed text-green-100">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">
              <span className="text-gray-500">Our Amazing </span>
              <span className="text-green-600">Team Members</span>
            </h2>
            <p className="text-xl text-gray-400">
              Experienced professionals dedicated to your satisfaction
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
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
                  <div className="mb-4 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-500">
                      {member.experience} experience
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-2 font-semibold text-gray-500">
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 rounded-lg bg-gray-50 p-3">
                    <Quote className="mb-2 h-4 w-4 text-green-600" />
                    <p className="text-sm italic text-gray-400">
                      "{member.quote}"
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-gray-500">
                      Languages:
                    </h4>
                    <div className="flex gap-2">
                      {member.languages.map((language, i) => (
                        <span
                          key={i}
                          className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                        >
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
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold">
              <span className="text-gray-500">Our </span>
              <span className="text-green-600">Hiring Standards</span>
            </h2>
            <p className="text-lg text-gray-400">
              We maintain the highest standards to ensure your safety and
              satisfaction
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: 'Background Checks',
                description: 'Comprehensive criminal background screening',
              },
              {
                icon: CheckCircle,
                title: 'Reference Verification',
                description: 'Previous employer and personal references',
              },
              {
                icon: Star,
                title: 'Skills Assessment',
                description: 'Practical cleaning skills evaluation',
              },
              {
                icon: Award,
                title: 'Ongoing Training',
                description: 'Continuous education and certification',
              },
            ].map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center"
              >
                <standard.icon className="mx-auto mb-4 h-12 w-12 text-green-600" />
                <h3 className="mb-2 text-lg font-bold text-gray-500">
                  {standard.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {standard.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl px-4 text-center text-white"
        >
          <h2 className="mb-6 text-4xl font-bold">Ready to Join Our Team?</h2>
          <p className="mb-8 text-xl text-green-100">
            We're always looking for passionate professionals who share our
            values
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-bold text-green-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Target className="h-5 w-5" />
              View Career Opportunities
            </Link>
            <a
              href="tel:5127810527"
              className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-green-800"
            >
              <Phone className="h-5 w-5" />
              Call About Jobs
            </a>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-2xl font-bold text-gray-500">
              Get to Know Us Better
            </h3>
            <p className="mb-8 text-lg text-gray-400">
              Have questions about our team or want to meet us? We'd love to
              connect!
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg"
              >
                <Heart className="h-5 w-5" />
                Our Story
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-green-600 bg-white px-6 py-3 font-semibold text-green-600 transition-all duration-300 hover:bg-green-50"
              >
                <Calendar className="h-5 w-5" />
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
