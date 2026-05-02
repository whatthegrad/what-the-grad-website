'use client';

import { useEffect, useRef, useState } from 'react';

const PD = "Playfair Display, Georgia, serif";

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        /* transparent at top so yellow from above bleeds through,
           fades into site blue #D6E8F5 by 18% down */
        background: 'linear-gradient(to bottom, transparent 0%, #D6E8F5 18%)',
        padding: '0 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* label + heading — sits in the blue area */}
      <div style={{
        textAlign: 'center',
        padding: '64px 5vw 40px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <p style={{
          fontFamily: PD,
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#7A9BB5',
          marginBottom: '10px',
        }}>
          See it in action
        </p>
        <h2 style={{
          fontFamily: PD,
          fontSize: 'clamp(26px, 3.5vw, 46px)',
          fontWeight: '700',
          color: '#2C1810',
          letterSpacing: '-0.02em',
        }}>
          Why we do what we do.
        </h2>
      </div>

      {/* full width cinematic video — edge to edge */}
      <div style={{
        width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.97)',
        transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
      }}>
        <div style={{
          position: 'relative',
          paddingBottom: '52%',
          width: '100%',
          overflow: 'hidden',
          background: '#1C120A',
        }}>

          {/* ── PLACEHOLDER — delete this entire div when you have a real video ── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, #4A2818 0%, #2C1810 50%, #1A0E08 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}>
            {/* amber play button */}
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: '#F5A623',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 48px rgba(245,166,35,0.25)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 72px rgba(245,166,35,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 48px rgba(245,166,35,0.25)';
              }}
            >
              <div style={{
                width: 0, height: 0,
                borderTop: '15px solid transparent',
                borderBottom: '15px solid transparent',
                borderLeft: '24px solid #2C1810',
                marginLeft: '5px',
              }}/>
            </div>
            <p style={{
              fontFamily: PD,
              fontSize: '14px',
              fontStyle: 'italic',
              color: 'rgba(255,248,236,0.35)',
              letterSpacing: '0.04em',
            }}>
              Video coming soon ✦
            </p>
          </div>

          {/*
            ── SWAP INSTRUCTIONS ──
            Delete the placeholder <div> above and replace with ONE of these:

            ① YouTube embed:
            <iframe
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1"
              title="What The Grad session"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            ② Self-hosted mp4:
            <video
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
              src="/videos/session.mp4"
              poster="/images/video-thumb.jpg"
              controls
              playsInline
            />
          */}
        </div>
      </div>
    </section>
  );
}