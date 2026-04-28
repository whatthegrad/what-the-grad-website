'use client';
import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const PD = "Playfair Display, Georgia, serif";

export default function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [message, setMessage]     = useState('');
  const [focused, setFocused]     = useState('');
  const [showForm, setShowForm]   = useState(false);

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: `1.5px solid ${focused === field ? '#E8713A' : 'rgba(44,24,16,0.12)'}`,
    background: 'rgba(255,255,255,0.6)', fontFamily: PD, fontSize: '14px',
    color: '#2C1810', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' as const,
  });

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8EC', fontFamily: PD }}>
      <Nav />

      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '60px 5vw 80px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start',
      }}>
        <div>
          <h1 style={{ fontFamily: PD, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: '700', color: '#2C1810', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '24px' }}>
            Come, let&apos;s chat
          </h1>
          <p style={{ fontFamily: PD, fontSize: '17px', fontStyle: 'italic', color: '#5C4A3A', lineHeight: '1.7', marginBottom: '32px' }}>
            Not sure where to start? That&apos;s literally fine. Just drop us a message and we&apos;ll figure it out together.
          </p>
          <div style={{ marginBottom: '40px' }}>
            <a href="mailto:whatthegrad.in@gmail.com" style={{ display: 'block', fontFamily: PD, fontSize: '15px', color: '#5C4A3A', textDecoration: 'none', marginBottom: '8px' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E8713A')} onMouseLeave={e => (e.currentTarget.style.color = '#5C4A3A')}>
              whatthegrad.in@gmail.com
            </a>
            <a href="tel:+919172771653" style={{ display: 'block', fontFamily: PD, fontSize: '15px', color: '#5C4A3A', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E8713A')} onMouseLeave={e => (e.currentTarget.style.color = '#5C4A3A')}>
              (+91) 9172771653
            </a>
          </div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(44,24,16,0.1)' }}>
            <img src="/images/contact-bg.png" alt="reach out" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '24px', padding: '40px', boxShadow: '0 8px 40px rgba(44,24,16,0.08)', border: '1px solid rgba(44,24,16,0.06)' }}>
          {showForm ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: PD, fontSize: '18px', fontWeight: '700', color: '#2C1810' }}>Complete your message ✦</h3>
                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#9B8B7A' }}>×</button>
              </div>
              <iframe width="100%" height="520px" src="https://forms.cloud.microsoft/r/kqCQ5Py0uZ?embed=true"
                frameBorder="0" marginWidth={0} marginHeight={0}
                style={{ border: 'none', borderRadius: '12px', width: '100%' }} allowFullScreen />
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: PD, fontSize: '14px', fontWeight: '700', color: '#2C1810', marginBottom: '20px', letterSpacing: '0.05em' }}>What do we call you?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontFamily: PD, fontSize: '13px', color: '#2C1810', display: 'block', marginBottom: '6px' }}>First Name <span style={{ color: '#E8713A' }}>*</span></label>
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} onFocus={() => setFocused('first')} onBlur={() => setFocused('')} style={inputStyle('first')} placeholder="Arjun" />
                </div>
                <div>
                  <label style={{ fontFamily: PD, fontSize: '13px', color: '#2C1810', display: 'block', marginBottom: '6px' }}>Last Name <span style={{ color: '#E8713A' }}>*</span></label>
                  <input value={lastName} onChange={e => setLastName(e.target.value)} onFocus={() => setFocused('last')} onBlur={() => setFocused('')} style={inputStyle('last')} placeholder="Sharma" />
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontFamily: PD, fontSize: '13px', color: '#2C1810', display: 'block', marginBottom: '6px' }}>Your Email (we don&apos;t spam, promise ;) <span style={{ color: '#E8713A' }}>*</span></label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} style={inputStyle('email')} placeholder="eg. i.have.no.idea.help@gmail.com" />
              </div>
              <div style={{ marginBottom: '28px' }}>
                <label style={{ fontFamily: PD, fontSize: '13px', color: '#2C1810', display: 'block', marginBottom: '4px' }}>What&apos;s on your mind? <span style={{ color: '#E8713A' }}>*</span></label>
                <p style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A', marginBottom: '6px' }}>A short description will help us get to know you.</p>
                <textarea value={message} onChange={e => setMessage(e.target.value)} onFocus={() => setFocused('msg')} onBlur={() => setFocused('')} rows={4} style={{ ...inputStyle('msg'), resize: 'vertical', minHeight: '100px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowForm(true)} style={{ padding: '14px 48px', background: '#2C1810', color: '#FFF8EC', border: 'none', borderRadius: '100px', fontFamily: PD, fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#E8713A')} onMouseLeave={e => (e.currentTarget.style.background = '#2C1810')}>
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
