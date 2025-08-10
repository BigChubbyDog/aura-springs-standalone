'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  fill = false,
  sizes,
  quality = 85,
}: OptimizedImageProps) {
  const [isLoading, setLoading] = useState(true);
  
  // Convert PNG paths to use Next.js image optimization
  const optimizedSrc = src.startsWith('/Headshots/') 
    ? src 
    : src;

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={optimizedSrc}
          alt={alt}
          fill
          sizes={sizes || '100vw'}
          quality={quality}
          priority={priority}
          className={`
            duration-700 ease-in-out
            ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
          `}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    );
  }

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width || 500}
      height={height || 500}
      quality={quality}
      priority={priority}
      sizes={sizes}
      className={`
        ${className}
        duration-700 ease-in-out
        ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
      `}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}