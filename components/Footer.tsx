'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith('/studio');
  const currentYear = new Date().getFullYear();

  if (isStudioRoute) {
    return null;
  }

  return (
    <footer className="bg-white pb-[11px]">
      {/* Container with same max-width and padding as header */}
      <div className="w-full flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div
            className="pt-52 pb-24 lg:pt-64 lg:pb-32"
            style={{
              paddingLeft: 'clamp(1.5rem, 4vw, 3.5rem)',
              paddingRight: 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
          >
            <div className="flex flex-col items-center text-center gap-12">
              <p className="text-base text-[#111] font-medium uppercase tracking-[0.28em]">
                Fotografía y arte visual
              </p>

              <div className="flex items-center justify-center gap-12 md:gap-16">
                <Link
                  href="/"
                  aria-label="Inicio"
                  className="w-12 h-12 rounded-full border border-black flex items-center justify-center text-[11px] tracking-[0.35em] uppercase text-black transition-all duration-200 hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-md"
                >
                  ML
                </Link>

                <Link
                  href="https://instagram.com/lunaentulipan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @lunaentulipan"
                  className="w-12 h-12 rounded-full border border-black flex items-center justify-center text-black transition-all duration-200 hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-md"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition duration-200"
                  >
                    <path
                      d="M7 3C4.2 3 3 4.2 3 7V17C3 19.8 4.2 21 7 21H17C19.8 21 21 19.8 21 17V7C21 4.2 19.8 3 17 3H7ZM7 5H17C18.7 5 19 5.3 19 7V17C19 18.7 18.7 19 17 19H7C5.3 19 5 18.7 5 17V7C5 5.3 5.3 5 7 5ZM17.5 6.5C16.7 6.5 16 7.2 16 8C16 8.8 16.7 9.5 17.5 9.5C18.3 9.5 19 8.8 19 8C19 7.2 18.3 6.5 17.5 6.5ZM12 8C9.8 8 8 9.8 8 12C8 14.2 9.8 16 12 16C14.2 16 16 14.2 16 12C16 9.8 14.2 8 12 8ZM12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </div>

              <p className="text-[15px] text-[#111]/40 font-normal text-center mb-8 lg:mb-12">
                © {currentYear} Micaela Lucía · Todos los derechos reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

