import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team | Aura Spring Cleaning Austin TX - Meet Our Expert Cleaning Professionals',
  description: 'Meet the expert cleaning professionals at Aura Spring Cleaning. Background-checked, trained, and insured team members dedicated to exceptional service in Austin, Texas.',
  keywords: 'cleaning team austin, professional cleaners, aura spring cleaning staff, experienced cleaning professionals, austin cleaning experts, dustin allan, valerie boatman',
  openGraph: {
    title: 'Meet Our Expert Team | Aura Spring Cleaning Austin',
    description: 'Get to know our professional cleaning team in Austin. Background-checked, trained experts dedicated to exceptional service.',
    url: 'https://auraspringcleaning.com/team',
    images: [{
      url: 'https://auraspringcleaning.com/images/team-og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Aura Spring Cleaning Team Austin'
    }]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}