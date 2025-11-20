import { client, isSanityConfigured } from '@/lib/sanity.client';
import { biographyQuery } from '@/lib/sanity.queries';
import { PortableText } from '@portabletext/react';
import { getImageUrl } from '@/lib/image-utils';
import Image from 'next/image';

export const metadata = {
  title: 'Bio | Micaela Lucía',
  description: 'Biografía de Micaela Lucía - Fotógrafa y Artista Visual',
};

export default async function BioPage() {
  if (!isSanityConfigured() || !client) {
    return (
      <section className="w-full flex justify-center mb-32 md:mb-40">
        <div className="max-w-[1200px] w-full">
          <div
            className="flex min-h-[60vh] flex-col justify-center gap-6 text-left text-[#111]"
            style={{
              paddingLeft: 'clamp(1.5rem, 4vw, 3.5rem)',
              paddingRight: 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
          >
            <p className="text-base uppercase tracking-[0.28em] text-[#111]/60">
              Página no encontrada
            </p>
            <h1 className="text-[2rem] font-semibold leading-tight">
              Esta sección aún no tiene contenido
            </h1>
          </div>
        </div>
      </section>
    );
  }

  try {
    const bio = await client.fetch(biographyQuery);

    if (!bio) {
      return (
        <section className="w-full flex justify-center">
          <div className="max-w-[1200px] w-full">
            <div
              className="flex min-h-[60vh] flex-col justify-center gap-6 text-left text-[#111]"
              style={{
                paddingLeft: 'clamp(1.5rem, 4vw, 3.5rem)',
                paddingRight: 'clamp(1.5rem, 4vw, 3.5rem)',
              }}
            >
              <p className="text-base uppercase tracking-[0.28em] text-[#111]/60">
                Página no encontrada
              </p>
              <h1 className="text-[2rem] font-semibold leading-tight">
                Esta sección aún no tiene contenido
              </h1>
              <p className="max-w-2xl text-[15px] text-[#111]/70 leading-relaxed">
                Estamos preparando nuevas secciones. Volvé al inicio para seguir explorando proyectos
                o usá el menú para navegar por el resto del sitio.
              </p>
            </div>
          </div>
        </section>
      );
    }

    const portraitUrl = bio.portrait ? getImageUrl(bio.portrait, 1600) : null;

    return (
      <section className="w-full flex justify-center mb-32 md:mb-40">
        <div className="max-w-[1200px] w-full">
          <div
            className="py-24 md:py-40 text-[#111]"
            style={{
              paddingLeft: 'clamp(1.5rem, 4vw, 3.5rem)',
              paddingRight: 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
          >
            {/* Heading - Full width */}
            {bio.heading && (
              <h1 
                className="text-3xl md:text-4xl font-semibold leading-tight text-[#111]"
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                  letterSpacing: '0.05em',
                  marginBottom: '48px',
                }}
              >
                {bio.heading}
              </h1>
            )}
            
            {/* Grid: Image left, Content right on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Portrait Image - Square, Left side on desktop */}
              {portraitUrl && (
                <div className="relative w-full aspect-square">
                  <Image
                    src={portraitUrl}
                    alt="Micaela Lucía"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    quality={95}
                  />
                </div>
              )}
              
              {/* Content - Right side on desktop */}
              {bio.content && (
                <div 
                  className="text-[15px] text-[#111]/90 bio-content-wrapper"
                  style={{
                    fontFamily: 'var(--font-sans), "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    lineHeight: '1.75',
                  }}
                >
                  <PortableText value={bio.content} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching biography:', error);
    return (
      <section className="w-full flex justify-center mb-32 md:mb-40">
        <div className="max-w-[1200px] w-full">
          <div
            className="flex min-h-[60vh] flex-col justify-center gap-6 text-left text-[#111]"
            style={{
              paddingLeft: 'clamp(1.5rem, 4vw, 3.5rem)',
              paddingRight: 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
          >
            <p className="text-base uppercase tracking-[0.28em] text-[#111]/60">
              Error
            </p>
            <h1 className="text-[2rem] font-semibold leading-tight">
              Error al cargar el contenido
            </h1>
          </div>
        </div>
      </section>
    );
  }
}

