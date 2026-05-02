'use client';
import { useState, useEffect } from 'react';

const PD = "Playfair Display, Georgia, serif";

const SOCIALS = [
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'What The Grad',
    accent: '#3B5998',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="#3B5998" strokeWidth="2.5" fill="none"/>
        <path d="M26 14h-3a5 5 0 0 0-5 5v3h-3v4h3v10h4V26h3l1-4h-4v-3a1 1 0 0 1 1-1h3z" fill="#3B5998"/>
      </svg>
    ),
    image: '/images/social-facebook.jpg',
    desc: 'Community posts, events & parent updates.',
    followers: '1.1k followers',
    url: 'https://www.facebook.com/whatthegrad/',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: 'whatthegrad',
    accent: '#9B59B6',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="10" stroke="#9B59B6" strokeWidth="2.5" fill="none"/>
        <circle cx="24" cy="24" r="8" stroke="#9B59B6" strokeWidth="2.5" fill="none"/>
        <circle cx="35" cy="13" r="2.5" fill="#9B59B6"/>
      </svg>
    ),
    image: '/images/social-instagram.jpg',
    desc: 'Daily tips, student stories & behind-the-scenes.',
    followers: '2.4k followers',
    url: 'https://www.instagram.com/whatthegrad/?hl=en',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'What The Grad',
    accent: '#0077B5',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="6" stroke="#0077B5" strokeWidth="2.5" fill="none"/>
        <circle cx="16" cy="18" r="2.5" fill="#0077B5"/>
        <rect x="14" y="22" width="4" height="12" rx="1" fill="#0077B5"/>
        <path d="M22 22h4v2.5s1-2.5 4-2.5c3.5 0 4 2.5 4 5V34h-4v-6c0-1.5-.5-2.5-2-2.5s-2 1-2 2.5V34h-4V22z" fill="#0077B5"/>
      </svg>
    ),
    image: '/images/social-linkedin.jpg',
    desc: 'Career insights, founder updates & industry news.',
    followers: '890 followers',
    url: 'https://www.linkedin.com/in/what-the-grad-5039aa3b8/',
  },
];

function SocialCard({ social, isMobile }: { social: typeof SOCIALS[0]; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '14px',
        flex: isMobile ? 'none' : 1,
        width: isMobile ? '100%' : 'auto',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: '100%',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.85)',
        overflow: 'hidden',
        transform: (!isMobile && hovered) ? 'translateY(-8px) scale(1.02)' : 'none',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
        boxShadow: hovered ? '0 20px 48px rgba(44,24,16,0.15)' : '0 4px 20px rgba(44,24,16,0.08)',
      }}>
        {/* image */}
        <div style={{
          width: '100%',
          height: isMobile ? '180px' : '220px',
          overflow: 'hidden', position: 'relative', background: '#D6E8F5',
        }}>
          <img
            src={social.image} alt={social.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
          <div style={{
            position: 'absolute', top: '10px', right: '10px',
            background: 'rgba(255,255,255,0.88)', borderRadius: '100px',
            padding: '3px 10px', fontFamily: PD, fontSize: '11px', color: '#5C4A3A',
          }}>
            {social.followers}
          </div>
        </div>

        {/* body */}
        <div style={{ padding: isMobile ? '16px 18px 18px' : '20px 24px 24px', textAlign: 'center' }}>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:'10px' }}>
            {social.icon}
          </div>
          <h3 style={{ fontFamily:PD, fontSize: isMobile ? '18px' : '20px', fontWeight:'700', color:'#2C1810', marginBottom:'3px' }}>
            {social.name}
          </h3>
          <p style={{ fontFamily:PD, fontSize:'13px', color:social.accent, marginBottom:'10px', fontStyle:'italic' }}>
            @{social.handle}
          </p>
          {/* always visible on mobile, hover-only on desktop */}
          <p style={{
            fontFamily:PD, fontSize:'13px', color:'#5C4A3A', lineHeight:'1.6',
            opacity: isMobile ? 1 : (hovered ? 1 : 0),
            transition: 'opacity 0.3s ease',
          }}>
            {social.desc}
          </p>
        </div>
      </div>

      {/* always visible button — no hover dependency */}
      <a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: isMobile ? '11px 32px' : '13px 40px',
          background: 'rgba(255,255,255,0.8)',
          color: '#2C1810',
          border: '2px solid #2C1810',
          borderRadius: '100px',
          fontFamily: PD, fontSize: '14px', fontWeight: '700',
          letterSpacing: '0.04em', textDecoration: 'none',
          transition: 'background 0.25s, color 0.25s',
          width: isMobile ? '100%' : 'auto',
          textAlign: 'center',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#2C1810'; e.currentTarget.style.color = '#FFF8EC'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.color = '#2C1810'; }}
      >
        {social.name}
      </a>
    </div>
  );
}

export default function SocialSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section style={{
      position: 'relative', paddingBottom: '80px', overflow: 'hidden',
      background: 'linear-gradient(180deg, #D6E8F5 0%, transparent 120px)',
      backgroundColor: 'transparent',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/gingham-bg.jpg)', backgroundSize:'300px', backgroundRepeat:'repeat', opacity:0.55, zIndex:0 }}/>
      <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.35)', zIndex:0 }}/>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'120px', background:'linear-gradient(180deg, #D6E8F5 0%, transparent 100%)', zIndex:1, pointerEvents:'none' }}/>

      {/* ticker */}
      <div style={{
        position:'relative', zIndex:2,
        borderTop:'1px solid rgba(44,24,16,0.08)', borderBottom:'1px solid rgba(44,24,16,0.08)',
        padding:'16px 0', overflow:'hidden', marginBottom: isMobile ? '36px' : '64px',
        background:'rgba(255,252,245,0.75)',
      }}>
        <div style={{ display:'flex', animation:'ticker 20s linear infinite', whiteSpace:'nowrap', width:'max-content' }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} style={{
              fontFamily:PD,
              fontSize: isMobile ? 'clamp(18px, 5vw, 28px)' : 'clamp(26px, 3vw, 42px)',
              fontWeight:'700', color:'#2C1810', letterSpacing:'-0.01em',
              paddingRight:'32px', display:'inline-flex', alignItems:'center', gap:'16px',
            }}>
              We&apos;re out there. Come find us
              <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#F5A623', display:'inline-block', flexShrink:0 }}/>
            </span>
          ))}
        </div>
      </div>

      {/* cards */}
      <div style={{
        position:'relative', zIndex:2,
        maxWidth:'1100px', margin:'0 auto',
        padding:'0 5vw',
        display: isMobile ? 'flex' : 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '28px' : '28px',
        alignItems:'flex-start',
      }}>
        {SOCIALS.map(s => <SocialCard key={s.id} social={s} isMobile={isMobile}/>)}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
