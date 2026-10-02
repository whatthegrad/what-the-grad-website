'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const PD = 'Playfair Display, Georgia, serif';

interface Country {
  id: string;
  name: string;
  slug: string;
  // SVG coordinates on a 1000x500 viewBox world map
  x: number;
  y: number;
  flag: string;
}

const COUNTRIES: Country[] = [
  { id: 'uk',          name: 'United Kingdom',  slug: 'uk',          x: 468, y: 148, flag: '🇬🇧' },
  { id: 'ireland',     name: 'Ireland',         slug: 'ireland',     x: 450, y: 148, flag: '🇮🇪' },
  { id: 'france',      name: 'France',          slug: 'france',      x: 485, y: 175, flag: '🇫🇷' },
  { id: 'spain',       name: 'Spain',           slug: 'spain',       x: 470, y: 195, flag: '🇪🇸' },
  { id: 'germany',     name: 'Germany',         slug: 'germany',     x: 510, y: 155, flag: '🇩🇪' },
  { id: 'netherlands', name: 'Netherlands',     slug: 'netherlands', x: 497, y: 147, flag: '🇳🇱' },
  { id: 'finland',     name: 'Finland',         slug: 'finland',     x: 540, y: 105, flag: '🇫🇮' },
  { id: 'hungary',     name: 'Hungary',         slug: 'hungary',     x: 525, y: 170, flag: '🇭🇺' },
  { id: 'malta',       name: 'Malta',           slug: 'malta',       x: 510, y: 202, flag: '🇲🇹' },
  { id: 'armenia',     name: 'Armenia',         slug: 'armenia',     x: 590, y: 185, flag: '🇦🇲' },
  { id: 'uae',         name: 'Dubai, UAE',      slug: 'dubai',       x: 615, y: 232, flag: '🇦🇪' },
  { id: 'australia',   name: 'Australia',       slug: 'australia',   x: 820, y: 370, flag: '🇦🇺' },
  { id: 'new-zealand', name: 'New Zealand',     slug: 'new-zealand', x: 880, y: 410, flag: '🇳🇿' },
];

// India position for drawing connection lines
const INDIA = { x: 660, y: 240 };

export default function StudyAbroadMap() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const hoveredCountry = COUNTRIES.find(c => c.id === hovered);

  return (
    <section
      ref={sectionRef}
      id="study-abroad"
      style={{
        background: 'linear-gradient(180deg, #FFF8EC 0%, #F5F0E8 50%, #FFF8EC 100%)',
        padding: isMobile ? '56px 5vw 48px' : '80px 5vw 72px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* header */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? 24 : 40,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <p style={{
          fontFamily: PD, fontSize: isMobile ? '10px' : '12px',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#9B8B7A', marginBottom: 10,
        }}>
          Study abroad
        </p>
        <h2 style={{
          fontFamily: PD,
          fontSize: isMobile ? '26px' : '44px',
          fontWeight: 700, color: '#2C1810',
          letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: 10,
        }}>
          Your world, mapped out ✦
        </h2>
        <p style={{
          fontFamily: PD,
          fontSize: isMobile ? '13px' : '16px',
          fontStyle: 'italic', color: '#5C4A3A',
          maxWidth: 500, margin: '0 auto',
        }}>
          Tap a country to explore universities, courses, and what life there actually looks like.
        </p>
      </div>

      {/* map container */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s ease 0.3s',
      }}>
        <svg
          viewBox="0 0 1000 500"
          style={{ width: '100%', height: 'auto' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* world map simplified outline */}
          <defs>
            <linearGradient id="mapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8E0D4" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#D6D0C4" stopOpacity="0.4"/>
            </linearGradient>
            <filter id="mapShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2C1810" floodOpacity="0.08"/>
            </filter>
          </defs>

          {/* continent shapes — simplified */}
          {/* North America */}
          <path d="M80,80 C120,60 180,55 220,70 C260,50 280,60 300,90 C310,130 280,180 260,210 C240,240 210,260 180,280 C150,270 120,240 100,210 C80,180 70,140 75,110 Z" fill="url(#mapGrad)" filter="url(#mapShadow)" stroke="#C4B8A4" strokeWidth="0.5"/>
          {/* South America */}
          <path d="M240,280 C260,270 280,290 290,320 C300,350 290,390 270,420 C250,440 230,445 220,430 C210,400 200,360 210,330 C215,310 225,290 240,280 Z" fill="url(#mapGrad)" filter="url(#mapShadow)" stroke="#C4B8A4" strokeWidth="0.5"/>
          {/* Europe */}
          <path d="M440,100 C460,90 500,85 540,95 C560,100 570,120 560,140 C555,155 540,170 520,180 C500,190 480,195 460,190 C445,180 435,160 438,140 C440,125 440,110 440,100 Z" fill="url(#mapGrad)" filter="url(#mapShadow)" stroke="#C4B8A4" strokeWidth="0.5"/>
          {/* Africa */}
          <path d="M470,210 C500,200 530,210 545,240 C555,270 550,310 540,340 C530,370 510,400 490,410 C470,405 455,380 450,350 C445,320 448,280 455,250 C460,230 465,215 470,210 Z" fill="url(#mapGrad)" filter="url(#mapShadow)" stroke="#C4B8A4" strokeWidth="0.5"/>
          {/* Asia */}
          <path d="M560,90 C600,80 660,85 720,100 C760,110 800,130 820,160 C830,190 810,220 780,240 C740,260 700,260 660,250 C630,240 600,225 580,200 C565,180 555,150 555,130 C556,115 558,100 560,90 Z" fill="url(#mapGrad)" filter="url(#mapShadow)" stroke="#C4B8A4" strokeWidth="0.5"/>
          {/* India subcontinent highlight */}
          <path d="M640,200 C655,195 670,200 680,215 C688,230 685,250 675,265 C665,275 650,280 640,270 C632,255 630,240 632,225 C634,212 637,205 640,200 Z" fill="#D6E8F5" fillOpacity="0.5" stroke="#9BB8D4" strokeWidth="1"/>
          {/* Australia */}
          <path d="M780,330 C810,320 850,325 870,345 C885,360 880,385 865,400 C845,410 815,415 795,405 C775,395 770,370 775,350 C778,340 778,335 780,330 Z" fill="url(#mapGrad)" filter="url(#mapShadow)" stroke="#C4B8A4" strokeWidth="0.5"/>
          {/* New Zealand */}
          <path d="M885,395 C890,390 900,392 905,400 C908,408 905,418 898,422 C892,424 886,420 884,412 C882,405 883,398 885,395 Z" fill="url(#mapGrad)" filter="url(#mapShadow)" stroke="#C4B8A4" strokeWidth="0.5"/>

          {/* India marker — home base */}
          <circle cx={INDIA.x} cy={INDIA.y} r="6" fill="#F5A623" stroke="white" strokeWidth="2">
            <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <text x={INDIA.x} y={INDIA.y - 14} textAnchor="middle" fontFamily={PD} fontSize="9" fill="#2C1810" fontWeight="700">India</text>

          {/* connection lines from India to each country */}
          {COUNTRIES.map(c => (
            <line
              key={`line-${c.id}`}
              x1={INDIA.x} y1={INDIA.y}
              x2={c.x} y2={c.y}
              stroke={hovered === c.id ? '#E8713A' : '#C4A97D'}
              strokeWidth={hovered === c.id ? 1.5 : 0.6}
              strokeDasharray={hovered === c.id ? 'none' : '4 4'}
              opacity={hovered === c.id ? 0.9 : 0.25}
              style={{ transition: 'all 0.3s ease' }}
            />
          ))}

          {/* country hotspots */}
          {COUNTRIES.map((c, i) => (
            <g
              key={c.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => router.push(`/study-abroad/${c.slug}`)}
            >
              {/* pulse ring */}
              <circle cx={c.x} cy={c.y} r="10" fill="none" stroke="#E8713A" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="6;14;6" dur={`${2 + i * 0.15}s`} repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0;0.4" dur={`${2 + i * 0.15}s`} repeatCount="indefinite"/>
              </circle>
              {/* dot */}
              <circle
                cx={c.x} cy={c.y}
                r={hovered === c.id ? 6 : 4.5}
                fill={hovered === c.id ? '#E8713A' : '#E8735A'}
                stroke="white" strokeWidth="2"
                style={{ transition: 'r 0.2s ease, fill 0.2s ease' }}
              />
              {/* country label — show on hover or always on desktop for non-cluttered ones */}
              {(hovered === c.id) && (
                <g>
                  <rect
                    x={c.x - 45} y={c.y - 32}
                    width="90" height="22" rx="6"
                    fill="#2C1810" fillOpacity="0.92"
                  />
                  <text
                    x={c.x} y={c.y - 17}
                    textAnchor="middle"
                    fontFamily={PD} fontSize="9" fill="#FFF8EC" fontWeight="700"
                  >
                    {c.flag} {c.name}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>

        {/* hover info card — shows below map on mobile, overlays on desktop */}
        {hoveredCountry && !isMobile && (
          <div style={{
            position: 'absolute',
            bottom: 20, left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,248,236,0.96)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(196,169,125,0.4)',
            borderRadius: 16,
            padding: '16px 28px',
            display: 'flex', alignItems: 'center', gap: 16,
            boxShadow: '0 8px 32px rgba(44,24,16,0.12)',
            zIndex: 10,
          }}>
            <span style={{ fontSize: 32 }}>{hoveredCountry.flag}</span>
            <div>
              <p style={{ fontFamily: PD, fontSize: 18, fontWeight: 700, color: '#2C1810', margin: 0 }}>
                {hoveredCountry.name}
              </p>
              <p style={{ fontFamily: PD, fontSize: 12, color: '#9B8B7A', fontStyle: 'italic', margin: '2px 0 0' }}>
                Click to explore universities and courses →
              </p>
            </div>
          </div>
        )}
      </div>

      {/* mobile: country list grid (since map dots are small on phone) */}
      {isMobile && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          marginTop: 24,
          maxWidth: 400,
          margin: '24px auto 0',
        }}>
          {COUNTRIES.map(c => (
            <button
              key={c.id}
              onClick={() => router.push(`/study-abroad/${c.slug}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(196,169,125,0.3)',
                borderRadius: 10,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: PD, fontSize: 13, fontWeight: 600,
                color: '#2C1810',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#2C1810';
                (e.currentTarget as HTMLButtonElement).style.color = '#FFF8EC';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#2C1810';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.8)';
                (e.currentTarget as HTMLButtonElement).style.color = '#2C1810';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(196,169,125,0.3)';
              }}
            >
              <span style={{ fontSize: 18 }}>{c.flag}</span>
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* bottom text */}
      <div style={{
        textAlign: 'center',
        marginTop: isMobile ? 32 : 48,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 0.5s',
      }}>
        <p style={{
          fontFamily: PD, fontSize: isMobile ? '12px' : '14px',
          fontStyle: 'italic', color: '#9B8B7A',
          marginBottom: 14,
        }}>
          Don't see your country? We probably cover it. Just ask.
        </p>
        <button
          onClick={() => router.push('/contact')}
          style={{
            padding: isMobile ? '12px 28px' : '14px 36px',
            background: '#2C1810', color: '#FFF8EC',
            border: 'none', borderRadius: 100,
            fontFamily: PD, fontSize: isMobile ? '13px' : '14px',
            fontWeight: 700, letterSpacing: '0.04em',
            cursor: 'pointer', transition: 'all 0.25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#F5A623'; e.currentTarget.style.color = '#2C1810'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#2C1810'; e.currentTarget.style.color = '#FFF8EC'; }}
        >
          Talk to us about studying abroad →
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
