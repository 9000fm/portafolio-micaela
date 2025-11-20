'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/image-utils';

interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  year: number;
  images?: Array<{
    image: unknown;
    alt?: string;
  }>;
}

interface ArchiveViewProps {
  projectsByYear: Record<number, Project[]>;
  years: number[];
}

export default function ArchiveView({ projectsByYear, years }: ArchiveViewProps) {
  const [openYears, setOpenYears] = useState<Set<number>>(new Set());

  const toggleYear = (year: number) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  return (
    <div className="w-full pt-12 pb-16">
      <ul className="space-y-0">
        {years.map((year) => {
          const projects = projectsByYear[year] || [];
          const isOpen = openYears.has(year);

          return (
            <motion.li
              key={year}
              layout
              transition={{
                layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
              }}
              className="w-full"
            >
              {/* Year Button */}
              <button
                onClick={() => toggleYear(year)}
                className="w-full text-left text-lg md:text-xl lg:text-2xl text-[#111] hover:text-[#111]/60 transition-colors duration-200 py-2 font-semibold"
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                  letterSpacing: '0.02em',
                }}
              >
                {year}
              </button>

              {/* Projects Grid - Appears below year */}
              <AnimatePresence initial={false}>
                {isOpen && projects.length > 0 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: 'auto',
                      transition: {
                        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.3, delay: 0.1 }
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      transition: {
                        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pt-2">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                        {projects.map((project) => {
                          const coverImage = project.images?.[0]?.image;
                          const imageUrl = getImageUrl(coverImage, 400);
                          const slug = project.slug?.current || '';

                          return (
                            <motion.div
                              key={project._id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: 0.15 }}
                            >
                              <Link
                                href={`/proyectos/${slug}`}
                                className="block aspect-square relative overflow-hidden group"
                              >
                                {imageUrl ? (
                                  <Image
                                    src={imageUrl}
                                    alt={project.images?.[0]?.alt || project.title}
                                    fill
                                    className="object-cover transition-opacity duration-200 group-hover:opacity-75"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-[#111]/5 flex items-center justify-center">
                                    <span 
                                      className="text-xs text-[#111]/40"
                                      style={{
                                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                                      }}
                                    >
                                      {project.title}
                                    </span>
                                  </div>
                                )}
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

