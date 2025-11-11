export default function ArchivoPage() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-body text-[#111]">
          <header className="page-side">
            <p className="page-eyebrow">Archivo</p>
            <h1 className="page-title text-balance">
              Cronología visual y documentos
            </h1>
          </header>

          <div className="page-main">
            <div className="page-copy">
              <p>
                El archivo reúne series fotográficas, cuadernos de campo y
                documentos sonoros que dialogan con procesos de memoria en los
                Andes y la costa peruana. Cada pieza se organiza en cápsulas
                temáticas que permiten reconstruir la relación entre territorio,
                afecto y cuidado comunitario.
              </p>
              <p>
                La catalogación se realiza de forma continua, alternando
                materiales analógicos con digitalizaciones de negativos,
                registros de audio y correspondencias. Esta sección se actualiza
                desde Sanity para mantener una trazabilidad clara de los
                estados, colaboraciones y nuevos hallazgos.
              </p>
            </div>

            <section className="space-y-5">
              <h2 className="page-list-heading text-[#111]/65">
                Series en preparación
              </h2>
              <ul className="page-list">
                {[
                  'Atlas de Agua (2024) — inventario visual de memorias hidráulicas en comunidades altoandinas.',
                  'Caminos Resonantes (2023) — archivo sonoro sobre desplazamientos y festividades rurales.',
                  'Ínsulas Domésticas (2022) — restauración de álbumes familiares intervenidos con procesos químicos.',
                  'Khipu-Lab (2021) — investigación abierta sobre tejidos, código y escritura quipu contemporánea.',
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

