'use client';

import { useCallback, useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.scrollY > 320;
  });

  const checkScrollPosition = useCallback(() => {
    if (typeof window === 'undefined') return;
    setIsVisible((prev) => {
      const hasScrolledEnough = window.scrollY > 320;
      return prev === hasScrolledEnough ? prev : hasScrolledEnough;
    });
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(checkScrollPosition);
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label="Volver al inicio"
      onClick={handleScrollToTop}
      className={[
        'fixed z-30 group flex h-12 w-12 items-center justify-center',
        'rounded-full border border-[#111]/20 bg-white/70 shadow-sm backdrop-blur',
        'transition-all duration-300 ease-out hover:-translate-y-1',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]/60',
        isVisible
          ? 'pointer-events-auto opacity-100 translate-y-0'
          : 'pointer-events-none opacity-0 translate-y-4',
      ].join(' ')}
      style={{
        right: 'clamp(1.5rem, 4vw, 3.5rem)',
        top: '70vh',
        transform: 'translateY(-50%)',
      }}
    >
      <span
        aria-hidden="true"
        className="relative flex h-5 w-5 items-center justify-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:-translate-y-px"
          aria-hidden="true"
        >
          <path
            d="M6.5 15.5L12 9.5L17.5 15.5"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

