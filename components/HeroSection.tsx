'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const lerp    = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp   = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIO  = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const STICKY_NOTES = [
  { id:'sn1', text:'😭 Doctor??',         bg:'#FFFDE7', color:'#6D4C00', top:'35%', left:'-2%',  right:undefined as undefined, flyX:-170, flyY:-210, flyR:-22 },
  { id:'sn2', text:'idk anymore 🧚',      bg:'#FFFDE7', color:'#6D4C00', top:'25%', left:undefined, right:'0%',   flyX: 185, flyY:-170, flyR: 24  },
  { id:'sn3', text:'Engineer? 💻',        bg:'#FCE4EC', color:'#880E4F', top:'45%', left:undefined, right:'-2%',  flyX: 195, flyY:-90,  flyR: 28  },
  { id:'sn4', text:'parents said... 👨‍👩‍👦',  bg:'#FFFDE7', color:'#6D4C00', top:'55%', left:'-4%',  right:undefined, flyX:-195, flyY:  55, flyR:-18  },
  { id:'sn5', text:'CA? 📊',              bg:'#E8F5E9', color:'#1B5E20', top:'65%', left:'-3%',  right:undefined, flyX:-175, flyY: 130, flyR:-26  },
  { id:'sn6', text:'MBA? 😰',             bg:'#FCE4EC', color:'#880E4F', top:'75%', left:undefined, right:'-2%',  flyX: 185, flyY: 140, flyR: 30  },
];

const CONGRATS = [
  { id:'cm1', text:'🎉 So proud of you!',   bg:'#1A1A1A', color:'#FAF7F0', top:'35%', left:'-2%',  right:undefined as undefined, startX:-55, startY:-25 },
  { id:'cm2', text:'🥳 We knew you could!', bg:'#FFFDE7', color:'#6D4C00', top:'25%', left:undefined, right:'0%',   startX: 55, startY:-25 },
  { id:'cm3', text:'✦ You did it!!',        bg:'#F5A623', color:'#1A1A1A', top:'45%', left:undefined, right:'-2%',  startX: 60, startY:-20 },
  { id:'cm4', text:'💌 Congratulations!',   bg:'#E8837A', color:'#ffffff', top:'55%', left:'-4%',  right:undefined, startX:-60, startY: 15 },
  { id:'cm5', text:'🌟 Future is sorted!',  bg:'#FFFDE7', color:'#6D4C00', top:'60%', left:undefined, right:'-2%',  startX: 60, startY: 20 },
  { id:'cm6', text:'📩 Mum is crying 🥹',   bg:'#E8F5E9', color:'#1B5E20', top:'74%', left:'-3%',  right:undefined, startX:-55, startY: 50 },
];

const CONFETTI = [
  { top:'18%', left:'18%',  right:undefined as undefined, bg:'#F5A623', dx:-55, dy:-75,  dr: 120, pill:false },
  { top:'12%', left:undefined, right:'20%',               bg:'#E8837A', dx: 50, dy:-65,  dr:-90,  pill:true  },
  { top:'32%', left:'10%',  right:undefined,              bg:'#EEE9A0', dx:-65, dy: 35,  dr: 200, pill:false },
  { top:'8%',  left:'45%',  right:undefined,              bg:'#1A1A1A', dx: 28, dy:-85,  dr:-150, pill:true  },
  { top:'22%', left:undefined, right:'14%',               bg:'#F5A623', dx: 60, dy: 28,  dr: 100, pill:false },
  { top:'42%', left:'6%',   right:undefined,              bg:'#E8837A', dx:-48, dy: 55,  dr:-80,  pill:false },
  { top:'14%', left:'34%',  right:undefined,              bg:'#EEE9A0', dx: 10, dy:-95,  dr: 170, pill:true  },
  { top:'36%', left:undefined, right:'8%',                bg:'#1A1A1A', dx: 70, dy:-18,  dr:-120, pill:false },
];

const SPARKLES = [
  { top:'8%',  left:'38%',     right:undefined as undefined, color:'#E8837A', size:16, delay:0    },
  { top:'5%',  left:'58%',     right:undefined,              color:'#9BB5C8', size:13, delay:0.4  },
  { top:'14%', left:'6%',      right:undefined,              color:'#E8837A', size:20, delay:0.9  },
  { top:'24%', left:'27%',     right:undefined,              color:'#C4A882', size:12, delay:1.3  },
  { top:'38%', left:'4%',      right:undefined,              color:'#E8837A', size:18, delay:0.2  },
  { top:'50%', left:'20%',     right:undefined,              color:'#9BB5C8', size:14, delay:1.7  },
  { top:'10%', left:undefined, right:'5%',                   color:'#9BB5C8', size:15, delay:0.3  },
  { top:'28%', left:undefined, right:'3%',                   color:'#E8837A', size:12, delay:1.4  },
  { top:'55%', left:undefined, right:'5%',                   color:'#C4A882', size:16, delay:0.8  },
];

function WavyBg() {
  return (
    <svg
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.4, pointerEvents:'none' }}
      viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M-100 180 C200  80 420 340 720 180 S1120  40 1540 230" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
      <path d="M-100 300 C160 200 460 430 760 280 S1160 140 1540 350" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
      <path d="M-100 420 C200 320 500 540 800 380 S1200 250 1540 470" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
      <path d="M-100 540 C180 440 480 640 780 490 S1180 360 1540 590" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
      <path d="M-100 660 C220 560 520 740 820 600 S1220 470 1540 710" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
      <path d="M-100 780 C240 680 540 850 840 730 S1240 600 1540 820" stroke="#96BDD6" strokeWidth="1.8" fill="none"/>
    </svg>
  );
}

function ConfusedPortrait({ opacity }: { opacity: number }) {
  return (
    <div style={{ position:'absolute', inset:0, opacity, transition:'opacity 0.1s linear' }}>
      <img
        src="/images/student-confused.png"
        alt="confused student"
        style={{
          width:'100%', height:'100%',
          objectFit:'contain', objectPosition:'center',
          maskImage:'linear-gradient(to top, transparent 0%, transparent 8%, black 30%)',
          WebkitMaskImage:'linear-gradient(to top, transparent 0%, transparent 8%, black 30%)',
        }}
      />
    </div>
  );
}

function HappyPortrait({ opacity }: { opacity: number }) {
  return (
    <div style={{ position:'absolute', inset:0, opacity, transition:'opacity 0.1s linear' }}>
      <img
        src="/images/student-happy.png"
        alt="happy student"
        style={{
          width:'100%', height:'100%',
          objectFit:'contain', objectPosition:'center',
          maskImage:'linear-gradient(to top, transparent 0%, transparent 8%, black 30%)',
          WebkitMaskImage:'linear-gradient(to top, transparent 0%, transparent 8%, black 30%)',
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const stageRef     = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const progressRef  = useRef(0);
  const targetRef    = useRef(0);
  const insideRef    = useRef(false);

  const [p, setP]                   = useState(0);
  const [curPos, setCurPos]         = useState({ x: -300, y: -300 });
  const [curVisible, setCurVisible] = useState(false);
  const [isInside, setIsInside]     = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const animate = useCallback(() => {
    if (!insideRef.current && !isMobile) targetRef.current = 0;
    const prev = progressRef.current;
    progressRef.current = lerp(prev, targetRef.current, 0.055);
    if (Math.abs(progressRef.current - targetRef.current) < 0.0004) {
      progressRef.current = targetRef.current;
    }
    setP(progressRef.current);
    animFrameRef.current = requestAnimationFrame(animate);
  }, [isMobile]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [animate]);

  // desktop: cursor tracking
  useEffect(() => {
    if (isMobile) return;
    const onMove  = (e: MouseEvent) => { setCurPos({ x: e.clientX, y: e.clientY }); setCurVisible(true); };
    const onLeave = () => setCurVisible(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [isMobile]);

  // mobile: scroll-driven animation
  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect  = stage.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress 0→1 as stage scrolls from entering viewport to leaving
      const raw = (viewH - rect.top) / (viewH + rect.height);
      targetRef.current  = clamp(raw, 0, 1);
      insideRef.current  = raw > 0 && raw < 1;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  const handleEnter = () => { if (isMobile) return; insideRef.current = true;  setIsInside(true);  };
  const handleLeave = () => { if (isMobile) return; insideRef.current = false; setIsInside(false); targetRef.current = 0; };
  const handleMove  = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetRef.current = clamp((e.clientY - rect.top) / rect.height, 0, 1);
  };

  const eP         = easeIO(p);
  const confusedOp = 1 - clamp((p - 0.18) / 0.42, 0, 1);
  const happyOp    = clamp((p - 0.18) / 0.42, 0, 1);
  const badgeP     = clamp((p - 0.32) / 0.32, 0, 1);
  const badgeDark  = badgeP > 0.5;
  const badgeLabel = badgeP < 0.5 ? 'Confused & lost' : 'Confident & clear';
  const capP       = clamp((p - 0.48) / 0.28, 0, 1);
  const capE       = easeOut(capP);
  const capBounce  = capP > 0.68 ? Math.sin((capP - 0.68) * Math.PI * 3.2) * 9 * (1 - capP) : 0;
  const capY       = (1 - capE) * -90 + capBounce;
  const capRot     = (1 - capE) * -18;
  const glowR      = Math.round(lerp(26, 245, eP));
  const glowG      = Math.round(lerp(26, 166, eP));
  const glowB      = Math.round(lerp(26, 35,  eP));
  const curSize    = 32 + p * 24;

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&family=Caveat:wght@600&display=swap');
        @keyframes throb {
          0%,100% { transform: scale(0.7) rotate(0deg);  opacity: 0.45; }
          50%      { transform: scale(1.3) rotate(22deg); opacity: 1;    }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes dotPulse {
          0%,100% { transform:scale(1);   opacity:1;  }
          50%      { transform:scale(1.6); opacity:.5; }
        }
        .nav-link {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1rem;
          color: #1A1A1A;
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover { color: #E8713A; }
        .learn-btn {
          display: inline-block;
          border: 2.5px solid #1A1A1A;
          border-radius: 100px;
          padding: 0.82rem 2.6rem;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #E8713A;
          background: transparent;
          transition: background 0.25s, color 0.25s, transform 0.2s;
          text-decoration: none;
        }
        .learn-btn:hover {
          background: #1A1A1A;
          color: #FAF7F0;
          transform: translateY(-2px);
        }
        @media (max-width: 767px) {
          .nav-link { font-size: 0.78rem; }
          .learn-btn { padding: 0.7rem 2rem; font-size: 0.9rem; }
        }
      `}</style>

      {/* custom cursor — desktop only */}
      {!isMobile && (
        <div style={{
          position:'fixed', left:curPos.x, top:curPos.y,
          width:curSize, height:curSize, borderRadius:'50%',
          border:'2px solid #E8713A',
          background:`rgba(232,113,58,${0.08 + p * 0.1})`,
          transform:'translate(-50%,-50%)',
          pointerEvents:'none', zIndex:9999,
          opacity: curVisible ? 1 : 0,
          transition:'opacity 0.2s, width 0.12s, height 0.12s',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <div style={{
            width:5, height:5, borderRadius:'50%', background:'#E8713A',
            transform: isInside ? 'scale(1.8)' : 'scale(1)',
            transition:'transform 0.2s',
          }}/>
        </div>
      )}

      <section style={{
        minHeight:'100vh',
        background:'#D6E8F5',
        position:'relative',
        overflow:'hidden',
        cursor: isMobile ? 'auto' : 'none',
        display:'flex',
        flexDirection:'column',
        fontFamily:"'DM Sans', sans-serif",
      }}>
        <WavyBg/>

        {/* sparkles */}
        {SPARKLES.map((sp, i) => (
          <div key={i} style={{
            position:'absolute',
            top:sp.top, left:sp.left, right:sp.right,
            color:sp.color,
            fontSize: isMobile ? Math.max(sp.size * 0.65, 8) : sp.size,
            lineHeight:1, pointerEvents:'none', zIndex:1,
            animation:`throb ${2.0 + (i % 5) * 0.35}s ease-in-out ${sp.delay}s infinite`,
          }}>✦</div>
        ))}

        {/* ── NAV ── */}
        <nav style={{
          position:'relative', zIndex:10,
          display:'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems:'center',
          justifyContent: isMobile ? 'center' : 'space-between',
          padding: isMobile ? '0.8rem 4vw 0' : '1.5rem 4vw',
          gap:0,
        }}>
          {/* logo */}
          <img
            src="/images/logo.png"
            alt="What The Grad"
            style={{
              height: isMobile ? '52px' : '85px',
              marginBottom: isMobile ? '0.5rem' : 0,
            }}
          />

          {/* links row — with bottom border on mobile */}
          <div style={{
            display:'flex',
            gap: isMobile ? '1rem' : '2.2rem',
            alignItems:'center',
            justifyContent:'center',
            width: isMobile ? '100%' : 'auto',
            padding: isMobile ? '0.6rem 1rem' : '0',
            borderBottom: isMobile ? '1.5px solid rgba(26,26,26,0.15)' : 'none',
            overflowX:'auto',
          }}>
            <a href="#about"    className="nav-link">About us</a>
            <a href="/founders" className="nav-link">Meet our founders</a>
            <a href="/contact"  className="nav-link">Contact</a>
            <a href="/cart"     className="nav-link">Cart</a>
          </div>
        </nav>

        {/* ── BODY: single col on mobile, two col on desktop ── */}
        <div style={{
          flex:1,
          display:'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          padding: isMobile ? '0' : '0 4vw 3rem',
          gap: isMobile ? '0' : '1rem',
          position:'relative', zIndex:2,
        }}>

          {/* ── STUDENT STAGE — top on mobile ── */}
          <div style={{
            flex: isMobile ? 'none' : 1,
            display:'flex',
            justifyContent:'center',
            alignItems:'flex-end',
            height: isMobile ? '72vw' : '100vh',
            minHeight: isMobile ? 260 : 'auto',
            maxHeight: isMobile ? 440 : 'none',
            position:'relative',
            order: isMobile ? 1 : 2,
          }}>
            <div
              ref={stageRef}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              onMouseMove={handleMove}
              style={{
                position:'relative',
                width: isMobile ? '90%' : 340,
                height:'100%',
                maxHeight: isMobile ? 440 : 900,
                cursor: isMobile ? 'auto' : 'none',
                userSelect:'none',
              }}
            >
              {/* ground glow */}
              <div style={{
                position:'absolute', bottom:-8, left:'50%',
                transform:'translateX(-50%)',
                width: 190 + eP * 80, height:26,
                borderRadius:'50%',
                background:`rgba(${glowR},${glowG},${glowB},${0.07+eP*0.2})`,
                filter:'blur(10px)', pointerEvents:'none',
              }}/>

              {/* grad cap */}
              <div style={{
                position:'absolute',
                top: (isMobile ? -40 : -70) + capY,
                left:'50%',
                transform:`translateX(-50%) rotate(${capRot}deg)`,
                fontSize: isMobile ? '1.8rem' : '3.2rem',
                zIndex:25, opacity:capP, pointerEvents:'none',
              }}>🎓</div>

              {/* confetti */}
              {CONFETTI.map((c, i) => {
                const confP = clamp((p - 0.74) / 0.26, 0, 1);
                const delay = i * 0.032;
                const cp    = clamp((confP - delay) / 0.55, 0, 1);
                const ce    = easeIO(cp);
                const op    = cp < 0.65 ? cp / 0.65 : 1 - (cp - 0.65) / 0.35;
                return (
                  <div key={i} style={{
                    position:'absolute',
                    top:c.top, left:c.left, right:c.right,
                    width:isMobile ? 5 : 7, height:isMobile ? 5 : 7,
                    borderRadius: c.pill ? '50%' : 2,
                    background:c.bg, opacity:op,
                    transform:`translate(${c.dx*ce}px,${c.dy*ce}px) rotate(${c.dr*ce}deg) scale(${0.2+ce*0.8})`,
                    pointerEvents:'none', zIndex:20,
                  }}/>
                );
              })}

              {/* sticky notes */}
              {STICKY_NOTES.map((sn, i) => {
                const start = i * 0.075;
                const end   = start + 0.30;
                const snP   = clamp((p - start) / (end - start), 0, 1);
                const snE   = easeIO(snP);
                return (
                  <div key={sn.id} style={{
                    position:'absolute',
                    top:sn.top, left:sn.left, right:sn.right,
                    padding: isMobile ? '.25rem .55rem' : '.42rem .9rem',
                    borderRadius:8,
                    fontFamily:"'Caveat', cursive",
                    fontSize: isMobile ? '.72rem' : '1rem',
                    fontWeight:600, whiteSpace:'nowrap',
                    background:sn.bg, color:sn.color,
                    boxShadow:'0 3px 12px rgba(0,0,0,.1)',
                    pointerEvents:'none',
                    opacity: 1 - snE,
                    transform:`rotate(${snE*sn.flyR}deg) translate(${snE*sn.flyX}px,${snE*sn.flyY}px) scale(${1-snE*0.72})`,
                    zIndex:12,
                  }}>
                    {sn.text}
                  </div>
                );
              })}

              {/* congrats messages */}
              {CONGRATS.map((cm, i) => {
                const start = 0.52 + i * 0.042;
                const cmP   = clamp((p - start) / 0.28, 0, 1);
                const cmE   = easeOut(cmP);
                return (
                  <div key={cm.id} style={{
                    position:'absolute',
                    top:cm.top, left:cm.left, right:cm.right,
                    padding: isMobile ? '.22rem .55rem' : '.38rem .88rem',
                    borderRadius:100,
                    fontSize: isMobile ? '.62rem' : '.75rem',
                    fontWeight:600, whiteSpace:'nowrap',
                    background:cm.bg, color:cm.color,
                    opacity:cmE,
                    transform:`translate(${cm.startX*(1-cmE)}px,${cm.startY*(1-cmE)}px) scale(${0.35+cmE*0.65})`,
                    pointerEvents:'none', zIndex:12,
                  }}>
                    {cm.text}
                  </div>
                );
              })}

              {/* expression badge */}
              <div style={{
                position:'absolute',
                top: isMobile ? 6 : 40,
                right: isMobile ? 4 : -20,
                zIndex:32,
                background: badgeDark ? '#1A1A1A' : 'white',
                border:`1.5px solid ${badgeDark ? '#1A1A1A' : '#D0CCC4'}`,
                borderRadius:100,
                padding: isMobile ? '.2rem .6rem' : '.32rem .9rem',
                fontSize: isMobile ? '.6rem' : '.7rem',
                fontWeight:600,
                display:'flex', alignItems:'center', gap:'.35rem',
                boxShadow:'0 4px 16px rgba(0,0,0,.08)',
                color: badgeDark ? '#FAF7F0' : '#1A1A1A',
                whiteSpace:'nowrap',
                transition:'background 0.5s, border-color 0.5s, color 0.5s',
              }}>
                <span style={{
                  width:6, height:6, borderRadius:'50%',
                  background: badgeDark ? '#F5A623' : '#E8837A',
                  display:'inline-block',
                  animation:'dotPulse 2s ease-in-out infinite',
                  transition:'background 0.5s',
                }}/>
                {badgeLabel}
              </div>

              {/* portraits */}
              <div style={{
                position:'absolute', bottom:0, left:'50%',
                transform:'translateX(-50%)',
                width: isMobile ? '90%' : 420,
                height:'90%',
              }}>
                <ConfusedPortrait opacity={confusedOp}/>
                <HappyPortrait    opacity={happyOp}/>
              </div>

            </div>
          </div>

          {/* ── HEADLINE + CTA — below student on mobile ── */}
          <div style={{
            flex: isMobile ? 'none' : 1,
            order: isMobile ? 2 : 1,
            padding: isMobile ? '1.2rem 1.5rem 3rem' : '0',
            textAlign: isMobile ? 'center' : 'left',
            animation:'slideUp 0.9s ease both',
          }}>
            <h1 style={{
              fontFamily:"'Playfair Display', serif",
              fontStyle:'italic', fontWeight:900,
              fontSize: isMobile ? 'clamp(1.7rem, 6.5vw, 2.2rem)' : 'clamp(2.2rem, 4vw, 3.6rem)',
              lineHeight:1.15, letterSpacing:'-0.02em',
              color:'#5B8FA8', marginBottom:'0.15rem',
            }}>
              Your future is waiting,
            </h1>
            <h1 style={{
              fontFamily:"'Playfair Display', serif",
              fontStyle:'italic', fontWeight:900,
              fontSize: isMobile ? 'clamp(1.7rem, 6.5vw, 2.2rem)' : 'clamp(2.2rem, 4vw, 3.6rem)',
              lineHeight:1.15, letterSpacing:'-0.02em',
              color:'#E8713A',
              marginBottom: isMobile ? '1.6rem' : '2.8rem',
            }}>
              Let&apos;s go get it
            </h1>

            <div style={{ display:'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <a href="/#about" className="learn-btn">Learn more</a>
            </div>

            {/* progress bar + hint */}
            <div style={{
              marginTop: isMobile ? '1.5rem' : '3.5rem',
              display:'flex', flexDirection:'column',
              alignItems: isMobile ? 'center' : 'flex-start',
            }}>
              <div style={{
                width:200, height:2.5,
                background:'rgba(26,26,26,0.1)',
                borderRadius:100, overflow:'hidden',
              }}>
                <div style={{
                  height:'100%', width:`${p * 100}%`,
                  background:'linear-gradient(90deg,#E8837A,#E8713A)',
                  borderRadius:100, transition:'width 0.08s linear',
                }}/>
              </div>
              <p style={{
                fontSize:'.68rem', color:'rgba(26,26,26,0.4)',
                marginTop:'.4rem', fontStyle:'italic', letterSpacing:'.03em',
                opacity: isMobile ? (p > 0.05 ? 0 : 1) : (isInside ? 0 : 1),
                transition:'opacity 0.5s',
              }}>
                {isMobile ? 'scroll to reveal ✦' : 'hover over the student & drag down slowly ✦'}
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
