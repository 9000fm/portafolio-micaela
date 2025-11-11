export default function BiografiaPage() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3.5rem)] pb-20 pt-12 md:pt-16">
      <div className="max-w-3xl space-y-6 text-[#111]">
        <p className="text-sm uppercase tracking-[0.18em] text-[#111]/60">
          Biografía
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Narrativa en construcción
        </h1>
        <p className="text-base text-[#111]/70 leading-relaxed">
          Estamos preparando una crónica detallada sobre el recorrido de Micaela Lucía,
          sus colaboraciones y procesos creativos. Muy pronto esta sección reunirá hitos,
          exposiciones y el trasfondo que inspira cada serie fotográfica.
        </p>
        <p className="text-base text-[#111]/70 leading-relaxed">
          Mientras ultimamos la edición, podés explorar los proyectos activos y seguir la
          evolución del archivo visual que se actualiza desde Sanity CMS.
        </p>
      </div>
    </section>
  );
}

