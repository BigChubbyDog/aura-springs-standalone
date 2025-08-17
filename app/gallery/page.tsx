'use client';

import { useState } from 'react';
import { MetaTags } from '@/components/SEO/MetaTags';
import { cleaningImages } from '@/lib/imageService';
// import Image from 'next/image'; // Temporarily disabled for external images
import { ChevronLeft, ChevronRight, Home, Sparkles, Star } from 'lucide-react';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const galleryCategories = [
    { id: 'all', label: 'All Photos', icon: <Star /> },
    { id: 'before-after', label: 'Before & After', icon: <Sparkles /> },
    { id: 'luxury', label: 'Luxury Homes', icon: <Home /> },
  ];

  const galleryImages = {
    'before-after': [
      {
        before: cleaningImages.results[0],
        after: cleaningImages.results[1],
        title: 'Downtown Condo Deep Clean',
        description: 'Complete transformation of a 2-bedroom luxury condo'
      },
      {
        before: cleaningImages.results[2],
        after: cleaningImages.results[3],
        title: 'Kitchen Restoration',
        description: 'Professional kitchen deep cleaning and organization'
      },
      {
        before: cleaningImages.results[4],
        after: cleaningImages.results[0],
        title: 'Bathroom Makeover',
        description: 'Sparkling clean bathroom transformation'
      },
    ],
    'luxury': [
      ...cleaningImages.hero.map(img => ({
        image: img,
        title: 'Luxury Home Cleaning',
        description: 'Premium cleaning service for Austin\'s finest homes'
      }))
    ]
  };

  const getAllImages = () => {
    const all: any[] = [];
    if (activeCategory === 'all' || activeCategory === 'before-after') {
      galleryImages['before-after'].forEach(item => {
        all.push({ type: 'before-after', ...item });
      });
    }
    if (activeCategory === 'all' || activeCategory === 'luxury') {
      galleryImages['luxury'].forEach(item => {
        all.push({ type: 'single', ...item });
      });
    }
    return all;
  };

  const displayImages = getAllImages();

  return (
    <>
      <MetaTags 
        title="Gallery | Before & After Cleaning Photos | Aura Spring Cleaning"
        description="See the Aura Spring difference! Browse our gallery of before and after cleaning photos from Austin homes and luxury condos."
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Our Work Gallery</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            See the incredible transformations we bring to Austin homes. Every photo showcases our commitment to excellence and attention to detail.
          </p>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {galleryCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayImages.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {item.type === 'before-after' ? (
                  <div>
                    <div className="grid grid-cols-2">
                      <div className="relative">
                        <img
                          src={item.before}
                          alt="Before cleaning"
                          className="w-full h-48 object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                          Before
                        </span>
                      </div>
                      <div className="relative">
                        <img
                          src={item.after}
                          alt="After cleaning"
                          className="w-full h-48 object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                          After
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div 
                      className="relative cursor-pointer"
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl w-full">
                <img
                  src={selectedImage}
                  alt="Gallery image"
                  className="w-full h-auto rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                  className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready for Your Own Transformation?</h2>
            <p className="mb-6 text-lg">
              Let us bring the same level of excellence to your home. Book your cleaning service today!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/booking"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Book Now
              </a>
              <a
                href="/contact"
                className="bg-green-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-900 transition"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}