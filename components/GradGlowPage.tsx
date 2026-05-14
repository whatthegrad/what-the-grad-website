'use client';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';

const PD = "'Playfair Display', Georgia, serif";

export default function GradGlowPage() {
  const router = useRouter();
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id: 'gradglow', name: 'GradGlow', price: '₹7,999' });
    router.push('/cart');
  };

  return (
    <div style={{ minHeight:'100vh', background:'#FFF8EC', fontFamily:PD }}>
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 48px', borderBottom:'1px solid rgba(44,24,16,0.08)', position:'sticky', top:0, background:'rgba(255,248,236,0.95)', backdropFilter:'blur(10px)', zIndex:100 }}>
        <span onClick={() => router.push('/')} style={{ cursor:'pointer', fontSize:'18px', fontWeight:'700', color:'#2C1810' }}>What The Grad</span>
        <button onClick={() => router.push('/contact')} style={{ background:'#2C1810', color:'#FFF8EC', border:'none', borderRadius:'100px', padding:'10px 24px', fontSize:'13px', fontWeight:'700', cursor:'pointer', fontFamily:PD }}>Book now</button>
      </nav>

      <div style={{ padding:'20px 48px', fontSize:'13px', color:'#9B8B7A', fontFamily:PD }}>
        <span onClick={() => router.push('/#services')} style={{ cursor:'pointer' }}>Services</span>
        <span style={{ margin:'0 8px' }}>›</span>
        <span style={{ color:'#2C1810' }}>GradGlow</span>
      </div>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px 80px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>

        <div style={{ borderRadius:'24px', background:'#FFF3D6', aspectRatio:'4/5', display:'flex', alignItems:'center', justifyContent:'center', position:'sticky', top:'100px' }}>
          <span style={{ fontSize:'80px' }}>✨</span>
        </div>

        <div style={{ paddingTop:'20px' }}>
          <p style={{ fontFamily:PD, fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#9B8B7A', marginBottom:'10px' }}>UG to PG transition</p>
          <h1 style={{ fontSize:'48px', fontWeight:'700', color:'#2C1810', letterSpacing:'-0.02em', lineHeight:'1.1', marginBottom:'16px', fontFamily:PD }}>GradGlow</h1>
          <p style={{ fontSize:'14px', color:'#9B8B7A', fontStyle:'italic', marginBottom:'24px', fontFamily:PD }}>For: Undergrads deciding between a master&apos;s, job, or career switch</p>

          <div style={{ marginBottom:'28px' }}>
            <span style={{ fontSize:'36px', fontWeight:'700', color:'#2C1810', fontFamily:PD }}>₹7,999</span>
            <span style={{ fontSize:'14px', color:'#9B8B7A', marginLeft:'10px', fontFamily:PD }}>one-time</span>
          </div>

          <p style={{ fontSize:'16px', color:'#5C4A3A', lineHeight:'1.7', marginBottom:'16px', fontFamily:PD }}>
            You&apos;re almost done with your undergraduate degree — and suddenly everyone around you seems to have a plan. A job offer, a master&apos;s admit, a startup idea. You? Not quite.
          </p>
          <p style={{ fontSize:'16px', color:'#5C4A3A', lineHeight:'1.7', marginBottom:'28px', fontFamily:PD }}>
            GradGlow is built for that exact in-between moment. We help you figure out whether a master&apos;s, a job, or a career switch is actually the right call — and then map out exactly how to get there.
          </p>

          <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#2C1810', marginBottom:'16px', fontFamily:PD }}>What&apos;s included</h3>
          {[
            '1:1 career mapping session',
            'MS vs MBA vs job pathway analysis',
            'Course and university shortlisting',
            'CV/resume feedback',
            'SOP structure and review support',
            'Written roadmap document',
          ].map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'12px', marginBottom:'12px' }}>
              <span style={{ color:'#F5A623', fontSize:'16px', marginTop:'2px', flexShrink:0 }}>•</span>
              <span style={{ fontSize:'15px', color:'#5C4A3A', lineHeight:'1.6', fontFamily:PD }}>{item}</span>
            </div>
          ))}

          <div style={{ background:'rgba(255,243,214,0.5)', borderRadius:'16px', padding:'20px 24px', margin:'28px 0', borderLeft:'3px solid #F5A623' }}>
            <h4 style={{ fontFamily:PD, fontSize:'14px', fontWeight:'700', color:'#2C1810', marginBottom:'10px' }}>This is for you if —</h4>
            {[
              "You're in your final year and still not sure what comes next",
              "You're torn between a master's and just getting a job",
              "You want to switch fields but don't know how to position yourself",
              "Everyone else seems to know what they're doing and you don't",
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'7px' }}>
                <span style={{ color:'#F5A623', fontSize:'14px', marginTop:'2px', flexShrink:0 }}>✦</span>
                <span style={{ fontSize:'14px', color:'#5C4A3A', lineHeight:'1.6', fontFamily:PD }}>{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleAdd}
            style={{ width:'100%', padding:'14px 32px', background:'#2C1810', color:'#FFF8EC', border:'none', borderRadius:'100px', fontFamily:PD, fontSize:'15px', fontWeight:'700', cursor:'pointer', marginTop:'8px', transition:'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#E8713A')}
            onMouseLeave={e => (e.currentTarget.style.background = '#2C1810')}
          >
            Add to cart — ₹7,999
          </button>
          <p style={{ fontFamily:PD, fontSize:'12px', color:'#9B8B7A', marginTop:'12px', textAlign:'center' }}>
            Not sure? <span onClick={() => router.push('/contact')} style={{ color:'#E8713A', cursor:'pointer', textDecoration:'underline' }}>Book a Discovery Call first →</span>
          </p>
        </div>
      </div>
    </div>
  );
}
