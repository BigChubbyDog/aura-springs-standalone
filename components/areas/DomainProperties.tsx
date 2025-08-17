import { Building, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

export const domainProperties = [
  {
    name: 'The Domain Tower I',
    address: '11011 Domain Dr',
    units: '392 Units',
    yearBuilt: '2021',
    features: ['Concierge', 'Pool', 'Gym', 'Co-working'],
    residents: 48
  },
  {
    name: 'The Domain Tower II',
    address: '11111 Domain Dr',
    units: '350 Units',
    yearBuilt: '2022',
    features: ['Rooftop Deck', 'Pet Spa', 'Wine Storage'],
    residents: 41
  },
  {
    name: 'Alexan Domain',
    address: '3220 Esperanza Crossing',
    units: '286 Units',
    yearBuilt: '2019',
    features: ['Resort Pool', 'Fitness Center', 'Business Center'],
    residents: 35
  },
  {
    name: 'Standard Domain',
    address: '11800 Domain Blvd',
    units: '450 Units',
    yearBuilt: '2018',
    features: ['Sky Lounge', 'Pool', 'Grilling Stations'],
    residents: 62
  },
  {
    name: 'Camden Domain',
    address: '11711 Domain Blvd',
    units: '298 Units',
    yearBuilt: '2020',
    features: ['Yoga Studio', 'Game Room', 'Pet Park'],
    residents: 38
  },
  {
    name: 'Residences at Domain',
    address: '11701 Domain Blvd',
    units: '278 Units',
    yearBuilt: '2017',
    features: ['Clubhouse', 'Pool', 'Fitness Center'],
    residents: 29
  }
];

export default function DomainProperties() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {domainProperties.map((property, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg">{property.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                {property.address}
              </p>
            </div>
            <Building className="w-6 h-6 text-green-600" />
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Size:</span>
              <span className="font-medium">{property.units}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Built:</span>
              <span className="font-medium">{property.yearBuilt}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Our Customers:</span>
              <span className="font-medium text-green-600">{property.residents}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {property.features.map((feature, idx) => (
              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
          
          <Link 
            href="/booking"
            className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
          >
            Book Cleaning
          </Link>
        </div>
      ))}
    </div>
  );
}