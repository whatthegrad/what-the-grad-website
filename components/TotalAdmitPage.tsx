'use client';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';

const PD = "'Playfair Display', Georgia, serif";

export default function TotalAdmitPage() {
  const router = useRouter();
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id: 'total-admit', name: 'Total Admit', price: '₹13,999' });
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
        <span style={{ color:'#2C1810' }}>Total Admit</span>
      </div>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px 80px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>

        <div style={{ borderRadius:'24px', background:'#2C1810', aspectRatio:'4/5', display:'flex', alignItems:'center', justifyContent:'center', position:'sticky', top:'100px' }}>
          <span style={{ fontSize:'80px' }}>🏆</span>
        </div>

        <div style={{ paddingTop:'20px' }}>
          <div style={{ display:'inline-block', background:'#F5A623', color:'#2C1810', fontFamily:PD, fontSize:'11px', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', padding:'5px 14px', borderRadius:'100px', marginBottom:'16px' }}>
            ★ Premium
          </div>
          <p style={{ fontFamily:PD, fontSize:'12px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#9B8B7A', marginBottom:'10px' }}>Full application support</p>
          <h1 style={{ fontSize:'48px', fontWeight:'700', color:'#2C1810', letterSpacing:'-0.02em', lineHeight:'1.1', marginBottom:'16px', fontFamily:PD }}>Total Admit</h1>
          <p style={{ fontSize:'14px', color:'#9B8B7A', fontStyle:'italic', marginBottom:'24px', fontFamily:PD }}>For: Students applying to master&apos;s or competitive UG programs abroad or in India</p>

          <div style={{ marginBottom:'28px' }}>
            <span style={{ fontSize:'36px', fontWeight:'700', color:'#2C1810', fontFamily:PD }}>₹13,999</span>
            <span style={{ fontSize:'14px', color:'#9B8B7A', marginLeft:'10px', fontFamily:PD }}>one-time</span>
          </div>

          <p style={{ fontSize:'16px', color:'#5C4A3A', lineHeight:'1.7', marginBottom:'16px', fontFamily:PD }}>
            Applications are stressful. SOPs feel impossible. You&apos;re not sure which universities to apply to, what makes a good LOR, or how to frame your story.
          </p>
          <p style={{ fontSize:'16px', color:'#5C4A3A', lineHeight:'1.7', marginBottom:'28px', fontFamily:PD }}>
            Total Admit is full-service support — from picking your universities to reviewing your final documents before submission. We&apos;re with you the whole way.
          </p>

          <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#2C1810', marginBottom:'16px', fontFamily:PD }}>What&apos;s included</h3>
          {[
            'University selection (3–5 programs)',
            'SOP writing support — brainstorm + 2 rounds of editing',
            'CV formatting and editing',
            'LOR strategy and template',
            'Application calendar and checklist',
            'WhatsApp/email support for 1 month',
            'Final review before submission',
          ].map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'12px', marginBottom:'12px' }}>
              <span style={{ color:'#F5A623', fontSize:'16px', marginTop:'2px', flexShrink:0 }}>•</span>
              <span style={{ fontSize:'15px', color:'#5C4A3A', lineHeight:'1.6', fontFamily:PD }}>{item}</span>
            </div>
          ))}

          <div style={{ background:'rgba(44,24,16,0.04)', borderRadius:'16px', padding:'20px 24px', margin:'28px 0', borderLeft:'3px solid #2C1810' }}>
            <h4 style={{ fontFamily:PD, fontSize:'14px', fontWeight:'700', color:'#2C1810', marginBottom:'10px' }}>This is for you if —</h4>
            {[
              "You're applying to master's or competitive UG programs and feel overwhelmed",
              "You've started your SOP and it's just not working",
              "You want a second pair of eyes on everything before you hit submit",
              "You need someone to hold the timeline and keep you accountable",
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'7px' }}>
                <span style={{ color:'#F5A623', fontSize:'14px', marginTop:'2px', flexShrink:0 }}>✦</span>
                <span style={{ fontSize:'14px', color:'#5C4A3A', lineHeight:'1.6', fontFamily:PD }}>{item}</span>
              </div>
            ))}
          </div>

          {/* trust note */}
          <div style={{ background:'rgba(245,166,35,0.1)', borderRadius:'12px', padding:'16px 20px', marginBottom:'24px', display:'flex', gap:'12px', alignItems:'flex-start' }}>
            <span style={{ fontSize:'20px', flexShrink:0 }}>💬</span>
            <p style={{ fontFamily:PD, fontSize:'13px', color:'#5C4A3A', lineHeight:'1.6', fontStyle:'italic' }}>
              This is our most involved package. Before you add to cart, we recommend a quick Discovery Call so we can confirm this is the right fit for your timeline and goals.
            </p>
          </div>

          <button
            onClick={handleAdd}
            style={{ width:'100%', padding:'14px 32px', background:'#2C1810', color:'#FFF8EC', border:'none', borderRadius:'100px', fontFamily:PD, fontSize:'15px', fontWeight:'700', cursor:'pointer', marginTop:'4px', transition:'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#E8713A')}
            onMouseLeave={e => (e.currentTarget.style.background = '#2C1810')}
          >
            Add to cart — ₹13,999
          </button>
          <p style={{ fontFamily:PD, fontSize:'12px', color:'#9B8B7A', marginTop:'12px', textAlign:'center' }}>
            Want to talk first? <span onClick={() => router.push('/contact')} style={{ color:'#E8713A', cursor:'pointer', textDecoration:'underline' }}>Book a Discovery Call →</span>
          </p>
        </div>
      </div>
    </div>
  );
}
