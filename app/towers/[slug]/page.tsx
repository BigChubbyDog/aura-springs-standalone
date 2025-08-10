import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TowerPageTemplate from '@/components/towers/TowerPageTemplate';
import { getTowerById, getAllTowerIds, towerData } from '@/lib/towerData';

// Generate static params for all towers
export async function generateStaticParams() {
  return getAllTowerIds().map((id) => ({
    slug: id,
  }));
}

// Generate metadata for each tower page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tower = getTowerById(params.slug);
  
  if (!tower) {
    return {
      title: 'Tower Not Found | Aura Spring Cleaning',
      description: 'The requested tower page could not be found.',
    };
  }

  return {
    title: `${tower.name} Cleaning Service | Aura Spring Cleaning Austin`,
    description: `Professional cleaning services for ${tower.name} residents. ${tower.description} Book online or call (512) 781-0527.`,
    keywords: `${tower.name} cleaning, ${tower.name} maid service, ${tower.address} cleaning, luxury condo cleaning Austin, ${tower.name} housekeeping`,
    openGraph: {
      title: `${tower.name} Cleaning Service | Aura Spring Cleaning`,
      description: tower.description,
      images: [tower.image],
      url: `https://aurasprings.com/towers/${tower.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tower.name} Cleaning Service`,
      description: tower.description,
      images: [tower.image],
    },
  };
}

export default function TowerPage({ params }: { params: { slug: string } }) {
  const tower = getTowerById(params.slug);

  if (!tower) {
    notFound();
  }

  return <TowerPageTemplate tower={tower} />;
}