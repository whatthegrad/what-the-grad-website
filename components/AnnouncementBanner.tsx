'use client';

import { useEffect, useState, useCallback } from 'react';

const PD = "Playfair Display, Georgia, serif";

interface Banner {
  id: string;
  image: string;        // path to banner image
  alt: string;
  link: string;         // where it goes on click
}

// ── Add your banners here ──────────────────────────────────────────────────
// Replace these placeholders with real images and links:
//   { id: 'fall-2027', image: '/images/banner-fall.jpg', alt: 'Fall 2027 applications open', link: '/contact' },
const BANNERS: Banner[] = [
  { id: 'banner-1', image: '', alt: 'Banner 1', link: '#' },
  { id: 'banner-2', image: '', alt: 'Banner 2', link: '#' },
  { id: 'banner-3', image: '', alt: 'Banner 3', link: '#' },
];

export default function AnnouncementBanner() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // auto-rotate every 3.5s
  useEffect(() => {
    if (BANNERS.length <= 1) return;
    const t = setInterval(() => {
      setActive(a => (a + 1) % BANNERS.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const HEIGHT = isMobile ? 52 : 68;

  return (
    <div style={{
      width: '100%',
      height: HEIGHT,
      background: '#2C1810',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 90,
    }}>
      {/* banner slides */}
      {BANNERS.map((banner, i) => (
        <a
          key={banner.id}
          href={banner.link}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.6s ease',
            cursor: banner.link !== '#' ? 'pointer' : 'default',
          }}
        >
          {banner.image ? (
            <img
              src={banner.image}
              alt={banner.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          ) : (
            // placeholder until real images are added
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              height: '100%',
            }}>
              <span style={{
                fontFamily: PD,
                fontSize: isMobile ? '12px' : '14px',
                color: '#FFF8EC',
                fontStyle: 'italic',
                letterSpacing: '0.04em',
                opacity: 0.7,
              }}>
                ✦ {banner.alt} ✦
              </span>
            </div>
          )}
        </a>
      ))}

      {/* dot indicators */}
      {BANNERS.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: 6,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 5,
          zIndex: 2,
        }}>
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 16 : 5,
                height: 5,
                borderRadius: 100,
                background: i === active ? '#F5A623' : 'rgba(255,248,236,0.3)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
