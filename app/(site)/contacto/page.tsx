import ContactChannels from '@/components/ContactChannels';

export const metadata = {
  title: 'Contacto | Micaela Lucía',
  description: 'Contacto profesional de Micaela Lucía',
};

const detailItems = [
  { label: 'UBICACION', value: 'Lima, Perú' },
  { label: 'DISPONIBILIDAD', value: 'Trabajos locales e internacionales' },
  { label: 'IDIOMAS', value: 'Español e Inglés' },
];

export default function ContactPage() {
  return (
    <section className="w-full flex justify-center text-[#111]">
      <div className="max-w-[1200px] w-full">
        <div
          className="py-24 md:py-40"
          style={{
            paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
          }}
        >
          {/* Title */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]"
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              letterSpacing: '0.05em',
              marginBottom: '48px',
            }}
          >
            CONTACTO
          </h1>

          {/* CONECTEMOS Section */}
          <div className="max-w-2xl" style={{ marginBottom: '64px' }}>
            <p
              className="text-base uppercase tracking-[0.28em] text-[#111]/45 font-medium"
              style={{ marginBottom: '24px' }}
            >
              CONECTEMOS
            </p>
            <p className="text-[15px] leading-relaxed text-[#111]/75 font-normal">
              Disponible para proyectos editoriales, retratos y colaboraciones creativas. Escríbeme para
              coordinar.
            </p>
          </div>

          {/* EMAIL + INSTAGRAM Section */}
          <div style={{ marginBottom: '96px' }}>
            <p
              className="text-base uppercase tracking-[0.28em] text-[#111]/45 font-medium"
              style={{ marginBottom: '32px' }}
            >
              EMAIL
            </p>
            <ContactChannels />
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16 md:gap-y-20 max-w-4xl">
            {detailItems.map((item) => (
              <div key={item.label}>
                <p
                  className="text-base uppercase tracking-[0.28em] text-[#111]/45 font-medium"
                  style={{ marginBottom: '24px' }}
                >
                  {item.label}
                </p>
                <p className="text-[15px] leading-relaxed text-[#111]/75 font-normal">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


