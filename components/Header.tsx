'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'proyectos' },
  { href: '/archivo', label: 'archivo' },
  { href: '/bio', label: 'bio' },
  { href: '/contacto', label: 'contacto' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith('/studio');
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes (e.g., browser back/forward navigation)
  // This is a standard pattern for closing menus on navigation
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
    // Only depend on pathname to avoid unnecessary re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (isStudioRoute) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="w-full">
        {/* Full-width navbar, content centered in 1200px container */}
        <div className="w-full flex justify-center">
          <div className="max-w-[1200px] w-full">
            <div className="flex items-center justify-between py-7 lg:py-9">
              {/* Site Name with left margin */}
              <div 
                className="flex items-center shrink-0"
                style={{ 
                  marginLeft: 'clamp(1.5rem, 4vw, 3.5rem)'
                }}
              >
                <Link href="/" className="z-10">
                  <h1
                    className="text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight text-[#111]"
                    style={{ letterSpacing: '0.15em' }}
                  >
                    Micaela Lucía
                  </h1>
                </Link>
              </div>

              {/* Desktop Navigation - Right side with equal spacing */}
              <ul 
                className="hidden md:flex items-center gap-10 lg:gap-12 shrink-0"
                style={{ 
                  marginRight: 'clamp(1.5rem, 4vw, 3.5rem)'
                }}
              >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`desktop-nav-link ${isActive ? 'desktop-nav-link--active' : ''} text-sm lg:text-sm font-normal lowercase transition-colors duration-300`}
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
              className="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6 focus:outline-none z-50 relative"
              style={{ 
                marginRight: 'clamp(1.5rem, 4vw, 3.5rem)'
              }}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-px w-full bg-black transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? 'rotate-45 absolute top-1/2 -translate-y-1/2' : 'relative'
                }`}
              />
              <span
                className={`block h-px w-full bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : '' 
                }`}
              />
              <span
                className={`block h-px w-full bg-black transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? '-rotate-45 absolute top-1/2 -translate-y-1/2' : 'relative'
                }`}
              />
            </button>
            </div>
          </div>
        </div>
      </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-white z-40"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col items-center justify-center px-10 pt-24 pb-40"
              >
                {/* Navigation Links */}
                <ul className="flex flex-col items-center gap-12">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`text-base font-normal transition-colors duration-300 block py-3 lowercase ${
                            isActive 
                              ? 'text-[#1a1a1a]' 
                              : 'text-[#d0d0d0]'
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
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  );
}

