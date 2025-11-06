'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/proyectos', label: 'proyectos' }, // first
  { href: '/', label: 'inicio' },
  { href: '/biografia', label: 'biografía' },
  { href: '/archivo', label: 'archivo' },
  { href: '/contacto', label: 'contacto' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <nav className="w-full max-w-[1200px] mx-auto px-6 lg:px-8 py-6 lg:py-8 flex items-center justify-between">
        {/* Site Name */}
        <Link href="/" className="flex items-center">
          <h1
            className="text-2xl lg:text-3xl xl:text-4xl font-light tracking-tight text-[#111]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Micaela Lucía
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm lg:text-base font-normal transition-colors duration-200 lowercase ${
                    isActive 
                      ? 'text-(--color-gray-dark)' 
                      : 'text-(--color-gray-medium) hover:text-(--color-gray-dark)'
                  }`}
                  style={{ letterSpacing: '0.1em' }}
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
                        className={`text-base font-normal transition-colors duration-200 block py-2 lowercase ${
                          isActive 
                            ? 'text-(--color-gray-dark)' 
                            : 'text-(--color-gray-medium) hover:text-(--color-gray-dark)'
                        }`}
                        style={{ letterSpacing: '0.1em' }}
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

