'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null;
  
  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> }
    ];
    
    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Format the name (replace hyphens with spaces and capitalize)
      let name = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Special cases for better formatting
      const nameMap: { [key: string]: string } = {
        'services': 'Services',
        'areas': 'Service Areas',
        'blog': 'Blog',
        'team': 'Our Team',
        'booking': 'Book Service',
        'about': 'About Us',
        'house-cleaning': 'House Cleaning',
        'deep-cleaning': 'Deep Cleaning',
        'move-cleaning': 'Move In/Out Cleaning',
        'airbnb-cleaning': 'Airbnb Cleaning',
        'commercial-cleaning': 'Commercial Cleaning',
        'post-construction': 'Post Construction',
        'downtown-austin': 'Downtown Austin',
        'the-domain': 'The Domain',
        'south-congress': 'South Congress',
        'rainey-street': 'Rainey Street'
      };
      
      if (nameMap[path]) {
        name = nameMap[path];
      }
      
      breadcrumbs.push({
        name,
        href: currentPath,
        icon: null
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  return (
    <nav 
      aria-label="Breadcrumb"
      className="bg-gray-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm flex-wrap">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              
              {index === breadcrumbs.length - 1 ? (
                // Current page (not a link)
                <span className="text-gray-700 font-medium flex items-center gap-1">
                  {item.icon}
                  {item.name}
                </span>
              ) : (
                // Clickable breadcrumb
                <Link
                  href={item.href}
                  className="text-aura-primary-600 hover:text-aura-primary-700 transition-colors flex items-center gap-1"
                >
                  {item.icon}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
        
        {/* Schema markup for breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: `https://auraspringcleaning.com${item.href}`
              }))
            })
          }}
        />
      </div>
    </nav>
  );
}