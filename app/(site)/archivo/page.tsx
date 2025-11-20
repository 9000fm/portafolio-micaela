import { client, isSanityConfigured } from '@/lib/sanity.client';
import { projectsQuery } from '@/lib/sanity.queries';
import ArchiveView from '@/components/ArchiveView';

export const metadata = {
  title: 'Archivo | Micaela Lucía',
  description: 'Archivo de proyectos y trabajos de Micaela Lucía',
};

export default async function ArchivoPage() {
  if (!isSanityConfigured() || !client) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-[1200px] flex-col justify-center gap-6 px-[clamp(1.5rem,4vw,3.5rem)] text-left text-[#111]">
        <p className="text-sm uppercase tracking-[0.18em] text-[#111]/60">
          Configuración requerida
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Sanity no está configurado
        </h1>
      </section>
    );
  }

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

  let projects: Project[] = [];
  try {
    projects = await client.fetch(projectsQuery);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  // Group projects by year
  const projectsByYear: Record<number, Project[]> = {};
  projects.forEach((project) => {
    if (project.year) {
      if (!projectsByYear[project.year]) {
        projectsByYear[project.year] = [];
      }
      projectsByYear[project.year].push(project);
    }
  });

  // Get all years in ascending order (lower to higher)
  const years = Object.keys(projectsByYear)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="w-full bg-white">
      <div className="w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div style={{ paddingLeft: 'clamp(1.5rem, 4vw, 3.5rem)', paddingRight: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-[#111] mb-12 pt-8 leading-tight"
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                letterSpacing: '0.05em',
              }}
            >
              ARCHIVO
            </h1>
            <ArchiveView projectsByYear={projectsByYear} years={years} />
          </div>
        </div>
      </div>
    </div>
  );
}
