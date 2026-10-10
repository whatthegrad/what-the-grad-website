'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const PD = 'Playfair Display, Georgia, serif';

interface Country {
  id: string;
  name: string;
  slug: string;
  // percentage positions on the map image (0-100)
  px: number;
  py: number;
  flag: string;
}

// ── COORDINATE CALIBRATION ───────────────────────────────────────────────
// Instead of hand-plotting every dot, we convert real lat/lon through
// four anchor constants that match YOUR world-map image.
//
// HOW TO RECALIBRATE if dots are still slightly off:
//   1. Open localhost, right-click the map → Inspect.
//   2. Find India's dot (78°E, 21°N) — note where it sits on the image.
//   3. Find UK's dot (0°W, 51.5°N) — note where it sits.
//   4. Adjust MAP_X0, MAP_Y0, DX, DY below until both land correctly.
//      Every other marker shifts with them automatically.
//
const MAP_X0 = 49.5;  // where the 0° meridian (Greenwich) sits — % from left
const MAP_Y0 = 49.0;  // where the equator sits — % from top
const DX     = 0.215;  // map-% per degree of longitude
const DY     = 0.516;  // map-% per degree of latitude

function geoToMap(lat: number, lon: number): { px: number; py: number } {
  return {
    px: parseFloat((MAP_X0 + lon * DX).toFixed(1)),
    py: parseFloat((MAP_Y0 - lat * DY).toFixed(1)),
  };
}

// Real geographic centres → map positions
const COUNTRIES: Country[] = [
  // --- Americas ---
  { id: 'usa',         name: 'United States',   slug: 'usa',         ...geoToMap(39.0, -97.0),   flag: '🇺🇸' },
  // --- Europe ---
  { id: 'uk',          name: 'United Kingdom',  slug: 'uk',          ...geoToMap(51.5, -0.1),    flag: '🇬🇧' },
  { id: 'ireland',     name: 'Ireland',         slug: 'ireland',     ...geoToMap(53.3, -6.3),    flag: '🇮🇪' },
  { id: 'france',      name: 'France',          slug: 'france',      ...geoToMap(48.9, 2.3),     flag: '🇫🇷' },
  { id: 'spain',       name: 'Spain',           slug: 'spain',       ...geoToMap(40.4, -3.7),    flag: '🇪🇸' },
  { id: 'germany',     name: 'Germany',         slug: 'germany',     ...geoToMap(51.2, 10.5),    flag: '🇩🇪' },
  { id: 'netherlands', name: 'Netherlands',     slug: 'netherlands', ...geoToMap(52.1, 5.3),     flag: '🇳🇱' },
  { id: 'finland',     name: 'Finland',         slug: 'finland',     ...geoToMap(61.9, 25.7),    flag: '🇫🇮' },
  { id: 'hungary',     name: 'Hungary',         slug: 'hungary',     ...geoToMap(47.2, 19.1),    flag: '🇭🇺' },
  { id: 'malta',       name: 'Malta',           slug: 'malta',       ...geoToMap(35.9, 14.5),    flag: '🇲🇹' },
  // --- Middle East / Caucasus ---
  { id: 'armenia',     name: 'Armenia',         slug: 'armenia',     ...geoToMap(40.1, 44.5),    flag: '🇦🇲' },
  { id: 'uae',         name: 'Dubai, UAE',      slug: 'dubai',       ...geoToMap(25.2, 55.3),    flag: '🇦🇪' },
  // --- Oceania ---
  { id: 'australia',   name: 'Australia',       slug: 'australia',   ...geoToMap(-25.3, 133.8),  flag: '🇦🇺' },
  { id: 'new-zealand', name: 'New Zealand',     slug: 'new-zealand', ...geoToMap(-40.9, 174.9),  flag: '🇳🇿' },
];

// India — home base (21°N, 78°E)
const INDIA = geoToMap(21.0, 78.0);

// generate a curved SVG path between two percentage points
// the curve bows upward for visual elegance
function curvedPath(x1: number, y1: number, x2: number, y2: number): string {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  // control point offset — curve bows upward and slightly sideways
  const bowAmount = Math.min(dist * 0.35, 15);
  const cpX = midX + (dy * 0.15);
  const cpY = midY - bowAmount;
  return `M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`;
}

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
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '0' : '0',
      }}
    >
      {/* ── starry background image ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/images/starry-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0a0a18',
      }}/>

      {/* dark overlay for readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(10,10,24,0.4)',
      }}/>

      {/* top blend — fades from previous section into starry bg */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 200,
        background: 'linear-gradient(to bottom, #FFF8EC 0%, rgba(255,248,236,0) 100%)',
        zIndex: 2, pointerEvents: 'none',
      }}/>

      {/* bottom blend — fades starry bg into next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 200,
        background: 'linear-gradient(to top, #FFF8EC 0%, rgba(255,248,236,0) 100%)',
        zIndex: 2, pointerEvents: 'none',
      }}/>

      {/* content wrapper */}
      <div style={{
        position: 'relative', zIndex: 3,
        padding: isMobile ? '100px 5vw 100px' : '140px 5vw 140px',
      }}>

        {/* header */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? 28 : 48,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <p style={{
            fontFamily: PD, fontSize: isMobile ? '10px' : '12px',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,248,236,0.5)', marginBottom: 10,
          }}>
            Study abroad
          </p>
          <h2 style={{
            fontFamily: PD,
            fontSize: isMobile ? '26px' : '44px',
            fontWeight: 700, color: '#FFF8EC',
            letterSpacing: '-0.02em', lineHeight: 1.15,
            marginBottom: 10,
          }}>
            Your world, mapped out ✦
          </h2>
          <p style={{
            fontFamily: PD,
            fontSize: isMobile ? '13px' : '16px',
            fontStyle: 'italic', color: 'rgba(255,248,236,0.65)',
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
          {/* world map image */}
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src="/images/world-map.png"
              alt="World Map"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                opacity: 0.5,
                filter: 'brightness(2.5) contrast(0.5) invert(0)',
                mixBlendMode: 'screen',
              }}
              onError={(e) => {
                // fallback: hide image and show a subtle placeholder
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />

            {/* SVG overlay for lines and dots — sits exactly on top of the map image */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none',
              }}
            >
              <defs>
                {/* animated dash for hovered lines */}
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F5A623" stopOpacity="0.2"/>
                  <stop offset="50%" stopColor="#E8713A" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#F5A623" stopOpacity="0.2"/>
                </linearGradient>
              </defs>

              {/* connection curves from India */}
              {COUNTRIES.map(c => {
                const isHov = hovered === c.id;
                const path = curvedPath(INDIA.px, INDIA.py, c.px, c.py);
                return (
                  <g key={`line-${c.id}`}>
                    {/* base dashed line — always visible faintly */}
                    <path
                      d={path}
                      fill="none"
                      stroke="rgba(245,166,35,0.12)"
                      strokeWidth="0.15"
                      strokeDasharray="0.5 0.8"
                    />
                    {/* highlighted line on hover */}
                    {isHov && (
                      <>
                        {/* glow */}
                        <path
                          d={path}
                          fill="none"
                          stroke="#F5A623"
                          strokeWidth="0.5"
                          strokeLinecap="round"
                          opacity="0.2"
                        />
                        {/* main line */}
                        <path
                          d={path}
                          fill="none"
                          stroke="url(#lineGradient)"
                          strokeWidth="0.25"
                          strokeLinecap="round"
                          strokeDasharray="0.8 0.4"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="0;-2.4"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </path>
                        {/* tiny dots along the path */}
                        <circle r="0.3" fill="#F5A623">
                          <animateMotion dur="2s" repeatCount="indefinite" path={path}/>
                        </circle>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* India home marker */}
            <div style={{
              position: 'absolute',
              left: `${INDIA.px}%`, top: `${INDIA.py}%`,
              transform: 'translate(-50%,-50%)',
              zIndex: 5, pointerEvents: 'none',
            }}>
              <div style={{
                width: isMobile ? 12 : 18, height: isMobile ? 12 : 18,
                borderRadius: '50%',
                background: '#F5A623',
                border: '2.5px solid rgba(255,248,236,0.8)',
                boxShadow: '0 0 20px rgba(245,166,35,0.5), 0 0 40px rgba(245,166,35,0.2)',
                animation: 'indiaPulse 2.5s ease-in-out infinite',
              }}/>
              <p style={{
                position: 'absolute', top: isMobile ? -16 : -22, left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: PD, fontSize: isMobile ? 8 : 11,
                fontWeight: 700, color: '#FFF8EC',
                whiteSpace: 'nowrap',
                textShadow: '0 1px 4px rgba(0,0,0,0.6)',
              }}>
                India 🇮🇳
              </p>
            </div>

            {/* country hotspots */}
            {COUNTRIES.map((c, i) => {
              const isHov = hovered === c.id;
              return (
                <div
                  key={c.id}
                  style={{
                    position: 'absolute',
                    left: `${c.px}%`, top: `${c.py}%`,
                    transform: 'translate(-50%,-50%)',
                    zIndex: isHov ? 20 : 10,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => router.push(`/study-abroad/${c.slug}`)}
                >
                  {/* pulse ring */}
                  <div style={{
                    position: 'absolute', inset: isMobile ? -6 : -10,
                    borderRadius: '50%',
                    border: `1.5px solid ${isHov ? '#F5A623' : '#E8735A'}`,
                    opacity: isHov ? 0.8 : 0.3,
                    animation: `dotPulse ${2 + i * 0.12}s ease-in-out infinite`,
                  }}/>

                  {/* dot */}
                  <div style={{
                    width: isMobile ? 8 : (isHov ? 14 : 10),
                    height: isMobile ? 8 : (isHov ? 14 : 10),
                    borderRadius: '50%',
                    background: isHov ? '#F5A623' : '#E8735A',
                    border: `2px solid ${isHov ? '#FFF8EC' : 'rgba(255,248,236,0.6)'}`,
                    boxShadow: isHov
                      ? '0 0 16px rgba(245,166,35,0.7), 0 0 32px rgba(245,166,35,0.3)'
                      : '0 0 8px rgba(232,115,90,0.4)',
                    transition: 'all 0.25s ease',
                  }}/>

                  {/* tooltip — on hover */}
                  {isHov && !isMobile && (
                    <div style={{
                      position: 'absolute',
                      bottom: '100%', left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: 10,
                      background: 'rgba(44,24,16,0.92)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 10,
                      padding: '8px 14px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span style={{ fontSize: 16 }}>{c.flag}</span>
                      <span style={{ fontFamily: PD, fontSize: 12, fontWeight: 700, color: '#FFF8EC' }}>{c.name}</span>
                      {/* arrow */}
                      <div style={{
                        position: 'absolute', top: '100%', left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0, height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: '6px solid rgba(44,24,16,0.92)',
                      }}/>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* hover info bar — desktop */}
          {hoveredCountry && !isMobile && (
            <div style={{
              position: 'absolute',
              bottom: -10, left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255,248,236,0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(196,169,125,0.4)',
              borderRadius: 14,
              padding: '14px 28px',
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
              zIndex: 30,
            }}>
              <span style={{ fontSize: 28 }}>{hoveredCountry.flag}</span>
              <div>
                <p style={{ fontFamily: PD, fontSize: 16, fontWeight: 700, color: '#2C1810', margin: 0 }}>
                  {hoveredCountry.name}
                </p>
                <p style={{ fontFamily: PD, fontSize: 11, color: '#9B8B7A', fontStyle: 'italic', margin: '2px 0 0' }}>
                  Click to explore universities and courses →
                </p>
              </div>
            </div>
          )}
        </div>

        {/* mobile: tappable country grid */}
        {isMobile && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 8,
            marginTop: 20,
            maxWidth: 380,
            margin: '20px auto 0',
          }}>
            {COUNTRIES.map(c => (
              <button
                key={c.id}
                onClick={() => router.push(`/study-abroad/${c.slug}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 12px',
                  background: 'rgba(255,248,236,0.1)',
                  border: '1px solid rgba(255,248,236,0.15)',
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontFamily: PD, fontSize: 12, fontWeight: 600,
                  color: '#FFF8EC',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <span style={{ fontSize: 16 }}>{c.flag}</span>
                {c.name}
              </button>
            ))}
          </div>
        )}

        {/* bottom CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: isMobile ? 36 : 60,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.5s',
        }}>
          <p style={{
            fontFamily: PD, fontSize: isMobile ? '12px' : '14px',
            fontStyle: 'italic', color: 'rgba(255,248,236,0.5)',
            marginBottom: 14,
          }}>
            Don&apos;t see your country? We probably cover it. Just ask.
          </p>
          <button
            onClick={() => router.push('/contact')}
            style={{
              padding: isMobile ? '12px 28px' : '14px 36px',
              background: '#FFF8EC', color: '#2C1810',
              border: 'none', borderRadius: 100,
              fontFamily: PD, fontSize: isMobile ? '13px' : '14px',
              fontWeight: 700, letterSpacing: '0.04em',
              cursor: 'pointer', transition: 'all 0.25s',
              boxShadow: '0 4px 20px rgba(245,166,35,0.2)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F5A623'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FFF8EC'; }}
          >
            Talk to us about studying abroad →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes indiaPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(245,166,35,0.5), 0 0 40px rgba(245,166,35,0.2); }
          50% { box-shadow: 0 0 30px rgba(245,166,35,0.8), 0 0 60px rgba(245,166,35,0.3); }
        }
      `}</style>
    </section>
  );
}
