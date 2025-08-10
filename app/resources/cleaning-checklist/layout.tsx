import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ultimate Room-by-Room Cleaning Checklist | Aura Spring Cleaning',
  description: 'Free downloadable cleaning checklist used by Austin\'s top cleaning professionals. Organize your cleaning routine room by room.',
  keywords: 'cleaning checklist, room by room cleaning, house cleaning guide, professional cleaning tips, Austin cleaning service',
  openGraph: {
    title: 'Free Professional Cleaning Checklist',
    description: 'Get the same checklist our Austin cleaning professionals use. Includes daily, weekly, and monthly tasks for every room.',
    images: ['/images/cleaning-checklist-preview.jpg'],
  },
};

export default function CleaningChecklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}