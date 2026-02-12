'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      cursor.style.left = `${newX}px`;
      cursor.style.top = `${newY}px`;
      
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isVisible]);

  return (
    <>
      <style jsx global>{`
        *, *::before, *::after { 
          cursor: none !important; 
        }
      `}</style>

      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: '-100px',
          top: '-100px',
          transform: 'translate(-20%, -20%)',
          visibility: isVisible ? 'visible' : 'hidden',
        }}
      >
        {/* Flèche simple par défaut */}
        {!isHovering && (
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16"
            style={{
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))',
            }}
          >
            <path
              d="M 1 1 L 1 12 L 5 8 L 8 13 L 10 12 L 7 7 L 12 7 Z"
              fill="#FFFFFF"
              stroke="#C0B283"
              strokeWidth="0.5"
            />
          </svg>
        )}

        {/* Image loupe au survol */}
        {isHovering && (
          <div className="transition-all duration-200">
            <img 
              src="/cursor.png"
              alt="cursor"
              className="w-12 h-12"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(192, 178, 131, 0.6))',
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}