'use client';

import { ArrowLeft, Calendar, Clock, Share2, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const blogPosts = [
  {
    id: 2,
    title: 'Top 10 Cleaning Tips for Austin High-Rise Living',
    slug: 'cleaning-tips-austin-high-rise',
    excerpt: 'Maximize your downtown Austin condo space with these professional cleaning strategies.',
    content: `
      <h2>Living the High Life in Austin</h2>
      <p>Downtown Austin's high-rise condos offer stunning views and modern amenities, but they also come with unique cleaning challenges. From floor-to-ceiling windows to compact spaces, here are our top professional tips for keeping your high-rise home pristine.</p>
      
      <h3>1. Master the Art of Window Cleaning</h3>
      <p>Those gorgeous views deserve crystal-clear windows. Use a professional squeegee and clean on cloudy days to avoid streaking. For safety, never lean out of windows – consider professional cleaning for exterior surfaces.</p>
      
      <h3>2. Combat City Dust</h3>
      <p>Urban living means more dust. Invest in a high-quality air purifier and change HVAC filters monthly. Use microfiber cloths that trap dust rather than spreading it around.</p>
      
      <h3>3. Maximize Small Spaces</h3>
      <p>Declutter regularly and use vertical storage solutions. A clutter-free space not only looks cleaner but is easier to maintain.</p>
      
      <h3>4. Focus on High-Traffic Areas</h3>
      <p>Entryways and kitchen areas need daily attention. Keep a small vacuum for quick cleanups and use door mats both inside and outside your unit.</p>
      
      <h3>5. Green Cleaning for Better Air Quality</h3>
      <p>In sealed high-rise environments, chemical fumes linger. Use natural cleaning products like vinegar, baking soda, and essential oils for a healthier home.</p>
      
      <h3>6. Tackle Bathroom Humidity</h3>
      <p>High-rise bathrooms often lack windows. Run exhaust fans during and after showers, and squeegee shower walls to prevent mold and mildew.</p>
      
      <h3>7. Maintain Your View</h3>
      <p>Clean window tracks monthly and dust blinds weekly. Consider UV-protective window treatments to prevent furniture fading while maintaining your view.</p>
      
      <h3>8. Kitchen Deep Cleaning</h3>
      <p>Compact kitchens show dirt quickly. Wipe down appliances daily, deep clean the oven monthly, and don't forget to clean above cabinets where grease accumulates.</p>
      
      <h3>9. Smart Scheduling</h3>
      <p>Create a cleaning schedule that works with your lifestyle. Quick daily tasks prevent overwhelming weekend cleaning sessions.</p>
      
      <h3>10. Know When to Call Professionals</h3>
      <p>Some tasks are worth delegating. Professional cleaning services can handle deep cleaning, allowing you to enjoy Austin's vibrant lifestyle.</p>
      
      <p>At Aura Spring Cleaning, we specialize in high-rise living. Our team understands the unique needs of downtown Austin residents and provides eco-friendly, thorough cleaning services tailored to your lifestyle.</p>
    `,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600',
    author: 'Valerie Boatman',
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Tips & Tricks'
  },
  {
    id: 1,
    title: 'Spring Cleaning Your Austin Airbnb: A Host\'s Guide',
    slug: 'spring-cleaning-austin-airbnb-guide',
    excerpt: 'Essential spring cleaning checklist for Austin Airbnb hosts to wow guests and earn 5-star reviews.',
    content: `
      <h2>Elevate Your Airbnb Game This Spring</h2>
      <p>As an Austin Airbnb host, your property competes with hundreds of unique stays. A spotless, well-maintained space is your ticket to 5-star reviews and repeat bookings. Here's your comprehensive spring cleaning guide.</p>
      
      <h3>The Guest Perspective</h3>
      <p>Guests notice everything – from fingerprints on mirrors to dusty baseboards. Their first impression happens within seconds of entering your property.</p>
      
      <h3>Essential Spring Cleaning Checklist</h3>
      <ul>
        <li>Deep clean all appliances inside and out</li>
        <li>Wash all linens, including mattress protectors and shower curtains</li>
        <li>Clean air vents and replace filters</li>
        <li>Descale coffee makers and kettles</li>
        <li>Sanitize remote controls and light switches</li>
        <li>Deep clean tile grout and reseal if needed</li>
        <li>Wash windows inside and out</li>
        <li>Organize and restock supplies</li>
      </ul>
      
      <h3>Austin-Specific Considerations</h3>
      <p>With Austin's cedar pollen season, pay extra attention to air quality. Consider providing air purifiers and keeping windows sealed during high pollen days.</p>
      
      <h3>Professional Touch Points</h3>
      <p>Between guest turnovers can be hectic. Consider scheduling professional deep cleans quarterly to maintain standards and catch issues you might miss during quick turnovers.</p>
    `,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600',
    author: 'Dustin Allan',
    date: '2024-03-10',
    readTime: '7 min read',
    category: 'Airbnb Hosting'
  },
  {
    id: 3,
    title: 'Eco-Friendly Cleaning: Austin\'s Green Revolution',
    slug: 'eco-friendly-cleaning-austin',
    excerpt: 'How Austin residents are embracing sustainable cleaning practices for healthier homes.',
    content: `
      <h2>Join Austin's Green Cleaning Movement</h2>
      <p>Austin's commitment to sustainability extends to how we clean our homes. Discover how eco-friendly cleaning practices benefit your health, your home, and our beautiful city.</p>
      
      <h3>Why Go Green?</h3>
      <p>Traditional cleaning products contain chemicals that can trigger allergies, respiratory issues, and skin irritation. In Austin's already challenging allergy season, why add to the problem?</p>
      
      <h3>Natural Cleaning Arsenal</h3>
      <ul>
        <li><strong>White Vinegar:</strong> Cuts through grease and kills bacteria</li>
        <li><strong>Baking Soda:</strong> Scrubs and deodorizes</li>
        <li><strong>Lemon:</strong> Natural bleaching and fresh scent</li>
        <li><strong>Essential Oils:</strong> Antimicrobial properties and aromatherapy benefits</li>
        <li><strong>Castile Soap:</strong> Gentle, versatile cleaner</li>
      </ul>
      
      <h3>DIY Green Cleaning Recipes</h3>
      <p>Create your own all-purpose cleaner by mixing equal parts water and vinegar with a few drops of essential oil. For tough stains, make a paste with baking soda and water.</p>
      
      <h3>Supporting Local</h3>
      <p>Austin has numerous refill stations where you can bring containers to refill eco-friendly cleaning products, reducing plastic waste and supporting local businesses.</p>
      
      <h3>Professional Green Cleaning</h3>
      <p>At Aura Spring Cleaning, we exclusively use eco-friendly, non-toxic products that are safe for your family, pets, and the environment. Experience the difference of truly clean without the chemical residue.</p>
    `,
    image: 'https://images.unsplash.com/photo-1532077140060-b32c31f3de18?q=80&w=1600',
    author: 'Valerie Boatman',
    date: '2024-03-05',
    readTime: '6 min read',
    category: 'Sustainability'
  }
];

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === parseInt(params.id));
  
  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-green-600 to-emerald-600">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="relative h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full mb-4 w-fit">
            {post.category}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-500 mb-2">Share this article</h3>
                <div className="flex gap-3">
                  <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Read More Articles
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-500 mb-8">Related Articles</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-green-600 uppercase">
                      {relatedPost.category}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-gray-500 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}