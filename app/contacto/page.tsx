export default function ContactoPage() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-[clamp(1.5rem,4vw,3.5rem)] pb-20 pt-12 md:pt-16">
      <div className="max-w-2xl space-y-6 text-[#111]">
        <p className="text-sm uppercase tracking-[0.18em] text-[#111]/60">
          Contacto
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Coordinemos una conversación
        </h1>
        <p className="text-base text-[#111]/70 leading-relaxed">
          Muy pronto vas a encontrar aquí información de contacto, formularios y enlaces
          a redes profesionales para coordinar proyectos, encargos editoriales o charlas
          sobre arte visual.
        </p>
        <p className="text-base text-[#111]/70 leading-relaxed">
          Mientras tanto, podés escribir a través de Instagram o seguir las novedades desde
          el archivo de proyectos curado con Sanity CMS.
        </p>
      </div>
    </section>
  );
}

