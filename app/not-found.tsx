export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-[1200px] flex-col justify-center gap-6 px-[clamp(1.5rem,4vw,3.5rem)] text-left text-[#111]">
      <p className="text-sm uppercase tracking-[0.18em] text-[#111]/60">
        Página no encontrada
      </p>
      <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
        Este enlace todavía no tiene contenido
      </h1>
      <p className="max-w-2xl text-base text-[#111]/70 leading-relaxed">
        Estamos preparando nuevas secciones. Volvé al inicio para seguir explorando proyectos
        o usá el menú para navegar por el resto del sitio.
      </p>
    </section>
  );
}

