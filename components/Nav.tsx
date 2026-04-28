'use client';

import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';

const PD = "Playfair Display, Georgia, serif";

export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const router = useRouter();
  const { totalItems } = useCart();

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 48px',
      position: 'sticky', top: 0, zIndex: 100,
      background: transparent ? 'rgba(214,232,245,0.85)' : 'rgba(255,248,236,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(44,24,16,0.07)',
    }}>

      {/* Logo / wordmark */}
      <div onClick={() => router.push('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img src="/images/logo.png" alt="What The Grad" style={{ height: '85px' }} />
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        <span onClick={() => router.push('/founders')} style={linkStyle}>Meet our Founders</span>
        <span onClick={() => router.push('/#services')} style={linkStyle}>Services</span>
        <span onClick={() => router.push('/#about')} style={linkStyle}>About</span>
        <span onClick={() => router.push('/contact')} style={linkStyle}>Contact</span>

        {/* Cart with bubble */}
        <span
          onClick={() => router.push('/cart')}
          style={{ ...linkStyle, position: 'relative' }}
        >
          Cart
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px', right: '-10px',
              background: '#F5A623',
              color: '#2C1810',
              borderRadius: '50%',
              width: '18px', height: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: '700',
              fontFamily: PD,
            }}>
              {totalItems}
            </span>
          )}
        </span>

        <button
          onClick={() => router.push('/#services')}
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
    </nav>
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
