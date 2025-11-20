'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/image-utils';

interface ProjectImageWithAnimationProps {
  imageUrl: string;
  alt: string;
  caption?: string;
  index: number;
}

export default function ProjectImageWithAnimation({
  imageUrl,
  alt,
  caption,
  index,
}: ProjectImageWithAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="mt-4 mb-8 lg:mb-12 px-4 text-sm text-[#111]/60">
          {caption}
        </p>
      )}
    </motion.div>
  );
}



