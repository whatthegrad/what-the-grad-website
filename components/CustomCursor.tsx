'use client';

import { useEffect, useState, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  opacity: number;
  rotation: number;
  symbol: string;
}

const COLORS = ['#F5A623', '#E8837A', '#9BB5C8', '#EEE9A0', '#E8713A'];
const SYMBOLS = ['✦', '✦', '✦', '★', '·', '✦'];

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [angle, setAngle] = useState(-45);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const sparkleId = useRef(0);
  const lastPos = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });
      setVisible(true);

      // Calculate movement angle for pencil rotation
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        const newAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
        setAngle(newAngle);

        // Add sparkle at trail position (slightly behind cursor)
        const trailX = x - dx * 0.3;
        const trailY = y - dy * 0.3;

        setSparkles(prev => [
          ...prev.slice(-18), // keep max 18 sparkles
          {
            id: sparkleId.current++,
            x: trailX + (Math.random() - 0.5) * 12,
            y: trailY + (Math.random() - 0.5) * 12,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            size: 8 + Math.random() * 8,
            opacity: 0.9,
            rotation: Math.random() * 360,
            symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          }
        ]);
      }

      lastPos.current = { x, y };
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  // Fade out sparkles
  useEffect(() => {
    const fade = () => {
      setSparkles(prev =>
        prev
          .map(s => ({ ...s, opacity: s.opacity - 0.055, size: s.size * 0.97 }))
          .filter(s => s.opacity > 0.05)
      );
      frameRef.current = requestAnimationFrame(fade);
    };
    frameRef.current = requestAnimationFrame(fade);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <>
      {/* Sparkle trail */}
      {sparkles.map(s => (
        <div
          key={s.id}
          style={{
            position: 'fixed',
            left: s.x,
            top: s.y,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
            color: s.color,
            fontSize: `${s.size}px`,
            opacity: s.opacity,
            pointerEvents: 'none',
            zIndex: 9998,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {s.symbol}
        </div>
      ))}

      {/* Pencil cursor */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          transform: `translate(-4px, -28px) rotate(${angle}deg)`,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
          fontSize: '24px',
          lineHeight: 1,
          userSelect: 'none',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
        }}
      >
        ✏️
      </div>

      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
}
