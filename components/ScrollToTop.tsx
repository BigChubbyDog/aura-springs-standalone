'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Immediately scroll to top when route changes
    // Using instant behavior for immediate response when buttons are clicked
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant scroll for better UX on navigation
    });
    
    // Also handle any hash changes
    if (window.location.hash === '') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}