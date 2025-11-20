'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/image-utils';
import ProjectImage from './ProjectImage';

interface ProjectImageType {
  image: any;
  alt: string;
  caption?: string;
}

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  year?: number;
  featured?: boolean;
  images: ProjectImageType[];
}

interface GallerySectionProps {
  galleries: Project[];
}

export default function GallerySection({ galleries }: GallerySectionProps) {
  if (!galleries || galleries.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {galleries.map((project, index) => {
        const isLast = index === galleries.length - 1;
        // First image is the cover
        const coverImage = project.images?.[0]?.image;
        const coverImageUrl = getImageUrl(coverImage, 1200);
        // Rest of images (excluding first one)
        const galleryImages = project.images?.slice(1) || [];

        return (
        <motion.section
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`w-full ${isLast ? 'pt-16 md:pt-24 pb-24 md:pb-32' : ''}`}
        >
          {/* Cover Image with integrated title */}
          {coverImageUrl && (
            <ProjectImage
              imageUrl={coverImageUrl}
              title={project.title}
              alt={project.images[0]?.alt || project.title}
              priority={index === 0}
              aspectRatio="aspect-[4/3] lg:aspect-[16/10]"
              className={isLast ? 'mt-6 md:mt-10' : ''}
            />
          )}

          {/* Content aligned to grid */}
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-20 lg:py-24">
            {/* Project Metadata */}
            {(project.year || project.description || project.featured) && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                  {project.year && (
                    <p className="text-sm text-[#111]/60">{project.year}</p>
                  )}
                  {project.featured && (
                    <span className="text-xs px-2 py-0.5 rounded bg-[#111]/10 text-[#111]/60">
                      Destacado
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="text-base text-[#111]/80 max-w-2xl">{project.description}</p>
                )}
              </div>
            )}

            {/* Gallery Images */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {galleryImages.map((imageItem, imgIndex) => {
                  const imageUrl = getImageUrl(imageItem.image, 1200);
                  return (
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
                        src={imageUrl}
                        alt={imageItem.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                    {imageItem.caption && (
                      <p className="mt-4 text-sm text-[#111]/60">{imageItem.caption}</p>
                    )}
                  </motion.div>
                );
                })}
              </div>
            )}
          </div>
        </motion.section>
      );
      })}
    </div>
  );
}

