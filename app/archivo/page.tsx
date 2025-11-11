export default function ArchivoPage() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3.5rem)] pb-20 pt-12 md:pt-16">
      <div className="grid gap-8 md:grid-cols-[minmax(0,32rem)] text-[#111]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.18em] text-[#111]/60">
            Archivo
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Memoria visual en desarrollo
          </h1>
          <p className="text-base text-[#111]/70 leading-relaxed">
            Esta sección reunirá series históricas, material inédito y procesos curatoriales.
            Cada actualización llegará sincronizada con Sanity CMS para mantener viva la
            investigación fotográfica.
          </p>
          <p className="text-base text-[#111]/70 leading-relaxed">
            Volvé pronto para descubrir cómo evoluciona el archivo y cómo dialoga con los
            proyectos activos.
          </p>
        </div>
      </div>
    </section>
  );
}

