export default function BioPage() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-body text-[#111]">
          <header className="page-side">
            <p className="page-eyebrow">Bio</p>
            <h1 className="page-title text-balance">
              Trayectorias que dialogan con la luz
            </h1>
          </header>

          <div className="page-main">
            <div className="page-copy">
              <p>
                Micaela Lucía es fotógrafa documental peruana cuyo trabajo se
                mueve entre la arquitectura del paisaje y las historias mínimas
                que suceden en él. Su archivo combina procesos analógicos y
                digitales para explorar cómo la luz revela memoria, cuidado y
                resistencia en comunidades urbanas y rurales.
              </p>
              <p>
                Ha desarrollado series en colaboración con colectivos
                independientes, residencias artísticas y publicaciones
                especializadas en Latinoamérica. Actualmente vive entre Lima y
                Cusco, donde investiga procesos de restauración de imágenes
                familiares y la relación entre sonido, gesto y fotografía.
              </p>
            </div>

            <section className="space-y-5">
              <h2 className="page-list-heading text-[#111]/65">
                Selección de reconocimientos
              </h2>
              <ul className="page-list">
                {[
                  'Residencia Andina de Fotografía (2023) — proyecto “Cartografías del agua”.',
                  'Finalista, Premio Editorial Luz del Sur (2022) con la serie “Índigo Doméstico”.',
                  'Taller de Narrativas Visuales de Ríos Profundos (2021) — beca completa.',
                ].map((item) => (
                  <li
                    key={item}
                    className="relative pl-12 text-[#111]/75 before:absolute before:left-0 before:top-3.5 before:h-px before:w-8 before:bg-[#111]/20 before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

