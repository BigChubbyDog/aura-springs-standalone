'use client';

import { usePathname } from 'next/navigation';
import RecentlyViewed from '@/components/RecentlyViewed';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <>
      {children}
      <RecentlyViewed currentPath={pathname} />
    </>
  );
}