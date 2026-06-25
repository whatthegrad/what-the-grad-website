'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const PD = 'Playfair Display, Georgia, serif';

const PERSONAS = [
  {
    id: 1,
    name: 'The Curious Wanderer',
    quote: '"I don\'t have one passion. I have seventeen. Is that a problem?"',
    traits: 'Exploratory · Intuitive · Multi-passionate',
    avatar: { from: '#D6E8F5', to: '#9BB8D4', symbol: '✦' },
    suited: ['Journalism', 'Design Research', 'Consulting'],
    test: 'Holland Code (RIASEC)',
  },
  {
    id: 2,
    name: 'The Analytical Builder',
    quote: '"Show me the data. Then show me the system behind the data."',
    traits: 'Logical · Methodical · Systems-thinker',
    avatar: { from: '#E8D5F5', to: '#BFA0D4', symbol: '◈' },
    suited: ['Engineering', 'Finance', 'Data Science'],
    test: 'Myers-Briggs (MBTI)',
  },
  {
    id: 3,
    name: 'The Empathetic Leader',
    quote: '"The room always feels different when everyone has been heard."',
    traits: 'People-first · Collaborative · Emotionally aware',
    avatar: { from: '#FFF3D6', to: '#F5C97A', symbol: '❋' },
    suited: ['Psychology', 'HR & OD', 'Social Impact'],
    test: 'Big Five Personality',
  },
  {
    id: 4,
    name: 'The Creative Connector',
    quote: '"I translate between worlds that don\'t know they speak the same language."',
    traits: 'Creative · Expressive · Bridge-builder',
    avatar: { from: '#D6F0E8', to: '#8FC9B5', symbol: '◎' },
    suited: ['Marketing', 'UX Design', 'Media & Film'],
    test: 'Enneagram',
  },
  {
    id: 5,
    name: 'The Purposeful Achiever',
    quote: '"I don\'t just set goals. I build the exact road that leads to them."',
    traits: 'Goal-driven · Disciplined · High-performing',
    avatar: { from: '#F5E6D5', to: '#E8713A', symbol: '▲' },
    suited: ['Law', 'Medicine', 'Entrepreneurship'],
    test: 'StrengthsFinder',
  },
];

export default function PsychometricSection() {
  const [active, setActive]     = useState(2);
  const [dragging, setDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragStart               = useRef(0);
  const sectionRef              = useRef<HTMLDivElement>(null);
  const [visible, setVisible]   = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const prev = useCallback(() => setActive(a => Math.max(0, a - 1)), []);
  const next = useCallback(() => setActive(a => Math.min(PERSONAS.length - 1, a + 1)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current;
    if (dx < -40) next();
    if (dx > 40) prev();
    setDragging(false);
  };

  const CARD_W = isMobile ? 240 : 320;
  const CARD_H = isMobile ? 360 : 480;

  return (
    <section
      ref={sectionRef}
      id="psychometric"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#FFF8EC',
        padding: isMobile ? '60px 0 40px' : '80px 0 60px',
      }}
    >
      {/* ── Museum background (pure CSS/SVG) ── */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* gallery walls */}
        <rect width="1440" height="700" fill="#F5F0E8"/>
        {/* ceiling */}
        <rect width="1440" height="120" fill="#EDE8DC"/>
        {/* ceiling/wall join */}
        <line x1="0" y1="120" x2="1440" y2="120" stroke="#D9D3C5" strokeWidth="1.5"/>

        {/* floor — perspective planks */}
        <defs>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4A97D"/>
            <stop offset="100%" stopColor="#A0855A"/>
          </linearGradient>
          <linearGradient id="vignette" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2C1810" stopOpacity="0.45"/>
            <stop offset="30%" stopColor="#2C1810" stopOpacity="0"/>
            <stop offset="70%" stopColor="#2C1810" stopOpacity="0"/>
            <stop offset="100%" stopColor="#2C1810" stopOpacity="0.45"/>
          </linearGradient>
          <linearGradient id="vignetteV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2C1810" stopOpacity="0.12"/>
            <stop offset="40%" stopColor="#2C1810" stopOpacity="0"/>
            <stop offset="85%" stopColor="#2C1810" stopOpacity="0"/>
            <stop offset="100%" stopColor="#2C1810" stopOpacity="0.35"/>
          </linearGradient>
          {/* spotlight cone */}
          <radialGradient id="spot1" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stopColor="#FFF3D6" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#FFF3D6" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="spot2" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stopColor="#FFF3D6" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#FFF3D6" stopOpacity="0"/>
          </radialGradient>
          <filter id="blur6">
            <feGaussianBlur stdDeviation="6"/>
          </filter>
          <filter id="blur12">
            <feGaussianBlur stdDeviation="12"/>
          </filter>
        </defs>

        {/* floor polygon */}
        <polygon points="0,700 1440,700 1100,480 340,480" fill="url(#floorGrad)"/>
        {/* floor planks — vanishing point at center 720,480 */}
        {[0.05,0.12,0.22,0.34,0.48,0.62,0.73,0.83,0.91,0.97].map((t, i) => {
          const x = 340 + t * 760;
          return (
            <line key={i}
              x1={x} y1={480}
              x2={x < 720 ? 0 : 1440} y2={700}
              stroke="#B89660" strokeWidth="0.8" strokeOpacity="0.5"
            />
          );
        })}
        {/* horizontal floor lines */}
        {[0.2, 0.45, 0.7, 0.9].map((t, i) => {
          const y = 480 + t * 220;
          const xl = 340 - (340 * t);
          const xr = 1100 + (340 * t);
          return <line key={i} x1={xl} y1={y} x2={xr} y2={y} stroke="#B89660" strokeWidth="0.7" strokeOpacity="0.4"/>;
        })}

        {/* left wall side panel */}
        <polygon points="0,120 340,480 0,700" fill="#EBE5D5"/>
        <line x1="0" y1="120" x2="340" y2="480" stroke="#D9D3C5" strokeWidth="1"/>
        {/* right wall side panel */}
        <polygon points="1440,120 1100,480 1440,700" fill="#EBE5D5"/>
        <line x1="1440" y1="120" x2="1100" y2="480" stroke="#D9D3C5" strokeWidth="1"/>

        {/* left side painting */}
        <g filter="url(#blur6)" opacity="0.6">
          <rect x="38" y="180" width="120" height="160" fill="#D6E8F5" rx="2"/>
          <rect x="42" y="184" width="112" height="152" fill="#B5CCE0" rx="1"/>
          <rect x="50" y="192" width="96" height="136" fill="#9BB8D4" rx="1"/>
          <rect x="38" y="180" width="120" height="160" fill="none" stroke="#C4A97D" strokeWidth="4" rx="2"/>
        </g>

        {/* right side painting */}
        <g filter="url(#blur6)" opacity="0.6">
          <rect x="1282" y="180" width="120" height="160" fill="#FFF3D6" rx="2"/>
          <rect x="1286" y="184" width="112" height="152" fill="#F5C97A" rx="1"/>
          <rect x="1294" y="192" width="96" height="136" fill="#E8A94A" rx="1"/>
          <rect x="1282" y="180" width="120" height="160" fill="none" stroke="#C4A97D" strokeWidth="4" rx="2"/>
        </g>

        {/* main spotlight cones from ceiling */}
        <ellipse cx="720" cy="140" rx="280" ry="360" fill="url(#spot1)"/>
        <ellipse cx="300" cy="140" rx="180" ry="240" fill="url(#spot2)"/>
        <ellipse cx="1140" cy="140" rx="180" ry="240" fill="url(#spot2)"/>

        {/* ceiling light fixtures */}
        {[300, 720, 1140].map((cx, i) => (
          <g key={i}>
            <rect x={cx - 18} y={110} width="36" height="10" fill="#BDB8AA" rx="2"/>
            <ellipse cx={cx} cy={123} rx="10" ry="5" fill="#FFF8E8" fillOpacity="0.9"/>
          </g>
        ))}

        {/* vignette overlays */}
        <rect width="1440" height="700" fill="url(#vignette)" opacity="0.8"/>
        <rect width="1440" height="700" fill="url(#vignetteV)" opacity="0.9"/>
      </svg>

      {/* ── Section header ── */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        padding: isMobile ? '0 20px 32px' : '0 40px 44px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <p style={{ fontFamily: PD, fontSize: isMobile ? '10px' : '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8B7A', marginBottom: '10px' }}>
          Discover yourself
        </p>
        <h2 style={{ fontFamily: PD, fontSize: isMobile ? '28px' : '44px', fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em', lineHeight: '1.15', marginBottom: '10px' }}>
          Who are you, really?
        </h2>
        <p style={{ fontFamily: PD, fontSize: isMobile ? '14px' : '17px', fontStyle: 'italic', color: '#7A6A5A', maxWidth: '520px', margin: '0 auto' }}>
          Explore the archetypes. Find your portrait.
        </p>
      </div>

      {/* ── Gallery carousel ── */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: isMobile ? 420 : 560,
          cursor: dragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {PERSONAS.map((p, i) => {
          const offset = i - active;
          const abs    = Math.abs(offset);
          const isCenter = offset === 0;
          const sign   = offset < 0 ? -1 : 1;

          const translateX = offset * (isMobile ? 190 : 260);
          const scale      = isCenter ? 1 : abs === 1 ? 0.78 : 0.6;
          const rotateY    = isCenter ? 0 : sign * 18;
          const zIndex     = isCenter ? 10 : abs === 1 ? 5 : 1;
          const opacity    = abs > 2 ? 0 : abs === 2 ? 0.3 : 1;
          const blur       = isCenter ? 0 : abs === 1 ? 1.5 : 4;

          return (
            <div
              key={p.id}
              onClick={() => !dragging && setActive(i)}
              style={{
                position: 'absolute',
                width: CARD_W,
                height: CARD_H,
                transform: `translateX(${translateX}px) scale(${scale}) perspective(1200px) rotateY(${rotateY}deg)`,
                filter: `blur(${blur}px)`,
                opacity,
                zIndex,
                transition: dragging ? 'none' : 'all 0.55s cubic-bezier(0.34, 1.2, 0.64, 1)',
                animation: isCenter ? 'floatCard 4s ease-in-out infinite' : 'none',
                cursor: isCenter ? 'default' : 'pointer',
              }}
            >
              {/* outer ornate frame */}
              <div style={{
                position: 'absolute', inset: '-6px',
                border: '2px solid rgba(196,169,125,0.6)',
                borderRadius: '4px',
                pointerEvents: 'none',
              }}/>
              <div style={{
                position: 'absolute', inset: '-2px',
                border: '1px solid rgba(196,169,125,0.3)',
                borderRadius: '3px',
                pointerEvents: 'none',
              }}/>
              {/* corner ornaments */}
              {[[-9,-9], [CARD_W-7,-9], [-9,CARD_H-7], [CARD_W-7,CARD_H-7]].map(([cx, cy], ci) => (
                <div key={ci} style={{
                  position: 'absolute', left: cx, top: cy,
                  width: 14, height: 14,
                  border: '1.5px solid rgba(196,169,125,0.7)',
                  borderRadius: '50%',
                  background: '#F5F0E8',
                }}/>
              ))}

              {/* card */}
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(160deg, #FFFDF7 0%, #F9F4EC 100%)',
                borderRadius: '3px',
                boxShadow: isCenter
                  ? '0 40px 80px rgba(44,24,16,0.35), 0 8px 24px rgba(44,24,16,0.2)'
                  : '0 12px 32px rgba(44,24,16,0.18)',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid rgba(196,169,125,0.4)',
              }}>
                {/* avatar band */}
                <div style={{
                  height: isMobile ? 120 : 160,
                  background: `linear-gradient(135deg, ${p.avatar.from} 0%, ${p.avatar.to} 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  {/* subtle pattern */}
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} viewBox="0 0 100 100">
                    {[10,30,50,70,90].map(x => [10,30,50,70,90].map(y => (
                      <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#2C1810"/>
                    )))}
                  </svg>
                  <div style={{
                    width: isMobile ? 60 : 76, height: isMobile ? 60 : 76,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.25)',
                    border: '2px solid rgba(255,255,255,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: isMobile ? 26 : 32,
                    color: '#2C1810',
                    backdropFilter: 'blur(4px)',
                  }}>
                    {p.avatar.symbol}
                  </div>
                </div>

                {/* card body */}
                <div style={{ flex: 1, padding: isMobile ? '14px 16px 12px' : '20px 22px 16px', display: 'flex', flexDirection: 'column', gap: isMobile ? 8 : 12 }}>
                  {/* name */}
                  <p style={{
                    fontFamily: PD, fontWeight: '700',
                    fontSize: isMobile ? '15px' : '18px',
                    color: '#2C1810', lineHeight: 1.25, margin: 0,
                  }}>
                    {p.name}
                  </p>

                  {/* quote */}
                  <p style={{
                    fontFamily: PD, fontStyle: 'italic',
                    fontSize: isMobile ? '11px' : '13px',
                    color: '#5C4A3A', lineHeight: 1.6, margin: 0,
                    flex: 1,
                  }}>
                    {p.quote}
                  </p>

                  {/* traits */}
                  <p style={{
                    fontFamily: PD, fontSize: isMobile ? '9px' : '10px',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#9B8B7A', margin: 0,
                  }}>
                    {p.traits}
                  </p>

                  {/* divider */}
                  <div style={{ borderTop: '1px solid rgba(196,169,125,0.4)', margin: '2px 0' }}/>

                  {/* suited for */}
                  <div>
                    <p style={{ fontFamily: PD, fontSize: isMobile ? '9px' : '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4A97D', marginBottom: '5px' }}>
                      Best suited for →
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {p.suited.map(s => (
                        <span key={s} style={{
                          fontFamily: PD, fontSize: isMobile ? '9px' : '10px',
                          background: 'rgba(196,169,125,0.15)',
                          border: '1px solid rgba(196,169,125,0.4)',
                          borderRadius: '100px', padding: '2px 8px',
                          color: '#5C4A3A',
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* test badge */}
                  <div style={{
                    background: '#2C1810', borderRadius: '2px',
                    padding: isMobile ? '6px 10px' : '8px 12px',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <span style={{ fontFamily: PD, fontSize: isMobile ? '9px' : '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4A97D' }}>Test</span>
                    <span style={{ fontFamily: PD, fontSize: isMobile ? '10px' : '11px', color: '#FFF8EC', fontWeight: '700' }}>{p.test}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Arrow navigation ── */}
      <div style={{
        position: 'relative', zIndex: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '24px', marginTop: isMobile ? 16 : 24,
      }}>
        <button
          onClick={prev}
          disabled={active === 0}
          aria-label="Previous persona"
          style={{
            width: isMobile ? 40 : 48, height: isMobile ? 40 : 48,
            borderRadius: '50%',
            background: 'rgba(255,248,236,0.85)',
            border: '1.5px solid rgba(196,169,125,0.5)',
            cursor: active === 0 ? 'not-allowed' : 'pointer',
            opacity: active === 0 ? 0.35 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: isMobile ? 16 : 18, color: '#2C1810',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => { if (active > 0) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(196,169,125,0.25)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,248,236,0.85)'; }}
        >
          ‹
        </button>

        {/* dot indicators */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {PERSONAS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to ${PERSONAS[i].name}`}
              style={{
                width: i === active ? 24 : 7,
                height: 7,
                borderRadius: '100px',
                background: i === active ? '#C4A97D' : 'rgba(196,169,125,0.35)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={active === PERSONAS.length - 1}
          aria-label="Next persona"
          style={{
            width: isMobile ? 40 : 48, height: isMobile ? 40 : 48,
            borderRadius: '50%',
            background: 'rgba(255,248,236,0.85)',
            border: '1.5px solid rgba(196,169,125,0.5)',
            cursor: active === PERSONAS.length - 1 ? 'not-allowed' : 'pointer',
            opacity: active === PERSONAS.length - 1 ? 0.35 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: isMobile ? 16 : 18, color: '#2C1810',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => { if (active < PERSONAS.length - 1) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(196,169,125,0.25)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,248,236,0.85)'; }}
        >
          ›
        </button>
      </div>

      {/* ── Take the test CTA ── */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        marginTop: isMobile ? 28 : 36,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 0.3s',
      }}>
        <p style={{ fontFamily: PD, fontSize: isMobile ? '12px' : '13px', fontStyle: 'italic', color: '#9B8B7A', marginBottom: '14px' }}>
          Not sure which one you are? That's kind of the point.
        </p>
        <button
          onClick={() => { window.location.href = '/contact'; }}
          style={{
            padding: isMobile ? '12px 28px' : '14px 36px',
            background: '#2C1810', color: '#FFF8EC',
            border: 'none', borderRadius: '100px',
            fontFamily: PD, fontSize: isMobile ? '13px' : '14px',
            fontWeight: '700', letterSpacing: '0.04em',
            cursor: 'pointer', transition: 'background 0.25s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F5A623'; (e.currentTarget as HTMLButtonElement).style.color = '#2C1810'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#2C1810'; (e.currentTarget as HTMLButtonElement).style.color = '#FFF8EC'; }}
        >
          Find your archetype →
        </button>
      </div>

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateX(0) scale(1) perspective(1200px) rotateY(0deg) translateY(0px); }
          50%       { transform: translateX(0) scale(1) perspective(1200px) rotateY(0deg) translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
