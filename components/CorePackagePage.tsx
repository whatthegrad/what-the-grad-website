'use client';
import { useRouter } from 'next/navigation';
export default function CorePackagePage() {
  const router = useRouter();
  return (
    <div style={{ minHeight:'100vh', background:'#FFF8EC', fontFamily:"'Playfair Display', Georgia, serif" }}>
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 48px', borderBottom:'1px solid rgba(44,24,16,0.08)', position:'sticky', top:0, background:'rgba(255,248,236,0.95)', backdropFilter:'blur(10px)', zIndex:100 }}>
        <span onClick={() => router.push('/')} style={{ cursor:'pointer', fontSize:'18px', fontWeight:'700', color:'#2C1810' }}>What The Grad</span>
        <button style={{ background:'#2C1810', color:'#FFF8EC', border:'none', borderRadius:'100px', padding:'10px 24px', fontSize:'13px', fontWeight:'700', cursor:'pointer', fontFamily:"'Playfair Display', Georgia, serif" }}>Book now</button>
      </nav>
      <div style={{ padding:'20px 48px', fontSize:'13px', color:'#9B8B7A' }}>
        <span onClick={() => router.push('/')} style={{ cursor:'pointer' }}>Services</span>
        <span style={{ margin:'0 8px' }}>›</span>
        <span style={{ color:'#2C1810' }}>Core Package</span>
      </div>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px 80px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>
        <div style={{ borderRadius:'24px', background:'#F5A623', aspectRatio:'4/5', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
          <div style={{ position:'absolute', top:'16px', left:'16px', background:'#2C1810', color:'#F5A623', fontSize:'11px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', padding:'5px 14px', borderRadius:'100px' }}>★ Recommended</div>
          <span style={{ fontSize:'80px' }}>⭐</span>
        </div>
        <div style={{ paddingTop:'20px' }}>
          <div style={{ display:'inline-block', background:'#F5A623', color:'#2C1810', fontSize:'11px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', padding:'5px 14px', borderRadius:'100px', marginBottom:'16px' }}>★ Recommended</div>
          <h1 style={{ fontSize:'48px', fontWeight:'700', color:'#2C1810', letterSpacing:'-0.02em', lineHeight:'1.1', marginBottom:'20px' }}>Core Package</h1>
          <div style={{ marginBottom:'28px' }}><span style={{ fontSize:'36px', fontWeight:'700', color:'#2C1810' }}>₹3499</span></div>
          <p style={{ fontSize:'16px', color:'#5C4A3A', lineHeight:'1.7', marginBottom:'32px' }}>The complete What The Grad experience. A structured deep-dive that gives you full clarity on who you are, where you are going, and the exact steps to get there.</p>
          {['28-question diagnostic questionnaire (pre-session)','Full pattern analysis before the session','75-minute 1:1 deep-dive session','Top 2–3 career directions with reasoning','Elimination of unsuitable paths','Immediate next steps (sequenced)','Personalised written summary document sent within 48 hours'].map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'12px', marginBottom:'12px' }}>
              <span style={{ color:'#F5A623', fontSize:'16px', marginTop:'2px' }}>•</span>
              <span style={{ fontSize:'15px', color:'#5C4A3A', lineHeight:'1.6' }}>{item}</span>
            </div>
          ))}
          <div style={{ display:'flex', gap:'16px', alignItems:'center', marginTop:'32px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'16px', border:'1px solid rgba(44,24,16,0.15)', borderRadius:'100px', padding:'10px 20px' }}>
              <span style={{ cursor:'pointer', fontSize:'18px', color:'#2C1810' }}>−</span>
              <span style={{ fontSize:'16px', color:'#2C1810' }}>1</span>
              <span style={{ cursor:'pointer', fontSize:'18px', color:'#2C1810' }}>+</span>
            </div>
            <button style={{ flex:1, padding:'14px 32px', background:'#F5A623', color:'#2C1810', border:'none', borderRadius:'100px', fontFamily:"'Playfair Display', Georgia, serif", fontSize:'15px', fontWeight:'700', cursor:'pointer' }}>Get started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
