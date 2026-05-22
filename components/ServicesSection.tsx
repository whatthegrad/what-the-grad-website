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
    price: '₹499',
    priceNum: 499,
    badge: null,
    color: '#D6E8F5',
    image: '/images/pkg-discovery-call.png',
    emoji: '🔍',
    for: 'Any student, any stage',
    shortDesc: 'A short, honest 1:1 conversation to figure out exactly where you are and what you need.',
    includes: [
      '20–30 min 1:1 conversation',
      'Quick assessment of where you are',
      'Verbal direction + recommended next step',
      'Honest conversation — no hard sell',
    ],
    btnLabel: 'Save my spot',
  },
  {
    id: 'streamsense',
    slug: 'streamsense',
    name: 'StreamSense',
    tagline: "Science, Commerce, or Arts — let's figure it out.",
    price: '₹1,499',
    priceNum: 1499,
    badge: null,
    color: '#E8D5F5',
    image: '/images/pkg-streamsense.png',
    emoji: '🎯',
    for: 'Class 9–10 students choosing stream after 10th',
    shortDesc: 'Choosing the right stream after 10th is your first big decision. Make it the right one.',
    includes: [
      '28-question diagnostic questionnaire',
      'Interest and aptitude mapping',
      '1:1 guidance session (45–60 min)',
      'Personalised stream recommendation',
      'Written summary document',
      '1 month WhatsApp support',
    ],
    btnLabel: 'Count me in',
  },
  {
    id: 'core-package',
    slug: 'core-package',
    name: 'Core Package',
    tagline: 'The full picture, start to finish.',
    price: '₹3,499',
    priceNum: 3499,
    badge: 'Most popular',
    color: '#F5A623',
    image: '/images/pkg-core-package.png',
    emoji: '⭐',
    for: 'Any student confused about direction',
    shortDesc: 'Deep diagnostic + session + written summary. The complete What The Grad experience.',
    includes: [
      '28-question diagnostic questionnaire',
      'Full pattern analysis before session',
      '1:1 deep-dive session (75 min)',
      'Top 2–3 career directions with reasoning',
      "Elimination of paths that don't fit",
      'Written personalised summary (48 hrs)',
      '1 month WhatsApp support',
    ],
    btnLabel: 'Get started',
  },
  {
    id: 'ug-pathway',
    slug: 'ug-pathway',
    name: 'UG Pathway',
    tagline: 'Post-12th college & course guidance.',
    price: '₹2,999',
    priceNum: 2999,
    badge: null,
    color: '#D6F0E8',
    image: '/images/pkg-ug-pathway.png',
    emoji: '🎓',
    for: 'Class 12 students and gap year students choosing college and course',
    shortDesc: 'Top 3–5 course and college matches for India and abroad, with a real application plan.',
    includes: [
      '28-question diagnostic questionnaire',
      '1:1 guidance session (60–75 min)',
      'Top 3–5 course and college matches',
      'Basic SOP/resume direction',
      'Application timeline guidance',
      'Written summary document',
    ],
    btnLabel: 'Find my path',
  },
  {
    id: 'gradglow',
    slug: 'gradglow',
    name: 'GradGlow',
    tagline: 'UG to PG transition — done right.',
    price: '₹7,999',
    priceNum: 7999,
    badge: null,
    color: '#FFF3D6',
    image: '/images/pkg-gradglow.png',
    emoji: '✨',
    for: "Undergrads deciding between a master's, job, or career switch",
    shortDesc: "MS vs MBA vs job — mapped out clearly with a written roadmap you can actually follow.",
    includes: [
      '1:1 career mapping session',
      'MS vs MBA vs job pathway analysis',
      'Course and university shortlisting',
      'CV/resume feedback',
      'SOP structure and review support',
      'Written roadmap document',
    ],
    btnLabel: 'Glow up',
  },
  {
    id: 'total-admit',
    slug: 'total-admit',
    name: 'Total Admit',
    tagline: 'Full application support, start to submission.',
    price: '₹13,999',
    priceNum: 13999,
    badge: 'Premium',
    color: '#2C1810',
    image: '/images/pkg-total-admit.png',
    emoji: '🏆',
    for: "Students applying to master's or competitive UG programs abroad or in India",
    shortDesc: "Everything from university selection to final review — we're with you the whole way.",
    includes: [
      'University selection (3–5 programs)',
      'SOP writing support — brainstorm + 2 rounds of editing',
      'CV formatting and editing',
      'LOR strategy and template',
      'Application calendar and checklist',
      'WhatsApp/email support for 1 month',
      'Final review before submission',
    ],
    btnLabel: 'Get me in',
  },
];

const ADDONS = [
  { id: 'sop-edit',       name: 'Express SOP Edit',            desc: '48 hr turnaround',         price: '₹1,499', priceNum: 1499 },
  { id: 'cv-revamp',      name: 'CV / Resume Revamp',          desc: 'Full formatting + edit',    price: '₹699',   priceNum: 699  },
  { id: 'linkedin',       name: 'LinkedIn Profile Setup',      desc: 'Bio, headline, summary',    price: '₹499',   priceNum: 499  },
  { id: 'mock-interview', name: 'Mock Interview',              desc: '30 min session',            price: '₹999',   priceNum: 999  },
  { id: 'parent-call',    name: 'Parent Counselling Call',     desc: 'Align the family',          price: '₹399',   priceNum: 399  },
  { id: 'extra-sop',      name: 'Extra University SOP',        desc: 'Per university',            price: '₹999',   priceNum: 999  },
  { id: 'visa-qa',        name: 'Visa & Scholarship Q&A',      desc: '30 min session',            price: '₹699',   priceNum: 699  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const router     = useRouter();
  const { addItem } = useCart();

  const [progress, setProgress]     = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [added, setAdded]           = useState<string | null>(null);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect            = section.getBoundingClientRect();
      const sectionHeight   = section.offsetHeight;
      const windowHeight    = window.innerHeight;
      const scrollableDistance = sectionHeight - windowHeight;
      const scrolled        = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackTranslate = isMobile ? 0 : (45 - progress * 90);

  const handleAddToCart = (e: React.MouseEvent, item: { id: string; name: string; price: string }) => {
    e.stopPropagation();
    addItem({ id: item.id, name: item.name, price: item.price });
    setAdded(item.id);
    setTimeout(() => setAdded(null), 1500);
  };

  // ── MOBILE LAYOUT ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section id="services" ref={sectionRef} style={{ background: 'linear-gradient(180deg, #D6E8F5 0%, #FFF8EC 15%, #FFF8EC 100%)', padding: '56px 5vw 72px' }}>

        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ fontFamily: PD, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B8B7A', marginBottom: '8px' }}>What we offer</p>
          <h2 style={{ fontFamily: PD, fontSize: 'clamp(24px, 7vw, 36px)', fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em' }}>Find your package</h2>
        </div>

        {/* package cards — single column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
          {PACKAGES.map((pkg) => {
            const justAdded = added === pkg.id;
            const isDark    = pkg.color === '#2C1810';
            return (
              <div
                key={pkg.id}
                style={{
                  background: '#FFFEF9',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(44,24,16,0.08)',
                  border: pkg.badge ? '2px solid #F5A623' : '1.5px solid rgba(44,24,16,0.07)',
                  position: 'relative',
                }}
              >
                {pkg.badge && (
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: '#F5A623', color: '#2C1810',
                    fontFamily: PD, fontSize: '10px', fontWeight: '700',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: '100px', zIndex: 2,
                  }}>★ {pkg.badge}</div>
                )}

                {/* colour band */}
                <div style={{
                  height: '160px', position: 'relative', overflow: 'hidden', background: pkg.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={pkg.image || ''} alt={pkg.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}/>
                </div>

                <div style={{ padding: '20px 20px 24px' }}>
                  <h3 style={{ fontFamily: PD, fontSize: '20px', fontWeight: '700', color: '#2C1810', marginBottom: '4px' }}>{pkg.name}</h3>
                  <p style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A', fontStyle: 'italic', marginBottom: '10px' }}>{pkg.tagline}</p>
                  <p style={{ fontFamily: PD, fontSize: '11px', color: '#9B8B7A', marginBottom: '10px' }}>For: {pkg.for}</p>
                  <p style={{ fontFamily: PD, fontSize: '13px', color: '#5C4A3A', lineHeight: '1.6', marginBottom: '14px' }}>{pkg.shortDesc}</p>

                  {/* includes */}
                  <div style={{ marginBottom: '16px' }}>
                    {pkg.includes.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '5px' }}>
                        <span style={{ color: '#F5A623', fontWeight: '700', flexShrink: 0, fontSize: '13px' }}>✦</span>
                        <p style={{ fontFamily: PD, fontSize: '12px', color: '#5C4A3A', lineHeight: '1.5' }}>{item}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontFamily: PD, fontSize: '24px', fontWeight: '700', color: '#2C1810' }}>{pkg.price}</span>
                    <span style={{ fontFamily: PD, fontSize: '11px', color: '#9B8B7A' }}>one-time</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={(e) => handleAddToCart(e, pkg)}
                      style={{
                        flex: 1, padding: '12px',
                        background: justAdded ? '#22C55E' : (pkg.badge === 'Most popular' ? '#F5A623' : '#2C1810'),
                        color: justAdded ? 'white' : (pkg.badge === 'Most popular' ? '#2C1810' : '#FFFEF9'),
                        border: 'none', borderRadius: '100px',
                        fontFamily: PD, fontSize: '13px', fontWeight: '700',
                        cursor: 'pointer', transition: 'background 0.3s',
                      }}
                    >
                      {justAdded ? '✓ Added!' : 'Add to cart'}
                    </button>
                    <button
                      onClick={() => router.push(`/services/${pkg.slug}`)}
                      style={{
                        flex: 1, padding: '12px',
                        background: 'transparent', color: '#2C1810',
                        border: '1.5px solid rgba(44,24,16,0.2)', borderRadius: '100px',
                        fontFamily: PD, fontSize: '13px', fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* add-on services */}
        <div>
          <p style={{ fontFamily: PD, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B8B7A', marginBottom: '8px', textAlign: 'center' }}>Add-ons</p>
          <h3 style={{ fontFamily: PD, fontSize: 'clamp(20px, 6vw, 28px)', fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em', marginBottom: '24px', textAlign: 'center' }}>
            Bolt-on services
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ADDONS.map((addon) => {
              const justAdded = added === addon.id;
              return (
                <div key={addon.id} style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(44,24,16,0.08)',
                  borderRadius: '14px', padding: '14px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: PD, fontSize: '14px', fontWeight: '700', color: '#2C1810', marginBottom: '2px' }}>{addon.name}</p>
                    <p style={{ fontFamily: PD, fontSize: '11px', color: '#9B8B7A', fontStyle: 'italic' }}>{addon.desc}</p>
                  </div>
                  <span style={{ fontFamily: PD, fontSize: '15px', fontWeight: '700', color: '#2C1810', whiteSpace: 'nowrap' }}>{addon.price}</span>
                  <button
                    onClick={(e) => handleAddToCart(e, addon)}
                    style={{
                      padding: '8px 16px',
                      background: justAdded ? '#22C55E' : '#2C1810',
                      color: justAdded ? 'white' : '#FFF8EC',
                      border: 'none', borderRadius: '100px',
                      fontFamily: PD, fontSize: '12px', fontWeight: '700',
                      cursor: 'pointer', whiteSpace: 'nowrap',
                      transition: 'background 0.3s',
                    }}
                  >
                    {justAdded ? '✓' : '+ Add'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ── DESKTOP LAYOUT ─────────────────────────────────────────────────────────
  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        height: '500vh',
        position: 'relative',
        background: 'linear-gradient(180deg, #D6E8F5 0%, #FFF8EC 20%, #FFF8EC 100%)',
      }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}>
        {/* header */}
        <div style={{
          position: 'absolute', top: '48px', left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', opacity: Math.min(1, progress * 5), whiteSpace: 'nowrap',
        }}>
          <p style={{ fontFamily: PD, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B8B7A', marginBottom: '8px' }}>
            What we offer
          </p>
          <h2 style={{ fontFamily: PD, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em' }}>
            Find your package
          </h2>
        </div>

        {/* scrolling card track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex', gap: '28px', alignItems: 'stretch',
            transform: `translateX(${trackTranslate}%)`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
            padding: '0 8vw', marginTop: '60px',
          }}
        >
          {PACKAGES.map((pkg, i) => {
            const cardProgress = Math.max(0, Math.min(1, (progress - i * 0.03) * 4));
            const isHovered    = activeCard === i;
            const justAdded    = added === pkg.id;
            const isDark       = pkg.color === '#2C1810';

            return (
              <div
                key={pkg.id}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => router.push(`/services/${pkg.slug}`)}
                style={{
                  width: 'clamp(260px, 22vw, 340px)', flexShrink: 0,
                  background: '#FFFEF9', borderRadius: '24px', padding: 0,
                  cursor: 'pointer',
                  opacity: cardProgress,
                  transform: `translateY(${(1 - cardProgress) * 30}px) scale(${isHovered ? 1.03 : 1})`,
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: isHovered ? '0 32px 64px rgba(44,24,16,0.18)' : '0 8px 32px rgba(44,24,16,0.08)',
                  position: 'relative', overflow: 'hidden',
                  border: pkg.badge ? '2px solid #F5A623' : '2px solid transparent',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {pkg.badge && (
                  <div style={{
                    position: 'absolute', top: '14px', left: '14px',
                    background: '#F5A623', color: '#2C1810', fontFamily: PD,
                    fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em',
                    textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px', zIndex: 2,
                  }}>★ {pkg.badge}</div>
                )}

                {/* colour band */}
                <div style={{
                  height: '200px', flexShrink: 0,
                  position: 'relative', overflow: 'hidden',
                  background: pkg.color,
                }}>
                  <img
                    src={pkg.image || ''}
                    alt={pkg.name}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center',
                      display: pkg.image ? 'block' : 'none',
                    }}
                 />
                 {!pkg.image && (
                   <span style={{ fontSize: '52px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                     <img src={pkg.image || ''} alt={pkg.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}/>
                   </span>
                 )}
               </div>

                <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontFamily: PD, fontSize: '20px', fontWeight: '700', color: '#2C1810', marginBottom: '4px' }}>{pkg.name}</h3>
                  <p style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A', fontStyle: 'italic', marginBottom: '6px' }}>{pkg.tagline}</p>
                  <p style={{ fontFamily: PD, fontSize: '11px', color: '#B0A090', marginBottom: '10px' }}>For: {pkg.for}</p>
                  <p style={{ fontFamily: PD, fontSize: '13px', color: '#5C4A3A', lineHeight: '1.6', marginBottom: '14px' }}>{pkg.shortDesc}</p>

                  {/* includes — visible on hover */}
                  <div style={{
                    maxHeight: isHovered ? '200px' : '0', overflow: 'hidden',
                    transition: 'max-height 0.4s ease', marginBottom: isHovered ? '14px' : '0',
                  }}>
                    {pkg.includes.map((item, j) => (
                      <div key={j} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <span style={{ color: '#F5A623', fontWeight: '700', flexShrink: 0, fontSize: '11px', marginTop: '2px' }}>✦</span>
                        <p style={{ fontFamily: PD, fontSize: '11px', color: '#5C4A3A', lineHeight: '1.5' }}>{item}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <span style={{ fontFamily: PD, fontSize: '24px', fontWeight: '700', color: '#2C1810' }}>{pkg.price}</span>
                      <span style={{ fontFamily: PD, fontSize: '11px', color: '#9B8B7A' }}>one-time</span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, pkg)}
                      style={{
                        width: '100%', padding: '13px',
                        background: justAdded ? '#22C55E' : (pkg.badge === 'Most popular' ? '#F5A623' : '#2C1810'),
                        color: justAdded ? 'white' : (pkg.badge === 'Most popular' ? '#2C1810' : '#FFFEF9'),
                        border: 'none', borderRadius: '100px', fontFamily: PD,
                        fontSize: '13px', fontWeight: '700', letterSpacing: '0.04em',
                        cursor: 'pointer', transition: 'background 0.3s, transform 0.2s',
                        marginBottom: '10px',
                      }}
                      onMouseEnter={e => { if (!justAdded) (e.target as HTMLButtonElement).style.transform = 'scale(1.02)'; }}
                      onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = 'scale(1)'; }}
                    >
                      {justAdded ? '✓ Added to cart!' : `Add to cart — ${pkg.btnLabel}`}
                    </button>

                    <p
                      onClick={(e) => { e.stopPropagation(); router.push(`/services/${pkg.slug}`); }}
                      style={{ textAlign: 'center', fontFamily: PD, fontSize: '11px', color: '#9B8B7A', textDecoration: 'underline', cursor: 'pointer', margin: 0 }}
                    >
                      View full details →
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* scroll hint */}
        <p style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          fontFamily: PD, fontSize: '12px', color: '#9B8B7A', fontStyle: 'italic',
          opacity: progress < 0.05 ? 1 : Math.max(0, 1 - (progress - 0.05) * 20),
          whiteSpace: 'nowrap',
        }}>
          scroll to explore all packages →
        </p>
      </div>

      {/* add-on services */}
<div style={{
  position: 'absolute', bottom: 0, left: 0, right: 0,
  padding: '80px 5vw 100px',
}}>
  {/* background image with fade blends top and bottom */}
  <div style={{
    position: 'absolute', inset: 0,
    backgroundImage: 'url(/images/linen-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.9,
  }}/>
  {/* fade from #FFF8EC at top */}
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
    background: 'linear-gradient(to bottom, #FFF8EC 0%, transparent 100%)',
    zIndex: 1, pointerEvents: 'none',
  }}/>
  {/* fade to #FFF8EC at bottom */}
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
    background: 'linear-gradient(to top, #FFF8EC 0%, transparent 100%)',
    zIndex: 1, pointerEvents: 'none',
  }}/>

  <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <p style={{ fontFamily: PD, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B8B7A', marginBottom: '8px' }}>
        Bolt-on services
      </p>
      <h3 style={{ fontFamily: PD, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em' }}>
        Add-ons to any package
      </h3>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      {ADDONS.map((addon) => {
        const justAdded = added === addon.id;
        return (
          <div
            key={addon.id}
            style={{
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.9)',
              borderRadius: '16px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '8px',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(44,24,16,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
          >
            <p style={{ fontFamily: PD, fontSize: '15px', fontWeight: '700', color: '#2C1810' }}>{addon.name}</p>
            <p style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A', fontStyle: 'italic', flex: 1 }}>{addon.desc}</p>
            <p style={{ fontFamily: PD, fontSize: '18px', fontWeight: '700', color: '#2C1810' }}>{addon.price}</p>
            <button
              onClick={(e) => handleAddToCart(e, addon)}
              style={{
                padding: '10px',
                background: justAdded ? '#22C55E' : 'transparent',
                color: justAdded ? 'white' : '#2C1810',
                border: `1.5px solid ${justAdded ? '#22C55E' : 'rgba(44,24,16,0.2)'}`,
                borderRadius: '100px', fontFamily: PD,
                fontSize: '12px', fontWeight: '700',
                cursor: 'pointer', transition: 'all 0.25s',
              }}
              onMouseEnter={e => { if (!justAdded) { (e.currentTarget as HTMLButtonElement).style.background = '#2C1810'; (e.currentTarget as HTMLButtonElement).style.color = '#FFF8EC'; } }}
              onMouseLeave={e => { if (!justAdded) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#2C1810'; } }}
            >
              {justAdded ? 'Added!' : 'Add to cart'}
            </button>
          </div>
        );
      })}
    </div>
  </div>
</div>

        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: PD, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B8B7A', marginBottom: '8px' }}>
              Bolt-on services
            </p>
            <h3 style={{ fontFamily: PD, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em' }}>
              Add-ons to any package
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {ADDONS.map((addon) => {
              const justAdded = added === addon.id;
              return (
                <div
                  key={addon.id}
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(44,24,16,0.08)',
                    borderRadius: '16px', padding: '20px',
                    display: 'flex', flexDirection: 'column', gap: '8px',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(44,24,16,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
                >
                  <p style={{ fontFamily: PD, fontSize: '15px', fontWeight: '700', color: '#2C1810' }}>{addon.name}</p>
                  <p style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A', fontStyle: 'italic', flex: 1 }}>{addon.desc}</p>
                  <p style={{ fontFamily: PD, fontSize: '18px', fontWeight: '700', color: '#2C1810' }}>{addon.price}</p>
                  <button
                    onClick={(e) => handleAddToCart(e, addon)}
                    style={{
                      padding: '10px',
                      background: justAdded ? '#22C55E' : 'transparent',
                      color: justAdded ? 'white' : '#2C1810',
                      border: `1.5px solid ${justAdded ? '#22C55E' : 'rgba(44,24,16,0.2)'}`,
                      borderRadius: '100px', fontFamily: PD,
                      fontSize: '12px', fontWeight: '700',
                      cursor: 'pointer', transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => { if (!justAdded) { (e.currentTarget as HTMLButtonElement).style.background = '#2C1810'; (e.currentTarget as HTMLButtonElement).style.color = '#FFF8EC'; } }}
                    onMouseLeave={e => { if (!justAdded) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#2C1810'; } }}
                  >
                    {justAdded ? 'Added to cart!' : 'Add to cart'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}