'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartContext';

const PD   = "Playfair Display, Georgia, serif";
const MONO = "'Courier New', Courier, monospace";

function playPrinterClick() {
  try {
    const ctx        = new (window.AudioContext || (window as any).webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer     = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data       = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * 0.25;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter  = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 900;
    filter.Q.value = 0.6;
    source.connect(filter);
    filter.connect(ctx.destination);
    source.start();
    setTimeout(() => ctx.close(), 200);
  } catch (e) {}
}

// ── ROUND STAMP SEAL ──────────────────────────────────────────────────────────
function ConfirmedSeal() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      margin: '16px 0',
    }}>
      <div style={{
        width: 160, height: 160,
        borderRadius: '50%',
        border: '5px solid #22C55E',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        transform: visible ? 'scale(1) rotate(-8deg)' : 'scale(2.2) rotate(-8deg)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
        background: 'rgba(34,197,94,0.08)',
        boxShadow: '0 0 0 2px #22C55E, 0 0 0 8px rgba(34,197,94,0.12)',
      }}>
        {/* outer ring text */}
        <svg width="160" height="160" style={{ position:'absolute', inset:0 }}>
          <defs>
            <path id="topArc" d="M 20,80 A 60,60 0 0,1 140,80"/>
            <path id="botArc" d="M 18,88 A 62,62 0 0,0 142,88"/>
          </defs>
          <text fontFamily={MONO} fontSize="9" fill="#22C55E" letterSpacing="3">
            <textPath href="#topArc">✦ WHAT THE GRAD ✦ CONFIRMED ✦</textPath>
          </text>
          <text fontFamily={MONO} fontSize="8" fill="#22C55E" letterSpacing="2">
            <textPath href="#botArc">PAID · BOOKED · SORTED</textPath>
          </text>
        </svg>
        {/* inner content */}
        <div style={{ textAlign:'center', zIndex:1 }}>
          <div style={{ fontSize:'36px', lineHeight:1 }}>✓</div>
          <div style={{ fontFamily:MONO, fontSize:'11px', fontWeight:'700', color:'#22C55E', letterSpacing:'0.12em', marginTop:'4px' }}>CONFIRMED</div>
        </div>
        {/* dashed inner circle */}
        <div style={{ position:'absolute', inset:'12px', borderRadius:'50%', border:'1.5px dashed rgba(34,197,94,0.4)' }}/>
      </div>
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { items, clearCart, updateQuantity, removeItem } = useCart();

  const [visibleLines, setVisibleLines] = useState(0);
  const [receiptHeight, setReceiptHeight] = useState(0);
  const [showQR, setShowQR]       = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [printingDone, setPrintingDone] = useState(false);
  const [started, setStarted]     = useState(false);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const totalPrice = items.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + (isNaN(num) ? 0 : num * (item.quantity ?? 1));
  }, 0);

  type LineType = 'logo' | 'sub' | 'divider' | 'header' | 'item' | 'price' | 'total' | 'row' | 'nextsteps' | 'step' | 'thanks' | 'qr';
  interface Line { type: LineType; content: string; }

  const lines: Line[] = [
    { type: 'logo',      content: 'WHAT THE GRAD' },
    { type: 'sub',       content: 'Your wise older sibling' },
    { type: 'divider',   content: '' },
    { type: 'row',       content: `Date     :  ${today}` },
    { type: 'row',       content: 'From     :  Sakshi & Nupoor' },
    { type: 'row',       content: 'To       :  You :)' },
    { type: 'divider',   content: '' },
    { type: 'header',    content: 'ORDER SUMMARY' },
    { type: 'divider',   content: '' },
    ...items.flatMap(item => ([
      { type: 'item'  as LineType, content: item.name },
      { type: 'price' as LineType, content: `${item.price} x ${item.quantity ?? 1}` },
    ])),
    { type: 'divider',   content: '' },
    { type: 'total',     content: `TOTAL    :  \u20B9${totalPrice.toLocaleString('en-IN')}` },
    { type: 'row',       content: 'Confusion tax  :  \u20B90.00' },
    { type: 'divider',   content: '' },
    { type: 'nextsteps', content: 'NEXT STEPS' },
    { type: 'step',      content: '\u2192 Scan QR below to pay' },
    { type: 'step',      content: '\u2192 Check email for booking link' },
    { type: 'step',      content: '\u2192 Show up. We handle the rest.' },
    { type: 'divider',   content: '' },
    { type: 'thanks',    content: 'Thank you \u2726' },
    { type: 'sub',       content: 'Your future just got clearer.' },
    { type: 'divider',   content: '' },
    { type: 'qr',        content: '' },
  ];

  // start printing 800ms after mount
  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(t);
  }, [mounted]);

  // print lines one by one
  useEffect(() => {
    if (!started) return;
    if (visibleLines >= lines.length) {
      const t = setTimeout(() => { setShowQR(true); setPrintingDone(true); }, 300);
      return () => clearTimeout(t);
    }
    const lineType = lines[visibleLines]?.type;
    const delay =
      lineType === 'divider'   ? 90  :
      lineType === 'logo'      ? 260 :
      lineType === 'thanks'    ? 220 :
      lineType === 'nextsteps' ? 180 :
      lineType === 'qr'        ? 50  : 140;

    const t = setTimeout(() => {
      playPrinterClick();
      const lineHeight =
        lineType === 'divider'   ? 20  :
        lineType === 'logo'      ? 40  :
        lineType === 'nextsteps' ? 42  :
        lineType === 'step'      ? 26  :
        lineType === 'qr'        ? 240 : 26;
      setReceiptHeight(h => h + lineHeight);
      setVisibleLines(v => v + 1);
    }, delay);

    return () => clearTimeout(t);
  }, [started, visibleLines, lines.length]);

  // empty cart
  if (mounted && items.length === 0 && !confirmed) {
    return (
      <div style={{ minHeight:'100vh', background:'#FFF8EC', fontFamily:PD }}>
        <Nav />
        <div style={{ maxWidth:'500px', margin:'0 auto', padding:'80px 5vw', textAlign:'center' }}>
          <div style={{ fontSize:'72px', marginBottom:'24px' }}>🎓</div>
          <h1 style={{ fontFamily:PD, fontSize:'36px', fontWeight:'700', color:'#2C1810', marginBottom:'16px' }}>Your cart is empty</h1>
          <p style={{ fontFamily:PD, fontSize:'16px', fontStyle:'italic', color:'#9B8B7A', marginBottom:'40px' }}>Your future does not have to be.</p>
          <button onClick={() => router.push('/#services')} style={{ padding:'14px 40px', background:'#F5A623', color:'#2C1810', border:'none', borderRadius:'100px', fontFamily:PD, fontSize:'15px', fontWeight:'700', cursor:'pointer' }}>
            View our packages
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // live total recalculated from current items state
  const liveTotal = items.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + (isNaN(num) ? 0 : num * (item.quantity ?? 1));
  }, 0);

  const qtyBtn = (label: string, onClick: () => void) => (
    <button
      onClick={onClick}
      style={{
        width:'24px', height:'24px', borderRadius:'50%',
        border:'1px solid rgba(44,24,16,0.25)',
        background:'transparent', cursor:'pointer',
        fontSize:'14px', lineHeight:1,
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'#2C1810', fontFamily:MONO,
        flexShrink:0,
      }}
    >{label}</button>
  );

  const renderLine = (line: Line, i: number) => {
    switch (line.type) {
      case 'logo':
        return <div key={i} style={{ textAlign:'center', fontSize:'22px', fontWeight:'900', color:'#2C1810', letterSpacing:'0.08em', marginBottom:'4px' }}>{line.content}</div>;
      case 'sub':
        return <div key={i} style={{ textAlign:'center', fontSize:'12px', color:'#9B8B7A', fontStyle:'italic', marginBottom:'4px' }}>{line.content}</div>;
      case 'divider':
        return <div key={i} style={{ borderTop:'1px dashed #CCC', margin:'10px 0' }}/>;
      case 'header':
        return <div key={i} style={{ textAlign:'center', fontSize:'14px', fontWeight:'700', color:'#2C1810', letterSpacing:'0.18em', marginBottom:'6px' }}>{line.content}</div>;

      // item row — find matching cart item and render inline qty controls
      case 'item': {
        const cartItem = items.find(it => it.name === line.content);
        if (!cartItem) return <div key={i} style={{ fontSize:'15px', fontWeight:'700', color:'#2C1810', marginBottom:'2px' }}>{line.content}</div>;
        const itemTotal = parseInt(cartItem.price.replace(/[^\d]/g, '')) * (cartItem.quantity ?? 1);
        return (
          <div key={i} style={{ marginBottom:'10px' }}>
            <div style={{ fontSize:'14px', fontWeight:'700', color:'#2C1810', marginBottom:'6px' }}>{cartItem.name}</div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'8px' }}>
              {/* qty controls */}
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                {qtyBtn('−', () => updateQuantity(cartItem.id, (cartItem.quantity ?? 1) - 1))}
                <span style={{ fontFamily:MONO, fontSize:'14px', fontWeight:'700', color:'#2C1810', minWidth:'18px', textAlign:'center' }}>{cartItem.quantity ?? 1}</span>
                {qtyBtn('+', () => updateQuantity(cartItem.id, (cartItem.quantity ?? 1) + 1))}
                <button
                  onClick={() => removeItem(cartItem.id)}
                  style={{ background:'none', border:'none', cursor:'pointer', color:'#CCC', fontSize:'15px', lineHeight:1, padding:'0 2px' }}
                >×</button>
              </div>
              {/* line total */}
              <span style={{ fontFamily:MONO, fontSize:'13px', color:'#5C4A3A' }}>
                {cartItem.price} × {cartItem.quantity ?? 1} = ₹{itemTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        );
      }

      // skip static price line — we rendered it inline above
      case 'price':
        return null;

      // live total — always reflects current qty
      case 'total':
        return (
          <div key={i} style={{ fontSize:'18px', fontWeight:'900', color:'#2C1810', marginBottom:'4px' }}>
            TOTAL    :  ₹{liveTotal.toLocaleString('en-IN')}
          </div>
        );

      case 'row':
        return <div key={i} style={{ fontSize:'13px', color:'#5C4A3A', marginBottom:'4px' }}>{line.content}</div>;

      case 'nextsteps':
        return (
          <div key={i} style={{ background:'#FFF8E1', border:'1.5px solid #F5A623', borderRadius:'8px 8px 0 0', padding:'10px 14px 6px' }}>
            <div style={{ fontSize:'13px', fontWeight:'900', color:'#2C1810', letterSpacing:'0.14em' }}>★ {line.content}</div>
          </div>
        );
      case 'step':
        return (
          <div key={i} style={{ background:'#FFF8E1', borderLeft:'1.5px solid #F5A623', borderRight:'1.5px solid #F5A623', padding:'2px 14px' }}>
            <div style={{ fontSize:'13px', color:'#5C4A3A', paddingBottom:'4px' }}>{line.content}</div>
          </div>
        );

      case 'thanks':
        return <div key={i} style={{ textAlign:'center', fontSize:'20px', fontWeight:'900', color:'#2C1810', margin:'10px 0 4px', letterSpacing:'0.05em' }}>{line.content}</div>;

      case 'qr':
        return (
          <div key={i} style={{ textAlign:'center', marginTop:'14px' }}>
            {showQR && (
              <>
                <div style={{ width:'160px', height:'160px', margin:'0 auto 10px', border:'2px solid #2C1810', borderRadius:'8px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#F9F9F9', gap:'8px' }}>
                  {/* SWAP: <img src="/images/upi-qr.png" style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:'6px'}}/> */}
                  <div style={{ fontSize:'40px' }}>📱</div>
                  <div style={{ fontSize:'10px', color:'#9B8B7A', textAlign:'center', lineHeight:'1.5' }}>Your UPI QR<br/>goes here</div>
                </div>
                <div style={{ fontSize:'11px', color:'#9B8B7A', marginBottom:'2px' }}>Scan to pay via UPI</div>
                <div style={{ fontSize:'13px', fontWeight:'700', color:'#2C1810', marginBottom:'16px' }}>whatthegrad@upi</div>
                {confirmed ? (
                  <ConfirmedSeal />
                ) : (
                  <button
                    onClick={() => { setConfirmed(true); clearCart(); }}
                    style={{ width:'100%', padding:'14px', background:'#2C1810', color:'#FFF8EC', border:'none', borderRadius:'100px', fontFamily:PD, fontSize:'15px', fontWeight:'700', cursor:'pointer', letterSpacing:'0.04em' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F5A623')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#2C1810')}
                  >
                    I have paid ✓
                  </button>
                )}
              </>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight:'100vh', fontFamily:PD, position:'relative', overflow:'hidden' }}>

      {/* blurred bg */}
      <div style={{ position:'fixed', inset:0, background:'#FFF8EC', filter: printingDone ? 'blur(0px)' : 'blur(6px)', transition:'filter 1s ease', zIndex:0 }}/>

      {/* nav */}
      <div style={{ position:'relative', zIndex:10, filter: printingDone ? 'none' : 'blur(4px)', transition:'filter 1s ease' }}>
        <Nav />
      </div>

      <div style={{ position:'relative', zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', padding:'32px 5vw 80px' }}>

        <h1 style={{ fontFamily:PD, fontSize:'28px', fontWeight:'700', color:'#2C1810', marginBottom:'16px', textAlign:'center', opacity: printingDone ? 1 : 0.3, transition:'opacity 1s ease' }}>
          {confirmed ? 'Payment Confirmed! ✦' : 'Your Order'}
        </h1>

        {/* printer machine */}
        <div style={{ width:'min(420px, 90vw)', background:'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 100%)', borderRadius:'20px 20px 6px 6px', padding:'24px 28px 0', boxShadow:'0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
            <div style={{ fontFamily:MONO, fontSize:'11px', color:'rgba(255,255,255,0.5)', letterSpacing:'0.15em' }}>WTG RECEIPT PRINTER</div>
            <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
              <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: printingDone ? '#9B8B7A' : '#22C55E', boxShadow: printingDone ? 'none' : '0 0 10px #22C55E', animation: (!printingDone && started) ? 'blink 0.6s ease-in-out infinite' : 'none', transition:'background 0.5s' }}/>
              <div style={{ fontFamily:MONO, fontSize:'9px', color: printingDone ? 'rgba(255,255,255,0.3)' : '#22C55E', letterSpacing:'0.1em' }}>
                {printingDone ? 'DONE' : started ? 'PRINTING...' : 'READY'}
              </div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'4px', marginBottom:'16px' }}>
            {[1,2,3].map(i => <div key={i} style={{ height:'3px', background:`rgba(255,255,255,${0.04 + i * 0.02})`, borderRadius:'2px' }}/>)}
          </div>
          <div style={{ background:'#111', borderRadius:'3px 3px 0 0', height:'16px', margin:'0 -4px', boxShadow:'inset 0 2px 4px rgba(0,0,0,0.5)' }}/>
        </div>

        {/* receipt paper */}
        <div style={{
          width:'min(380px, 84vw)',
          background:'white',
          boxShadow:'0 8px 32px rgba(0,0,0,0.15), 2px 0 0 rgba(0,0,0,0.05), -2px 0 0 rgba(0,0,0,0.05)',
          minHeight:`${receiptHeight}px`,
          transition:'min-height 0.1s linear',
          clipPath: printingDone
            ? 'polygon(0 0, 100% 0, 100% calc(100% - 10px), 97% 100%, 94% calc(100% - 7px), 91% 100%, 88% calc(100% - 7px), 85% 100%, 82% calc(100% - 7px), 79% 100%, 76% calc(100% - 7px), 73% 100%, 70% calc(100% - 7px), 67% 100%, 64% calc(100% - 7px), 61% 100%, 58% calc(100% - 7px), 55% 100%, 52% calc(100% - 7px), 49% 100%, 46% calc(100% - 7px), 43% 100%, 40% calc(100% - 7px), 37% 100%, 34% calc(100% - 7px), 31% 100%, 28% calc(100% - 7px), 25% 100%, 22% calc(100% - 7px), 19% 100%, 16% calc(100% - 7px), 13% 100%, 10% calc(100% - 7px), 7% 100%, 4% calc(100% - 7px), 1% 100%, 0 calc(100% - 10px))'
            : 'none',
        }}>
          <div style={{ padding:'24px 24px 36px', fontFamily:MONO }}>
            {lines.slice(0, visibleLines).map((line, i) => renderLine(line, i))}

            {/* close the nextsteps box bottom border */}
            {visibleLines > lines.findIndex(l => l.type === 'nextsteps') &&
             visibleLines <= lines.findIndex(l => l.type === 'nextsteps') + 3 && (
              <div style={{ background:'#FFF8E1', border:'1.5px solid #F5A623', borderTop:'none', borderRadius:'0 0 8px 8px', height:'6px', marginTop:'-1px', marginBottom:'0' }}/>
            )}
          </div>
        </div>

        {/* continue shopping */}
        {printingDone && !confirmed && (
          <button
            onClick={() => router.push('/')}
            style={{ marginTop:'24px', padding:'12px 32px', background:'transparent', color:'#2C1810', border:'2px solid #2C1810', borderRadius:'100px', fontFamily:PD, fontSize:'13px', fontWeight:'700', cursor:'pointer', transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background='#2C1810'; e.currentTarget.style.color='#FFF8EC'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#2C1810'; }}
          >
            Continue Shopping
          </button>
        )}
      </div>

      <div style={{ position:'relative', zIndex:10, filter: printingDone ? 'none' : 'blur(4px)', transition:'filter 1s ease' }}>
        <Footer />
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.2; } }
      `}</style>
    </div>
  );
}
