import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TowerPageTemplate from '@/components/towers/TowerPageTemplate';

// Tower data with complete information
export const towerData = {
  '70-rainey': {
    id: '70-rainey',
    name: '70 Rainey',
    address: '70 Rainey Street, Austin, TX 78701',
    distance: 'On Rainey Street',
    units: '164 luxury residences',
    yearBuilt: '2018',
    floors: 34,
    coordinates: { lat: 30.2572, lng: -97.7389 },
    features: ['Rainey Street Location', 'Resort-style Pool', 'Private Balconies', 'Smart Home Technology', 'Fitness Center', 'Dog Park'],
    description: 'Iconic Rainey Street address with unparalleled amenities and walkable lifestyle in the heart of Austin\'s entertainment district.',
    longDescription: 'Living at 70 Rainey means being at the epicenter of Austin\'s most vibrant neighborhood. This 34-story luxury tower offers resort-style amenities and modern conveniences, all while being steps away from the best restaurants, bars, and entertainment venues on Rainey Street.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
    residents: 38,
    reviews: 89,
    rating: 4.9,
  },
  'the-shore': {
    id: 'the-shore',
    name: 'The Shore',
    address: '603 Davis Street, Austin, TX 78701',
    distance: '0.3 miles from Rainey St',
    units: '165 condominiums',
    yearBuilt: '2020',
    floors: 28,
    coordinates: { lat: 30.2589, lng: -97.7401 },
    features: ['Lady Bird Lake Views', 'Private Marina', 'Infinity Pool', 'Wellness Center', 'Kayak Storage', 'Trail Access'],
    description: 'Waterfront luxury living with direct access to Lady Bird Lake and the Ann and Roy Butler Hike-and-Bike Trail.',
    longDescription: 'The Shore represents the pinnacle of waterfront living in Austin. With its private marina, infinity pool overlooking Lady Bird Lake, and direct trail access, residents enjoy an active lifestyle combined with luxury amenities.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    residents: 42,
    reviews: 95,
    rating: 4.8,
  },
  'millenium-rainey': {
    id: 'millenium-rainey',
    name: 'The Millenium Rainey',
    address: '91 Rainey Street, Austin, TX 78701',
    distance: 'On Rainey Street',
    units: '300+ residences',
    yearBuilt: '2021',
    floors: 39,
    coordinates: { lat: 30.2568, lng: -97.7385 },
    features: ['Rainey Street Hub', 'Sky Lounge', 'Pet Spa', 'Co-working Spaces', 'Guest Suites', 'Rooftop Deck'],
    description: 'Modern tower living at the epicenter of Austin\'s entertainment district with state-of-the-art amenities.',
    longDescription: 'The Millenium Rainey combines luxury living with the vibrant energy of Rainey Street. This 39-story tower features extensive amenities including a sky lounge, pet spa, and co-working spaces perfect for Austin\'s tech professionals.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
    residents: 67,
    reviews: 143,
    rating: 4.7,
  },
  '44-east-ave': {
    id: '44-east-ave',
    name: '44 East Ave',
    address: '44 East Avenue, Austin, TX 78701',
    distance: '0.5 miles from Rainey St',
    units: '180 luxury condos',
    yearBuilt: '2019',
    floors: 32,
    coordinates: { lat: 30.2654, lng: -97.7397 },
    features: ['Butler Trail Access', 'Panoramic Views', 'Wine Storage', 'Guest Suites', 'Yoga Studio', 'Business Center'],
    description: 'Sophisticated urban living with immediate access to Austin\'s outdoor lifestyle and cultural attractions.',
    longDescription: '44 East Ave offers a perfect blend of urban sophistication and outdoor accessibility. Located just steps from the Butler Trail and minutes from Rainey Street, residents enjoy panoramic city views and world-class amenities.',
    image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?q=80&w=1200',
    residents: 31,
    reviews: 72,
    rating: 4.9,
  },
  'the-independent': {
    id: 'the-independent',
    name: 'The Independent',
    address: '301 West Avenue, Austin, TX 78701',
    distance: '0.9 miles from Rainey St',
    units: '370 residences',
    yearBuilt: '2019',
    floors: 58,
    coordinates: { lat: 30.2681, lng: -97.7501 },
    features: ['Tallest in Austin', '360° Views', 'Private Theater', 'Luxury Amenities', 'Children\'s Playroom', 'Owner\'s Lounge'],
    description: 'Austin\'s tallest residential tower offering unmatched views and amenities at 685 feet above the city.',
    longDescription: 'As Austin\'s tallest residential building, The Independent (nicknamed "The Jenga Tower") offers unparalleled 360-degree views of the city, lake, and Hill Country. The 58-story tower features extensive amenities across multiple floors.',
    image: 'https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&w=1200',
    residents: 89,
    reviews: 201,
    rating: 4.8,
  },
  'the-austonian': {
    id: 'the-austonian',
    name: 'The Austonian',
    address: '200 Congress Avenue, Austin, TX 78701',
    distance: '1.1 miles from Rainey St',
    units: '178 luxury residences',
    yearBuilt: '2010',
    floors: 56,
    coordinates: { lat: 30.2649, lng: -97.7431 },
    features: ['Congress Avenue', 'Spa & Fitness', 'Wine Cellar', 'Concierge', '10th Floor Amenity Deck', 'Dog Park'],
    description: 'Iconic Congress Avenue address with world-class services and amenities in the heart of downtown Austin.',
    longDescription: 'The Austonian has set the standard for luxury high-rise living in Austin since 2010. Located on Congress Avenue, this 56-story tower offers residents a full-service lifestyle with spa, fitness center, and 24/7 concierge services.',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1200',
    residents: 52,
    reviews: 118,
    rating: 4.9,
  },
  'four-seasons-residences': {
    id: 'four-seasons-residences',
    name: 'Four Seasons Residences',
    address: '98 San Jacinto Blvd, Austin, TX 78701',
    distance: '0.7 miles from Rainey St',
    units: '145 luxury residences',
    yearBuilt: '2010',
    floors: 38,
    coordinates: { lat: 30.2612, lng: -97.7428 },
    features: ['Four Seasons Services', 'Lake Views', 'Hotel Amenities', 'Room Service', 'Spa Access', 'Valet Parking'],
    description: 'Five-star living with Four Seasons hotel services and amenities overlooking Lady Bird Lake.',
    longDescription: 'The Four Seasons Residences offer the ultimate in luxury living with full access to hotel services including room service, housekeeping, spa, and concierge. Residents enjoy stunning lake views and the prestige of a Four Seasons address.',
    image: 'https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1200',
    residents: 28,
    reviews: 65,
    rating: 5.0,
  },
  'w-austin-residences': {
    id: 'w-austin-residences',
    name: 'W Austin Residences',
    address: '200 Lavaca Street, Austin, TX 78701',
    distance: '1.0 mile from Rainey St',
    units: '159 residences',
    yearBuilt: '2010',
    floors: 37,
    coordinates: { lat: 30.2656, lng: -97.7463 },
    features: ['W Hotel Services', 'Whatever/Whenever Service', 'Rooftop Pool', 'Recording Studio', 'Bliss Spa', 'ACL Live Access'],
    description: 'Vibrant luxury living with W Hotel\'s signature Whatever/Whenever service and access to ACL Live.',
    longDescription: 'W Austin Residences combine the energy of the W brand with luxury residential living. Residents enjoy exclusive access to hotel amenities, Whatever/Whenever service, and proximity to Austin\'s music scene at ACL Live.',
    image: 'https://images.unsplash.com/photo-1565623006066-82f23c79210b?q=80&w=1200',
    residents: 34,
    reviews: 79,
    rating: 4.8,
  },
  'northshore-austin': {
    id: 'northshore-austin',
    name: 'Northshore Austin',
    address: '215 North Shore Boulevard, Austin, TX 78701',
    distance: '0.4 miles from Rainey St',
    units: '240 apartments',
    yearBuilt: '2017',
    floors: 28,
    coordinates: { lat: 30.2598, lng: -97.7412 },
    features: ['Lake Views', 'Resort Pool', 'Fitness Center', 'Business Lounge', 'Pet Park', 'Outdoor Kitchen'],
    description: 'Lakeside luxury apartments with resort-style amenities and stunning downtown views.',
    longDescription: 'Northshore Austin offers a resort-like living experience on the shores of Lady Bird Lake. With extensive amenities and proximity to both downtown and Rainey Street, it\'s perfect for those seeking an active, luxury lifestyle.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200',
    residents: 48,
    reviews: 102,
    rating: 4.7,
  },
  'the-bowie': {
    id: 'the-bowie',
    name: 'The Bowie',
    address: '2 Nueces Street, Austin, TX 78701',
    distance: '1.2 miles from Rainey St',
    units: '349 residences',
    yearBuilt: '2018',
    floors: 36,
    coordinates: { lat: 30.2678, lng: -97.7512 },
    features: ['Rooftop Pool', 'Dog Park & Spa', 'Fitness Center', 'Resident Lounge', 'Game Room', 'Outdoor Grilling'],
    description: 'Modern high-rise living in the Seaholm District with extensive amenities and urban convenience.',
    longDescription: 'The Bowie brings modern luxury to Austin\'s Seaholm District. This 36-story tower features extensive amenities including a rooftop pool with stunning city views, dog spa, and multiple entertainment spaces.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200',
    residents: 55,
    reviews: 124,
    rating: 4.6,
  },
  '5th-west-residences': {
    id: '5th-west-residences',
    name: '5th & West Residences',
    address: '210 West 5th Street, Austin, TX 78701',
    distance: '1.0 mile from Rainey St',
    units: '266 residences',
    yearBuilt: '2021',
    floors: 42,
    coordinates: { lat: 30.2672, lng: -97.7468 },
    features: ['Downtown Location', 'Sky Lounge', 'Infinity Pool', 'Fitness Studio', 'Co-working Space', 'Pet Amenities'],
    description: 'Brand new luxury tower in the heart of downtown with modern amenities and sophisticated design.',
    longDescription: '5th & West Residences represents the newest addition to Austin\'s luxury high-rise landscape. This 42-story tower features cutting-edge amenities, smart home technology, and a prime downtown location near entertainment and dining.',
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=1200',
    residents: 41,
    reviews: 88,
    rating: 4.8,
  },
};

export async function generateStaticParams() {
  return Object.keys(towerData).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tower = towerData[params.slug as keyof typeof towerData];
  
  if (!tower) {
    return {
      title: 'Tower Not Found | Aura Spring Cleaning',
      description: 'The requested tower page could not be found.',
    };
  }

  return {
    title: `${tower.name} Cleaning Service Austin | Professional Tower Cleaning`,
    description: `Professional cleaning service for ${tower.name} residents at ${tower.address}. Eco-friendly, insured, same-day service. 20% off first clean. Call (512) 781-0527.`,
    keywords: `${tower.name} cleaning service, ${tower.name} Austin maid service, ${tower.address} cleaning, ${tower.name} housekeeping, luxury condo cleaning Austin`,
    openGraph: {
      title: `${tower.name} Residents - Premium Cleaning Service | Aura Spring`,
      description: `Specialized cleaning for ${tower.name} luxury tower. Floor-to-ceiling windows, balconies, eco-friendly products. Trusted by your neighbors.`,
      images: [tower.image],
    },
    alternates: {
      canonical: `https://aurasprings.com/towers/${params.slug}`,
    },
  };
}

export default function TowerPage({ params }: { params: { slug: string } }) {
  const tower = towerData[params.slug as keyof typeof towerData];
  
  if (!tower) {
    notFound();
  }

  return <TowerPageTemplate tower={tower} />;
}