import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Austin Tower Cleaning Service | Aura Spring',
    default: 'Austin High-Rise & Tower Cleaning | Aura Spring Cleaning',
  },
  description: 'Professional cleaning services for Austin luxury towers and high-rises. Specialized in Rainey Street district towers, downtown condos, and Airbnb properties. Same-day service available.',
  keywords: 'Austin tower cleaning, high-rise cleaning service, Rainey Street cleaning, downtown Austin condo cleaning, luxury apartment cleaning Austin',
};

export default function TowersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {children}
    </div>
  );
}