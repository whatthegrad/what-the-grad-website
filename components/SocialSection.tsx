'use client';
import { useState } from 'react';

const PD = "Playfair Display, Georgia, serif";
const DS = "Dancing Script, cursive";

const SOCIALS = [
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'What The Grad',
    color: 'rgba(255,255,255,0.85)',
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
    color: 'rgba(255,255,255,0.85)',
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
    color: 'rgba(255,255,255,0.85)',
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

function SocialCard({ social }: { social: typeof SOCIALS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}
    >
      {/* Place card */}
      <div style={{
        width: '100%',
        borderRadius: '20px',
        background: social.color,
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.6)',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
        boxShadow: hovered ? '0 28px 56px rgba(44,24,16,0.18)' : '0 4px 24px rgba(44,24,16,0.1)',
        cursor: 'pointer',
      }}>
        {/* Image area */}
        <div style={{
          width: '100%',
          height: '220px',
          overflow: 'hidden',
          position: 'relative',
          background: '#D6E8F5',
        }}>
          <img
            src={social.image}
            alt={social.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
            onError={(e) => {
              // fallback if image not found
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Followers badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '100px',
            padding: '4px 10px',
            fontFamily: PD,
            fontSize: '11px',
            color: '#5C4A3A',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}>
            {social.followers}
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '20px 24px 24px', textAlign: 'center' }}>
          {/* Icon — centred */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '12px',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}>
            {social.icon}
          </div>

          {/* Name */}
          <h3 style={{
            fontFamily: PD,
            fontSize: '20px',
            fontWeight: '700',
            color: '#2C1810',
            marginBottom: '4px',
          }}>
            {social.name}
          </h3>

          {/* Handle — plain font not cursive */}
          <p style={{
            fontFamily: PD,
            fontSize: '13px',
            color: social.accent,
            marginBottom: '12px',
            fontStyle: 'italic',
          }}>
            @{social.handle}
          </p>

          {/* Description */}
          <p style={{
            fontFamily: PD,
            fontSize: '13px',
            color: '#5C4A3A',
            lineHeight: '1.6',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            maxHeight: hovered ? '60px' : '0',
            overflow: 'hidden',
          }}>
            {social.desc}
          </p>
        </div>
      </div>

      {/* Button */}
      <a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '13px 40px',
          background: hovered ? '#2C1810' : 'rgba(255,255,255,0.8)',
          color: hovered ? '#FFF8EC' : '#2C1810',
          border: '2px solid #2C1810',
          borderRadius: '100px',
          fontFamily: PD,
          fontSize: '14px',
          fontWeight: '700',
          letterSpacing: '0.04em',
          textDecoration: 'none',
          transition: 'background 0.25s ease, color 0.25s ease',
          cursor: 'pointer',
        }}
      >
        {social.name}
      </a>
    </div>
  );
}

export default function SocialSection() {
  return (
    <section style={{
      position: 'relative',
      paddingBottom: '80px',
      overflow: 'hidden',
      // background transitions from hero blue to gingham
      background: 'linear-gradient(180deg, #D6E8F5 0%, transparent 120px)',
      backgroundColor: 'transparent',
    }}>
      {/* Gingham background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/gingham-bg.jpg)',
        backgroundSize: '300px',
        backgroundRepeat: 'repeat',
        opacity: 0.55,
        zIndex: 0,
      }} />

      {/* Soft white overlay to keep it light */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255,255,255,0.35)',
        zIndex: 0,
      }} />

      {/* Transition fade from blue above */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(180deg, #D6E8F5 0%, transparent 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Ticker */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(44,24,16,0.08)',
        borderBottom: '1px solid rgba(44,24,16,0.08)',
        padding: '18px 0',
        overflow: 'hidden',
        marginBottom: '64px',
        background: 'rgba(255,252,245,0.75)',
        backdropFilter: 'blur(6px)',
      }}>
        <div style={{
          display: 'flex',
          animation: 'ticker 20s linear infinite',
          whiteSpace: 'nowrap',
          width: 'max-content',
        }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} style={{
              fontFamily: PD,
              fontSize: 'clamp(26px, 3vw, 42px)',
              fontWeight: '700',
              color: '#2C1810',
              letterSpacing: '-0.01em',
              paddingRight: '40px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '20px',
            }}>
              We&apos;re out there. Come find us
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#F5A623',
                display: 'inline-block',
                flexShrink: 0,
              }} />
            </span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 5vw',
        display: 'flex',
        gap: '28px',
        alignItems: 'flex-start',
      }}>
        {SOCIALS.map(s => <SocialCard key={s.id} social={s} />)}
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
