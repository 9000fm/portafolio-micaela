'use client';

import { useEffect, useRef, useState } from 'react';

const EMAIL = 'micaelaluuu@outlook.com';
const INSTAGRAM_URL = 'https://instagram.com/lunaentulipan';

export default function ContactChannels() {
  const [copied, setCopied] = useState(false);
  const [toastPosition, setToastPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async (e: React.MouseEvent | React.TouchEvent) => {
    try {
      let x: number, y: number;
      
      if ('touches' in e.nativeEvent && e.nativeEvent.touches.length > 0) {
        // Touch event
        x = e.nativeEvent.touches[0].clientX;
        y = e.nativeEvent.touches[0].clientY;
      } else if ('changedTouches' in e.nativeEvent && e.nativeEvent.changedTouches.length > 0) {
        // Touch end event
        x = e.nativeEvent.changedTouches[0].clientX;
        y = e.nativeEvent.changedTouches[0].clientY;
      } else {
        // Mouse event
        x = (e as React.MouseEvent).clientX;
        y = (e as React.MouseEvent).clientY;
      }
      
      setToastPosition({ x, y });
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('No fue posible copiar el email:', error);
    }
  };

  const handleInstagram = () => {
    window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Email Button */}
      <div style={{ marginBottom: '48px' }}>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="group flex items-center gap-5 transition-opacity duration-300 hover:opacity-60"
          aria-label="Copiar email"
        >
          <div className="flex h-14 w-14 items-center justify-center shrink-0 text-[#111]/65 transition-all duration-300 group-hover:text-[#111]">
            <MailIcon />
          </div>
          <span className="text-[15px] font-normal tracking-tight text-[#111] break-all">
            {EMAIL}
          </span>
        </button>
      </div>

      {/* Instagram Section */}
      <div>
        <p
          className="text-base uppercase tracking-[0.28em] text-[#111]/45 font-medium"
          style={{ marginBottom: '32px' }}
        >
          INSTAGRAM
        </p>
        <button
          type="button"
          onClick={handleInstagram}
          className="group flex items-center gap-5 transition-opacity duration-300 hover:opacity-60"
          aria-label="Abrir Instagram"
        >
          <div className="flex h-14 w-14 items-center justify-center shrink-0 text-[#111]/65 transition-all duration-300 group-hover:text-[#111]">
            <InstagramIcon />
          </div>
          <span className="text-[15px] font-normal tracking-tight text-[#111]">
            @lunaentulipan
          </span>
        </button>
      </div>

      {/* Toast Notification at Cursor Position */}
      {copied && (
        <div
          className="fixed px-6 py-3 bg-[#111] text-white text-xs uppercase tracking-[0.25em] font-medium rounded-full pointer-events-none animate-toast"
          style={{ 
            left: `${toastPosition.x}px`,
            top: `${toastPosition.y - 50}px`,
            transform: 'translateX(-50%)',
            zIndex: 9999,
            animation: 'fadeInOut 1.8s ease-in-out'
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          COPIADO
        </div>
      )}
    </>
  );
}

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-7 w-7"
    aria-hidden="true"
  >
    <rect x="3" y="6" width="18" height="12" rx="1" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-7 w-7"
    aria-hidden="true"
  >
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="12" cy="12" r="3.2" />
    <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);




