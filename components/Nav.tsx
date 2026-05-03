'use client';

import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { useEffect, useState } from 'react';

const PD = "Playfair Display, Georgia, serif";

export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const router = useRouter();
  const { totalItems } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const navigate = (path: string) => {
    setMenuOpen(false);
    router.push(path);
  };

  return (
    <>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '10px 20px' : '16px 48px',
        position: 'sticky', top: 0, zIndex: 100,
        background: transparent ? 'rgba(214,232,245,0.92)' : 'rgba(255,248,236,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(44,24,16,0.07)',
      }}>

        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/logo.png"
            alt="What The Grad"
            style={{ height: isMobile ? '48px' : '85px' }}
          />
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <span onClick={() => navigate('/founders')} style={linkStyle}>Meet our Founders</span>
            <span onClick={() => navigate('/#services')} style={linkStyle}>Services</span>
            <span onClick={() => navigate('/#about')} style={linkStyle}>About</span>
            <span onClick={() => navigate('/contact')} style={linkStyle}>Contact</span>
            <span onClick={() => navigate('/cart')} style={{ ...linkStyle, position: 'relative' }}>
              Cart
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-10px',
                  background: '#F5A623', color: '#2C1810',
                  borderRadius: '50%', width: '18px', height: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: '700', fontFamily: PD,
                }}>
                  {totalItems}
                </span>
              )}
            </span>
            <button
              onClick={() => navigate('/#services')}
              style={{
                background: '#2C1810', color: '#FFF8EC', border: 'none',
                borderRadius: '100px', padding: '10px 24px',
                fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: PD,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E8713A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#2C1810')}
            >
              Book now
            </button>
          </div>
        )}

        {/* Mobile right side — cart + hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* cart icon */}
            <div onClick={() => navigate('/cart')} style={{ position: 'relative', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>🛒</span>
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-8px',
                  background: '#F5A623', color: '#2C1810',
                  borderRadius: '50%', width: '16px', height: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', fontWeight: '700', fontFamily: PD,
                }}>
                  {totalItems}
                </span>
              )}
            </div>

            {/* hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px', display: 'flex', flexDirection: 'column',
                gap: '5px', alignItems: 'flex-end',
              }}
              aria-label="Toggle menu"
            >
              <span style={{
                display: 'block', height: '2px', background: '#2C1810', borderRadius: '2px',
                width: menuOpen ? '22px' : '22px',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                transition: 'transform 0.25s ease',
              }}/>
              <span style={{
                display: 'block', height: '2px', background: '#2C1810', borderRadius: '2px',
                width: '16px',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.2s ease',
              }}/>
              <span style={{
                display: 'block', height: '2px', background: '#2C1810', borderRadius: '2px',
                width: '22px',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                transition: 'transform 0.25s ease',
              }}/>
            </button>
          </div>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: 0, right: 0,
          zIndex: 99,
          background: 'rgba(255,248,236,0.98)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(44,24,16,0.08)',
          padding: menuOpen ? '20px 24px 28px' : '0 24px',
          maxHeight: menuOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, padding 0.3s ease',
          boxShadow: menuOpen ? '0 8px 32px rgba(44,24,16,0.1)' : 'none',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { label: 'About', path: '/#about' },
              { label: 'Meet our Founders', path: '/founders' },
              { label: 'Services', path: '/#services' },
              { label: 'Contact', path: '/contact' },
              { label: 'Cart', path: '/cart' },
            ].map(link => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: PD, fontSize: '17px', fontWeight: '700',
                  color: '#2C1810', textAlign: 'left',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(44,24,16,0.06)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E8713A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#2C1810')}
              >
                {link.label}
              </button>
            ))}

            {/* Book now CTA */}
            <button
              onClick={() => navigate('/#services')}
              style={{
                marginTop: '12px',
                background: '#2C1810', color: '#FFF8EC', border: 'none',
                borderRadius: '100px', padding: '14px',
                fontFamily: PD, fontSize: '15px', fontWeight: '700',
                cursor: 'pointer', width: '100%',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E8713A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#2C1810')}
            >
              Book now ✦
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const linkStyle: React.CSSProperties = {
  fontFamily: PD,
  fontSize: '14px',
  color: '#5C4A3A',
  cursor: 'pointer',
  transition: 'color 0.2s',
  whiteSpace: 'nowrap',
  position: 'relative',
};