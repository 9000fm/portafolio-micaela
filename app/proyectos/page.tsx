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
      <section className="mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3.5rem)] pb-16 pt-10 md:pt-14">
        <p className="text-sm uppercase tracking-[0.18em] text-[#111]/60">
          Proyectos
        </p>
        <h1 className="mt-6 text-3xl md:text-4xl font-semibold text-[#111] leading-tight">
          Archivo vivo de series fotográficas
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[#111]/70 leading-relaxed">
          Cada proyecto refleja una exploración distinta entre luz, textura y narrativa.
          Este archivo se alimenta desde Sanity CMS para mantener una curaduría dinámica.
        </p>
      </section>

      {!isSanityConfigured() ? (
        <section className="mx-auto mb-24 w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3.5rem)]">
          <div className="rounded border border-[#111]/10 bg-white p-6">
            <h2 className="text-lg font-medium text-[#111]">
              Configura Sanity para ver tus proyectos
            </h2>
            <p className="mt-3 text-sm text-[#111]/70 leading-relaxed">
              Agrega las variables de entorno en <code className="rounded bg-[#111]/5 px-2 py-1 text-xs">.env.local</code>{' '}
              y configura tu dataset siguiendo los pasos en <code className="rounded bg-[#111]/5 px-1 text-xs">SANITY_SETUP.md</code>.
            </p>
          </div>
        </section>
      ) : projects.length === 0 ? (
        <section className="mx-auto mb-24 w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3.5rem)]">
          <div className="rounded border border-dashed border-[#111]/20 bg-white/80 p-6 text-[#111]/70">
            Aún no hay proyectos publicados. Crea galerías en Sanity Studio para mostrarlas aquí.
          </div>
        </section>
      ) : (
        <GallerySection galleries={projects} />
      )}
    </div>
  );
}
