'use client';

import { useEffect, useRef, useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const PD = "Playfair Display, Georgia, serif";

const FOUNDERS = [
  {
    id: 1,
    name: 'Sakshi More',
    role: 'Co-founder',
    edu: [
      'BSc. Agriculture — NMIMS University, India',
      'Masters in Global Management — NEOMA Business School, France',
    ],
    image: '/images/founder-sakshi.jpg',
    imageBg: '#E8D5F5',
    leftText: "I've always found it interesting how life connects dots that don't seem related at first. My journey from agriculture to global management to career counselling is exactly that — dots that only made sense in hindsight. Which is why I believe so deeply in helping students trust their own path, even when it looks unconventional.",
    rightText: 'What excites me most about career guidance is that there has never been a more interesting time to be a young person in India. The options are genuinely endless. My job is to help students see that — and then figure out which ones are actually theirs.',
    quote: '"The right question asked at the right time changes everything."',
  },
  {
    id: 2,
    name: 'Nupoor Deore-Katare',
    role: 'Co-founder',
    edu: [
      'BDes. Accessory Design — NIFT, India',
      'Masters in Luxury Management — NEOMA BS, France & Politecnico di Milano, Italy',
    ],
    image: '/images/founder-nupoor.jpg',
    imageBg: '#D6E8F5',
    leftText: '[Placeholder — something about your path. Design school, the leap to Europe, what shifted in your thinking when you got there.]',
    rightText: '[Placeholder — what you bring. Your design eye, your instinct for people, the way you connect with students on a personal level.]',
    quote: '"[A line that sounds like you — warm, real, maybe a little funny.]"',
  },
];

function FounderSection({ founder, index }: { founder: typeof FOUNDERS[0]; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} style={{
      padding: '80px 5vw 100px',
      borderTop: index > 0 ? '1px solid rgba(44,24,16,0.07)' : 'none',
      background: '#ffffff',
    }}>
      <p style={{
        fontFamily: PD, fontSize: '11px', letterSpacing: '0.2em',
        textTransform: 'uppercase', color: '#B0A090',
        marginBottom: '60px', textAlign: 'center',
        opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease',
      }}>
        Co-founder
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 300px 1fr',
        gap: '56px', maxWidth: '1100px', margin: '0 auto', alignItems: 'start',
      }}>
        {/* LEFT */}
        <div style={{
          paddingTop: '40px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}>
          <p style={{ fontFamily: PD, fontSize: '15px', color: '#5C4A3A', lineHeight: '1.9', fontStyle: 'italic' }}>
            {founder.leftText}
          </p>
        </div>

        {/* CENTRE photo */}
        <div style={{
          position: 'relative', zIndex: 10,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) rotate(0deg)' : 'translateY(-80px) rotate(-4deg)',
          transition: 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.34, 1.4, 0.64, 1)',
        }}>
          <div style={{
            position: 'absolute', top: '-13px', left: '50%',
            transform: 'translateX(-50%) rotate(-1.5deg)',
            width: '54px', height: '18px',
            background: 'rgba(44,24,16,0.18)', borderRadius: '2px', zIndex: 11,
          }} />
          <div style={{
            background: 'white', padding: '10px 10px 52px',
            boxShadow: '0 20px 60px rgba(44,24,16,0.2), 0 4px 12px rgba(44,24,16,0.08)',
            borderRadius: '2px',
          }}>
            <div style={{
              width: '280px', height: '340px', background: founder.imageBg,
              overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src={founder.image} alt={founder.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div style={{ paddingTop: '14px', textAlign: 'center' }}>
              <p style={{ fontFamily: PD, fontSize: '17px', fontWeight: '700', color: '#2C1810', marginBottom: '8px' }}>
                {founder.name}
              </p>
              {founder.edu.map((line, i) => (
                <p key={i} style={{ fontFamily: PD, fontSize: '11px', color: '#9B8B7A', lineHeight: '1.6', fontStyle: 'italic' }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div style={{
            position: 'absolute', bottom: '-18px', left: '50%',
            transform: 'translateX(-50%)', width: '260px', height: '20px',
            background: 'rgba(44,24,16,0.08)', filter: 'blur(14px)', borderRadius: '50%',
          }} />
        </div>

        {/* RIGHT */}
        <div style={{
          paddingTop: '40px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(40px)',
          transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
        }}>
          <p style={{ fontFamily: PD, fontSize: '15px', color: '#5C4A3A', lineHeight: '1.9', fontStyle: 'italic', marginBottom: '24px' }}>
            {founder.rightText}
          </p>
          <p style={{ fontFamily: PD, fontSize: '15px', fontWeight: '700', color: '#E8713A', lineHeight: '1.6', fontStyle: 'italic' }}>
            {founder.quote}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FoundersPage() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: PD }}>
      <Nav />

      {/* ── HERO ── */}
      <div style={{ background: '#D6E8F5', position: 'relative', overflow: 'hidden' }}>

        {/* Wavy lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4, pointerEvents: 'none' }}
          viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
          <path d="M-100 150 C200 80 420 260 720 150 S1120 40 1540 180" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
          <path d="M-100 300 C160 220 460 380 760 280 S1160 160 1540 320" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
          <path d="M-100 450 C200 370 500 530 800 420 S1200 300 1540 470" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
        </svg>

        {/* Sparkles */}
        {[
          { top: '15%', left: '4%',   color: '#F5A623', size: 14 },
          { top: '60%', left: '3%',   color: '#E8837A', size: 11 },
          { top: '20%', right: '4%',  color: '#F5A623', size: 13 },
          { top: '65%', right: '3%',  color: '#E8837A', size: 16 },
          { top: '40%', left: '10%',  color: '#F5A623', size: 9  },
          { top: '35%', right: '9%',  color: '#E8837A', size: 10 },
        ].map((sp, i) => (
          <div key={i} style={{
            position: 'absolute', top: sp.top,
            left: (sp as any).left, right: (sp as any).right,
            color: sp.color, fontSize: sp.size, pointerEvents: 'none', zIndex: 2,
            animation: `throb ${2 + i * 0.3}s ease-in-out ${i * 0.5}s infinite`,
          }}>✦</div>
        ))}

        {/* Horizontal founders photo — full width, contained */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%',
          maxHeight: '420px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Photo */}
          <img
            src="/images/founders-banner.jpg"
            alt="Sakshi and Nupoor"
            style={{
              width: '100%',
              maxHeight: '420px',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              // Fade bottom of photo into the blue background
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            }}
            onError={(e) => {
              // If no photo yet — show placeholder
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />

          {/* Placeholder if no photo uploaded yet */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '12px',
            background: 'rgba(214,232,245,0.6)',
          }}>
            <span style={{ fontSize: '48px', opacity: 0.4 }}>📸</span>
            <p style={{ fontFamily: PD, fontSize: '13px', color: '#9B8B7A', fontStyle: 'italic' }}>
              Upload founders-banner.jpg to public/images/
            </p>
          </div>
        </div>

        {/* Heading — sits below photo, no overlap */}
        <div style={{
          position: 'relative', zIndex: 3,
          textAlign: 'center',
          padding: '48px 24px 64px',
        }}>
          <p style={{
            fontFamily: PD, fontSize: '13px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(44,24,16,0.4)',
            marginBottom: '16px', animation: 'fadeUp 0.8s ease both',
          }}>
            The people behind What The Grad
          </p>
          <h1 style={{
            fontFamily: PD,
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: '700', color: '#2C1810',
            letterSpacing: '-0.02em', lineHeight: '1.1',
            animation: 'glow 2.8s ease-in-out infinite, fadeUp 1s ease 0.2s both',
          }}>
            Meet our Founders
          </h1>
          <p style={{
            fontFamily: PD, fontSize: 'clamp(15px, 1.8vw, 20px)',
            fontStyle: 'italic', color: '#5B8FA8',
            margin: '20px auto 0', maxWidth: '560px',
            animation: 'fadeUp 1s ease 0.4s both',
          }}>
            Two friends. One leap. A whole lot of clarity to give.
          </p>
        </div>

        {/* Fade to white at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
          background: 'linear-gradient(to bottom, transparent, #ffffff)',
          pointerEvents: 'none', zIndex: 4,
        }} />
      </div>

      {/* Founder sections */}
      <div style={{ background: '#ffffff' }}>
        {FOUNDERS.map((founder, i) => (
          <FounderSection key={founder.id} founder={founder} index={i} />
        ))}
      </div>

      <Footer />

      <style>{`
        @keyframes glow {
          0%,100% { text-shadow: 0 0 20px rgba(245,166,35,0.5), 0 0 40px rgba(245,166,35,0.25); }
          50%      { text-shadow: 0 0 30px rgba(245,166,35,1), 0 0 60px rgba(245,166,35,0.7), 0 0 100px rgba(245,166,35,0.4); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes throb {
          0%,100% { transform:scale(0.7) rotate(0deg); opacity:0.4; }
          50%      { transform:scale(1.3) rotate(20deg); opacity:1; }
        }
      `}</style>
    </div>
  );
}
