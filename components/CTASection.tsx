'use client';
import { useEffect, useRef, useState } from 'react';

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.3)));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blur       = Math.max(0, 10 - progress * 10);
  const translateY = Math.max(0, 20 - progress * 20);
  const opacity    = Math.min(1, progress * 1.5);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#8B7BA8',
      }}
    >
      {/* background image — zoomed out on mobile */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/images/contact-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(80,60,100,0.5)' }}/>

      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '860px',
        filter: `blur(${blur}px)`,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 5.5vw, 72px)',
          fontWeight: '700', color: '#FFFFFF',
          letterSpacing: '-0.02em', lineHeight: '1.1',
          marginBottom: '32px',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}>
          One conversation can<br/>change everything.
        </h2>
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(14px, 2vw, 22px)',
          fontStyle: 'italic', color: 'rgba(255,255,255,0.92)',
          lineHeight: '1.7', marginBottom: '12px',
        }}>
          Bring your questions, your confusion, or just a vague feeling that you need direction.
        </p>
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(13px, 1.6vw, 19px)',
          fontStyle: 'italic', color: 'rgba(255,255,255,0.75)',
        }}>
          We&apos;ll take it from there.
        </p>
      </div>
    </section>
  );
}
