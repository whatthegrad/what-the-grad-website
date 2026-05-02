'use client';

import { useEffect, useState } from 'react';

export default function IntroAnimation() {
  const [phase, setPhase] = useState<'center' | 'fading' | 'done'>('center');

  useEffect(() => {
    // Stay still for 2.5 seconds
    const t1 = setTimeout(() => setPhase('fading'), 2500);
    // After fade (1s), unmount completely
    const t2 = setTimeout(() => setPhase('done'), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: '#FFF8C0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // whole overlay fades out
      opacity: phase === 'fading' ? 0 : 1,
      transition: phase === 'fading' ? 'opacity 1s ease' : 'none',
      pointerEvents: phase === 'fading' ? 'none' : 'all',
    }}>

      {/* texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/images/yellow-texture.jpg)',
        backgroundSize: 'cover',
        opacity: 0.4,
      }}/>

      {/* logo — perfectly still, then blurs as it fades */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        // no animation — stays completely still
        filter: phase === 'fading'
          ? 'drop-shadow(0 4px 20px rgba(44,24,16,0.12)) blur(12px)'
          : 'drop-shadow(0 4px 20px rgba(44,24,16,0.12)) blur(0px)',
        transform: phase === 'fading' ? 'scale(1.06)' : 'scale(1)',
        transition: phase === 'fading'
          ? 'filter 1s ease, transform 1s ease'
          : 'none',
      }}>
        <img
          src="/images/logo.png"
          alt="What The Grad"
          style={{ height: '120px' }}
        />
      </div>
    </div>
  );
}