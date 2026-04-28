'use client';

const PD = "Playfair Display, Georgia, serif";

export default function Footer() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ── ANIMATED WAVE TRANSITION ── */}
      <div style={{
        position: 'relative',
        background: '#FFF8EC',
        height: '140px',
        overflow: 'hidden',
        lineHeight: 0,
      }}>
        {/* Wave layer 3 — slowest, most transparent, furthest back */}
        <svg
          viewBox="0 0 1440 140"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100%',
            animation: 'wave3 9s linear infinite',
            opacity: 0.3,
          }}
          preserveAspectRatio="none"
        >
          <path d="M0,70 C180,120 360,20 540,70 C720,120 900,20 1080,70 C1260,120 1440,20 1620,70 C1800,120 1980,20 2160,70 L2160,140 L0,140 Z" fill="#D6E8F5"/>
        </svg>

        {/* Wave layer 2 — medium speed */}
        <svg
          viewBox="0 0 1440 140"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100%',
            animation: 'wave2 6s linear infinite',
            opacity: 0.5,
          }}
          preserveAspectRatio="none"
        >
          <path d="M0,85 C200,30 400,110 600,85 C800,60 1000,120 1200,85 C1400,50 1600,110 1800,85 C2000,60 2200,120 2440,85 L2440,140 L0,140 Z" fill="#C8DFF0"/>
        </svg>

        {/* Wave layer 1 — fastest, most opaque, front */}
        <svg
          viewBox="0 0 1440 140"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100%',
            animation: 'wave1 4s linear infinite',
          }}
          preserveAspectRatio="none"
        >
          <path d="M0,95 C160,50 320,130 480,95 C640,60 800,130 960,95 C1120,60 1280,130 1440,95 C1600,60 1760,130 1920,95 C2080,60 2240,130 2400,95 L2400,140 L0,140 Z" fill="#D6E8F5"/>
        </svg>

        {/* Foam edge — thin white line that shimmers */}
        <svg
          viewBox="0 0 1440 140"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100%',
            animation: 'wave1 4s linear infinite',
            opacity: 0.6,
          }}
          preserveAspectRatio="none"
        >
          <path d="M0,93 C160,48 320,128 480,93 C640,58 800,128 960,93 C1120,58 1280,128 1440,93 C1600,58 1760,128 1920,93 C2080,58 2240,128 2400,93" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" fill="none"/>
        </svg>
      </div>

      {/* ── FOOTER BODY ── */}
      <div style={{
        background: '#D6E8F5',
        padding: '56px 5vw 44px',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Wavy background lines */}
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.22, pointerEvents:'none' }}
          viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
          <path d="M-100 80 C200 20 420 160 720 80 S1120 0 1540 100"  stroke="#96BDD6" strokeWidth="1.5" fill="none"/>
          <path d="M-100 200 C160 140 460 260 760 180 S1160 80 1540 220" stroke="#96BDD6" strokeWidth="1.5" fill="none"/>
          <path d="M-100 310 C220 250 520 360 820 290 S1220 200 1540 330" stroke="#96BDD6" strokeWidth="1.5" fill="none"/>
        </svg>

        {/* Sparkles */}
        {[
          { top:'18%', left:'6%',   color:'#E8837A', size:13 },
          { top:'65%', left:'3%',   color:'#F5A623', size:10 },
          { top:'30%', left:'50%',  color:'#9BB5C8', size:11 },
          { top:'72%', left:'56%',  color:'#E8837A', size:15 },
          { top:'22%', right:'5%',  color:'#F5A623', size:12 },
          { top:'68%', right:'3%',  color:'#9BB5C8', size:13 },
        ].map((sp, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: sp.top,
            left: (sp as any).left,
            right: (sp as any).right,
            color: sp.color,
            fontSize: sp.size,
            pointerEvents: 'none',
            animation: `throb ${2.2 + i * 0.3}s ease-in-out ${i * 0.4}s infinite`,
          }}>✦</div>
        ))}

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>

          {/* Top grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1fr 1fr',
            gap: '60px',
            alignItems: 'start',
            marginBottom: '52px',
          }}>

            {/* LEFT */}
            <div>
              <div style={{
                fontFamily: PD,
                fontWeight: '900',
                fontSize: '1.5rem',
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '28px',
              }}>
                <span style={{ color:'#E8837A', fontSize:'0.9rem' }}>✦</span>
                What the grad
                <span style={{ fontSize:'1.2rem' }}>🎓</span>
              </div>

              <h2 style={{
                fontFamily: PD,
                fontSize: 'clamp(26px, 3.2vw, 44px)',
                fontWeight: '700',
                color: '#2C1810',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}>
                Rooting for you,<br />always.
              </h2>

              {/* Normal Playfair font — not cursive */}
              <p style={{
                fontFamily: PD,
                fontSize: '18px',
                fontWeight: '700',
                fontStyle: 'italic',
                color: '#E8713A',
                letterSpacing: '0.01em',
              }}>
                — Team What the Grad.
              </p>
            </div>

            {/* MIDDLE */}
            <div>
              <h4 style={{
                fontFamily: PD,
                fontSize: '13px',
                fontWeight: '700',
                color: '#2C1810',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Location
              </h4>
              <p style={{
                fontFamily: PD,
                fontSize: '15px',
                color: '#5C4A3A',
                lineHeight: '1.7',
              }}>
                Mumbai, India.
              </p>
            </div>

            {/* RIGHT */}
            <div>
              <h4 style={{
                fontFamily: PD,
                fontSize: '13px',
                fontWeight: '700',
                color: '#2C1810',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Contact
              </h4>
              <a href="mailto:whatthegrad.in@gmail.com" style={{
                fontFamily: PD, fontSize: '15px', color: '#5C4A3A',
                textDecoration: 'none', display: 'block', marginBottom: '6px', transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E8713A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#5C4A3A')}
              >
                whatthegrad.in@gmail.com
              </a>
              <a href="tel:+919172771653" style={{
                fontFamily: PD, fontSize: '15px', color: '#5C4A3A',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E8713A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#5C4A3A')}
              >
                (+91) 9172771653
              </a>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(44,24,16,0.1)', marginBottom: '22px' }} />

          {/* Bottom bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <p style={{ fontFamily: PD, fontSize: '13px', color: '#9B8B7A' }}>
              © {new Date().getFullYear()} What The Grad. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {[
                { label: 'Instagram', url: 'https://www.instagram.com/whatthegrad/?hl=en' },
                { label: 'Facebook',  url: 'https://www.facebook.com/whatthegrad/' },
                { label: 'LinkedIn',  url: 'https://www.linkedin.com/in/what-the-grad-5039aa3b8/' },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: PD, fontSize: '13px', color: '#9B8B7A', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E8713A')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#9B8B7A')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave1 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave2 {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes wave3 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes throb {
          0%,100% { transform: scale(0.7) rotate(0deg);  opacity: 0.4; }
          50%      { transform: scale(1.3) rotate(20deg); opacity: 1;   }
        }
      `}</style>
    </footer>
  );
}
