'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-white py-16 lg:py-24 px-6 lg:px-8 mt-auto">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4 mb-12">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-[#111] font-normal">
                © Micaela {currentYear}
              </p>
              <p className="text-xs text-[#111]/60 font-normal">
                Fotografía y arte visual
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <a
                href="https://instagram.com/lunaentulipan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#111] font-normal hover:text-[#666] transition-colors duration-300"
              >
                @lunaentulipan
              </a>
              <a
                href="/contacto"
                className="text-sm text-[#111] font-normal hover:text-[#666] transition-colors duration-300"
              >
                Contacto
              </a>
            </div>
          </div>
          <div className="pt-8">
            <p className="text-xs text-[#111]/40 font-normal text-center md:text-left">
              Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-10 h-10 flex items-center justify-center bg-white hover:opacity-80 transition-opacity duration-300 focus:outline-none border-0"
            aria-label="Scroll to top"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

