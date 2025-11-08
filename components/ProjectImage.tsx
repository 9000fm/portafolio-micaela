'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlForImage } from '@/lib/sanity.image';

interface ProjectImageProps {
  imageUrl: string;
  title: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: string;
}

// Helper to get image URL
function getImageUrl(imageUrl: string): string {
  if (!imageUrl) return '';
  // If it's already a full URL, return it
  if (imageUrl.startsWith('http')) return imageUrl;
  // Otherwise use the image builder
  return urlForImage(imageUrl).width(1920).url();
}

export default function ProjectImage({
  imageUrl,
  title,
  alt,
  priority = false,
  className = '',
  aspectRatio = 'aspect-[16/10]',
}: ProjectImageProps) {
  // Handle full-screen height case
  const isFullScreen = aspectRatio === 'h-screen';
  const containerClass = isFullScreen 
    ? `relative w-full h-screen overflow-hidden ${className}`
    : `relative w-full ${aspectRatio} overflow-hidden ${className}`;
  
  return (
    <section className={containerClass}>
      <Image
        src={getImageUrl(imageUrl)}
        alt={alt || title}
        fill
        className="object-cover"
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes="100vw"
      />
      
      {/* Title overlay with frosted glass effect - centered on large screens */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
            style={{
              left: 'clamp(8%, 8vw, 120px)',
            }}
          >
        {/* Frosted glass background */}
        <div 
          className="inline-block px-4 lg:px-6 py-2 lg:py-3"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          <h2
            className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold uppercase"
            style={{ 
              letterSpacing: '0.12em',
              fontFamily: 'var(--font-sans), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 600,
            }}
          >
            {title}
          </h2>
        </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

