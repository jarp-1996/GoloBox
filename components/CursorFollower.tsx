'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState<'default' | 'link' | 'product' | 'button'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only run on desktop devices that support hover
    if (window.matchMedia('(hover: none)').matches) {
      return;
    }

    setIsVisible(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for data-cursor attributes or fallback to tag names
      const closestLink = target.closest('a');
      const closestButton = target.closest('button');
      const closestProduct = target.closest('[data-cursor="product"]');
      const closestBtn = target.closest('[data-cursor="button"]');

      if (closestProduct) {
        setHoverState('product');
      } else if (closestBtn || closestButton) {
        setHoverState('button');
      } else if (closestLink) {
        setHoverState('link');
      } else {
        setHoverState('default');
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [pathname]);

  if (!isVisible) return null;

  let cursorText = '';
  if (hoverState === 'link') cursorText = 'GO';
  if (hoverState === 'product') cursorText = 'VER';
  
  return (
    <div 
      className={`cursor-follower ${hoverState !== 'default' ? `hovering-${hoverState}` : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {cursorText}
    </div>
  );
}
