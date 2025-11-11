export default function ContactoPage() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="page-body text-[#111]">
          <header className="page-side">
            <p className="page-eyebrow">Contacto</p>
            <h1 className="page-title text-balance">
              Coordinemos una conversación
            </h1>
          </header>

          <div className="page-main">
            <div className="page-copy">
              <p>
                Cada colaboración comienza con una escucha atenta del territorio
                y de las personas que lo habitan. Comparte la intención de tu
                proyecto y diseñaremos juntos la mejor manera de documentarlo.
              </p>
              <p>
                Respondo personalmente los mensajes y agenda de encuentros entre
                Lima y Cusco. También podemos coordinar sesiones virtuales para
                revisar archivos, desarrollar propuestas curatoriales o revisar
                procesos de restauración fotográfica.
              </p>
            </div>

            <section className="space-y-5">
              <h2 className="page-list-heading text-[#111]/65">
                Formas de contacto
              </h2>
              <ul className="page-list">
                {[
                  'Escríbeme a hola@micaelalucia.com con una breve descripción del proyecto.',
                  'Agenda una reunión virtual de 30 minutos para revisión de portafolio o curaduría.',
                  'Solicita residencias o talleres personalizados para colectivos y comunidades.',
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

