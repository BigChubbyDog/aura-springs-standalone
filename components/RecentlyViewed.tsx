'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';

interface ViewedService {
  path: string;
  title: string;
  price: string;
  timestamp: number;
}

export default function RecentlyViewed({ currentPath }: { currentPath?: string }) {
  const [recentlyViewed, setRecentlyViewed] = useState<ViewedService[]>([]);

  // Service information mapping
  const serviceInfo: { [key: string]: { title: string; price: string } } = {
    '/services/house-cleaning': { title: 'House Cleaning', price: 'From $150' },
    '/services/deep-cleaning': { title: 'Deep Cleaning', price: 'From $225' },
    '/services/move-cleaning': { title: 'Move In/Out Cleaning', price: 'From $270' },
    '/services/airbnb-cleaning': { title: 'Airbnb Cleaning', price: 'From $180' },
    '/services/commercial-cleaning': { title: 'Commercial Cleaning', price: 'Custom Quote' },
    '/services/post-construction': { title: 'Post Construction', price: 'From $350' },
    '/areas/downtown-austin': { title: 'Downtown Austin Cleaning', price: 'From $165' },
    '/areas/the-domain': { title: 'The Domain Area Cleaning', price: 'From $155' },
    '/areas/south-congress': { title: 'South Congress Cleaning', price: 'From $160' },
    '/areas/rainey-street': { title: 'Rainey Street Cleaning', price: 'From $170' }
  };

  useEffect(() => {
    // Load recently viewed from localStorage
    const stored = localStorage.getItem('recentlyViewedServices');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ViewedService[];
        // Filter out expired items (older than 30 days)
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const filtered = parsed.filter(item => item.timestamp > thirtyDaysAgo);
        setRecentlyViewed(filtered);
      } catch (e) {
        console.error('Error parsing recently viewed:', e);
      }
    }

    // Add current page to recently viewed if it's a service page
    if (currentPath && serviceInfo[currentPath]) {
      const newItem: ViewedService = {
        path: currentPath,
        title: serviceInfo[currentPath].title,
        price: serviceInfo[currentPath].price,
        timestamp: Date.now()
      };

      const stored = localStorage.getItem('recentlyViewedServices');
      let items: ViewedService[] = [];
      
      if (stored) {
        try {
          items = JSON.parse(stored) as ViewedService[];
        } catch (e) {
          console.error('Error parsing stored items:', e);
        }
      }

      // Remove if already exists
      items = items.filter(item => item.path !== currentPath);
      
      // Add to beginning
      items.unshift(newItem);
      
      // Keep only last 5 items
      items = items.slice(0, 5);
      
      // Save to localStorage
      localStorage.setItem('recentlyViewedServices', JSON.stringify(items));
      
      // Update state (exclude current page)
      setRecentlyViewed(items.filter(item => item.path !== currentPath));
    }
  }, [currentPath]);

  // Don't render if no recently viewed items or only 1 item (which would be current page)
  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-aura-primary-600" />
          <h3 className="text-xl font-bold text-gray-900">Recently Viewed Services</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlyViewed.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900 group-hover:text-aura-primary-600 transition-colors">
                  {item.title}
                </h4>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-aura-primary-600 transition-colors" />
              </div>
              <p className="text-aura-primary-600 font-medium">{item.price}</p>
              <p className="text-xs text-gray-500 mt-2">
                Viewed {getTimeAgo(item.timestamp)}
              </p>
            </Link>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-aura-primary-600 hover:text-aura-primary-700 font-medium transition-colors"
          >
            View All Services
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return `${Math.floor(seconds / 604800)} weeks ago`;
}