'use client';
import { useEffect, useRef, useState } from 'react';

const PD = "Playfair Display, Georgia, serif";

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
                <img src={founder.image} alt={founder.name} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}/>
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
              <img src={founder.image} alt={founder.name} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}/>
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


// ── Main FoundersSection ───────────────────────────────────────────────────
export default function FoundersSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="founders"
      style={{
        background: '#D6E8F5',
        padding: isMobile ? '48px 5vw 0' : '80px 5vw 0',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.25, pointerEvents:'none' }}
        viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M-100 200 C200 100 420 360 720 200 S1120 60 1540 250" stroke="#96BDD6" strokeWidth="1.5" fill="none"/>
        <path d="M-100 500 C200 400 500 620 800 480 S1200 340 1540 530" stroke="#96BDD6" strokeWidth="1.5" fill="none"/>
      </svg>

      <div style={{ position:'relative', zIndex:2, maxWidth: isMobile ? 600 : '1100px', margin:'0 auto' }}>
        <h2 style={{ fontFamily:PD, fontSize: isMobile ? 'clamp(22px, 6vw, 32px)' : 'clamp(28px, 4vw, 48px)', fontWeight:'700', color:'#2C1810', textAlign:'center', marginBottom: isMobile ? '8px' : '10px' }}>
          Meet our Founders
        </h2>
        <p style={{ fontFamily:PD, fontSize: isMobile ? '14px' : 'clamp(15px, 1.8vw, 20px)', fontStyle:'italic', color:'#5B8FA8', textAlign:'center', marginBottom: isMobile ? '16px' : '0' }}>
          Two friends. One leap. A whole lot of clarity to give.
        </p>
        {FOUNDERS.map((founder, i) => (
          <FounderBio key={founder.id} founder={founder} index={i} isMobile={isMobile} />
        ))}
      </div>

      {/* bottom padding */}
      <div style={{ height: isMobile ? '48px' : '80px' }}/>
    </section>
  );
}
