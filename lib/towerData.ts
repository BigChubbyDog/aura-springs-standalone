export interface TowerData {
  id: string;
  name: string;
  address: string;
  distance: string;
  units: string;
  yearBuilt: string;
  floors: number;
  coordinates: { lat: number; lng: number };
  features: string[];
  amenities?: string[];
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  residents: number;
  reviews: number;
  rating: number;
  nearbyAttractions?: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
  specialAccess?: string;
  parkingInfo?: string;
  petPolicy?: string;
  managementCompany?: string;
}

// Comprehensive tower data for Austin luxury buildings near Rainey Street
export const towerData: { [key: string]: TowerData } = {
  'the-quincy': {
    id: 'the-quincy',
    name: 'The Quincy',
    address: '306 East 5th Street, Austin, TX 78701',
    distance: '0.5 miles from Rainey St',
    units: '172 luxury residences',
    yearBuilt: '2024',
    floors: 44,
    coordinates: { lat: 30.2665, lng: -97.7395 },
    features: [
      'Rooftop Pool & Lounge',
      'State-of-the-art Fitness Center',
      'Co-working Spaces',
      'Pet Spa & Dog Park',
      'Private Dining Room',
      '24/7 Concierge',
      'Wine Storage',
      'Golf Simulator'
    ],
    amenities: [
      'Smart Home Technology',
      'Floor-to-ceiling Windows',
      'Premium Appliances',
      'Quartz Countertops',
      'Walk-in Closets',
      'Private Balconies'
    ],
    description: 'Ultra-luxury high-rise in the heart of downtown Austin with unparalleled amenities and spectacular city views.',
    longDescription: 'The Quincy represents the pinnacle of luxury living in downtown Austin. This 44-story architectural masterpiece offers residents an elevated lifestyle with resort-style amenities, breathtaking views, and a prime location just blocks from Rainey Street. Each residence features premium finishes, smart home technology, and floor-to-ceiling windows that showcase stunning views of Lady Bird Lake and the Austin skyline.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200',
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1200'
    ],
    residents: 67,
    reviews: 142,
    rating: 4.9,
    nearbyAttractions: [
      { name: 'Rainey Street Historic District', distance: '0.5 miles', type: 'Entertainment' },
      { name: 'Whole Foods Market', distance: '0.3 miles', type: 'Grocery' },
      { name: 'Republic Square Park', distance: '0.4 miles', type: 'Park' }
    ],
    specialAccess: 'Fob access required. Please register with concierge 24 hours before first visit.',
    parkingInfo: 'Guest parking available on P2 level. Validation provided.',
    petPolicy: 'Pet-friendly building. No weight restrictions.',
    managementCompany: 'Greystar Management'
  },

  '70-rainey': {
    id: '70-rainey',
    name: '70 Rainey',
    address: '70 Rainey Street, Austin, TX 78701',
    distance: 'On Rainey Street',
    units: '164 luxury residences',
    yearBuilt: '2018',
    floors: 34,
    coordinates: { lat: 30.2572, lng: -97.7389 },
    features: [
      'Rainey Street Location',
      'Resort-style Pool',
      'Private Balconies',
      'Smart Home Technology',
      'Fitness Center',
      'Dog Park',
      'Outdoor Grilling Stations',
      'Resident Lounge'
    ],
    description: 'Iconic Rainey Street address with unparalleled amenities and walkable lifestyle in the heart of Austin\'s entertainment district.',
    longDescription: 'Living at 70 Rainey means being at the epicenter of Austin\'s most vibrant neighborhood. This 34-story luxury tower offers resort-style amenities and modern conveniences, all while being steps away from the best restaurants, bars, and entertainment venues on Rainey Street. The building features stunning views of Lady Bird Lake and downtown Austin.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200',
      'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?q=80&w=1200'
    ],
    residents: 38,
    reviews: 89,
    rating: 4.9,
    nearbyAttractions: [
      { name: 'Banger\'s Sausage House', distance: '0.1 miles', type: 'Restaurant' },
      { name: 'Container Bar', distance: '0.1 miles', type: 'Bar' },
      { name: 'Lady Bird Lake Trail', distance: '0.2 miles', type: 'Recreation' }
    ],
    specialAccess: 'Call from callbox for access. Cleaning crews pre-approved.',
    parkingInfo: 'Street parking or garage on Driskill Street.',
    petPolicy: 'Pet-friendly with breed restrictions.',
    managementCompany: 'Lincoln Property Company'
  },

  'the-shore': {
    id: 'the-shore',
    name: 'The Shore',
    address: '603 Davis Street, Austin, TX 78701',
    distance: '0.3 miles from Rainey St',
    units: '165 condominiums',
    yearBuilt: '2020',
    floors: 28,
    coordinates: { lat: 30.2599, lng: -97.7401 },
    features: [
      'Lakefront Location',
      'Infinity Pool',
      'Private Beach Access',
      'Fitness Center',
      'Wine Room',
      'Guest Suites',
      'Kayak Storage',
      'BBQ Pavilion'
    ],
    description: 'Waterfront luxury living with private beach access and stunning lake views, minutes from Rainey Street.',
    longDescription: 'The Shore offers an unprecedented waterfront lifestyle in downtown Austin. With private beach access to Lady Bird Lake and resort-style amenities, residents enjoy a perfect blend of urban convenience and lakeside tranquility. The building\'s unique position provides panoramic views of both the lake and the Austin skyline.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    residents: 45,
    reviews: 98,
    rating: 4.8,
    nearbyAttractions: [
      { name: 'Auditorium Shores', distance: '0.2 miles', type: 'Park' },
      { name: 'South Congress Bridge', distance: '0.3 miles', type: 'Landmark' },
      { name: 'Rainey Street', distance: '0.3 miles', type: 'Entertainment' }
    ],
    specialAccess: 'Concierge notification required. Access code changes monthly.',
    parkingInfo: 'Valet parking for guests. Self-park on P1.',
    petPolicy: 'Pets welcome, 2 pet maximum.',
    managementCompany: 'The Shore HOA'
  },

  '44-east': {
    id: '44-east',
    name: '44 East Ave',
    address: '44 East Avenue, Austin, TX 78701',
    distance: '0.4 miles from Rainey St',
    units: '233 residences',
    yearBuilt: '2021',
    floors: 53,
    coordinates: { lat: 30.2643, lng: -97.7386 },
    features: [
      'Sky Lounge on 53rd Floor',
      'Demonstration Kitchen',
      'Conference Rooms',
      'Spa with Steam & Sauna',
      'Pool Deck',
      'Fitness Studio',
      'Dog Park & Wash',
      'Golf Simulator'
    ],
    description: 'Austin\'s newest luxury tower with world-class amenities and spectacular views from every residence.',
    longDescription: '44 East Ave stands as one of Austin\'s tallest residential towers, offering unmatched luxury and convenience. The 53-story building features a comprehensive amenity deck, smart home technology throughout, and some of the most spectacular views in the city. Located in the heart of downtown, it\'s walking distance to Rainey Street, 6th Street, and the Convention Center.',
    image: 'https://images.unsplash.com/photo-1565623006066-82f23c79210b?q=80&w=1200',
    residents: 72,
    reviews: 156,
    rating: 4.9,
    nearbyAttractions: [
      { name: 'Rainey Street District', distance: '0.4 miles', type: 'Entertainment' },
      { name: 'Trader Joe\'s', distance: '0.2 miles', type: 'Grocery' },
      { name: 'Republic Square', distance: '0.3 miles', type: 'Park' }
    ],
    specialAccess: 'Register with concierge. Biometric access for regular vendors.',
    parkingInfo: 'Guest parking on P3. Valet available.',
    petPolicy: 'Pet-friendly, no size restrictions.',
    managementCompany: 'Related Management'
  },

  'the-independent': {
    id: 'the-independent',
    name: 'The Independent',
    address: '301 West Avenue, Austin, TX 78701',
    distance: '0.6 miles from Rainey St',
    units: '370 condominiums',
    yearBuilt: '2019',
    floors: 58,
    coordinates: { lat: 30.2689, lng: -97.7503 },
    features: [
      'Tallest Residential Tower in Texas',
      'Two-story Owner\'s Lounge',
      'Pool Deck on 9th Floor',
      'Children\'s Playroom',
      'Private Theater',
      'Fitness Center & Yoga Studio',
      'Dog Lounge',
      'Guest Suites'
    ],
    description: 'The tallest residential building in Texas, offering unparalleled views and luxury in downtown Austin.',
    longDescription: 'The Independent, affectionately known as the "Jenga Tower," is an architectural icon in Austin\'s skyline. As the tallest residential building in Texas at 58 stories, it offers residents breathtaking 360-degree views, world-class amenities, and a prime downtown location. The building\'s unique design and premium finishes make it one of the most sought-after addresses in Austin.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200',
    residents: 125,
    reviews: 234,
    rating: 4.8,
    nearbyAttractions: [
      { name: '2nd Street District', distance: '0.2 miles', type: 'Shopping' },
      { name: 'Austin City Limits', distance: '0.3 miles', type: 'Music Venue' },
      { name: 'Lady Bird Lake', distance: '0.4 miles', type: 'Recreation' }
    ],
    specialAccess: '24-hour concierge. Pre-registration required.',
    parkingInfo: 'Valet only for guests.',
    petPolicy: 'Two pets maximum, breed restrictions apply.',
    managementCompany: 'The Independent HOA'
  },

  'the-austonian': {
    id: 'the-austonian',
    name: 'The Austonian',
    address: '200 Congress Avenue, Austin, TX 78701',
    distance: '0.7 miles from Rainey St',
    units: '178 luxury condos',
    yearBuilt: '2010',
    floors: 56,
    coordinates: { lat: 30.2649, lng: -97.7434 },
    features: [
      '55th Floor Amenity Deck',
      'Spa with Treatment Rooms',
      'Lap Pool',
      'Fitness Center',
      'Private Theater',
      'Wine Storage',
      'Guest Suites',
      'Concierge Services'
    ],
    description: 'Iconic luxury tower on Congress Avenue with world-class amenities and services.',
    longDescription: 'The Austonian set the standard for luxury high-rise living in Austin. This 56-story tower on Congress Avenue offers residents an exclusive lifestyle with amenities including a 55th-floor spa, private theater, and concierge services. The building\'s prime location provides easy access to Rainey Street, the Capitol, and all of downtown\'s attractions.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    residents: 89,
    reviews: 187,
    rating: 4.9,
    nearbyAttractions: [
      { name: 'Texas State Capitol', distance: '0.5 miles', type: 'Landmark' },
      { name: '6th Street', distance: '0.2 miles', type: 'Entertainment' },
      { name: 'Paramount Theatre', distance: '0.1 miles', type: 'Theater' }
    ],
    specialAccess: 'Strict security. All vendors must be pre-approved.',
    parkingInfo: 'Valet parking only.',
    petPolicy: 'Small pets only, under 30 lbs.',
    managementCompany: 'Austonian Residences LLC'
  },

  'northshore': {
    id: 'northshore',
    name: 'Northshore',
    address: '215 North Shore Boulevard, Austin, TX 78701',
    distance: '0.5 miles from Rainey St',
    units: '393 apartments',
    yearBuilt: '2023',
    floors: 37,
    coordinates: { lat: 30.2625, lng: -97.7372 },
    features: [
      'Lake Views',
      'Sky Deck Pool',
      'Coworking Spaces',
      'Game Room',
      'Pet Park',
      'Fitness Center',
      'Yoga Studio',
      'Outdoor Kitchen'
    ],
    description: 'Modern luxury apartments with stunning lake views and resort-style amenities near Rainey Street.',
    longDescription: 'Northshore offers a perfect blend of urban sophistication and lakeside serenity. This 37-story tower features panoramic views of Lady Bird Lake and downtown Austin, with resort-style amenities and modern finishes throughout. Located between Rainey Street and the new Waterloo Greenway, residents enjoy easy access to entertainment, dining, and outdoor recreation.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200',
    residents: 103,
    reviews: 198,
    rating: 4.7,
    nearbyAttractions: [
      { name: 'Waterloo Greenway', distance: '0.1 miles', type: 'Park' },
      { name: 'Rainey Street', distance: '0.5 miles', type: 'Entertainment' },
      { name: 'Red River Cultural District', distance: '0.6 miles', type: 'Music' }
    ],
    specialAccess: 'App-based access. Register through leasing office.',
    parkingInfo: 'Garage parking available. Guest spots on P1.',
    petPolicy: 'Pet-friendly, no breed restrictions.',
    managementCompany: 'Trammel Crow Residential'
  },

  'the-bowie': {
    id: 'the-bowie',
    name: 'The Bowie',
    address: '909 West 5th Street, Austin, TX 78703',
    distance: '0.8 miles from Rainey St',
    units: '342 apartments',
    yearBuilt: '2016',
    floors: 36,
    coordinates: { lat: 30.2687, lng: -97.7515 },
    features: [
      'Rooftop Pool',
      'Downtown Views',
      'Fitness Center',
      'Business Center',
      'Resident Lounge',
      'Outdoor Grilling',
      'Bike Storage',
      'Package Concierge'
    ],
    description: 'Sophisticated downtown living with modern amenities and stunning city views.',
    longDescription: 'The Bowie combines sophisticated design with modern conveniences in the heart of downtown Austin. This 36-story tower offers residents luxurious amenities, spacious floor plans, and incredible views of the city and Hill Country. Its prime location provides easy access to Rainey Street, Market District, and the central business district.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200',
    residents: 78,
    reviews: 145,
    rating: 4.6,
    nearbyAttractions: [
      { name: 'Whole Foods Flagship', distance: '0.3 miles', type: 'Grocery' },
      { name: 'Republic Square', distance: '0.2 miles', type: 'Park' },
      { name: 'Market District', distance: '0.1 miles', type: 'Shopping' }
    ],
    specialAccess: 'Key fob access. Guest registration required.',
    parkingInfo: 'Covered parking garage. Guest parking available.',
    petPolicy: 'Two pets max, weight restrictions apply.',
    managementCompany: 'ZOM Living'
  },

  'natiivo': {
    id: 'natiivo',
    name: 'NATIIVO Austin',
    address: '44 East 12th Street, Austin, TX 78701',
    distance: '0.4 miles from Rainey St',
    units: '248 residences',
    yearBuilt: '2024',
    floors: 33,
    coordinates: { lat: 30.2723, lng: -97.7394 },
    features: [
      'Short-term Rental Allowed',
      'Rooftop Pool & Bar',
      'Full-service Restaurant',
      'Fitness Center',
      'Coworking Space',
      'Housekeeping Services',
      'Room Service',
      'Valet Parking'
    ],
    description: 'Innovative hospitality-branded residences allowing short-term rentals with hotel services.',
    longDescription: 'NATIIVO Austin revolutionizes urban living by combining residential ownership with hospitality services. This 33-story tower allows owners to live, rent, or use their unit as an Airbnb, with full hotel services available. Located in the heart of downtown, it\'s perfectly positioned near Rainey Street, the University of Texas, and the Capitol.',
    image: 'https://images.unsplash.com/photo-1565623006066-82f23c79210b?q=80&w=1200',
    residents: 52,
    reviews: 89,
    rating: 4.8,
    nearbyAttractions: [
      { name: 'University of Texas', distance: '0.3 miles', type: 'Education' },
      { name: 'Rainey Street', distance: '0.4 miles', type: 'Entertainment' },
      { name: 'Red River District', distance: '0.2 miles', type: 'Music' }
    ],
    specialAccess: 'Hotel-style check-in. Cleaning crews have special access.',
    parkingInfo: 'Valet parking included.',
    petPolicy: 'Pet-friendly with hotel pet amenities.',
    managementCompany: 'NATIIVO Management'
  },

  'five-fifty-five': {
    id: 'five-fifty-five',
    name: '555 East 5th',
    address: '555 East 5th Street, Austin, TX 78701',
    distance: '0.3 miles from Rainey St',
    units: '201 condominiums',
    yearBuilt: '2009',
    floors: 31,
    coordinates: { lat: 30.2653, lng: -97.7358 },
    features: [
      'Private Balconies',
      'Pool & Spa',
      'Fitness Center',
      'Media Room',
      'Business Center',
      'Storage Units',
      'Electric Car Charging',
      'Controlled Access'
    ],
    description: 'Modern high-rise condominiums with downtown convenience and spectacular views.',
    longDescription: 'Five Fifty Five offers contemporary urban living in a prime downtown location. This 31-story condominium tower features modern finishes, private balconies, and panoramic views of downtown and Lady Bird Lake. Its central location provides easy walking access to Rainey Street, the Convention Center, and East 6th Street.',
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1200',
    residents: 61,
    reviews: 112,
    rating: 4.7,
    nearbyAttractions: [
      { name: 'Convention Center', distance: '0.2 miles', type: 'Business' },
      { name: 'East 6th Street', distance: '0.3 miles', type: 'Entertainment' },
      { name: 'Rainey Street', distance: '0.3 miles', type: 'Entertainment' }
    ],
    specialAccess: 'FOB access. Register at front desk.',
    parkingInfo: 'Assigned parking. Guest spots available.',
    petPolicy: 'Pets allowed with HOA approval.',
    managementCompany: '555 East HOA'
  }
};

// Helper function to get all tower IDs
export function getAllTowerIds(): string[] {
  return Object.keys(towerData);
}

// Helper function to get tower by ID
export function getTowerById(id: string): TowerData | undefined {
  return towerData[id];
}

// Helper function to get nearby towers
export function getNearbyTowers(currentTowerId: string, limit = 3): TowerData[] {
  return Object.values(towerData)
    .filter(tower => tower.id !== currentTowerId)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Helper function to search towers
export function searchTowers(query: string): TowerData[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(towerData).filter(tower => 
    tower.name.toLowerCase().includes(lowercaseQuery) ||
    tower.address.toLowerCase().includes(lowercaseQuery) ||
    tower.description.toLowerCase().includes(lowercaseQuery)
  );
}