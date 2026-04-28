'use client';
import { useRouter } from 'next/navigation';
export default function StreamSensePage() {
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
        <span style={{ color:'#2C1810' }}>StreamSense</span>
      </div>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px 80px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>
        <div style={{ borderRadius:'24px', background:'#E8D5F5', aspectRatio:'4/5', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:'80px' }}>🎯</span>
        </div>
        <div style={{ paddingTop:'20px' }}>
          <h1 style={{ fontSize:'44px', fontWeight:'700', color:'#2C1810', letterSpacing:'-0.02em', lineHeight:'1.15', marginBottom:'20px' }}>StreamSense<br/><span style={{ fontSize:'0.75em', color:'#9B8B7A', fontStyle:'italic' }}>Stream Selection Package</span></h1>
          <div style={{ marginBottom:'28px' }}><span style={{ fontSize:'36px', fontWeight:'700', color:'#2C1810' }}>₹1499</span></div>
          <p style={{ fontSize:'16px', color:'#5C4A3A', lineHeight:'1.7', marginBottom:'16px' }}>Choosing between Science, Commerce, and Arts is one of the first big decisions of your life and most students make it based on what their friends are doing or what their parents want.</p>
          <p style={{ fontSize:'16px', color:'#5C4A3A', lineHeight:'1.7', marginBottom:'32px' }}>StreamSense helps you choose based on who you actually are.</p>
          {['Diagnostic questionnaire (sent before your session)','Interest and aptitude mapping across 7 dimensions','60-minute 1:1 counselling session','Stream fit analysis','Personalised roadmap with sample careers per stream','Written summary document'].map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'12px', marginBottom:'12px' }}>
              <span style={{ color:'#A855D4', fontSize:'16px', marginTop:'2px' }}>•</span>
              <span style={{ fontSize:'15px', color:'#5C4A3A', lineHeight:'1.6' }}>{item}</span>
            </div>
          ))}
          <div style={{ display:'flex', gap:'16px', alignItems:'center', marginTop:'32px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'16px', border:'1px solid rgba(44,24,16,0.15)', borderRadius:'100px', padding:'10px 20px' }}>
              <span style={{ cursor:'pointer', fontSize:'18px', color:'#2C1810' }}>−</span>
              <span style={{ fontSize:'16px', color:'#2C1810' }}>1</span>
              <span style={{ cursor:'pointer', fontSize:'18px', color:'#2C1810' }}>+</span>
            </div>
            <button style={{ flex:1, padding:'14px 32px', background:'#2C1810', color:'#FFF8EC', border:'none', borderRadius:'100px', fontFamily:"'Playfair Display', Georgia, serif", fontSize:'15px', fontWeight:'700', cursor:'pointer' }}>Count me in!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
