'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartContext';

const PD = "Playfair Display, Georgia, serif";
const MONO = "'Courier New', Courier, monospace";

function playPrinterClick() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * 0.25;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 900;
    filter.Q.value = 0.6;
    source.connect(filter);
    filter.connect(ctx.destination);
    source.start();
    setTimeout(() => ctx.close(), 200);
  } catch (e) {}
}

export default function CartPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [visibleLines, setVisibleLines] = useState(0);
  const [receiptHeight, setReceiptHeight] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [printingDone, setPrintingDone] = useState(false);
  const [started, setStarted] = useState(false);
  const lineRefs = useRef<HTMLDivElement[]>([]);

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const totalPrice = items.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + (isNaN(num) ? 0 : num * item.quantity);
  }, 0);

  type LineType = 'logo' | 'sub' | 'divider' | 'header' | 'item' | 'price' | 'total' | 'row' | 'step' | 'thanks' | 'qr';

  interface Line {
    type: LineType;
    content: string;
  }

  const lines: Line[] = [
    { type: 'logo',    content: 'WHAT THE GRAD' },
    { type: 'sub',     content: 'Your wise older sibling' },
    { type: 'divider', content: '' },
    { type: 'row',     content: `Date     :  ${today}` },
    { type: 'row',     content: 'From     :  Sakshi & Nupoor' },
    { type: 'row',     content: 'To       :  You :)' },
    { type: 'divider', content: '' },
    { type: 'header',  content: 'ORDER SUMMARY' },
    { type: 'divider', content: '' },
    ...items.flatMap(item => ([
      { type: 'item' as LineType,  content: item.name },
      { type: 'price' as LineType, content: `${item.price} x ${item.quantity}` },
    ])),
    { type: 'divider', content: '' },
    { type: 'total',   content: `TOTAL    :  \u20B9${totalPrice.toLocaleString('en-IN')}` },
    { type: 'row',     content: 'Confusion tax  :  \u20B90.00' },
    { type: 'divider', content: '' },
    { type: 'row',     content: 'Next steps:' },
    { type: 'step',    content: '\u2192 Scan QR below to pay' },
    { type: 'step',    content: '\u2192 Check email for booking link' },
    { type: 'step',    content: '\u2192 Show up. We handle the rest.' },
    { type: 'divider', content: '' },
    { type: 'thanks',  content: 'Thank you \u2726' },
    { type: 'sub',     content: 'Your future just got clearer.' },
    { type: 'divider', content: '' },
    { type: 'qr',      content: '' },
  ];

  // Start printing after 600ms delay
  useEffect(() => {
    if (items.length === 0) return;
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, 600);
    return () => clearTimeout(startTimer);
  }, []);

  // Print lines one by one
  useEffect(() => {
    if (!started) return;
    if (visibleLines >= lines.length) {
      setTimeout(() => {
        setShowQR(true);
        setPrintingDone(true);
      }, 300);
      return;
    }

    const lineType = lines[visibleLines]?.type;
    const delay = lineType === 'divider' ? 120 : lineType === 'logo' ? 300 : lineType === 'thanks' ? 250 : 180;

    const timer = setTimeout(() => {
      playPrinterClick();
      setVisibleLines(v => v + 1);
      // Grow receipt height
      const lineHeight = lineType === 'divider' ? 20 : lineType === 'logo' ? 36 : lineType === 'qr' ? 200 : 22;
      setReceiptHeight(h => h + lineHeight);
    }, delay);

    return () => clearTimeout(timer);
  }, [started, visibleLines]);

  // Empty cart
  if (items.length === 0 && !confirmed) {
    return (
      <div style={{ minHeight: '100vh', background: '#FFF8EC', fontFamily: PD }}>
        <Nav />
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '80px 5vw', textAlign: 'center' }}>
          <div style={{ fontSize: '72px', marginBottom: '24px' }}>🎓</div>
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
    <div style={{ minHeight: '100vh', fontFamily: PD, position: 'relative', overflow: 'hidden' }}>

      {/* Blurred background — clears when printing done */}
      <div style={{
        position: 'fixed', inset: 0,
        background: '#FFF8EC',
        filter: printingDone ? 'blur(0px)' : 'blur(6px)',
        transition: 'filter 1s ease',
        zIndex: 0,
      }} />

      {/* Nav — sits above blur */}
      <div style={{ position: 'relative', zIndex: 10, filter: printingDone ? 'none' : 'blur(4px)', transition: 'filter 1s ease' }}>
        <Nav />
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '32px 5vw 80px',
      }}>

        {/* Heading */}
        <h1 style={{
          fontFamily: PD, fontSize: '28px', fontWeight: '700',
          color: '#2C1810', marginBottom: '32px', textAlign: 'center',
          opacity: printingDone ? 1 : 0.3,
          transition: 'opacity 1s ease',
        }}>
          {confirmed ? 'Payment Confirmed! \u2726' : 'Your Order'}
        </h1>

        {/* Printer machine */}
        <div style={{
          width: 'min(420px, 90vw)',
          background: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 100%)',
          borderRadius: '20px 20px 6px 6px',
          padding: '24px 28px 0',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          position: 'relative',
        }}>
          {/* Top panel */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}>
              WTG RECEIPT PRINTER
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: printingDone ? '#9B8B7A' : '#22C55E',
                boxShadow: printingDone ? 'none' : '0 0 10px #22C55E',
                animation: !printingDone && started ? 'blink 0.6s ease-in-out infinite' : 'none',
                transition: 'background 0.5s',
              }} />
              <div style={{ fontFamily: MONO, fontSize: '9px', color: printingDone ? 'rgba(255,255,255,0.3)' : '#22C55E', letterSpacing: '0.1em' }}>
                {printingDone ? 'DONE' : started ? 'PRINTING...' : 'READY'}
              </div>
            </div>
          </div>

          {/* Decorative lines on machine */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ height: '3px', background: `rgba(255,255,255,${0.04 + i * 0.02})`, borderRadius: '2px' }} />
            ))}
          </div>

          {/* Paper slot */}
          <div style={{
            background: '#111',
            borderRadius: '3px 3px 0 0',
            height: '16px',
            margin: '0 -4px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
          }} />
        </div>

        {/* Receipt paper */}
        <div style={{
          width: 'min(380px, 84vw)',
          background: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15), 2px 0 0 rgba(0,0,0,0.05), -2px 0 0 rgba(0,0,0,0.05)',
          position: 'relative',
          minHeight: `${receiptHeight}px`,
          transition: 'min-height 0.1s linear',
          // Jagged bottom edge
          clipPath: printingDone
            ? 'polygon(0 0, 100% 0, 100% calc(100% - 10px), 97% 100%, 94% calc(100% - 7px), 91% 100%, 88% calc(100% - 7px), 85% 100%, 82% calc(100% - 7px), 79% 100%, 76% calc(100% - 7px), 73% 100%, 70% calc(100% - 7px), 67% 100%, 64% calc(100% - 7px), 61% 100%, 58% calc(100% - 7px), 55% 100%, 52% calc(100% - 7px), 49% 100%, 46% calc(100% - 7px), 43% 100%, 40% calc(100% - 7px), 37% 100%, 34% calc(100% - 7px), 31% 100%, 28% calc(100% - 7px), 25% 100%, 22% calc(100% - 7px), 19% 100%, 16% calc(100% - 7px), 13% 100%, 10% calc(100% - 7px), 7% 100%, 4% calc(100% - 7px), 1% 100%, 0 calc(100% - 10px))'
            : 'none',
        }}>
          <div style={{ padding: '24px 24px 36px', fontFamily: MONO }}>

            {lines.slice(0, visibleLines).map((line, i) => {
              switch (line.type) {
                case 'logo':
                  return <div key={i} style={{ textAlign: 'center', fontSize: '18px', fontWeight: '900', color: '#2C1810', letterSpacing: '0.08em', marginBottom: '4px' }}>{line.content}</div>;
                case 'sub':
                  return <div key={i} style={{ textAlign: 'center', fontSize: '10px', color: '#9B8B7A', fontStyle: 'italic', marginBottom: '4px' }}>{line.content}</div>;
                case 'divider':
                  return <div key={i} style={{ borderTop: '1px dashed #CCC', margin: '8px 0' }} />;
                case 'header':
                  return <div key={i} style={{ textAlign: 'center', fontSize: '11px', fontWeight: '700', color: '#2C1810', letterSpacing: '0.18em', marginBottom: '4px' }}>{line.content}</div>;
                case 'item':
                  return <div key={i} style={{ fontSize: '12px', fontWeight: '700', color: '#2C1810', marginBottom: '2px' }}>{line.content}</div>;
                case 'price':
                  return <div key={i} style={{ fontSize: '11px', color: '#5C4A3A', textAlign: 'right', marginBottom: '8px' }}>{line.content}</div>;
                case 'total':
                  return <div key={i} style={{ fontSize: '14px', fontWeight: '900', color: '#2C1810', marginBottom: '4px' }}>{line.content}</div>;
                case 'row':
                  return <div key={i} style={{ fontSize: '11px', color: '#5C4A3A', marginBottom: '3px' }}>{line.content}</div>;
                case 'step':
                  return <div key={i} style={{ fontSize: '10px', color: '#5C4A3A', paddingLeft: '8px', marginBottom: '3px' }}>{line.content}</div>;
                case 'thanks':
                  return <div key={i} style={{ textAlign: 'center', fontSize: '16px', fontWeight: '900', color: '#2C1810', margin: '8px 0 4px', letterSpacing: '0.05em' }}>{line.content}</div>;
                case 'qr':
                  return (
                    <div key={i} style={{ textAlign: 'center', marginTop: '12px' }}>
                      {showQR && (
                        <>
                          {/* QR placeholder */}
                          <div style={{
                            width: '160px', height: '160px',
                            margin: '0 auto 8px',
                            border: '2px solid #2C1810',
                            borderRadius: '8px',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            background: '#F9F9F9',
                            gap: '8px',
                          }}>
                            {/* SWAP: <img src="/images/upi-qr.png" style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:'6px'}}/> */}
                            <div style={{ fontSize: '40px' }}>📱</div>
                            <div style={{ fontSize: '9px', color: '#9B8B7A', textAlign: 'center', lineHeight: '1.5' }}>
                              Your UPI QR<br />goes here
                            </div>
                          </div>
                          <div style={{ fontSize: '10px', color: '#9B8B7A', marginBottom: '2px' }}>Scan to pay via UPI</div>
                          <div style={{ fontSize: '11px', fontWeight: '700', color: '#2C1810', marginBottom: '16px' }}>
                            whatthegrad@upi
                            {/* SWAP with your real UPI ID */}
                          </div>

                          {confirmed ? (
                            <div style={{
                              border: '3px solid #22C55E',
                              borderRadius: '8px', padding: '10px',
                              color: '#22C55E', fontWeight: '900',
                              fontSize: '16px', letterSpacing: '0.12em',
                              animation: 'stamp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}>
                              CONFIRMED \u2726
                            </div>
                          ) : (
                            <button
                              onClick={() => { setConfirmed(true); clearCart(); }}
                              style={{
                                width: '100%', padding: '12px',
                                background: '#2C1810', color: '#FFF8EC',
                                border: 'none', borderRadius: '100px',
                                fontFamily: PD, fontSize: '14px', fontWeight: '700',
                                cursor: 'pointer', letterSpacing: '0.04em',
                              }}
                              onMouseEnter={e => (e.currentTarget.style.background = '#F5A623')}
                              onMouseLeave={e => (e.currentTarget.style.background = '#2C1810')}
                            >
                              I have paid \u2713
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>

        {/* Continue shopping — appears after printing */}
        {printingDone && !confirmed && (
          <button
            onClick={() => router.push('/')}
            style={{
              marginTop: '24px', padding: '12px 32px',
              background: 'transparent', color: '#2C1810',
              border: '2px solid #2C1810', borderRadius: '100px',
              fontFamily: PD, fontSize: '13px', fontWeight: '700',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2C1810'; e.currentTarget.style.color = '#FFF8EC'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2C1810'; }}
          >
            Continue Shopping
          </button>
        )}
      </div>

      <div style={{ position: 'relative', zIndex: 10, filter: printingDone ? 'none' : 'blur(4px)', transition: 'filter 1s ease' }}>
        <Footer />
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes stamp {
          0% { transform: scale(1.8) rotate(-3deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
