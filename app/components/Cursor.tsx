'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window;
      setIsTouchDevice(hasTouch);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      <style jsx global>{`
        /* FORCE BRUTE : On cache le curseur système sur TOUS les éléments (*) 
           si l'utilisateur a une souris précise (PC).
        */
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[999999]"
        style={{
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease', 
        }}
      >
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
          >
            <path
              d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
              fill="#FFFFFF"
              stroke="#C0B283"
              strokeWidth="1.5"
            />
        </svg>
      </div>
    </>
  );
}