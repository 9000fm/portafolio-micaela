'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setShowScrollTop(progress > 0.85);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-white py-16 lg:py-24 px-6 lg:px-8 mt-auto">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center text-center gap-4 mb-8">
            {/* Logo placeholder: using name as logo for now */}
            <div className="text-xl tracking-wide" style={{ letterSpacing: '0.1em' }}>MICAELA</div>
            <p className="text-sm text-[#111] font-normal">© Micaela Lucía {currentYear}</p>
            <p className="text-xs text-[#111]/70 font-normal">Fotografía y arte visual</p>
            <a
              href="https://instagram.com/lunaentulipan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#111] hover:text-[#666] transition-colors duration-200"
            >
              @lunaentulipan
            </a>
          </div>
          <p className="text-xs text-[#111]/40 font-normal text-center">
            Todos los derechos reservados
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={scrollToTop}
            className="fixed z-40 w-10 h-10 flex items-center justify-center bg-white transition-all duration-200 focus:outline-none"
            aria-label="Scroll to top"
            style={{ bottom: 40, right: 40, border: '10px solid #000' }}
            whileHover={{ y: -3, opacity: 1 }}
          >
            <div className="relative w-4 h-4 opacity-70">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 block h-4 w-px bg-black" />
              <span className="absolute left-1/2 top-0 -translate-x-1/2 rotate-45 block h-2 w-px bg-black origin-top" />
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -rotate-45 block h-2 w-px bg-black origin-top" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

