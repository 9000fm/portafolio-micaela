'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'inicio' },
  { href: '/biografia', label: 'biografía' },
  { href: '/archivo', label: 'archivo' },
  { href: '/proyectos', label: 'proyectos' },
  { href: '/contacto', label: 'contacto' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <nav className="w-full max-w-[1920px] mx-auto px-8 lg:px-16 xl:px-24 py-8 lg:py-10 flex items-center justify-between">
        {/* Site Name */}
        <Link href="/" className="flex items-center">
          <h1
            className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight text-black"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Micaela Lucía
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10 lg:gap-12 xl:gap-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-base lg:text-lg xl:text-xl font-normal transition-colors duration-300 ${
                    isActive 
                      ? 'text-gray-dark' 
                      : 'text-gray-medium hover:text-black'
                  }`}
                  style={isActive ? { color: 'var(--gray-dark)' } : {}}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
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
              className="md:hidden bg-white w-full absolute top-full left-0"
            >
              <ul className="flex flex-col py-6 px-8 gap-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-normal transition-colors duration-300 block py-2 ${
                          isActive 
                            ? 'text-gray-dark' 
                            : 'text-gray-medium hover:text-black'
                        }`}
                        style={isActive ? { color: 'var(--gray-dark)' } : {}}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  );
}

