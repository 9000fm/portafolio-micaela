import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client, isSanityConfigured } from '@/lib/sanity.client';
import { projectBySlugQuery, projectsQuery } from '@/lib/sanity.queries';
import { getImageUrl } from '@/lib/image-utils';
import ProjectImageWithAnimation from '@/components/ProjectImageWithAnimation';

// Generate static params for all projects
export async function generateStaticParams() {
  if (!isSanityConfigured() || !client) {
    return [];
  }

  try {
    const projects = await client.fetch(projectsQuery);
    return projects
      .map((project: any) => ({
        slug: project.slug?.current || '',
      }))
      .filter((param: any) => param.slug);
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isSanityConfigured() || !client) {
    notFound();
  }

  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, {
    slug,
  });

  if (!project) {
    notFound();
  }

  const coverImage = project.images?.[0]?.image;
  const coverImageUrl = getImageUrl(coverImage);
  const galleryImages = project.images?.slice(1) || [];

  return (
    <div className="w-full">
      {/* Cover Image */}
      {coverImageUrl && (
        <section className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[21/9] overflow-hidden">
          <Image
            src={coverImageUrl}
            alt={project.images[0]?.alt || project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Title overlay - center left */}
          <div className="absolute inset-0 flex items-center">
            <div 
              className="max-w-[1200px] w-full mx-auto px-6 md:px-8 lg:px-12"
              style={{
                paddingLeft: 'clamp(2rem, 6vw, 4rem)',
              }}
            >
              <div
                className="inline-block px-4 md:px-6 py-2 md:py-3"
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                }}
              >
                <h1 
                  className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-wider"
                  style={{
                    fontFamily: 'var(--font-sans), "Helvetica Neue", Helvetica, Arial, sans-serif',
                    letterSpacing: '0.15em',
                    fontWeight: 700,
                  }}
                >
                  {project.title}
                </h1>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Content */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {/* Project Metadata */}
          {(project.year || project.description || project.featured) && (
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-4">
                {project.year && (
                  <p className="text-sm md:text-base text-[#111]/60">{project.year}</p>
                )}
                {project.featured && (
                  <span className="text-xs px-2 py-0.5 rounded bg-[#111]/10 text-[#111]/60">
                    Destacado
                  </span>
                )}
              </div>
              {project.description && (
                <p className="text-base md:text-lg text-[#111]/80 max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
          )}

          {/* Gallery Images */}
          {galleryImages.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {galleryImages.map((imageItem: any, imgIndex: number) => {
                const imageUrl = getImageUrl(imageItem.image);
                if (!imageUrl) return null;

                return (
                  <ProjectImageWithAnimation
                    key={imgIndex}
                    imageUrl={imageUrl}
                    alt={imageItem.alt || project.title}
                    caption={imageItem.caption}
                    index={imgIndex}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

