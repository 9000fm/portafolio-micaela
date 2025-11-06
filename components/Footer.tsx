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
      <footer className="bg-white py-8 px-6 lg:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-black font-normal">
            © Micaela {currentYear}
          </p>
          <a
            href="https://instagram.com/lunaentulipan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black font-normal hover:opacity-70 transition-opacity duration-300"
          >
            @lunaentulipan
          </a>
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
            className="fixed bottom-8 right-8 z-40 w-10 h-10 flex items-center justify-center bg-white hover:opacity-80 transition-opacity duration-300 focus:outline-none"
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

