'use client';

import { Home, Sparkles, Package, Shield } from 'lucide-react';

export const serviceMenus = [
  {
    title: 'Regular House Cleaning',
    icon: Home,
    frequency: 'Weekly, Bi-weekly, Monthly',
    duration: '2-5 hours',
    pricing: '$140-320',
    description: 'Comprehensive maintenance cleaning for Domain luxury homes and condos',
    includes: [
      'Living Areas: Dust all surfaces, vacuum carpets and rugs, mop hardwood/tile floors',
      'Kitchen: Clean and sanitize countertops, sink, stovetop, wipe down appliances',
      'Bathrooms: Scrub and sanitize tub/shower, toilet, vanity, mirrors, and floors',
      'Bedrooms: Dust furniture and surfaces, vacuum floors, organize (if requested)',
      'Dining Room: Dust table and chairs, vacuum/sweep floors, clean light fixtures',
      'Entryway: Clean floors, dust surfaces, organize shoes and coats',
      'Trash: Empty all bins and replace liners throughout the home'
    ]
  },
  {
    title: 'Deep Cleaning',
    icon: Sparkles,
    frequency: 'One-time or Quarterly',
    duration: '4-8 hours',
    pricing: '$280-580',
    description: 'Thorough top-to-bottom cleaning for Domain residences',
    includes: [
      'Everything in Regular Cleaning PLUS:',
      'Kitchen: Deep clean inside appliances, degrease backsplash, clean cabinet fronts',
      'Bathrooms: Remove soap scum and mineral deposits, clean tile grout, sanitize all fixtures',
      'Throughout: Baseboards, window sills, light switches, door frames',
      'Deep vacuum under furniture and beds',
      'Clean ceiling fans and light fixtures',
      'Wash interior windows'
    ]
  },
  {
    title: 'Move In/Out Cleaning',
    icon: Package,
    frequency: 'One-time service',
    duration: '6-10 hours',
    pricing: '$420-780',
    description: 'Complete cleaning for Domain area relocations',
    includes: [
      'Complete Deep Cleaning service',
      'Inside all cabinets and drawers',
      'Inside refrigerator and freezer',
      'Inside oven and microwave',
      'Garage cleaning (if applicable)',
      'Patio/balcony cleaning',
      'All interior windows and mirrors'
    ]
  },
  {
    title: 'Airbnb & Short-Term Rental',
    icon: Shield,
    frequency: 'After each guest',
    duration: '2-4 hours',
    pricing: '$120-280',
    description: 'Professional turnover service for Domain vacation rentals',
    includes: [
      'Complete unit cleaning and sanitization',
      'Linen service (wash or replace)',
      'Restock supplies (toilet paper, soap, etc.)',
      'Property inspection report',
      'Guest-ready staging',
      'Key exchange coordination',
      '24/7 emergency cleaning available'
    ]
  }
];

export default function DomainServiceMenu() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {serviceMenus.map((service, index) => {
        const Icon = service.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Icon className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-3">{service.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Frequency:</span>
                    <span className="font-medium">{service.frequency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pricing:</span>
                    <span className="font-medium text-green-600">{service.pricing}</span>
                  </div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm">
                    What's Included →
                  </summary>
                  <ul className="mt-3 space-y-1">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}