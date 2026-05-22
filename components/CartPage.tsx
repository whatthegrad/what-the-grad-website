'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartContext';

const PD = "Playfair Display, Georgia, serif";

function PrinterSound() {
  const ctx = useRef<AudioContext | null>(null);

  const play = () => {
    try {
      if (!ctx.current) {
        ctx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const audioCtx = ctx.current;

      // Create a mechanical printer sound using noise bursts
      const duration = 0.08;
      const bufferSize = audioCtx.sampleRate * duration;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * 0.3;
      }

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 800;
      filter.Q.value = 0.5;

      source.connect(filter);
      filter.connect(audioCtx.destination);
      source.start();
    } catch (e) {
      // Audio not supported — silent fallback
    }
  };

  return { play };
}

export default function CartPage() {
  const router = useRouter();
  const { items, totalItems, clearCart } = useCart();
  const [printedLines, setPrintedLines] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [printing, setPrinting] = useState(false);
  const printerSound = useRef<{ play: () => void } | null>(null);

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  const totalPrice = items.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + num * item.quantity;
  }, 0);

  // Build receipt lines
  const receiptLines = [
    { type: 'logo',      content: 'WHAT THE GRAD',         delay: 200  },
    { type: 'sub',       content: 'Your wise older sibling', delay: 400 },
    { type: 'divider',   content: '',                       delay: 600  },
    { type: 'row',       content: `Date     :  ${today}`,  delay: 800  },
    { type: 'row',       content: 'From     :  Sakshi & Nupoor', delay: 1000 },
    { type: 'row',       content: 'To       :  You :)',    delay: 1200 },
    { type: 'divider',   content: '',                       delay: 1400 },
    { type: 'header',    content: 'ORDER SUMMARY',          delay: 1600 },
    { type: 'divider',   content: '',                       delay: 1700 },
    ...items.flatMap((item, i) => [
      { type: 'item', content: `${item.name}`, delay: 1800 + i * 200 },
      { type: 'price', content: `${item.price} x ${item.quantity}`, delay: 1900 + i * 200 },
    ]),
    { type: 'divider',   content: '',                       delay: 1800 + items.length * 200 },
    { type: 'total',     content: `TOTAL    :  \u20B9${totalPrice.toLocaleString('en-IN')}`, delay: 2000 + items.length * 200 },
    { type: 'row',       content: 'Confusion tax :  \u20B90.00', delay: 2200 + items.length * 200 },
    { type: 'divider',   content: '',                       delay: 2400 + items.length * 200 },
    { type: 'row',       content: 'Next steps:',            delay: 2600 + items.length * 200 },
    { type: 'step',      content: '\u2192 Scan QR to pay', delay: 2800 + items.length * 200 },
    { type: 'step',      content: '\u2192 Check email for booking link', delay: 3000 + items.length * 200 },
    { type: 'step',      content: '\u2192 Show up. We handle the rest.', delay: 3200 + items.length * 200 },
    { type: 'divider',   content: '',                       delay: 3400 + items.length * 200 },
    { type: 'thanks',    content: 'Thank you \u2726',       delay: 3600 + items.length * 200 },
    { type: 'sub',       content: 'Your future just got clearer.', delay: 3800 + items.length * 200 },
    { type: 'qr',        content: '',                       delay: 4000 + items.length * 200 },
  ];

  // Start printing animation on mount
  useEffect(() => {
    if (items.length === 0) return;
    printerSound.current = PrinterSound();
    setPrinting(true);

    receiptLines.forEach((line, index) => {
      setTimeout(() => {
        setPrintedLines(prev => prev + 1);
        if (printerSound.current && line.type !== 'divider') {
          printerSound.current.play();
        }
        if (line.type === 'qr') {
          setTimeout(() => setShowQR(true), 200);
        }
      }, line.delay);
    });
  }, []);

  const receiptHeight = Math.min(printedLines * 28, receiptLines.length * 28);

  if (items.length === 0 && !confirmed) {
    return (
      <div style={{ minHeight: '100vh', background: '#FFF8EC', fontFamily: PD }}>
        <Nav />
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 5vw', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎓</div>
          <h1 style={{ fontFamily: PD, fontSize: '36px', fontWeight: '700', color: '#2C1810', marginBottom: '16px' }}>
            Your cart is empty
          </h1>
          <p style={{ fontFamily: PD, fontSize: '16px', fontStyle: 'italic', color: '#9B8B7A', marginBottom: '40px' }}>
            Your future does not have to be.
          </p>
          <button onClick={() => router.push('/#services')} style={{
            padding: '14px 40px', background: '#F5A623', color: '#2C1810',
            border: 'none', borderRadius: '100px', fontFamily: PD,
            fontSize: '15px', fontWeight: '700', cursor: 'pointer',
          }}>
            View our packages
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8EC', fontFamily: PD }}>
      <Nav />

      <div style={{
        maxWidth: '520px', margin: '0 auto',
        padding: '40px 5vw 80px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* Printer machine */}
        <div style={{
          width: '280px',
          background: 'linear-gradient(180deg, #3A3A3A 0%, #2A2A2A 100%)',
          borderRadius: '16px 16px 8px 8px',
          padding: '20px 24px 0',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          position: 'relative',
          marginBottom: '0',
        }}>
          {/* Printer top panel */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <div style={{
              fontFamily: PD, fontSize: '11px', fontWeight: '700',
              color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em',
            }}>
              WHAT THE GRAD
            </div>
            {/* Status light */}
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: printing ? '#22C55E' : '#9B8B7A',
              boxShadow: printing ? '0 0 8px #22C55E' : 'none',
              animation: printing && !showQR ? 'blink 0.8s ease-in-out infinite' : 'none',
            }} />
          </div>

          {/* Paper slot */}
          <div style={{
            background: '#1A1A1A',
            borderRadius: '4px 4px 0 0',
            height: '12px',
            marginBottom: '0',
          }} />
        </div>

        {/* Receipt paper coming out */}
        <div style={{
          width: '260px',
          background: 'white',
          boxShadow: '2px 4px 20px rgba(0,0,0,0.15)',
          position: 'relative',
          overflow: 'hidden',
          // Jagged bottom edge using clip path
          clipPath: confirmed
            ? 'none'
            : `polygon(0 0, 100% 0, 100% calc(100% - 8px), 97% 100%, 94% calc(100% - 6px), 91% 100%, 88% calc(100% - 6px), 85% 100%, 82% calc(100% - 6px), 79% 100%, 76% calc(100% - 6px), 73% 100%, 70% calc(100% - 6px), 67% 100%, 64% calc(100% - 6px), 61% 100%, 58% calc(100% - 6px), 55% 100%, 52% calc(100% - 6px), 49% 100%, 46% calc(100% - 6px), 43% 100%, 40% calc(100% - 6px), 37% 100%, 34% calc(100% - 6px), 31% 100%, 28% calc(100% - 6px), 25% 100%, 22% calc(100% - 6px), 19% 100%, 16% calc(100% - 6px), 13% 100%, 10% calc(100% - 6px), 7% 100%, 4% calc(100% - 6px), 1% 100%, 0 calc(100% - 8px))`,
          minHeight: `${receiptHeight}px`,
          transition: 'min-height 0.15s linear',
        }}>
          <div style={{ padding: '20px 20px 32px', fontFamily: "'Courier New', monospace" }}>

            {receiptLines.slice(0, printedLines).map((line, i) => {
              if (line.type === 'logo') return (
                <div key={i} style={{ textAlign: 'center', fontSize: '16px', fontWeight: '900', color: '#2C1810', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  {line.content}
                </div>
              );
              if (line.type === 'sub') return (
                <div key={i} style={{ textAlign: 'center', fontSize: '10px', color: '#9B8B7A', marginBottom: '4px', fontStyle: 'italic' }}>
                  {line.content}
                </div>
              );
              if (line.type === 'divider') return (
                <div key={i} style={{ borderTop: '1px dashed #DDD', margin: '8px 0' }} />
              );
              if (line.type === 'header') return (
                <div key={i} style={{ textAlign: 'center', fontSize: '11px', fontWeight: '700', color: '#2C1810', letterSpacing: '0.15em', marginBottom: '4px' }}>
                  {line.content}
                </div>
              );
              if (line.type === 'item') return (
                <div key={i} style={{ fontSize: '11px', color: '#2C1810', fontWeight: '700', marginBottom: '2px' }}>
                  {line.content}
                </div>
              );
              if (line.type === 'price') return (
                <div key={i} style={{ fontSize: '11px', color: '#5C4A3A', textAlign: 'right', marginBottom: '8px' }}>
                  {line.content}
                </div>
              );
              if (line.type === 'total') return (
                <div key={i} style={{ fontSize: '13px', fontWeight: '900', color: '#2C1810', marginBottom: '4px' }}>
                  {line.content}
                </div>
              );
              if (line.type === 'step') return (
                <div key={i} style={{ fontSize: '10px', color: '#5C4A3A', marginBottom: '3px', paddingLeft: '8px' }}>
                  {line.content}
                </div>
              );
              if (line.type === 'thanks') return (
                <div key={i} style={{ textAlign: 'center', fontSize: '15px', fontWeight: '900', color: '#2C1810', margin: '8px 0 4px', letterSpacing: '0.05em' }}>
                  {line.content}
                </div>
              );
              if (line.type === 'qr') return (
                <div key={i} style={{ textAlign: 'center', marginTop: '12px' }}>
                  {showQR ? (
                    <>
                      {/* QR placeholder — swap with your real QR image */}
                      <div style={{
                        width: '140px', height: '140px',
                        margin: '0 auto 8px',
                        background: '#F5F5F5',
                        border: '2px solid #2C1810',
                        borderRadius: '8px',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        gap: '8px',
                      }}>
                        {/* SWAP THIS with: <img src="/images/upi-qr.png" style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:'6px'}}/> */}
                        <div style={{ fontSize: '32px' }}>📱</div>
                        <div style={{ fontSize: '9px', color: '#9B8B7A', textAlign: 'center', lineHeight: '1.4' }}>
                          Your UPI QR<br />goes here
                        </div>
                      </div>
                      <div style={{ fontSize: '10px', color: '#9B8B7A', marginBottom: '4px' }}>
                        Scan to pay via UPI
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#2C1810', marginBottom: '12px' }}>
                        whatthegrad@upi
                        {/* SWAP with your real UPI ID */}
                      </div>

                      {confirmed ? (
                        <div style={{
                          border: '3px solid #22C55E', borderRadius: '8px',
                          padding: '8px', color: '#22C55E', fontWeight: '900',
                          fontSize: '14px', letterSpacing: '0.1em',
                          animation: 'stamp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}>
                          CONFIRMED ✦
                        </div>
                      ) : (
                        <button
                          onClick={() => { setConfirmed(true); clearCart(); }}
                          style={{
                            padding: '10px 24px',
                            background: '#2C1810', color: '#FFF8EC',
                            border: 'none', borderRadius: '100px',
                            fontFamily: PD, fontSize: '13px', fontWeight: '700',
                            cursor: 'pointer', width: '100%',
                          }}
                        >
                          I have paid ✓
                        </button>
                      )}
                    </>
                  ) : null}
                </div>
              );
              return (
                <div key={i} style={{ fontSize: '11px', color: '#5C4A3A', marginBottom: '3px' }}>
                  {line.content}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes stamp {
          0% { transform: scale(2); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}