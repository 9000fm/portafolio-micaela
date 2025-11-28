import Image from 'next/image';
import Link from 'next/link';
import { client, isSanityConfigured } from '@/lib/sanity.client';
import { projectsQuery } from '@/lib/sanity.queries';
import { getImageUrl } from '@/lib/image-utils';

export const metadata = {
  title: 'Micaela Lucía | Portafolio',
  description: 'Selección de proyectos presentados como carruseles continuos.',
};

type ProjectImage = {
  image: unknown;
  alt?: string;
};

type Project = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  images?: ProjectImage[];
  featured?: boolean;
};

type ScrollVariant = {
  direction: 'left' | 'right';
  duration: number;
  gap: number;
  offsets: number[];
  delay: number;
};

const scrollVariants: ScrollVariant[] = [
  { direction: 'left', duration: 420, gap: 30, offsets: [0, -18, 14, -10, 20], delay: -6 },
  { direction: 'right', duration: 460, gap: 36, offsets: [-12, 16, -8, 14, -16], delay: -12 },
  { direction: 'left', duration: 440, gap: 28, offsets: [10, -22, 12, -14, 8], delay: -18 },
  { direction: 'right', duration: 480, gap: 34, offsets: [-10, 12, -18, 16, -8], delay: -22 },
  { direction: 'left', duration: 500, gap: 32, offsets: [8, -16, 11, -13, 7], delay: -14 },
  { direction: 'right', duration: 520, gap: 30, offsets: [-14, 18, -10, 12, -6], delay: -20 },
];

const pickVariant = (index: number): ScrollVariant =>
  scrollVariants[index % scrollVariants.length];

export default async function HomePage() {
  if (!isSanityConfigured() || !client) {
    return (
      <section className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] flex-col justify-center gap-5 px-[clamp(1.5rem,4vw,3.5rem)] text-left text-[#111]">
        <p className="text-base uppercase tracking-[0.28em] text-[#111]/60">
          Configuración pendiente
        </p>
        <h1 className="text-[2rem] font-semibold leading-tight">
          Conecta Sanity para ver los proyectos
        </h1>
        <p className="max-w-2xl text-[15px] text-[#111]/70 leading-relaxed">
          Agrega las credenciales de Sanity en el entorno para activar los carruseles continuos del inicio.
        </p>
      </section>
    );
  }

  let projects: Project[] = [];
  try {
    projects = await client.fetch(projectsQuery);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  const galleries = projects.filter((project) => project.featured && project.images && project.images.length);

  if (galleries.length === 0) {
    return (
      <section className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] flex-col justify-center gap-5 px-[clamp(1.5rem,4vw,3.5rem)] text-left text-[#111]">
        <p className="text-base uppercase tracking-[0.28em] text-[#111]/60">
          Contenido en preparación
        </p>
        <h1 className="text-[2rem] font-semibold leading-tight">
          Carga proyectos para este espacio
        </h1>
        <p className="max-w-2xl text-[15px] text-[#111]/70 leading-relaxed">
          Desde el Studio, agrega proyectos con imágenes para que cada carrusel se muestre en portada.
        </p>
      </section>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="w-full px-[clamp(1.25rem,4vw,4rem)] py-16 md:py-24 space-y-20">
        {galleries.map((project, index) => (
          <Carousel key={project._id} project={project} variant={pickVariant(index)} />
        ))}
      </div>
    </div>
  );
}

function Carousel({ project, variant }: { project: Project; variant: ScrollVariant }) {
  const frames = project.images?.filter((item) => item?.image) ?? [];
  if (!frames.length) {
    return null;
  }

  const doubledFrames = [...frames, ...frames];
  const animationName = variant.direction === 'left' ? 'marquee-left' : 'marquee-right';
  const projectSlug = project.slug?.current || '';

  return (
    <Link href={`/proyectos/${projectSlug}`} className="block">
      <section className="relative w-full overflow-hidden cursor-pointer group">
        <div
          className="absolute top-1/2 -translate-y-1/2 z-10"
          style={{ left: 'clamp(1rem, 5vw, 4rem)' }}
        >
          <div
            className="uppercase text-xl sm:text-2xl lg:text-[2.8rem] font-semibold tracking-[0.3em] text-white pointer-events-auto px-6 md:px-8 py-3 md:py-4"
            style={{
              padding: '0.7rem 0.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              letterSpacing: '0.2em',
              fontFamily: 'var(--font-inter), "Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
          >
            {project.title}
          </div>
        </div>

      <div
        className="w-full overflow-hidden"
        style={{ height: '80vh' }}
      >
        <div
          className="marquee-track items-center"
          style={{
            animation: `${animationName} ${variant.duration}s linear infinite`,
            animationDelay: `${variant.delay}s`,
            gap: `${variant.gap}px`,
          }}
        >
          {doubledFrames.map((frame, index) => {
            const url = getImageUrl(frame.image, 2000);
            if (!url) {
              return null;
            }
            const offset = variant.offsets[index % variant.offsets.length];

            return (
              <div
                key={`${project._id}-${index}`}
                className="relative shrink-0 overflow-hidden"
                style={{
                  width: 'min(92vw, 860px)',
                  height: '80vh',
                  transform: `translateY(${offset}px)`,
                }}
              >
                <Image
                  src={url}
                  alt={frame.alt || project.title}
                  fill
                  className="object-cover select-none"
                  draggable={false}
                  loading="lazy"
                  sizes="(max-width: 768px) 90vw, 45vw"
                />
              </div>
            );
          })}
        </div>
      </div>
      </section>
    </Link>
  );
}


