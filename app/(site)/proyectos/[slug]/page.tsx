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
    <div className="w-full bg-white">
      {/* Cover Image */}
      {coverImageUrl && (
        <section className="relative w-full aspect-4/3 md:aspect-16/10 lg:aspect-21/9 overflow-hidden bg-[#111]">
          <Image
            src={coverImageUrl}
            alt={project.images[0]?.alt || project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          {/* Title overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-full flex justify-center">
              <div 
                className="max-w-[1200px] w-full flex items-center"
                style={{
                  paddingLeft: 'clamp(1.5rem, 4vw, 3.5rem)',
                  paddingRight: 'clamp(1.5rem, 4vw, 3.5rem)',
                }}
              >
                <div
                  className="inline-block px-6 md:px-8 py-3 md:py-4"
                  style={{
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  }}
                >
                  <h1 
                    className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase"
                    style={{
                      fontFamily: 'var(--font-inter), "Helvetica Neue", Helvetica, Arial, sans-serif',
                      letterSpacing: '0.18em',
                      fontWeight: 600,
                    }}
                  >
                    {project.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Content */}
      <section className="w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div
            className="py-16 md:py-24"
            style={{
              paddingLeft: 'clamp(1.5rem, 4vw, 3.5rem)',
              paddingRight: 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
          >
            {/* Project Metadata */}
            {(project.year || project.description || project.featured) && (
              <div style={{ marginBottom: '64px' }}>
                <div className="flex items-center gap-4 mb-6">
                  {project.year && (
                    <p className="text-base uppercase tracking-[0.28em] text-[#111]/45 font-medium">
                      {project.year}
                    </p>
                  )}
                  {project.featured && (
                    <span 
                      className="text-xs uppercase tracking-[0.24em] px-3 py-1 bg-[#111]/8 text-[#111]/50 font-medium"
                      style={{ letterSpacing: '0.24em' }}
                    >
                      Destacado
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="text-[15px] text-[#111]/75 max-w-2xl leading-relaxed font-normal">
                    {project.description}
                  </p>
                )}
              </div>
            )}

            {/* Gallery Images */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
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
        </div>
      </section>
    </div>
  );
}

