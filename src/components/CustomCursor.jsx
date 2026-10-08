import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const targetPos = { ...ringPos };
    let scale = 1;
    let isHovered = false;

    const onPointerMove = (e) => {
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      isHovered = !!e.target?.closest?.('a, button, [data-cursor], .services li');
    };

    window.addEventListener('pointermove', onPointerMove);

    let rafId = 0;
    const update = () => {
      ringPos.x += (targetPos.x - ringPos.x) * 0.16;
      ringPos.y += (targetPos.y - ringPos.y) * 0.16;

      const active = isHovered || document.body.style.cursor === 'pointer';
      scale += ((active ? 2 : 1) - scale) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) scale(${scale.toFixed(3)})`;
        ringRef.current.classList.toggle('is-active', active);
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
