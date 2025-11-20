'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="w-full"
    >
      <div className="relative w-full aspect-3/4 bg-[#f5f5f5]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          quality={85}
        />
      </div>
      {caption && (
        <p 
          className="mt-6 px-4 text-[15px] text-[#111]/60 leading-relaxed font-normal"
          style={{ marginBottom: '48px' }}
        >
          {caption}
        </p>
      )}
    </motion.div>
  );
}



