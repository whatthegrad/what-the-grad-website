'use client';
import { useEffect, useRef, useState } from 'react';

const DS = "Dancing Script, cursive";
const PD = "Playfair Display, Georgia, serif";

const POLAROIDS = [
  { id:1, rotation:-12, top:'2%',  left:'5%',  width:170, imgHeight:165, delay:0.05, tape:{ top:'-11px', left:'50%',  transform:'translateX(-50%) rotate(-3deg)' }, caption:'France, 2019',   bg:'#D6E8F5', zIndex:3, image:'/images/about-1.jpg' },
  { id:2, rotation:8,   top:'3%',  left:'44%', width:155, imgHeight:150, delay:0.2,  tape:{ top:'-10px', right:'14px', transform:'rotate(7deg)' },                  caption:'First day abroad', bg:'#E8D5F5', zIndex:4, image:'/images/about-2.jpg' },
  { id:3, rotation:-5,  top:'36%', left:'0%',  width:145, imgHeight:140, delay:0.38, tape:{ top:'-9px',  left:'12px',  transform:'rotate(-6deg)' },                 caption:'Always lost',     bg:'#FFF3D6', zIndex:2, image:'/images/about-3.jpg' },
  { id:4, rotation:10,  top:'32%', left:'36%', width:175, imgHeight:170, delay:0.15, tape:{ top:'-11px', left:'50%',  transform:'translateX(-50%) rotate(4deg)' },  caption:'The big idea',    bg:'#F5E6D5', zIndex:5, image:'/images/about-4.jpg' },
  { id:5, rotation:-7,  top:'65%', left:'18%', width:160, imgHeight:155, delay:0.45, tape:{ top:'-10px', right:'16px', transform:'rotate(-5deg)' },                 caption:'What The Grad',   bg:'#D6F0E8', zIndex:3, image:'/images/about-5.jpg' },
];

const MOBILE_POLAROIDS = [
  { id:1, rotation:-6,  bg:'#D6E8F5', caption:'France, 2019',    imgHeight:100, image:'/images/about-1.jpg' },
  { id:2, rotation:5,   bg:'#E8D5F5', caption:'First day abroad', imgHeight:100, image:'/images/about-2.jpg' },
  { id:3, rotation:-4,  bg:'#FFF3D6', caption:'Always lost',      imgHeight:100, image:'/images/about-3.jpg' },
  { id:4, rotation:7,   bg:'#F5E6D5', caption:'The big idea',     imgHeight:100, image:'/images/about-4.jpg' },
  { id:5, rotation:-5,  bg:'#D6F0E8', caption:'What The Grad',    imgHeight:100, image:'/images/about-5.jpg' },
];

const FOUNDERS = [
  {
    id: 1,
    name: 'Sakshi More',
    role: 'Co-founder',
    edu: [
      'BSc. Agriculture, NMIMS University, India',
      'Masters in Global Management, NEOMA Business School, France',
    ],
    image: '/images/founder-sakshi.jpg',
    imageBg: '#E8D5F5',
    leftText: "I've always found it interesting how life connects dots that don't seem related at first. My journey began with a Bachelor's degree in Agriculture, took me to France for a Master's in Global Management, and eventually led me into consulting. Along the way, I had the opportunity to work across very different environments, from the wine industry and digital marketing to strategy and public sector consulting. On paper, it may seem like an unusual combination. But each experience introduced me to new perspectives, industries, and ways of thinking. Consulting, in particular, gave me a seat at tables where I was often the youngest person in the room, a reminder that some of the greatest learning happens when you're willing to step into unfamiliar spaces. Looking back, the most valuable opportunities in my journey came from staying curious and being open to paths I hadn't originally considered. That's what inspired us to create What The Grad, where students can explore possibilities, gain perspective, and make informed decisions.",
    rightText: "What excites me most about career guidance is that there has never been a more interesting time to be a student. Today, opportunities exist across industries, countries, and fields that many of us were never exposed to while growing up. Some of the most rewarding careers are often the ones students haven't even discovered yet. As a Certified Career Analyst and a Diploma holder in Educational Consulting, I enjoy helping students explore these possibilities, understand where their strengths lie, and make choices that feel both ambitious and authentic to them. Every student's journey is different, and that's what makes this work meaningful.",
  },
  {
    id: 2,
    name: 'Nupoor Deore-Katare',
    role: 'Co-founder',
    edu: [
      'BDes. Accessory Design, NIFT, India',
      'Masters in Luxury Management, NEOMA BS, France & Politecnico di Milano, Italy',
    ],
    image: '/images/founder-nupoor.jpg',
    imageBg: '#D6E8F5',
    leftText: "I didn't take the straight road, and honestly, I'm glad I didn't. I started at NIFT Gandhinagar, where design wasn't just a subject, it was a way of seeing the world. Then came two master's degrees, one from NEOMA Business School, one from Polimi Graduate School of Design, because apparently I don't believe in doing things halfway. Sprinkle in internships across industries, cities, and time zones, and what you get is someone who's sat in enough rooms, made enough mistakes, and asked enough uncomfortable questions to actually know what she's talking about. I've always believed that careers aren't straight lines, they're living, breathing things that evolve as you do. The world keeps changing, new fields keep emerging, and the worst thing you can do is box yourself in at 17. That's not a résumé. That's a point of view. And that point of view is exactly what built What The Grad.",
    rightText: "Over the years, I've come to realise that meaningful career decisions don't begin with choosing a course or a profession, they begin with understanding yourself. Every student brings a unique combination of strengths, interests, motivations, and aspirations to the table. When students take the time to recognise these qualities, career decisions often become less about following a predefined path and more about creating one that feels genuinely their own. What I enjoy most is helping students develop that self-awareness, ask the right questions, and approach their future with greater confidence and intention. Because the better you understand yourself, the easier it becomes to make decisions that align with the life you want to build.",
  },
];

// ── Founder Bio Section ────────────────────────────────────────────────────
function FounderBio({ founder, index, isMobile }: { founder: typeof FOUNDERS[0]; index: number; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  if (isMobile) {
    return (
      <div ref={ref} style={{ padding: '48px 0 16px', borderTop: index > 0 ? '1px solid rgba(44,24,16,0.07)' : 'none' }}>
        <p style={{ fontFamily:PD, fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#B0A090', marginBottom:'28px', textAlign:'center', opacity: visible ? 1 : 0, transition:'opacity 0.6s ease' }}>
          Co-founder
        </p>

        {/* photo card */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:'32px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-40px)', transition:'opacity 0.6s ease, transform 0.7s cubic-bezier(0.34,1.4,0.64,1)' }}>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', top:'-11px', left:'50%', transform:'translateX(-50%) rotate(-1.5deg)', width:'44px', height:'15px', background:'rgba(44,24,16,0.18)', borderRadius:'2px', zIndex:11 }}/>
            <div style={{ background:'white', padding:'8px 8px 44px', boxShadow:'0 16px 48px rgba(44,24,16,0.18), 0 4px 12px rgba(44,24,16,0.08)', borderRadius:'2px', width:'220px' }}>
              <div style={{ width:'204px', height:'248px', background:founder.imageBg, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={founder.image} alt={founder.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}/>
              </div>
              <div style={{ paddingTop:'12px', textAlign:'center' }}>
                <p style={{ fontFamily:PD, fontSize:'15px', fontWeight:'700', color:'#2C1810', marginBottom:'6px' }}>{founder.name}</p>
                {founder.edu.map((line, i) => (
                  <p key={i} style={{ fontFamily:PD, fontSize:'10px', color:'#9B8B7A', lineHeight:'1.6', fontStyle:'italic' }}>{line}</p>
                ))}
              </div>
            </div>
            <div style={{ position:'absolute', bottom:'-14px', left:'50%', transform:'translateX(-50%)', width:'200px', height:'16px', background:'rgba(44,24,16,0.08)', filter:'blur(12px)', borderRadius:'50%' }}/>
          </div>
        </div>

        {/* bio text */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition:'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s', marginBottom:'20px' }}>
          <p style={{ fontFamily:PD, fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#F5A623', fontWeight:'700', marginBottom:'10px' }}>My story</p>
          <p style={{ fontFamily:PD, fontSize:'14px', color:'#5C4A3A', lineHeight:'1.85', marginBottom:'24px' }}>{founder.leftText}</p>
          <p style={{ fontFamily:PD, fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#F5A623', fontWeight:'700', marginBottom:'10px' }}>What I bring</p>
          <p style={{ fontFamily:PD, fontSize:'14px', color:'#5C4A3A', lineHeight:'1.85' }}>{founder.rightText}</p>
        </div>
      </div>
    );
  }

  // ── DESKTOP ──
  return (
    <div ref={ref} style={{ padding:'90px 0 40px', borderTop: index > 0 ? '1px solid rgba(44,24,16,0.07)' : 'none' }}>
      <p style={{ fontFamily:PD, fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#B0A090', marginBottom:'56px', textAlign:'center', opacity: visible ? 1 : 0, transition:'opacity 0.6s ease' }}>
        Co-founder
      </p>

      <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', gap:'80px', maxWidth:'1000px', margin:'0 auto', alignItems:'start' }}>
        {/* photo card — sticky */}
        <div style={{ position:'sticky', top:'110px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0) rotate(0deg)' : 'translateY(-60px) rotate(-3deg)', transition:'opacity 0.6s ease, transform 0.8s cubic-bezier(0.34,1.4,0.64,1)' }}>
          <div style={{ position:'absolute', top:'-13px', left:'50%', transform:'translateX(-50%) rotate(-1.5deg)', width:'54px', height:'18px', background:'rgba(44,24,16,0.18)', borderRadius:'2px', zIndex:11 }}/>
          <div style={{ background:'white', padding:'10px 10px 24px', boxShadow:'0 20px 60px rgba(44,24,16,0.2), 0 4px 12px rgba(44,24,16,0.08)', borderRadius:'2px' }}>
            <div style={{ width:'100%', height:'340px', background:founder.imageBg, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <img src={founder.image} alt={founder.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}/>
            </div>
          </div>
          <div style={{ position:'absolute', bottom:'-18px', left:'50%', transform:'translateX(-50%)', width:'260px', height:'20px', background:'rgba(44,24,16,0.08)', filter:'blur(14px)', borderRadius:'50%' }}/>

          <div style={{ marginTop:'26px', textAlign:'center' }}>
            <p style={{ fontFamily:PD, fontSize:'22px', fontWeight:'700', color:'#2C1810', marginBottom:'10px' }}>{founder.name}</p>
            {founder.edu.map((line, i) => (
              <p key={i} style={{ fontFamily:PD, fontSize:'12px', color:'#9B8B7A', lineHeight:'1.7', fontStyle:'italic' }}>{line}</p>
            ))}
          </div>
        </div>

        {/* bio */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition:'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s', maxWidth:'620px' }}>
          <p style={{ fontFamily:PD, fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#F5A623', fontWeight:'700', marginBottom:'14px' }}>My story</p>
          <p style={{ fontFamily:PD, fontSize:'16px', color:'#5C4A3A', lineHeight:'1.95', marginBottom:'48px' }}>{founder.leftText}</p>
          <p style={{ fontFamily:PD, fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#F5A623', fontWeight:'700', marginBottom:'14px' }}>What I bring</p>
          <p style={{ fontFamily:PD, fontSize:'16px', color:'#5C4A3A', lineHeight:'1.95' }}>{founder.rightText}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main AboutSection ──────────────────────────────────────────────────────
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
        padding: isMobile ? '48px 5vw 0' : '80px 5vw 0',
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
          <p style={{ fontFamily:PD, fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#9B8B7A', marginBottom:'8px', textAlign:'center' }}>About Us</p>
          <h2 style={{ fontFamily:PD, fontSize:'clamp(22px, 6vw, 32px)', fontWeight:'700', color:'#2C1810', letterSpacing:'-0.02em', lineHeight:'1.2', marginBottom:'8px', textAlign:'center' }}>
            We&apos;re What The Grad.
          </h2>
          <h2 style={{ fontFamily:PD, fontSize:'clamp(18px, 5vw, 26px)', fontWeight:'700', color:'#E8713A', fontStyle:'italic', letterSpacing:'-0.02em', lineHeight:'1.2', marginBottom:'28px', textAlign:'center' }}>
            Your wise older sibling for career decisions.
          </h2>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'32px' }}>
            {MOBILE_POLAROIDS.map((pol) => (
              <div key={pol.id} style={{ transform: `rotate(${pol.rotation}deg)`, filter: 'drop-shadow(0 4px 12px rgba(44,24,16,0.15))' }}>
                <div style={{ background:'white', padding:'7px 7px 22px', borderRadius:'1px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ width:'100%', height:`${pol.imgHeight}px`, background:pol.bg, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                    <img src={pol.image} alt={pol.caption} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML += '<span style="font-size:24px;opacity:0.45">📸</span>'; }}/>
                  </div>
                  <p style={{ fontFamily:DS, fontSize:'11px', color:'#5C4A3A', textAlign:'center', marginTop:'4px' }}>{pol.caption}</p>
                </div>
              </div>
            ))}
          </div>

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
                <p style={{ fontFamily:PD, fontSize:'13px', color:'#5C4A3A', lineHeight:'1.7' }}><strong>{item.label}</strong> {item.text}</p>
              </div>
            ))}

            <div style={{ marginTop:'20px', padding:'16px 18px', background:'rgba(255,255,255,0.6)', borderRadius:'14px', borderLeft:'3px solid #F5A623' }}>
              <p style={{ fontFamily:PD, fontSize:'15px', fontWeight:'700', color:'#2C1810', marginBottom:'4px', fontStyle:'italic' }}>Slide into our DMs.</p>
              <p style={{ fontFamily:PD, fontSize:'13px', color:'#5C4A3A', lineHeight:'1.7' }}>We&apos;ll help you figure out what&apos;s next. Promise.</p>
            </div>
          </div>

          {/* ── FOUNDERS — below about content ── */}
          <div style={{ marginTop:'40px' }}>
            <h2 style={{ fontFamily:PD, fontSize:'clamp(22px, 6vw, 32px)', fontWeight:'700', color:'#2C1810', textAlign:'center', marginBottom:'8px' }}>
              Meet our Founders
            </h2>
            <p style={{ fontFamily:PD, fontSize:'14px', fontStyle:'italic', color:'#5B8FA8', textAlign:'center', marginBottom:'16px' }}>
              Two friends. One leap. A whole lot of clarity to give.
            </p>
            {FOUNDERS.map((founder, i) => (
              <FounderBio key={founder.id} founder={founder} index={i} isMobile={isMobile} />
            ))}
          </div>
        </div>

      ) : (
        // ── DESKTOP LAYOUT ──
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', maxWidth:'1200px', margin:'0 auto', alignItems:'start' }}>
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
                        <img src={pol.image} alt={pol.caption} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML += '<span style="font-size:36px;opacity:0.45">📸</span>'; }}/>
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
            </div>
          </div>

          {/* ── FOUNDERS — below about content ── */}
          <div style={{ maxWidth:'1100px', margin:'0 auto', paddingTop:'40px' }}>
            <h2 style={{ fontFamily:PD, fontSize:'clamp(28px, 4vw, 48px)', fontWeight:'700', color:'#2C1810', textAlign:'center', marginBottom:'10px' }}>
              Meet our Founders
            </h2>
            <p style={{ fontFamily:PD, fontSize:'clamp(15px, 1.8vw, 20px)', fontStyle:'italic', color:'#5B8FA8', textAlign:'center', marginBottom:'0' }}>
              Two friends. One leap. A whole lot of clarity to give.
            </p>
            {FOUNDERS.map((founder, i) => (
              <FounderBio key={founder.id} founder={founder} index={i} isMobile={isMobile} />
            ))}
          </div>
        </div>
      )}

      {/* bottom padding */}
      <div style={{ height: isMobile ? '48px' : '80px' }}/>
    </section>
  );
}
