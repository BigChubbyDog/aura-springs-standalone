'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  likes_count?: number;
  comments_count?: number;
}

interface InstagramFeedProps {
  accessToken?: string;
  limit?: number;
  variant?: 'grid' | 'carousel' | 'masonry';
}

// Sample data for development - replace with actual Instagram API integration
const samplePosts: InstagramPost[] = [
  {
    id: '1',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800',
    permalink: 'https://instagram.com/p/1',
    caption: 'Sparkling clean kitchen transformation! ✨ #AuraSpringCleaning #AustinCleaning',
    timestamp: '2024-03-20T10:00:00Z',
    likes_count: 234,
    comments_count: 12,
  },
  {
    id: '2',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800',
    permalink: 'https://instagram.com/p/2',
    caption: 'Before & After: Living room deep clean 🏠 #CleanHome #AustinTX',
    timestamp: '2024-03-19T14:30:00Z',
    likes_count: 189,
    comments_count: 8,
  },
  {
    id: '3',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
    permalink: 'https://instagram.com/p/3',
    caption: 'Bathroom bliss! Our eco-friendly products make it shine ♻️ #EcoFriendlyCleaning',
    timestamp: '2024-03-18T09:15:00Z',
    likes_count: 312,
    comments_count: 15,
  },
  {
    id: '4',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=800',
    permalink: 'https://instagram.com/p/4',
    caption: 'Office cleaning for Austin businesses 💼 #CommercialCleaning #AustinBusiness',
    timestamp: '2024-03-17T16:45:00Z',
    likes_count: 145,
    comments_count: 6,
  },
  {
    id: '5',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800',
    permalink: 'https://instagram.com/p/5',
    caption: 'Downtown Austin high-rise cleaning specialists 🏙️ #AustinHighRise #LuxuryCleaning',
    timestamp: '2024-03-16T11:20:00Z',
    likes_count: 267,
    comments_count: 10,
  },
  {
    id: '6',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800',
    permalink: 'https://instagram.com/p/6',
    caption: 'Happy client, happy home! 🌟 Thank you for the 5-star review! #ClientLove',
    timestamp: '2024-03-15T13:00:00Z',
    likes_count: 423,
    comments_count: 22,
  },
];

export default function InstagramFeed({ 
  accessToken, 
  limit = 6, 
  variant = 'grid' 
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInstagramPosts();
  }, [accessToken, limit]);

  const fetchInstagramPosts = async () => {
    // If access token is provided, fetch from Instagram API
    if (accessToken) {
      try {
        const response = await fetch(
          `/api/instagram?access_token=${accessToken}&limit=${limit}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }
        
        const data = await response.json();
        setPosts(data.data || []);
      } catch (err) {
        console.error('Instagram feed error:', err);
        setError('Unable to load Instagram feed');
        // Fall back to sample data in development
        setPosts(samplePosts.slice(0, limit));
      }
    } else {
      // Use sample data if no access token
      setPosts(samplePosts.slice(0, limit));
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="text-center py-12">
        <Instagram className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Unable to load Instagram feed</p>
      </div>
    );
  }

  // Grid Layout
  if (variant === 'grid') {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={post.media_url}
                alt={post.caption || 'Instagram post'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  {post.caption && (
                    <p className="text-sm line-clamp-2 mb-2">{post.caption}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs">
                    {post.likes_count && (
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes_count}
                      </span>
                    )}
                    {post.comments_count && (
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments_count}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* CTA to Instagram */}
        <div className="text-center">
          <Link
            href="https://instagram.com/auraspringcleaning"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            Follow Us on Instagram
          </Link>
        </div>
      </div>
    );
  }

  // Carousel Layout
  if (variant === 'carousel') {
    return (
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-64 group"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Instagram post'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {post.caption && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {post.caption}
                </p>
              )}
            </Link>
          ))}
        </div>
        
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    );
  }

  // Masonry Layout
  return (
    <div className="columns-2 md:columns-3 gap-4 space-y-4">
      {posts.map((post, index) => (
        <Link
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group block break-inside-avoid"
        >
          <div 
            className="relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ aspectRatio: index % 3 === 0 ? '1/1.2' : index % 3 === 1 ? '1/0.8' : '1/1' }}
          >
            <Image
              src={post.media_url}
              alt={post.caption || 'Instagram post'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}