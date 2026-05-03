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
    leftText: "[Placeholder — something about Sakshi's journey before What The Grad. What she was doing, what she was feeling, what made her say yes to France.]",
    rightText: '[Placeholder — what Sakshi brings to the table. Her perspective, her superpower, the way she sees students and their potential.]',
    quote: '"[A line that sounds like Sakshi — her voice, her energy, something she actually says.]"',
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
    leftText: "[Placeholder — something about Nupoor's path. Design school, the leap to Europe, what shifted in her thinking when she got there.]",
    rightText: '[Placeholder — what Nupoor brings. Her design eye, her instinct for people, the way she connects with students on a personal level.]',
    quote: '"[A line that sounds like Nupoor — warm, real, maybe a little funny.]"',
  },
];

function FounderSection({
  founder, index, isMobile,
}: {
  founder: typeof FOUNDERS[0]; index: number; isMobile: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── MOBILE LAYOUT ──
  if (isMobile) {
    return (
      <div
        ref={sectionRef}
        style={{
          padding: '48px 5vw 56px',
          borderTop: index > 0 ? '1px solid rgba(44,24,16,0.07)' : 'none',
        }}
      >
        {/* label */}
        <p style={{
          fontFamily: PD, fontSize: '10px', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#B0A090',
          marginBottom: '28px', textAlign: 'center',
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease',
        }}>
          Co-founder
        </p>

        {/* photo card — centred, smaller on mobile */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          marginBottom: '32px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-40px)',
          transition: 'opacity 0.6s ease, transform 0.7s cubic-bezier(0.34,1.4,0.64,1)',
        }}>
          <div style={{ position: 'relative' }}>
            {/* tape */}
            <div style={{
              position: 'absolute', top: '-11px', left: '50%',
              transform: 'translateX(-50%) rotate(-1.5deg)',
              width: '44px', height: '15px',
              background: 'rgba(44,24,16,0.18)', borderRadius: '2px', zIndex: 11,
            }}/>
            {/* polaroid */}
            <div style={{
              background: 'white',
              padding: '8px 8px 44px',
              boxShadow: '0 16px 48px rgba(44,24,16,0.18), 0 4px 12px rgba(44,24,16,0.08)',
              borderRadius: '2px',
              width: '220px',
            }}>
              <div style={{
                width: '204px', height: '248px',
                background: founder.imageBg,
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src={founder.image}
                  alt={founder.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div style={{ paddingTop: '12px', textAlign: 'center' }}>
                <p style={{ fontFamily: PD, fontSize: '15px', fontWeight: '700', color: '#2C1810', marginBottom: '6px' }}>
                  {founder.name}
                </p>
                {founder.edu.map((line, i) => (
                  <p key={i} style={{ fontFamily: PD, fontSize: '10px', color: '#9B8B7A', lineHeight: '1.6', fontStyle: 'italic' }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            {/* shadow */}
            <div style={{
              position: 'absolute', bottom: '-14px', left: '50%',
              transform: 'translateX(-50%)', width: '200px', height: '16px',
              background: 'rgba(44,24,16,0.08)', filter: 'blur(12px)', borderRadius: '50%',
            }}/>
          </div>
        </div>

        {/* left text */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          marginBottom: '20px',
        }}>
          <p style={{ fontFamily: PD, fontSize: '14px', color: '#5C4A3A', lineHeight: '1.85', fontStyle: 'italic' }}>
            {founder.leftText}
          </p>
        </div>

        {/* right text + quote */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
        }}>
          <p style={{ fontFamily: PD, fontSize: '14px', color: '#5C4A3A', lineHeight: '1.85', fontStyle: 'italic', marginBottom: '16px' }}>
            {founder.rightText}
          </p>
          <p style={{ fontFamily: PD, fontSize: '15px', fontWeight: '700', color: '#E8713A', lineHeight: '1.6', fontStyle: 'italic' }}>
            {founder.quote}
          </p>
        </div>
      </div>
    );
  }

  // ── DESKTOP LAYOUT (unchanged) ──
  return (
    <div ref={sectionRef} style={{
      padding: '80px 5vw 100px',
      borderTop: index > 0 ? '1px solid rgba(44,24,16,0.07)' : 'none',
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
        {/* left text */}
        <div style={{
          paddingTop: '40px', opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}>
          <p style={{ fontFamily: PD, fontSize: '15px', color: '#5C4A3A', lineHeight: '1.9', fontStyle: 'italic' }}>
            {founder.leftText}
          </p>
        </div>

        {/* photo card */}
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
          }}/>
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
          }}/>
        </div>

        {/* right text + quote */}
        <div style={{
          paddingTop: '40px', opacity: visible ? 1 : 0,
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ minHeight: '100vh', fontFamily: PD }}>
      <Nav />

      {/* hero header */}
      <div style={{
        background: '#D6E8F5',
        minHeight: isMobile ? '40vh' : '52vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '60px 24px 48px' : '80px 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.4, pointerEvents:'none' }}
          viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
          <path d="M-100 150 C200 80 420 260 720 150 S1120 40 1540 180" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
          <path d="M-100 300 C160 220 460 380 760 280 S1160 160 1540 320" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
          <path d="M-100 420 C200 340 500 500 800 390 S1200 270 1540 440" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
        </svg>

        {[
          { top:'15%', left:'8%',  color:'#F5A623', size:16 },
          { top:'70%', left:'5%',  color:'#E8837A', size:12 },
          { top:'20%', right:'7%', color:'#F5A623', size:14 },
          { top:'65%', right:'5%', color:'#E8837A', size:18 },
        ].map((sp, i) => (
          <div key={i} style={{
            position:'absolute', top:sp.top,
            left:(sp as any).left, right:(sp as any).right,
            color:sp.color, fontSize:sp.size, pointerEvents:'none',
            animation:`throb ${2 + i * 0.3}s ease-in-out ${i * 0.5}s infinite`,
          }}>✦</div>
        ))}

        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding: '0 16px' }}>
          <p style={{
            fontFamily:PD, fontSize: isMobile ? '10px' : '13px',
            letterSpacing:'0.2em', textTransform:'uppercase',
            color:'rgba(44,24,16,0.4)', marginBottom:'16px',
            animation:'fadeUp 0.8s ease both',
          }}>
            The people behind What The Grad
          </p>
          <h1 style={{
            fontFamily:PD,
            fontSize: isMobile ? 'clamp(32px, 9vw, 52px)' : 'clamp(40px, 6vw, 80px)',
            fontWeight:'700', color:'#2C1810',
            letterSpacing:'-0.02em', lineHeight:'1.1',
            animation:'glow 2.8s ease-in-out infinite, fadeUp 1s ease 0.2s both',
          }}>
            Meet our Founders
          </h1>
          <p style={{
            fontFamily:PD,
            fontSize: isMobile ? '14px' : 'clamp(15px, 1.8vw, 20px)',
            fontStyle:'italic', color:'#5B8FA8',
            margin:'16px auto 0', maxWidth:'560px',
            animation:'fadeUp 1s ease 0.4s both',
            lineHeight: '1.6',
          }}>
            Two friends. One leap. A whole lot of clarity to give.
          </p>
        </div>

        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:'80px',
          background:'linear-gradient(to bottom, transparent, #ffffff)',
          pointerEvents:'none',
        }}/>
      </div>

      {/* founder sections */}
      <div style={{ background: '#ffffff' }}>
        {FOUNDERS.map((founder, i) => (
          <FounderSection key={founder.id} founder={founder} index={i} isMobile={isMobile}/>
        ))}
      </div>

      <Footer/>

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