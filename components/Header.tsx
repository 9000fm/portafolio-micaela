'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'inicio' },
  { href: '/proyectos', label: 'proyectos' },
  { href: '/biografia', label: 'biografía' },
  { href: '/archivo', label: 'archivo' },
  { href: '/contacto', label: 'contacto' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    // Fade in title after a brief delay
    const timer = setTimeout(() => {
      setTitleVisible(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        {/* Site Name */}
        <Link href="/" className="flex items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: titleVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-normal tracking-tight text-black"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Micaela Lucia
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-normal hover:text-black transition-colors duration-300"
                style={{ color: 'var(--gray-medium)' }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-6 h-6 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-px bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-px bg-black transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <ul className="flex flex-col py-4 px-6 gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-normal hover:text-black transition-colors duration-300 block py-2"
                    style={{ color: 'var(--gray-medium)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

