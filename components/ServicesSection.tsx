'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';

const PD = "Playfair Display, Georgia, serif";

const PACKAGES = [
  {
    id: 'discovery-call',
    slug: 'discovery-call',
    name: 'Discovery Call',
    tagline: 'Not sure where to start? Start here.',
    price: '499',
    displayPrice: '\u20B9499',
    badge: null,
    color: '#D6E8F5',
    emoji: '\uD83D\uDD0D',
    shortDesc: 'A short, honest 1:1 conversation to figure out exactly where you are and what you need.',
  },
  {
    id: 'core-package',
    slug: 'core-package',
    name: 'Core Package',
    tagline: 'The full picture, start to finish.',
    price: '3499',
    displayPrice: '\u20B93499',
    badge: 'Recommended',
    color: '#F5A623',
    emoji: '\u2B50',
    shortDesc: 'Deep diagnostic + session + written summary. The complete What The Grad experience.',
  },
  {
    id: 'streamsense',
    slug: 'streamsense',
    name: 'StreamSense',
    tagline: 'Science, Commerce, or Arts — figure it out.',
    price: '1499',
    displayPrice: '\u20B91499',
    badge: null,
    color: '#E8D5F5',
    emoji: '\uD83C\uDFAF',
    shortDesc: 'Choosing the right stream after 10th is your first big decision. Make it the right one.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addItem } = useCart();
  const [progress, setProgress] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [added, setAdded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - windowHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackTranslate = 55 - progress * 110;

  const handleAddToCart = (e: React.MouseEvent, pkg: typeof PACKAGES[0]) => {
    e.stopPropagation();
    addItem({ id: pkg.id, name: pkg.name, price: pkg.displayPrice });
    setAdded(pkg.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        height: '300vh',
        position: 'relative',
        background: 'linear-gradient(180deg, #D6E8F5 0%, #FFF8EC 40%, #FFF8EC 100%)',
      }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute', top: '48px', left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', opacity: Math.min(1, progress * 5),
        }}>
          <p style={{ fontFamily: PD, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B8B7A', marginBottom: '8px' }}>
            What we offer
          </p>
          <h2 style={{ fontFamily: PD, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em' }}>
            Find your package
          </h2>
        </div>

        <div style={{
          display: 'flex', gap: '32px', alignItems: 'stretch',
          transform: `translateX(${trackTranslate}%)`,
          transition: 'transform 0.05s linear',
          willChange: 'transform',
          padding: '0 10vw', marginTop: '60px',
        }}>
          {PACKAGES.map((pkg, i) => {
            const cardProgress = Math.max(0, Math.min(1, (progress - i * 0.05) * 3));
            const isHovered = activeCard === i;
            const justAdded = added === pkg.id;

            return (
              <div
                key={pkg.id}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => router.push(`/services/${pkg.slug}`)}
                style={{
                  width: 'clamp(280px, 28vw, 380px)', flexShrink: 0,
                  background: '#FFFEF9', borderRadius: '24px',
                  cursor: 'pointer',
                  opacity: cardProgress,
                  transform: `translateY(${(1 - cardProgress) * 30}px) scale(${isHovered ? 1.03 : 1})`,
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: isHovered ? '0 32px 64px rgba(44,24,16,0.18)' : '0 8px 32px rgba(44,24,16,0.08)',
                  position: 'relative', overflow: 'hidden',
                  border: pkg.badge ? '2px solid #F5A623' : '2px solid transparent',
                }}
              >
                {pkg.badge && (
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: '#F5A623', color: '#2C1810', fontFamily: PD,
                    fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em',
                    textTransform: 'uppercase', padding: '5px 12px', borderRadius: '100px', zIndex: 2,
                  }}>
                    Recommended
                  </div>
                )}

                <div style={{
                  height: '180px', background: pkg.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', top: '-30px', right: '-30px' }} />
                  <span style={{ fontSize: '56px', position: 'relative', zIndex: 1 }}>{pkg.emoji}</span>
                </div>

                <div style={{ padding: '28px 28px 32px' }}>
                  <h3 style={{ fontFamily: PD, fontSize: '22px', fontWeight: '700', color: '#2C1810', marginBottom: '6px' }}>
                    {pkg.name}
                  </h3>
                  <p style={{ fontFamily: PD, fontSize: '13px', color: '#9B8B7A', fontStyle: 'italic', marginBottom: '16px' }}>
                    {pkg.tagline}
                  </p>
                  <p style={{ fontFamily: PD, fontSize: '14px', color: '#5C4A3A', lineHeight: '1.6', marginBottom: '24px' }}>
                    {pkg.shortDesc}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontFamily: PD, fontSize: '26px', fontWeight: '700', color: '#2C1810' }}>
                      {pkg.displayPrice}
                    </span>
                    <span style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A' }}>one-time</span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, pkg)}
                    style={{
                      width: '100%', padding: '14px',
                      background: justAdded ? '#22C55E' : (pkg.badge ? '#F5A623' : '#2C1810'),
                      color: justAdded ? 'white' : (pkg.badge ? '#2C1810' : '#FFFEF9'),
                      border: 'none', borderRadius: '100px', fontFamily: PD,
                      fontSize: '14px', fontWeight: '700', letterSpacing: '0.05em',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                    }}
                  >
                    {justAdded ? 'Added to cart!' : 'Add to cart'}
                  </button>

                  <p style={{ textAlign: 'center', marginTop: '12px', fontFamily: PD, fontSize: '12px', color: '#9B8B7A', textDecoration: 'underline', cursor: 'pointer' }}>
                    View full details
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}