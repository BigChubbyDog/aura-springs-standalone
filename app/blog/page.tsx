'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, User, ArrowRight, Search, Tag, 
  TrendingUp, Home, Sparkles, Heart, Shield, Building2,
  Coffee, Filter, ChevronRight, BookOpen, Star
} from 'lucide-react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredPost = {
    id: 1,
    title: 'The Ultimate Guide to High-Rise Living in Austin',
    excerpt: 'From Rainey Street to the Domain, discover how to maintain your luxury condo with our expert tips for urban living at its finest.',
    author: 'Valerie Boatman',
    date: '2024-12-15',
    readTime: '8 min read',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940',
    tags: ['High-Rise Living', 'Downtown Austin', 'Luxury Cleaning']
  };

  const blogPosts = [
    {
      id: 2,
      title: '5 Eco-Friendly Cleaning Secrets from Austin\'s Green Experts',
      excerpt: 'Discover sustainable cleaning methods that protect your family and the environment while maintaining a spotless home.',
      author: 'Dustin Allan',
      date: '2024-12-10',
      readTime: '5 min read',
      category: 'Green Living',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2940',
      tags: ['Eco-Friendly', 'Green Cleaning', 'Sustainability']
    },
    {
      id: 3,
      title: 'Preparing Your Airbnb for SXSW: A Host\'s Checklist',
      excerpt: 'Maximize your rental income during Austin\'s biggest events with our professional turnover strategies.',
      author: 'Valerie Boatman',
      date: '2024-12-08',
      readTime: '6 min read',
      category: 'Airbnb',
      image: 'https://images.unsplash.com/photo-1540638349517-3abd5afc5847?q=80&w=2940',
      tags: ['Airbnb', 'SXSW', 'Short-Term Rental']
    },
    {
      id: 4,
      title: 'West Lake Hills Home Care: Maintaining Luxury Estates',
      excerpt: 'Expert advice on preserving the beauty and value of your hill country estate with proper cleaning and maintenance.',
      author: 'Dustin Allan',
      date: '2024-12-05',
      readTime: '7 min read',
      category: 'Luxury Homes',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940',
      tags: ['West Lake Hills', 'Estate Cleaning', 'Luxury']
    },
    {
      id: 5,
      title: 'The Psychology of a Clean Space: Boost Your Productivity',
      excerpt: 'How a professionally cleaned environment can transform your mental clarity and work-from-home success.',
      author: 'Guest Author',
      date: '2024-12-03',
      readTime: '4 min read',
      category: 'Wellness',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2940',
      tags: ['Wellness', 'Productivity', 'Mental Health']
    },
    {
      id: 6,
      title: 'Downtown Austin Living: Cleaning Hacks for Small Spaces',
      excerpt: 'Make the most of your urban condo with these space-saving cleaning and organization tips.',
      author: 'Valerie Boatman',
      date: '2024-12-01',
      readTime: '5 min read',
      category: 'Tips & Tricks',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2940',
      tags: ['Downtown', 'Small Spaces', 'Organization']
    },
    {
      id: 7,
      title: 'Why Austin Realtors Recommend Professional Cleaning',
      excerpt: 'Top real estate agents share how professional cleaning services boost property values and speed up sales.',
      author: 'Dustin Allan',
      date: '2024-11-28',
      readTime: '6 min read',
      category: 'Real Estate',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2940',
      tags: ['Real Estate', 'Home Staging', 'Property Value']
    },
    {
      id: 8,
      title: 'The Domain Living: A Guide to North Austin\'s Premier District',
      excerpt: 'Everything you need to know about maintaining your lifestyle in Austin\'s upscale shopping and living destination.',
      author: 'Valerie Boatman',
      date: '2024-11-25',
      readTime: '7 min read',
      category: 'Lifestyle',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940',
      tags: ['The Domain', 'North Austin', 'Lifestyle']
    }
  ];

  const categories = [
    { name: 'All Posts', value: 'all', icon: BookOpen },
    { name: 'Lifestyle', value: 'lifestyle', icon: Coffee },
    { name: 'Green Living', value: 'green', icon: Heart },
    { name: 'Luxury Homes', value: 'luxury', icon: Home },
    { name: 'Tips & Tricks', value: 'tips', icon: Sparkles },
    { name: 'Real Estate', value: 'realestate', icon: Building2 },
    { name: 'Airbnb', value: 'airbnb', icon: Star }
  ];

  const popularTags = [
    'Downtown Austin', 'High-Rise Living', 'Eco-Friendly', 'Luxury Cleaning',
    'Airbnb', 'West Lake Hills', 'The Domain', 'Green Cleaning', 'Organization'
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                            post.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Austin Cleaning Blog | Expert Tips & Luxury Living | Aura Spring</title>
      <meta name="description" content="Expert cleaning tips, luxury living guides, and Austin lifestyle content. Learn from professional cleaners serving downtown high-rises and West Lake estates." />
      <meta name="keywords" content="austin cleaning blog, luxury cleaning tips, high-rise living austin, eco-friendly cleaning, airbnb cleaning guide, west lake hills lifestyle" />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-800 to-green-700">
        <div className="absolute inset-0 bg-black/20" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl mx-auto px-4"
        >
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              The Aura Blog
            </h1>
            <p className="text-xl text-blue-100">
              Luxury living tips, cleaning insights, and Austin lifestyle guides
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-full text-gray-500 shadow-xl focus:outline-none focus:ring-4 focus:ring-green-400"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.value
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-500 mb-2">Featured Story</h2>
            <p className="text-gray-400">Our latest insights on luxury living in Austin</p>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-500 mb-4 group-hover:text-green-600 transition-colors">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-400 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-4 transition-all"
                >
                  Read Full Article
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 flex justify-between items-center"
          >
            <h2 className="text-3xl font-bold text-gray-500">Recent Articles</h2>
            <p className="text-gray-400">{filteredPosts.length} articles found</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-500">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-500 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {post.date}
                      </span>
                      <ChevronRight className="w-5 h-5 text-green-500 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-500 mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Get cleaning tips, Austin lifestyle content, and exclusive offers delivered weekly
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            Join 2,500+ Austin residents getting weekly tips • Unsubscribe anytime
          </p>
        </motion.div>
      </section>

      {/* Popular Tags */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-500 mb-4">Popular Topics</h3>
          <div className="flex flex-wrap gap-3">
            {popularTags.map(tag => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-100 hover:bg-green-100 text-gray-400 hover:text-green-700 rounded-full transition-all duration-300"
              >
                <Tag className="inline w-3 h-3 mr-1" />
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-green-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Aura Difference?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Let us handle the cleaning while you enjoy Austin's best
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Book Your First Clean
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition-all duration-300"
            >
              View Our Services
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default BlogPage;