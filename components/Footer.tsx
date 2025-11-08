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
      <footer className="bg-white mt-32">
        {/* Container with same max-width and padding as header */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col items-center text-center gap-4">
            <p className="text-sm text-[#111] font-normal uppercase tracking-[0.2em]">
              Fotografía y arte visual
            </p>
            <a
              href="https://instagram.com/lunaentulipan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @lunaentulipan"
              className="mt-6 flex items-center justify-center w-11 h-11 rounded-full border border-black text-black transition-all duration-200 hover:bg-black hover:text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3C4.2 3 3 4.2 3 7V17C3 19.8 4.2 21 7 21H17C19.8 21 21 19.8 21 17V7C21 4.2 19.8 3 17 3H7ZM7 5H17C18.7 5 19 5.3 19 7V17C19 18.7 18.7 19 17 19H7C5.3 19 5 18.7 5 17V7C5 5.3 5.3 5 7 5ZM17.5 6.5C16.7 6.5 16 7.2 16 8C16 8.8 16.7 9.5 17.5 9.5C18.3 9.5 19 8.8 19 8C19 7.2 18.3 6.5 17.5 6.5ZM12 8C9.8 8 8 9.8 8 12C8 14.2 9.8 16 12 16C14.2 16 16 14.2 16 12C16 9.8 14.2 8 12 8ZM12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <p className="text-xs text-[#111]/40 font-normal mt-4">
              © {currentYear} Micaela Lucía · Todos los derechos reservados
            </p>
          </div>

        </div>
      </footer>
      
      {/* Scroll to Top Button - Fixed at bottom right */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 flex items-center justify-center bg-white transition-all duration-200 focus:outline-none border border-black z-50"
            aria-label="Scroll to top"
            whileHover={{ y: -3, opacity: 1 }}
          >
            {/* Two-line arrow pointing up (like < but pointing up) */}
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <path 
                d="M6 2 L2 6 M6 2 L10 6" 
                stroke="currentColor" 
                strokeWidth="0.75" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

