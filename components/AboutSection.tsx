'use client';
import { useEffect, useRef, useState } from 'react';

const DS = "Dancing Script, cursive";
const PD = "Playfair Display, Georgia, serif";

const POLAROIDS = [
  { id:1, rotation:-12, top:'2%',  left:'5%',  width:170, imgHeight:165, delay:0.05, tape:{ top:'-11px', left:'50%',  transform:'translateX(-50%) rotate(-3deg)' }, caption:'France, 2023',   bg:'#D6E8F5', zIndex:3 },
  { id:2, rotation:8,   top:'3%',  left:'44%', width:155, imgHeight:150, delay:0.2,  tape:{ top:'-10px', right:'14px', transform:'rotate(7deg)' },                  caption:'First day abroad', bg:'#E8D5F5', zIndex:4 },
  { id:3, rotation:-5,  top:'36%', left:'0%',  width:145, imgHeight:140, delay:0.38, tape:{ top:'-9px',  left:'12px',  transform:'rotate(-6deg)' },                 caption:'Always lost',     bg:'#FFF3D6', zIndex:2 },
  { id:4, rotation:10,  top:'32%', left:'36%', width:175, imgHeight:170, delay:0.15, tape:{ top:'-11px', left:'50%',  transform:'translateX(-50%) rotate(4deg)' },  caption:'The big idea',    bg:'#F5E6D5', zIndex:5 },
  { id:5, rotation:-7,  top:'65%', left:'18%', width:160, imgHeight:155, delay:0.45, tape:{ top:'-10px', right:'16px', transform:'rotate(-5deg)' },                 caption:'What The Grad',   bg:'#D6F0E8', zIndex:3 },
];

// Mobile: 2 rows of polaroids side by side, simpler layout
const MOBILE_POLAROIDS = [
  { id:1, rotation:-6,  bg:'#D6E8F5', caption:'France, 2019',    imgHeight:100 },
  { id:2, rotation:5,   bg:'#E8D5F5', caption:'First day abroad', imgHeight:100 },
  { id:3, rotation:-4,  bg:'#FFF3D6', caption:'Always lost',      imgHeight:100 },
  { id:4, rotation:7,   bg:'#F5E6D5', caption:'The big idea',     imgHeight:100 },
  { id:5, rotation:-5,  bg:'#D6F0E8', caption:'What The Grad',    imgHeight:100 },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
      const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.7)));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: '#D6E8F5',
        minHeight: '100vh',
        padding: isMobile ? '48px 5vw 64px' : '80px 5vw 100px',
        position: 'relative', overflow: 'hidden',
        transform: `translateY(${Math.max(0, 60 - progress * 60)}px)`,
        opacity: Math.min(1, progress * 1.4),
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap');`}</style>
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.25, pointerEvents:'none' }}
        viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M-100 200 C200 100 420 360 720 200 S1120 60 1540 250" stroke="#96BDD6" strokeWidth="1.5" fill="none"/>
        <path d="M-100 500 C200 400 500 620 800 480 S1200 340 1540 530" stroke="#96BDD6" strokeWidth="1.5" fill="none"/>
      </svg>

      {isMobile ? (
        // ── MOBILE LAYOUT ──
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 600, margin: '0 auto' }}>

          {/* header */}
          <p style={{ fontFamily:PD, fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#9B8B7A', marginBottom:'8px', textAlign:'center' }}>About Us</p>
          <h2 style={{ fontFamily:PD, fontSize:'clamp(22px, 6vw, 32px)', fontWeight:'700', color:'#2C1810', letterSpacing:'-0.02em', lineHeight:'1.2', marginBottom:'8px', textAlign:'center' }}>
            We&apos;re What The Grad.
          </h2>
          <h2 style={{ fontFamily:PD, fontSize:'clamp(18px, 5vw, 26px)', fontWeight:'700', color:'#E8713A', fontStyle:'italic', letterSpacing:'-0.02em', lineHeight:'1.2', marginBottom:'28px', textAlign:'center' }}>
            Your wise older sibling for career decisions.
          </h2>

          {/* polaroids grid — 2 columns on mobile */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'32px' }}>
            {MOBILE_POLAROIDS.map((pol) => (
              <div key={pol.id} style={{
                transform: `rotate(${pol.rotation}deg)`,
                filter: 'drop-shadow(0 4px 12px rgba(44,24,16,0.15))',
              }}>
                <div style={{ background:'white', padding:'7px 7px 22px', borderRadius:'1px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ width:'100%', height:`${pol.imgHeight}px`, background:pol.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:'24px', opacity:0.45 }}>📸</span>
                  </div>
                  <p style={{ fontFamily:DS, fontSize:'11px', color:'#5C4A3A', textAlign:'center', marginTop:'4px' }}>{pol.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* text content */}
          <div>
            <p style={{ fontFamily:PD, fontSize:'14px', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'12px' }}>
              A few years ago, we were exactly where you are. Two best friends. Same stream confusion. Same college chaos. Somehow we figured it out, and ended up studying in France together.
            </p>
            <p style={{ fontFamily:PD, fontSize:'14px', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'20px' }}>
              But here&apos;s the thing: we didn&apos;t have it all figured out. We just asked better questions earlier than most. So we built What The Grad — the resource we wish we&apos;d had at 16.
            </p>

            <h3 style={{ fontFamily:PD, fontSize:'15px', fontWeight:'700', color:'#2C1810', marginBottom:'8px' }}>What we actually do</h3>
            <p style={{ fontFamily:PD, fontSize:'14px', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'12px' }}>
              We help students (Class 10 → Postgrad) make the big decisions: streams, colleges, careers, abroad — through honest 1:1 conversations.
            </p>

            <h3 style={{ fontFamily:PD, fontSize:'15px', fontWeight:'700', color:'#2C1810', marginBottom:'8px' }}>Why we&apos;re different</h3>
            <p style={{ fontFamily:PD, fontSize:'14px', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'12px' }}>
              We&apos;re not a coaching class. Not a test prep company. We&apos;re the people you talk to <em>before</em> all of those.
            </p>

            <h3 style={{ fontFamily:PD, fontSize:'15px', fontWeight:'700', color:'#2C1810', marginBottom:'10px' }}>What we stand for</h3>
            {[
              { label:'Trust, not transactions.', text:'Honest advice over sales pitches.' },
              { label:'Clarity, not content.', text:"You don't need more info. You need the right conversation." },
              { label:'Real talk, not performance.', text:"We sound like your older sibling. Because we basically are." },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', gap:'8px', marginBottom:'8px', alignItems:'flex-start' }}>
                <span style={{ color:'#F5A623', fontSize:'14px', marginTop:'2px', flexShrink:0 }}>✦</span>
                <p style={{ fontFamily:PD, fontSize:'13px', color:'#5C4A3A', lineHeight:'1.7' }}>
                  <strong>{item.label}</strong> {item.text}
                </p>
              </div>
            ))}

            <div style={{ marginTop:'20px', padding:'16px 18px', background:'rgba(255,255,255,0.6)', borderRadius:'14px', borderLeft:'3px solid #F5A623' }}>
              <p style={{ fontFamily:PD, fontSize:'15px', fontWeight:'700', color:'#2C1810', marginBottom:'4px', fontStyle:'italic' }}>Slide into our DMs.</p>
              <p style={{ fontFamily:PD, fontSize:'13px', color:'#5C4A3A', lineHeight:'1.7' }}>We&apos;ll help you figure out what&apos;s next. Promise.</p>
            </div>

            <div style={{ marginTop:'24px', display:'flex', flexDirection:'column', gap:'12px' }}>
              {['Sakshi More', 'Nupoor Deore-Katare'].map((name) => (
                <div key={name}>
                  <p style={{ fontFamily:DS, fontSize:'22px', fontWeight:'700', color:'#2C1810', lineHeight:1.2 }}>{name}</p>
                  <p style={{ fontFamily:PD, fontSize:'11px', color:'#9B8B7A', letterSpacing:'0.05em', marginTop:'2px' }}>Co-founder</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      ) : (
        // ── DESKTOP LAYOUT (unchanged) ──
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', maxWidth:'1200px', margin:'0 auto', alignItems:'start', position:'relative', zIndex:2 }}>

          <div style={{ position:'relative', height:'680px' }}>
            <div style={{ position:'absolute', top:'26%', left:'4px', fontFamily:DS, fontSize:'28px', fontWeight:'600', color:'#5B8FA8', transform:'rotate(-15deg)', transformOrigin:'left center', whiteSpace:'nowrap', zIndex:20, opacity:Math.min(1,(progress-0.25)*4), textShadow:'1px 1px 0 rgba(255,255,255,0.6)' }}>The beginning</div>
            <div style={{ position:'absolute', top:'60%', right:'30px', fontFamily:DS, fontSize:'26px', fontWeight:'600', color:'#E8713A', transform:'rotate(10deg)', transformOrigin:'right center', whiteSpace:'nowrap', zIndex:20, opacity:Math.min(1,(progress-0.45)*4), textShadow:'1px 1px 0 rgba(255,255,255,0.6)' }}>How we came about</div>
            {POLAROIDS.map((pol) => {
              const pp = Math.max(0, Math.min(1, (progress - pol.delay) / 0.28));
              return (
                <div key={pol.id} style={{ position:'absolute', top:pol.top, left:pol.left, width:`${pol.width}px`, transform:`translateY(${(1-pp)*90}px) rotate(${pol.rotation}deg) scale(${0.65+pp*0.35})`, opacity:pp, zIndex:pol.zIndex, filter:'drop-shadow(0 6px 20px rgba(44,24,16,0.2))' }}>
                  <div style={{ position:'absolute', width:'44px', height:'16px', background:'rgba(30,20,10,0.22)', borderRadius:'2px', zIndex:10, ...pol.tape }}/>
                  <div style={{ background:'white', padding:'9px 9px 30px', borderRadius:'1px', boxShadow:'0 2px 8px rgba(0,0,0,0.12)' }}>
                    <div style={{ width:'100%', height:`${pol.imgHeight}px`, background:pol.bg, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                      <span style={{ fontSize:'36px', opacity:0.45 }}>📸</span>
                    </div>
                    <p style={{ fontFamily:DS, fontSize:'13px', color:'#5C4A3A', textAlign:'center', marginTop:'5px' }}>{pol.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ opacity:Math.min(1,(progress-0.35)*2.5), transform:`translateY(${Math.max(0,28-progress*45)}px)` }}>
            <p style={{ fontFamily:PD, fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#9B8B7A', marginBottom:'8px' }}>About Us</p>
            <h2 style={{ fontFamily:PD, fontSize:'clamp(26px, 3vw, 40px)', fontWeight:'700', color:'#2C1810', letterSpacing:'-0.02em', lineHeight:'1.2', marginBottom:'20px' }}>
              We&apos;re What The Grad.<br/>
              <span style={{ color:'#E8713A', fontStyle:'italic' }}>Your wise older sibling for career decisions.</span>
            </h2>
            <p style={{ fontFamily:PD, fontSize:'15px', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'14px' }}>A few years ago, we were exactly where you are. Two best friends. Same stream confusion. Same college chaos. Somehow we figured it out, and ended up studying in France together.</p>
            <p style={{ fontFamily:PD, fontSize:'15px', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'20px' }}>But here&apos;s the thing: we didn&apos;t have it all figured out. We just asked better questions earlier than most. So we built What The Grad — the resource we wish we&apos;d had at 16.</p>
            <h3 style={{ fontFamily:PD, fontSize:'16px', fontWeight:'700', color:'#2C1810', marginBottom:'10px' }}>What we actually do</h3>
            <p style={{ fontFamily:PD, fontSize:'15px', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'14px' }}>We help students (Class 10 → Postgrad) make the big decisions : streams, colleges, careers, abroad through honest 1:1 conversations.</p>
            <p style={{ fontFamily:PD, fontSize:'15px', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'20px' }}>No aptitude tests that tell you &quot;you should be an engineer.&quot; No templated advice. No jargon. Just the right questions, asked by people who&apos;ve been there.</p>
            <h3 style={{ fontFamily:PD, fontSize:'16px', fontWeight:'700', color:'#2C1810', marginBottom:'10px' }}>Why we&apos;re different</h3>
            <p style={{ fontFamily:PD, fontSize:'15px', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'14px' }}>We&apos;re not a coaching class. Not a test prep company. Not a college admission agency. We&apos;re the people you talk to <em>before</em> all of those.</p>
            <p style={{ fontFamily:PD, fontSize:'15px', color:'#5C4A3A', lineHeight:'1.8', marginBottom:'20px' }}>9 out of 10 Indian students make career decisions with zero guidance. We&apos;re here for the ones who&apos;d rather not.</p>
            <h3 style={{ fontFamily:PD, fontSize:'16px', fontWeight:'700', color:'#2C1810', marginBottom:'12px' }}>What we stand for</h3>
            {[
              { label:'Trust, not transactions.', text:'Honest advice over sales pitches.' },
              { label:'Clarity, not content.', text:"You don't need more info. You need the right conversation." },
              { label:'Real talk, not performance.', text:"We sound like your older sibling. Because we basically are." },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', gap:'10px', marginBottom:'10px', alignItems:'flex-start' }}>
                <span style={{ color:'#F5A623', fontSize:'16px', marginTop:'2px', flexShrink:0 }}>✦</span>
                <p style={{ fontFamily:PD, fontSize:'15px', color:'#5C4A3A', lineHeight:'1.7' }}><strong>{item.label}</strong> {item.text}</p>
              </div>
            ))}
            <div style={{ marginTop:'28px', padding:'20px 24px', background:'rgba(255,255,255,0.6)', borderRadius:'16px', borderLeft:'3px solid #F5A623' }}>
              <p style={{ fontFamily:PD, fontSize:'16px', fontWeight:'700', color:'#2C1810', marginBottom:'4px', fontStyle:'italic' }}>Slide into our DMs.</p>
              <p style={{ fontFamily:PD, fontSize:'14px', color:'#5C4A3A', lineHeight:'1.7' }}>We&apos;ll help you figure out what&apos;s next. Promise.</p>
            </div>
            <div style={{ marginTop:'32px', display:'flex', gap:'40px', alignItems:'flex-start' }}>
              {['Sakshi More', 'Nupoor Deore-Katare'].map((name) => (
                <div key={name}>
                  <p style={{ fontFamily:DS, fontSize:'26px', fontWeight:'700', color:'#2C1810', lineHeight:1.2 }}>{name}</p>
                  <p style={{ fontFamily:PD, fontSize:'12px', color:'#9B8B7A', letterSpacing:'0.05em', marginTop:'2px' }}>Co-founder</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
