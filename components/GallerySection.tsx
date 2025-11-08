'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlForImage } from '@/lib/sanity.image';
import ProjectImage from './ProjectImage';

// Helper to get image URL
function getImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return '';
  // If it's already a full URL, return it
  if (imageUrl.startsWith('http')) return imageUrl;
  // Otherwise use the image builder
  return urlForImage(imageUrl).width(1200).url();
}

interface GalleryImage {
  imageUrl: string;
  alt: string;
  caption?: string;
}

interface Gallery {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  year?: string;
  coverImageUrl: string;
  gallery?: GalleryImage[];
}

interface GallerySectionProps {
  galleries: Gallery[];
}

export default function GallerySection({ galleries }: GallerySectionProps) {
  if (!galleries || galleries.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {galleries.map((gallery, index) => (
        <motion.section
          key={gallery._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="w-full"
        >
          {/* Cover Image with integrated title - no spacing between projects */}
          {gallery.coverImageUrl && (
            <ProjectImage
              imageUrl={gallery.coverImageUrl}
              title={gallery.title}
              alt={gallery.title}
              priority={index === 0}
              aspectRatio="aspect-[4/3] lg:aspect-[16/10]"
            />
          )}

          {/* Content aligned to grid - consistent spacing */}
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-20 lg:py-24">
            {/* Gallery Metadata - shown below image */}
            {(gallery.year || gallery.description) && (
              <div className="mb-12">
                {gallery.year && (
                  <p className="text-sm text-[#111]/60 mb-2">{gallery.year}</p>
                )}
                {gallery.description && (
                  <p className="text-base text-[#111]/80 max-w-2xl">{gallery.description}</p>
                )}
              </div>
            )}

            {/* Gallery Images */}
            {gallery.gallery && gallery.gallery.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {gallery.gallery.map((image, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: imgIndex * 0.1 }}
                    className="w-full"
                  >
                    <div className="relative w-full aspect-[3/4]">
                      <Image
                        src={getImageUrl(image.imageUrl)}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                    {image.caption && (
                      <p className="mt-4 text-sm text-[#111]/60">{image.caption}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
}

