'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';

const PD = "Playfair Display, Georgia, serif";

const PACKAGES = [
  {
    id: 'discovery-call', slug: 'discovery-call', name: 'Discovery Call',
    tagline: 'Not sure where to start? Start here.', price: '₹499', priceNum: 499,
    badge: null, color: '#D6E8F5', image: '/images/pkg-discovery-call.png', emoji: '🔍',
    for: 'Any student, any stage',
    shortDesc: 'A short, honest 1:1 conversation to figure out exactly where you are and what you need.',
    includes: ['20–30 min 1:1 conversation', 'Quick assessment of where you are', 'Verbal direction + recommended next step', 'Honest conversation — no hard sell'],
    btnLabel: 'Save my spot',
  },
  {
    id: 'streamsense', slug: 'streamsense', name: 'StreamSense',
    tagline: "Science, Commerce, or Arts — let's figure it out.", price: '₹1,499', priceNum: 1499,
    badge: null, color: '#E8D5F5', image: '/images/pkg-streamsense.png', emoji: '🎯',
    for: 'Class 9–10 students choosing stream after 10th',
    shortDesc: 'Choosing the right stream after 10th is your first big decision. Make it the right one.',
    includes: ['28-question diagnostic questionnaire', 'Interest and aptitude mapping', '1:1 guidance session (45–60 min)', 'Personalised stream recommendation', 'Written summary document', '1 month WhatsApp support'],
    btnLabel: 'Count me in',
  },
  {
    id: 'core-package', slug: 'core-package', name: 'Core Package',
    tagline: 'The full picture, start to finish.', price: '₹3,499', priceNum: 3499,
    badge: 'Most popular', color: '#F5A623', image: '/images/pkg-core-package.png', emoji: '⭐',
    for: 'Any student confused about direction',
    shortDesc: 'Deep diagnostic + session + written summary. The complete What The Grad experience.',
    includes: ['28-question diagnostic questionnaire', 'Full pattern analysis before session', '1:1 deep-dive session (75 min)', 'Top 2–3 career directions with reasoning', "Elimination of paths that don't fit", 'Written personalised summary (48 hrs)', '1 month WhatsApp support'],
    btnLabel: 'Get started',
  },
  {
    id: 'ug-pathway', slug: 'ug-pathway', name: 'UG Pathway',
    tagline: 'Post-12th college & course guidance.', price: '₹2,999', priceNum: 2999,
    badge: null, color: '#D6F0E8', image: '/images/pkg-ug-pathway.png', emoji: '🎓',
    for: 'Class 12 students and gap year students',
    shortDesc: 'Top 3–5 course and college matches for India and abroad, with a real application plan.',
    includes: ['28-question diagnostic questionnaire', '1:1 guidance session (60–75 min)', 'Top 3–5 course and college matches', 'Basic SOP/resume direction', 'Application timeline guidance', 'Written summary document'],
    btnLabel: 'Find my path',
  },
  {
    id: 'gradglow', slug: 'gradglow', name: 'GradGlow',
    tagline: 'UG to PG transition — done right.', price: '₹7,999', priceNum: 7999,
    badge: null, color: '#FFF3D6', image: '/images/pkg-gradglow.png', emoji: '✨',
    for: "Undergrads deciding between master's, job, or career switch",
    shortDesc: "MS vs MBA vs job — mapped out clearly with a written roadmap you can actually follow.",
    includes: ['1:1 career mapping session', 'MS vs MBA vs job pathway analysis', 'Course and university shortlisting', 'CV/resume feedback', 'SOP structure and review support', 'Written roadmap document'],
    btnLabel: 'Glow up',
  },
  {
    id: 'total-admit', slug: 'total-admit', name: 'Total Admit',
    tagline: 'Full application support, start to submission.', price: '₹13,999', priceNum: 13999,
    badge: 'Premium', color: '#2C1810', image: '/images/pkg-total-admit.png', emoji: '🏆',
    for: "Students applying to master's or competitive UG programs",
    shortDesc: "Everything from university selection to final review — we're with you the whole way.",
    includes: ['University selection (3–5 programs)', 'SOP writing support — brainstorm + 2 rounds of editing', 'CV formatting and editing', 'LOR strategy and template', 'Application calendar and checklist', 'WhatsApp/email support for 1 month', 'Final review before submission'],
    btnLabel: 'Get me in',
  },
];

const ADDONS = [
  { id: 'sop-edit',       name: 'Express SOP Edit',        desc: '48 hr turnaround',       price: '₹1,499' },
  { id: 'cv-revamp',      name: 'CV / Resume Revamp',      desc: 'Full formatting + edit',  price: '₹699'   },
  { id: 'linkedin',       name: 'LinkedIn Profile Setup',  desc: 'Bio, headline, summary',  price: '₹499'   },
  { id: 'mock-interview', name: 'Mock Interview',          desc: '30 min session',          price: '₹999'   },
  { id: 'parent-call',    name: 'Parent Counselling Call', desc: 'Align the family',        price: '₹399'   },
  { id: 'extra-sop',      name: 'Extra University SOP',    desc: 'Per university',          price: '₹999'   },
  { id: 'visa-qa',        name: 'Visa & Scholarship Q&A',  desc: '30 min session',          price: '₹699'   },
];

function PackageImageBand({ pkg, height }: { pkg: typeof PACKAGES[0]; height: number }) {
  return (
    <div style={{ height, flexShrink: 0, position: 'relative', overflow: 'hidden', background: pkg.color }}>
      <img
        src={pkg.image} alt={pkg.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: height > 150 ? '52px' : '40px', pointerEvents: 'none' }}>
        {pkg.emoji}
      </span>
    </div>
  );
}

// ── STAMP SHAPE ──────────────────────────────────────────────────────────────
function StampBox({ addon, justAdded, onAdd, visible, delay }: {
  addon: typeof ADDONS[0];
  justAdded: boolean;
  onAdd: (e: React.MouseEvent) => void;
  visible: boolean;
  delay: number;
}) {
  const TOOTH = 10;   // tooth radius
  const TEETH = 9;    // teeth per side (approx)
  const W = 220;
  const H = 260;

  // build perforated border using radial-gradient repeating pattern
  // We'll simulate stamp edge with CSS outline + border-radius tricks
  // Using a clip-path polygon isn't great for round teeth, so we use
  // a box with repeated radial-gradient mask instead
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) rotate(0deg)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: W,
          height: H,
          position: 'relative',
          // stamp perforated edge via CSS mask
          background: 'white',
          boxShadow: '0 6px 28px rgba(44,24,16,0.14)',
          // stamp teeth using repeating radial-gradient mask
          maskImage: `
            radial-gradient(circle at 50% 0%, transparent ${TOOTH}px, white ${TOOTH}px) top / ${100/TEETH}% 100%,
            radial-gradient(circle at 50% 100%, transparent ${TOOTH}px, white ${TOOTH}px) bottom / ${100/TEETH}% 100%,
            radial-gradient(circle at 0% 50%, transparent ${TOOTH}px, white ${TOOTH}px) left / 100% ${100/TEETH}%,
            radial-gradient(circle at 100% 50%, transparent ${TOOTH}px, white ${TOOTH}px) right / 100% ${100/TEETH}%
          `,
          maskRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
          WebkitMaskImage: `
            radial-gradient(circle at 50% 0%, transparent ${TOOTH}px, white ${TOOTH}px) top / ${100/TEETH}% 100%,
            radial-gradient(circle at 50% 100%, transparent ${TOOTH}px, white ${TOOTH}px) bottom / ${100/TEETH}% 100%,
            radial-gradient(circle at 0% 50%, transparent ${TOOTH}px, white ${TOOTH}px) left / 100% ${100/TEETH}%,
            radial-gradient(circle at 100% 50%, transparent ${TOOTH}px, white ${TOOTH}px) right / 100% ${100/TEETH}%
          `,
          WebkitMaskRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 18px 18px',
        }}
      >
        {/* inner border line like a real stamp */}
        <div style={{
          position: 'absolute',
          inset: '14px',
          border: '1px solid rgba(44,24,16,0.12)',
          borderRadius: '2px',
          pointerEvents: 'none',
        }}/>

        {/* content */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
          <p style={{ fontFamily: PD, fontSize: '15px', fontWeight: '700', color: '#2C1810', lineHeight: '1.3' }}>{addon.name}</p>
          <p style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A', fontStyle: 'italic' }}>{addon.desc}</p>
          <p style={{ fontFamily: PD, fontSize: '22px', fontWeight: '700', color: '#2C1810', margin: '4px 0' }}>{addon.price}</p>
        </div>

        {/* add to cart */}
        <button
          onClick={onAdd}
          style={{
            position: 'relative', zIndex: 1,
            width: '100%', padding: '10px',
            background: justAdded ? '#22C55E' : 'transparent',
            color: justAdded ? 'white' : '#2C1810',
            border: `1.5px solid ${justAdded ? '#22C55E' : 'rgba(44,24,16,0.25)'}`,
            borderRadius: '100px', fontFamily: PD,
            fontSize: '12px', fontWeight: '700', cursor: 'pointer',
            transition: 'all 0.25s',
          }}
          onMouseEnter={e => {
            if (!justAdded) {
              (e.currentTarget).style.background = '#2C1810';
              (e.currentTarget).style.color = '#FFF8EC';
              (e.currentTarget).style.borderColor = '#2C1810';
            }
          }}
          onMouseLeave={e => {
            if (!justAdded) {
              (e.currentTarget).style.background = 'transparent';
              (e.currentTarget).style.color = '#2C1810';
              (e.currentTarget).style.borderColor = 'rgba(44,24,16,0.25)';
            }
          }}
        >
          {justAdded ? '✓ Added!' : '+ Add to cart'}
        </button>
      </div>
    </div>
  );
}

// ── ADDONS SECTION ───────────────────────────────────────────────────────────
function AddonsSection({ added, handleAddToCart }: {
  added: string | null;
  handleAddToCart: (e: React.MouseEvent, item: { id: string; name: string; price: string }) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', padding: '100px 5vw 120px', overflow: 'hidden' }}>

      {/* gingham bg */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/gingham-bg.jpg)', backgroundSize: '300px', backgroundRepeat: 'repeat', opacity: 0.45, zIndex: 0 }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.38)', zIndex: 0 }}/>

      {/* fade from above — matches #FFF8EC */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(to bottom, #FFF8EC 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }}/>
      {/* fade to below — matches next section bg */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(to top, #FFF8EC 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }}/>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>

        {/* header — centred */}
        <div style={{
          textAlign: 'center', marginBottom: '60px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <p style={{ fontFamily: PD, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B8B7A', marginBottom: '8px' }}>
            Bolt-on services
          </p>
          <h3 style={{ fontFamily: PD, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Add-ons to any package
          </h3>
          <p style={{ fontFamily: PD, fontSize: '15px', fontStyle: 'italic', color: '#9B8B7A' }}>
            Stack these onto any session for extra support
          </p>
        </div>

        {/* stamps — centred flex wrap */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          {ADDONS.map((addon, i) => (
            <StampBox
              key={addon.id}
              addon={addon}
              justAdded={added === addon.id}
              onAdd={(e) => handleAddToCart(e, addon)}
              visible={visible}
              delay={0.08 + i * 0.08}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ServicesSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const router      = useRouter();
  const { addItem } = useCart();

  const [progress, setProgress]     = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [added, setAdded]           = useState<string | null>(null);
  const [isMobile, setIsMobile]     = useState(false);

  const isDragging      = useRef(false);
  const dragStartX      = useRef(0);
  const dragStartOffset = useRef(0);
  const [manualOffset, setManualOffset] = useState(0);

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

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = manualOffset;
    e.preventDefault();
  }, [manualOffset]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    setManualOffset(Math.max(-300, Math.min(300, dragStartOffset.current + dx * 0.4)));
  }, []);

  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartOffset.current = manualOffset;
  }, [manualOffset]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - dragStartX.current;
    setManualOffset(Math.max(-300, Math.min(300, dragStartOffset.current + dx * 0.4)));
  }, []);

  const onTouchEnd = useCallback(() => { isDragging.current = false; }, []);

  const handleAddToCart = (e: React.MouseEvent, item: { id: string; name: string; price: string }) => {
    e.stopPropagation();
    addItem({ id: item.id, name: item.name, price: item.price });
    setAdded(item.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const baseTranslate  = 45 - progress * 90;
  const trackTranslate = isMobile ? manualOffset : baseTranslate + manualOffset * 0.3;

  // ── MOBILE ────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section id="services" ref={sectionRef} style={{ background: 'linear-gradient(180deg, #D6E8F5 0%, #FFF8EC 15%, #FFF8EC 100%)', padding: '56px 5vw 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ fontFamily: PD, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B8B7A', marginBottom: '8px' }}>What we offer</p>
          <h2 style={{ fontFamily: PD, fontSize: 'clamp(24px, 7vw, 36px)', fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em' }}>Find your package</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {PACKAGES.map((pkg) => {
            const justAdded = added === pkg.id;
            return (
              <div key={pkg.id} style={{ background: '#FFFEF9', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(44,24,16,0.08)', border: pkg.badge ? '2px solid #F5A623' : '1.5px solid rgba(44,24,16,0.07)', position: 'relative' }}>
                {pkg.badge && <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#F5A623', color: '#2C1810', fontFamily: PD, fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px', zIndex: 2 }}>★ {pkg.badge}</div>}
                <PackageImageBand pkg={pkg} height={180} />
                <div style={{ padding: '20px 20px 24px' }}>
                  <h3 style={{ fontFamily: PD, fontSize: '20px', fontWeight: '700', color: '#2C1810', marginBottom: '4px' }}>{pkg.name}</h3>
                  <p style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A', fontStyle: 'italic', marginBottom: '8px' }}>{pkg.tagline}</p>
                  <p style={{ fontFamily: PD, fontSize: '13px', color: '#5C4A3A', lineHeight: '1.6', marginBottom: '14px' }}>{pkg.shortDesc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontFamily: PD, fontSize: '24px', fontWeight: '700', color: '#2C1810' }}>{pkg.price}</span>
                    <span style={{ fontFamily: PD, fontSize: '11px', color: '#9B8B7A' }}>one-time</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={(e) => handleAddToCart(e, pkg)} style={{ flex: 1, padding: '12px', background: justAdded ? '#22C55E' : (pkg.badge === 'Most popular' ? '#F5A623' : '#2C1810'), color: justAdded ? 'white' : (pkg.badge === 'Most popular' ? '#2C1810' : '#FFFEF9'), border: 'none', borderRadius: '100px', fontFamily: PD, fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.3s' }}>
                      {justAdded ? 'Added!' : 'Add to cart'}
                    </button>
                    <button onClick={() => router.push(`/services/${pkg.slug}`)} style={{ flex: 1, padding: '12px', background: 'transparent', color: '#2C1810', border: '1.5px solid rgba(44,24,16,0.2)', borderRadius: '100px', fontFamily: PD, fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                      View details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <AddonsSection added={added} handleAddToCart={handleAddToCart} />
      </section>
    );
  }

  // ── DESKTOP ───────────────────────────────────────────────────────────────
  return (
    <div id="services">
      <section ref={sectionRef} style={{ height: '500vh', position: 'relative', background: 'linear-gradient(180deg, #D6E8F5 0%, #FFF8EC 20%, #FFF8EC 100%)' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

          <div style={{ position: 'absolute', top: '48px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', opacity: Math.min(1, progress * 5), whiteSpace: 'nowrap' }}>
            <p style={{ fontFamily: PD, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B8B7A', marginBottom: '8px' }}>What we offer</p>
            <h2 style={{ fontFamily: PD, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em' }}>Find your package</h2>
          </div>

          <div style={{ position: 'absolute', top: '130px', left: '50%', transform: 'translateX(-50%)', opacity: Math.min(1, progress * 8) * 0.6, whiteSpace: 'nowrap' }}>
            <p style={{ fontFamily: PD, fontSize: '11px', color: '#9B8B7A', fontStyle: 'italic' }}>scroll or drag to browse →</p>
          </div>

          <div
            ref={trackRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              display: 'flex', gap: '28px', alignItems: 'stretch',
              transform: `translateX(${trackTranslate}%)`,
              transition: isDragging.current ? 'none' : 'transform 0.05s linear',
              willChange: 'transform',
              padding: '0 8vw', marginTop: '70px',
              cursor: isDragging.current ? 'grabbing' : 'grab',
              userSelect: 'none',
            }}
          >
            {PACKAGES.map((pkg, i) => {
              const cardProgress = Math.max(0, Math.min(1, (progress - i * 0.03) * 4));
              const isHovered    = activeCard === i;
              const justAdded    = added === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                  onClick={() => { if (!isDragging.current) router.push(`/services/${pkg.slug}`); }}
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
                    <div style={{ position: 'absolute', top: '14px', left: '14px', background: '#F5A623', color: '#2C1810', fontFamily: PD, fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px', zIndex: 2 }}>★ {pkg.badge}</div>
                  )}

                  <PackageImageBand pkg={pkg} height={200} />

                  <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontFamily: PD, fontSize: '20px', fontWeight: '700', color: '#2C1810', marginBottom: '4px' }}>{pkg.name}</h3>
                    <p style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A', fontStyle: 'italic', marginBottom: '6px' }}>{pkg.tagline}</p>
                    <p style={{ fontFamily: PD, fontSize: '11px', color: '#B0A090', marginBottom: '10px' }}>For: {pkg.for}</p>
                    <p style={{ fontFamily: PD, fontSize: '13px', color: '#5C4A3A', lineHeight: '1.6', marginBottom: '14px' }}>{pkg.shortDesc}</p>

                    <div style={{ maxHeight: isHovered ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease', marginBottom: isHovered ? '14px' : '0' }}>
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
                        style={{ width: '100%', padding: '13px', background: justAdded ? '#22C55E' : (pkg.badge === 'Most popular' ? '#F5A623' : '#2C1810'), color: justAdded ? 'white' : (pkg.badge === 'Most popular' ? '#2C1810' : '#FFFEF9'), border: 'none', borderRadius: '100px', fontFamily: PD, fontSize: '13px', fontWeight: '700', letterSpacing: '0.04em', cursor: 'pointer', transition: 'background 0.3s, transform 0.2s', marginBottom: '10px' }}
                        onMouseEnter={e => { if (!justAdded) (e.target as HTMLButtonElement).style.transform = 'scale(1.02)'; }}
                        onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = 'scale(1)'; }}
                      >
                        {justAdded ? 'Added to cart!' : `Add to cart — ${pkg.btnLabel}`}
                      </button>
                      <p
                        onClick={(e) => { e.stopPropagation(); router.push(`/services/${pkg.slug}`); }}
                        style={{ textAlign: 'center', fontFamily: PD, fontSize: '11px', color: '#9B8B7A', textDecoration: 'underline', cursor: 'pointer', margin: 0 }}
                      >
                        View full details
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', fontFamily: PD, fontSize: '12px', color: '#9B8B7A', fontStyle: 'italic', opacity: progress < 0.05 ? 1 : Math.max(0, 1 - (progress - 0.05) * 20), whiteSpace: 'nowrap' }}>
            scroll to explore all packages →
          </p>
        </div>
      </section>

      <AddonsSection added={added} handleAddToCart={handleAddToCart} />
    </div>
  );
}
