'use client';
import { useEffect, useRef, useState } from 'react';

const PD = "Playfair Display, Georgia, serif";

const TESTIMONIALS = [
  { id:1, name:'Aarav Mehta',   details:'Class 12 → BDes, NID',         text:'[Placeholder — what Aarav says about his experience with What The Grad. How the session changed how he thought about his future.]',           side:'left'  },
  { id:2, name:'Priya Nair',    details:'Class 10 → Stream Selection',   text:'[Placeholder — Priya talks about how confused she was before the session and how clear things felt after.]',                               side:'right' },
  { id:3, name:'Rohan Desai',   details:'Postgrad → Career Pivot',       text:'[Placeholder — Rohan shares what it meant to have someone actually listen and give him honest direction.]',                                side:'left'  },
  { id:4, name:'Ananya Singh',  details:'Class 11 → College Shortlisting',text:'[Placeholder — Ananya describes the moment things clicked and she finally felt confident about her path.]',                               side:'right' },
];

function TestimonialCard({ t, index, isMobile }: { t: typeof TESTIMONIALS[0]; index: number; isMobile: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const fromLeft = t.side === 'left';
  const delay    = isMobile ? 0 : (index % 2) * 0.15;

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateX(0) scale(1)'
          : `translateX(${fromLeft ? '-40px' : '40px'}) scale(0.97)`,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.34, 1.3, 0.64, 1) ${delay}s`,
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(8px)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(44,24,16,0.1)',
        border: '1px solid rgba(255,255,255,0.8)',
      }}
    >
      {/* Video — taller on mobile */}
      <div style={{
        width: '100%',
        aspectRatio: isMobile ? '4/3' : '16/9',
        background: 'linear-gradient(135deg, #2C1810 0%, #5C3A28 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '12px', position: 'relative',
      }}>
        <div
          style={{
            width: isMobile ? '64px' : '56px',
            height: isMobile ? '64px' : '56px',
            borderRadius: '50%',
            background: 'rgba(245,166,35,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{
            width:0, height:0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderLeft: '16px solid #2C1810',
            marginLeft: '3px',
          }}/>
        </div>
        <p style={{ fontFamily:PD, fontSize:'12px', fontStyle:'italic', color:'rgba(255,248,236,0.5)' }}>
          Student video ✦
        </p>
      </div>

      {/* Text */}
      <div style={{ padding: isMobile ? '18px 18px 20px' : '24px 28px 28px' }}>
        <p style={{
          fontFamily:PD, fontSize: isMobile ? '13px' : '14px',
          fontStyle:'italic', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'16px',
        }}>
          &ldquo;{t.text}&rdquo;
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{
            width:'38px', height:'38px', borderRadius:'50%',
            background:'linear-gradient(135deg, #D6E8F5, #E8D5F5)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:PD, fontSize:'15px', fontWeight:'700', color:'#2C1810', flexShrink:0,
          }}>
            {t.name[0]}
          </div>
          <div>
            <p style={{ fontFamily:PD, fontSize: isMobile ? '13px' : '15px', fontWeight:'700', color:'#2C1810' }}>{t.name}</p>
            <p style={{ fontFamily:PD, fontSize:'12px', color:'#9B8B7A', fontStyle:'italic' }}>{t.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section style={{ position:'relative', padding: isMobile ? '56px 5vw 72px' : '80px 5vw 100px', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/yellow-texture.jpg)', backgroundSize:'cover', backgroundPosition:'center', zIndex:0 }}/>
      <div style={{ position:'absolute', inset:0, background:'rgba(255,248,200,0.55)', zIndex:0 }}/>

      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ textAlign:'center', marginBottom: isMobile ? '36px' : '64px' }}>
          <p style={{ fontFamily:PD, fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#9B8B7A', marginBottom:'10px' }}>
            Real students. Real clarity.
          </p>
          <h2 style={{ fontFamily:PD, fontSize:'clamp(24px, 3.5vw, 48px)', fontWeight:'700', color:'#2C1810', letterSpacing:'-0.02em' }}>
            What they said after
          </h2>
        </div>

        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          {isMobile ? (
            // single column on mobile
            <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={t.id} t={t} index={i} isMobile={isMobile}/>
              ))}
            </div>
          ) : (
            // two columns on desktop
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px' }}>
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={t.id} t={t} index={i} isMobile={isMobile}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
