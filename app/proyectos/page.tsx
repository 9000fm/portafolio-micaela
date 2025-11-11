import GallerySection from '@/components/GallerySection';
import { client, isSanityConfigured } from '@/lib/sanity.client';
import { galleriesQuery } from '@/lib/sanity.queries';

async function fetchProjects() {
  if (!isSanityConfigured() || !client) {
    return [];
  }

  try {
    const data = await client.fetch(galleriesQuery);
    return data || [];
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return [];
  }
}

export default async function ProyectosPage() {
    const projects = await fetchProjects();

    return (
      <div className="w-full">
        <section className="page-section pt-12 md:pt-16">
          <div className="page-container pt-0 md:pt-2 pb-10 md:pb-12">
            <div className="page-body text-[#111]">
              <header className="page-side">
                <p className="page-eyebrow">Proyectos</p>
                <h1 className="page-title text-balance">
                  Archivo vivo de series fotográficas
                </h1>
              </header>

              <div className="page-main">
                <div className="page-copy max-w-3xl">
                  <p>
                    Cada proyecto refleja una exploración distinta entre luz,
                    textura y narrativa. Esta colección se actualiza de forma
                    dinámica desde Sanity para sostener procesos colaborativos y
                    nuevas lecturas del archivo visual.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {!isSanityConfigured() ? (
          <section className="page-section pt-0">
            <div className="page-container pt-0">
              <div className="rounded border border-[#111]/10 bg-white/80 p-6 md:p-8 text-[#111]">
                <h2 className="text-lg font-medium">
                  Configura Sanity para ver tus proyectos
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#111]/70">
                  Agrega las variables de entorno en{' '}
                  <code className="rounded bg-[#111]/5 px-2 py-1 text-xs">
                    .env.local
                  </code>{' '}
                  y sigue los pasos descritos en{' '}
                  <code className="rounded bg-[#111]/5 px-1 text-xs">
                    SANITY_SETUP.md
                  </code>
                  .
                </p>
              </div>
            </div>
          </section>
        ) : projects.length === 0 ? (
          <section className="page-section pt-0">
            <div className="page-container pt-0">
              <div className="rounded border border-dashed border-[#111]/20 bg-white/80 p-6 text-[#111]/70">
                Aún no hay proyectos publicados. Crea galerías en Sanity Studio
                para mostrarlas aquí.
              </div>
            </div>
          </section>
        ) : (
          <GallerySection galleries={projects} />
        )}
      </div>
    );
}
