'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCountryBySlug, COUNTRIES, STEPS } from '@/lib/countryData';

/* ------------------------------------------------------------------ */
/*  Fact card illustration SVG                                         */
/* ------------------------------------------------------------------ */

function CardIllustration({ icon, pill }: { icon: string; pill: string }) {
  return (
    <svg viewBox="0 0 270 130" width="100%" role="img" aria-label={`${pill} illustration`} style={{ display: 'block', borderRadius: 4 }}>
      <rect width="270" height="130" fill="#FDF4EC" />
      <circle cx="48" cy="56" r="36" fill="#F6E3B4" />
      <circle cx="228" cy="36" r="24" fill="#F0D3C8" />
      <circle cx="135" cy="62" r="46" fill="#F9EADF" />
      <path d="M100 34l4 8.5 9.5 1.2-7 6.5 1.8 9.3L100 54.7 91.7 59.5 93.5 50.2 86.5 43.7 96 42.5z" fill="#E9C86A" />
      <path d="M0 130V100C40 84 80 80 120 92S200 102 270 86V130Z" fill="#F2D6C4" />
      <path d="M0 130V110C60 98 110 106 160 100S230 98 270 104V130Z" fill="#EFCDB8" opacity=".7" />
      <circle cx="64" cy="98" r="6" fill="#EDBFB0" /><circle cx="214" cy="94" r="5" fill="#E9D3A0" />
      <g transform="translate(117 44) scale(1.5)" fill="none" stroke="#C9604A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d={icon} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function CountryPage({ slug }: { slug: string }) {
  const [level, setLevel] = useState<'masters' | 'bachelors'>('masters');
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 980);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const country = getCountryBySlug(slug);
  if (!country) return <div style={{ padding: 80, textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: 28 }}>Country not found</div>;

  const facts = level === 'masters' ? country.mastersFacts : country.bachelorsFacts;
  const isMasters = level === 'masters';
  const len = country.name.length;
  const titleSize = len <= 3 ? 190 : len <= 5 ? 160 : len <= 7 ? 140 : len <= 9 ? 120 : 100;

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,800;0,900;1,500;1,600;1,700;1,800;1,900&family=Sora:wght@400;600;700&display=swap');

        .cp-body { margin: 0; font-family: 'Sora', system-ui, sans-serif; color: #2f2210; background: #FFF8E1; }
        .cp-body a { color: #5E2A73; }
        .cp-body a:hover { color: #B9503A; }
        .cp-body * { box-sizing: border-box; }

        .cp-gingham {
          background-color: #FFF8E1;
          background-image:
            repeating-linear-gradient(0deg, rgba(233,200,106,.22) 0 28px, transparent 28px 56px),
            repeating-linear-gradient(90deg, rgba(233,200,106,.22) 0 28px, transparent 28px 56px);
        }

        .cp-card { transition: transform .25s ease, box-shadow .25s ease; }
        .cp-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(94,60,20,.2) !important; }

        .cp-btn { transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .cp-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(94,60,20,.25) !important; }

        .cp-float { animation: cp-floaty 9s ease-in-out infinite; }
        @keyframes cp-floaty {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }

        .cp-hero { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 32px; align-items: center; }
        .cp-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .cp-stat { padding: 6px 16px; text-align: center; border-left: 1px solid #E6D9B8; }
        .cp-stat:first-child { border-left: 0; }
        .cp-facts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
        .cp-tickets { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 20px; }
        .cp-nav-links { display: flex; gap: 30px; align-items: center; }

        @media (max-width: 1100px) {
          .cp-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .cp-tickets { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 980px) {
          .cp-hero { grid-template-columns: minmax(0, 1fr); }
          .cp-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 24px; }
          .cp-stat:nth-child(3) { border-left: 0; }
          .cp-nav-links { display: none; }
          .cp-bigtitle { font-size: 110px !important; }
        }
        @media (max-width: 640px) {
          .cp-facts { grid-template-columns: minmax(0, 1fr); }
          .cp-bigtitle { font-size: 72px !important; }
          .cp-tickets { grid-template-columns: minmax(0, 1fr); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cp-float { animation: none; }
        }
      `}</style>

      <div className="cp-body">
        <div className="cp-gingham" style={{ width: '100%', minHeight: '100vh', overflow: 'hidden' }}>

          {/* NAV */}
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '22px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              <img
                src="/images/logo.png"
                alt="What The Grad"
                style={{ height: isMobile ? 48 : 70 }}
              />
            </Link>
            <div className="cp-nav-links">
              <a href="#facts" style={{ textDecoration: 'none', fontWeight: 600, fontSize: 14, color: '#2f2210' }}>The real deal</a>
              <a href="#how" style={{ textDecoration: 'none', fontWeight: 600, fontSize: 14, color: '#2f2210' }}>How we help</a>
              <a href="#start" style={{ textDecoration: 'none', fontWeight: 600, fontSize: 14, color: '#2f2210' }}>All countries</a>
            </div>
            <Link href="/contact" className="cp-btn" style={{ textDecoration: 'none', background: '#5E2A73', color: '#FFF8E1', fontWeight: 700, fontSize: 14, padding: '13px 24px', borderRadius: 999 }}>
              Book a free call
            </Link>
          </div>

          {/* HERO */}
          <div id="top" className="cp-hero" style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 32px 40px' }}>
            <div>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: '#6b5a3a' }}>
                <Link href="/#study-abroad" style={{ textDecoration: 'none', color: '#6b5a3a' }}>Study abroad</Link>
                <span>/</span>
                <span style={{ color: '#2f2210' }}>Study in {country.full}</span>
              </div>

              <div style={{ marginTop: 34, fontSize: 13, fontWeight: 700, letterSpacing: 3, color: '#B9503A' }}>2027 INTAKE OPEN</div>
              <h1 className="cp-bigtitle" style={{
                margin: '6px 0 0',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: isMobile ? Math.min(titleSize, 110) : titleSize,
                lineHeight: 0.95,
                letterSpacing: -4,
                color: '#C9604A',
              }}>
                {country.name}
              </h1>
              <div style={{ marginTop: 14, width: 84, height: 4, background: '#E6A93A', borderRadius: 2 }} />

              <p style={{ margin: '26px 0 0', maxWidth: 520, fontSize: 19, lineHeight: 1.6, color: '#3c2e17' }}>
                {country.intro}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                {country.tags.map(tag => (
                  <span key={tag} style={{ background: '#fff', color: '#2f2210', fontWeight: 600, fontSize: 13, padding: '8px 16px', borderRadius: 999, border: '1px solid #E1CFA0' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 34 }}>
                <Link href="/contact" className="cp-btn" style={{
                  textDecoration: 'none', background: '#C9604A', color: '#fff',
                  fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18,
                  padding: '17px 30px', borderRadius: 999, boxShadow: '0 6px 16px rgba(201,96,74,.3)',
                }}>
                  Book a free counselling call
                </Link>
                <a href="#facts" className="cp-btn" style={{
                  textDecoration: 'none', background: '#fff', color: '#2f2210',
                  fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18,
                  padding: '17px 30px', borderRadius: 999, border: '1px solid #E1CFA0',
                }}>
                  See the details
                </a>
              </div>
            </div>

            {/* Country collage image */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                className="cp-float"
                src={country.img}
                alt={`Postcard collage from ${country.full}`}
                style={{
                  display: 'block', width: '100%', maxWidth: 720, height: 'auto',
                  filter: 'drop-shadow(0 22px 28px rgba(60,30,80,.28))',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* STATS */}
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 90px' }}>
            <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 12px 36px rgba(94,60,20,.12)', padding: '34px 20px' }}>
              <div className="cp-stats">
                {country.stats.map((s, i) => (
                  <div key={i} className="cp-stat">
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: isMobile ? 34 : 46, lineHeight: 1.05, letterSpacing: -1, color: '#C9604A' }}>
                      {s.big}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: '#3c2e17' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* THE REAL DEAL */}
          <div id="facts" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 100px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, color: '#B9503A' }}>THE REAL DEAL</div>
                <h2 style={{ margin: '8px 0 0', fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: isMobile ? 36 : 54, lineHeight: 1.05, letterSpacing: -1.5, color: '#2f2210' }}>
                  Everything you need to know
                </h2>
              </div>

              {/* Masters / Bachelors toggle */}
              <div role="group" aria-label="Choose study level" style={{ display: 'inline-flex', background: '#fff', border: '1px solid #E1CFA0', borderRadius: 999, padding: 4 }}>
                <button
                  type="button"
                  onClick={() => setLevel('masters')}
                  aria-pressed={isMasters}
                  style={{
                    cursor: 'pointer', border: 0, borderRadius: 999, padding: '11px 24px',
                    fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, minHeight: 44,
                    background: isMasters ? '#5E2A73' : 'transparent',
                    color: isMasters ? '#FFF8E1' : '#2f2210',
                    transition: 'background .2s, color .2s',
                  }}
                >
                  Masters
                </button>
                <button
                  type="button"
                  onClick={() => setLevel('bachelors')}
                  aria-pressed={!isMasters}
                  style={{
                    cursor: 'pointer', border: 0, borderRadius: 999, padding: '11px 24px',
                    fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, minHeight: 44,
                    background: !isMasters ? '#5E2A73' : 'transparent',
                    color: !isMasters ? '#FFF8E1' : '#2f2210',
                    transition: 'background .2s, color .2s',
                  }}
                >
                  Bachelors
                </button>
              </div>
            </div>

            {/* Fact cards */}
            <div className="cp-facts" style={{ marginTop: 46 }}>
              {facts.map((f, i) => (
                <div key={i} className="cp-card" style={{
                  position: 'relative', background: '#fff', borderRadius: 8,
                  padding: '28px 22px 26px',
                  boxShadow: '0 10px 30px rgba(94,60,20,.14)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {/* Tape strip */}
                  <div style={{
                    position: 'absolute', top: -16, left: '50%', marginLeft: -45,
                    width: 90, height: 30, background: 'rgba(232,150,140,.55)',
                    borderRadius: 3, transform: 'rotate(-1.5deg)',
                  }} />

                  <CardIllustration icon={f.icon} pill={f.pill} />

                  <div style={{ alignSelf: 'center', marginTop: 20, background: '#F7E3D6', color: '#B4492F', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, padding: '7px 16px', borderRadius: 999 }}>
                    {f.pill}
                  </div>
                  <div style={{ marginTop: 16, textAlign: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, lineHeight: 1.2, color: '#3a2a10' }}>
                    {f.big}
                  </div>
                  <div style={{ marginTop: 12, textAlign: 'center', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 600, fontSize: 15.5, lineHeight: 1.55, color: '#7a5f2a', flexGrow: 1 }}>
                    {f.small}
                  </div>
                  <div style={{ marginTop: 16, textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: '#B9503A' }}>
                    ✦ {f.cap}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 34, fontSize: 13, color: '#6b5a3a', lineHeight: 1.5 }}>
              Rules and costs change by university and year. Your counsellor confirms the latest before you apply.
            </div>
          </div>

          {/* HOW WE HELP */}
          <div id="how" style={{ background: '#5E2A73', padding: '90px 0 100px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, color: '#E6A93A' }}>HOW WE HELP</div>
              <h2 style={{
                margin: '8px 0 0', fontFamily: "'Playfair Display', serif", fontWeight: 800,
                fontSize: isMobile ? 36 : 58, lineHeight: 1.05, letterSpacing: -1.5, color: '#FFF8E1',
              }}>
                How we get you to {country.full}
              </h2>

              <div className="cp-tickets" style={{ marginTop: 50 }}>
                {STEPS.map((s, i) => (
                  <div key={i} className="cp-card" style={{
                    position: 'relative', background: '#fff', borderRadius: 8,
                    padding: '26px 18px 24px',
                    boxShadow: '0 10px 30px rgba(20,5,30,.3)',
                    display: 'flex', flexDirection: 'column',
                  }}>
                    {/* Tape strip */}
                    <div style={{
                      position: 'absolute', top: -14, left: '50%', marginLeft: -40,
                      width: 80, height: 28, background: 'rgba(232,150,140,.6)',
                      borderRadius: 3, transform: 'rotate(-1.5deg)',
                    }} />

                    {/* Step number illustration */}
                    <div style={{
                      height: 96, borderRadius: 4, background: '#FDF4EC',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{ position: 'absolute', left: -18, top: 6, width: 64, height: 64, borderRadius: '50%', background: '#F6E3B4' }} />
                      <div style={{ position: 'absolute', right: -8, top: -10, width: 46, height: 46, borderRadius: '50%', background: '#F0D3C8' }} />
                      <div style={{ position: 'relative', fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 44, lineHeight: 1, color: '#C9604A' }}>
                        {s.n}
                      </div>
                    </div>

                    <div style={{ alignSelf: 'center', marginTop: 18, background: '#F7E3D6', color: '#B4492F', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, padding: '6px 14px', borderRadius: 999 }}>
                      STEP {s.n}
                    </div>
                    <div style={{ marginTop: 14, textAlign: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 21, lineHeight: 1.2, color: '#3a2a10' }}>
                      {s.title}
                    </div>
                    <div style={{ marginTop: 10, textAlign: 'center', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 600, fontSize: 14.5, lineHeight: 1.55, color: '#7a5f2a' }}>
                      {s.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div id="start" style={{ maxWidth: 1280, margin: '0 auto', padding: '90px 32px 70px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, color: '#B9503A' }}>YOUR ABROAD ERA STARTS HERE</div>
            <h2 style={{
              margin: '12px auto 0', maxWidth: 860,
              fontFamily: "'Playfair Display', serif", fontWeight: 800,
              fontSize: isMobile ? 36 : 68, lineHeight: 1.05, letterSpacing: -2, color: '#2f2210',
            }}>
              Ready for your <span style={{ color: '#C9604A', fontStyle: 'italic' }}>postcard</span> from {country.from}?
            </h2>
            <p style={{ margin: '22px auto 0', maxWidth: 540, fontSize: 18, lineHeight: 1.6, color: '#3c2e17' }}>
              Tell us where you are in the journey and we will map the next step. No pressure, no jargon.
            </p>

            <div style={{ marginTop: 34, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <Link href="/contact" className="cp-btn" style={{
                textDecoration: 'none', background: '#C9604A', color: '#fff',
                fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 19,
                padding: '18px 36px', borderRadius: 999, boxShadow: '0 6px 16px rgba(201,96,74,.3)',
              }}>
                Book a free counselling call
              </Link>
              <Link href="/contact" className="cp-btn" style={{
                textDecoration: 'none', background: '#fff', color: '#2f2210',
                fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 19,
                padding: '18px 36px', borderRadius: 999, border: '1px solid #E1CFA0',
              }}>
                Check my profile
              </Link>
            </div>

            {/* Country selector */}
            <div style={{ marginTop: 56, fontSize: 13, fontWeight: 700, letterSpacing: 3, color: '#6b5a3a' }}>CHOOSE A COUNTRY</div>
            <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {COUNTRIES.map(k => {
                const isActive = k.slug === slug;
                return (
                  <Link
                    key={k.key}
                    href={`/study-abroad/${k.slug}`}
                    style={{
                      textDecoration: 'none',
                      background: isActive ? '#5E2A73' : '#fff',
                      color: isActive ? '#FFF8E1' : '#2f2210',
                      fontWeight: 600, fontSize: 14,
                      padding: '11px 22px', borderRadius: 999,
                      border: `1px solid ${isActive ? '#5E2A73' : '#E1CFA0'}`,
                      minHeight: 44, display: 'inline-flex', alignItems: 'center',
                    }}
                  >
                    {k.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{
            maxWidth: 1280, margin: '0 auto', padding: '28px 32px 48px',
            display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center',
            fontSize: 13, color: '#6b5a3a', borderTop: '1px solid #E1CFA0',
          }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              <img src="/images/logo.png" alt="What The Grad" style={{ height: 44 }} />
            </Link>
            <div>Career counselling and international education. whatthegrad.com</div>
          </div>

        </div>
      </div>
    </>
  );
}
