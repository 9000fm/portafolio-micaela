'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroProps {
  imageUrl: string;
  title: string;
}

export default function Hero({ imageUrl, title }: HeroProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Center-left overlay with subtle frosted blur */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute z-10"
        style={{
          top: '50%',
          left: '8vw',
          transform: 'translateY(-50%)',
        }}
      >
        <div className="backdrop-blur-[2px] bg-white/10 px-4 lg:px-6 py-2 lg:py-3 inline-block">
          <h2
            className="text-white text-3xl lg:text-5xl xl:text-6xl font-semibold uppercase tracking-wider"
            style={{ letterSpacing: '0.08em' }}
          >
            {title}
          </h2>
        </div>
      </motion.div>
    </section>
  );
}

