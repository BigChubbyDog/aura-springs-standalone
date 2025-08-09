// Image service for fetching high-quality cleaning images from Unsplash and Pexels

const UNSPLASH_API_KEY = 'wjEgF3Q1KnH_BnMRJ1GO4s2ZULbOnHdBArClj66HR8g';
const PEXELS_API_KEY = '3wtvEl6J6LD0Bx43Gcf6MSrYW4xJIpUgtMQ48rvLNdtFrIitGAB2SKr0';

export interface ImageResult {
  url: string;
  alt: string;
  photographer: string;
  source: 'unsplash' | 'pexels';
}

// Predefined high-quality cleaning service images
export const cleaningImages = {
  hero: [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90', // Luxury condo interior
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=90', // Clean modern kitchen
    'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1920&q=90', // Spotless kitchen
  ],
  services: {
    houseCleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=85',
    deepCleaning: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=85',
    moveInOut: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=85',
    airbnb: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=85',
    commercial: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85',
    postConstruction: 'https://images.unsplash.com/photo-1562113530-57ba467cea38?w=800&q=85',
  },
  testimonials: [
    'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=85', // Professional woman
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85', // Professional man
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85', // Business woman
  ],
  austin: {
    downtown: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=1200&q=85', // Austin downtown
    domain: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?w=1200',
    southCongress: 'https://images.unsplash.com/photo-1589480774806-49cca8a1910f?w=1200&q=85',
    raineyStreet: 'https://images.unsplash.com/photo-1620830085127-19e9a2280a9f?w=1200&q=85',
  },
  cleaning: [
    'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?w=800', // Cleaning supplies
    'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?w=800', // Person cleaning
    'https://images.pexels.com/photos/4238993/pexels-photo-4238993.jpeg?w=800', // Clean bathroom
    'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?w=800', // Eco cleaning
    'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?w=800', // Professional cleaner
  ],
  results: [
    'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200&q=85', // Spotless kitchen
    'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=85', // Clean bathroom
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=85', // Organized living room
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85', // Clean bedroom
  ]
};

// Fetch images from Unsplash
export async function fetchUnsplashImages(query: string, count: number = 5): Promise<ImageResult[]> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
        },
      }
    );
    
    if (!response.ok) {
      console.error('Unsplash API error:', response.status);
      return [];
    }
    
    const data = await response.json();
    return data.results.map((photo: any) => ({
      url: photo.urls.regular,
      alt: photo.alt_description || query,
      photographer: photo.user.name,
      source: 'unsplash' as const,
    }));
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    return [];
  }
}

// Fetch images from Pexels
export async function fetchPexelsImages(query: string, count: number = 5): Promise<ImageResult[]> {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );
    
    if (!response.ok) {
      console.error('Pexels API error:', response.status);
      return [];
    }
    
    const data = await response.json();
    return data.photos.map((photo: any) => ({
      url: photo.src.large,
      alt: photo.alt || query,
      photographer: photo.photographer,
      source: 'pexels' as const,
    }));
  } catch (error) {
    console.error('Error fetching from Pexels:', error);
    return [];
  }
}

// Combined search from both APIs
export async function searchCleaningImages(query: string, count: number = 10): Promise<ImageResult[]> {
  const [unsplashResults, pexelsResults] = await Promise.all([
    fetchUnsplashImages(query, Math.ceil(count / 2)),
    fetchPexelsImages(query, Math.floor(count / 2)),
  ]);
  
  return [...unsplashResults, ...pexelsResults];
}