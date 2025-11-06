'use client';

import Image from 'next/image';

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
      <div className="absolute bottom-0 left-0 p-8 lg:p-12 z-10">
        <h2 
          className="text-white text-3xl lg:text-5xl xl:text-6xl font-light tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
      </div>
    </section>
  );
}

