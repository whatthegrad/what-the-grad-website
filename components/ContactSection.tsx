'use client';
import { useState } from 'react';

const PD = "Playfair Display, Georgia, serif";

export default function ContactSection() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [message, setMessage]     = useState('');
  const [phone, setPhone]         = useState('');
  const [showForm, setShowForm]   = useState(false);
  const [focused, setFocused]     = useState('');

  const handleSend = () => {
    setShowForm(true);
  };

  const inputStyle = (field: string) => ({
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: `1.5px solid ${focused === field ? '#E8713A' : 'rgba(44,24,16,0.12)'}`,
    background: '#FFFEF5',
    fontFamily: PD,
    fontSize: '14px',
    color: '#2C1810',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box' as const,
  });

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Gingham fading to butter yellow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/gingham-bg.jpg)',
        backgroundSize: '300px',
        backgroundRepeat: 'repeat',
        opacity: 0.3,
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255,248,236,0) 0%, #FFF8EC 35%)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 5vw',
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: '80px',
        alignItems: 'center',
      }}>

        {/* LEFT — headline */}
        <div>
          <h2 style={{
            fontFamily: PD,
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: '700',
            color: '#2C1810',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}>
            Come, let&apos;s chat
          </h2>
          <p style={{
            fontFamily: PD,
            fontSize: '18px',
            fontStyle: 'italic',
            color: '#5C4A3A',
            lineHeight: '1.7',
          }}>
            Not sure where to start? That&apos;s literally fine. Just drop us a message and we&apos;ll figure it out together.
          </p>

          {/* Decorative sparkles */}
          <div style={{ marginTop: '48px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: '#E8837A', fontSize: '20px' }}>✦</span>
            <span style={{ color: '#F5A623', fontSize: '14px' }}>✦</span>
            <span style={{ color: '#9BB5C8', fontSize: '18px' }}>✦</span>
          </div>
        </div>

        {/* RIGHT — form card */}
        <div style={{
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '24px',
          padding: '40px 40px 36px',
          boxShadow: '0 8px 40px rgba(44,24,16,0.1)',
          border: '1px solid rgba(44,24,16,0.06)',
        }}>

          {/* Microsoft Form embed — shown after Send */}
          {showForm ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: PD, fontSize: '18px', fontWeight: '700', color: '#2C1810' }}>
                  Complete your message ✦
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#9B8B7A' }}
                >
                  ×
                </button>
              </div>
              <iframe
                width="100%"
                height="520px"
                src="https://forms.cloud.microsoft/r/kqCQ5Py0uZ?embed=true"
                frameBorder="0"
                marginWidth={0}
                marginHeight={0}
                style={{ border: 'none', borderRadius: '12px', width: '100%' }}
                allowFullScreen
              />
            </div>
          ) : (
            <>
              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontFamily: PD, fontSize: '13px', color: '#2C1810', display: 'block', marginBottom: '6px' }}>
                    First Name <span style={{ color: '#E8713A' }}>*</span>
                  </label>
                  <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    onFocus={() => setFocused('first')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('first')}
                    placeholder="Arjun"
                  />
                </div>
                <div>
                  <label style={{ fontFamily: PD, fontSize: '13px', color: '#2C1810', display: 'block', marginBottom: '6px' }}>
                    Last Name <span style={{ color: '#E8713A' }}>*</span>
                  </label>
                  <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    onFocus={() => setFocused('last')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('last')}
                    placeholder="Sharma"
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontFamily: PD, fontSize: '13px', color: '#2C1810', display: 'block', marginBottom: '6px' }}>
                  Your Email (we don&apos;t spam, promise ;) <span style={{ color: '#E8713A' }}>*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  style={inputStyle('email')}
                  placeholder="eg. i.have.no.idea.help@gmail.com"
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontFamily: PD, fontSize: '13px', color: '#2C1810', display: 'block', marginBottom: '6px' }}>
                  What&apos;s on your mind?
                </label>
                <p style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A', marginBottom: '6px' }}>
                  A short message will help us know you :)
                </p>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onFocus={() => setFocused('msg')}
                  onBlur={() => setFocused('')}
                  rows={4}
                  style={{
                    ...inputStyle('msg'),
                    resize: 'vertical',
                    minHeight: '100px',
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ fontFamily: PD, fontSize: '13px', color: '#2C1810', display: 'block', marginBottom: '4px' }}>
                  Phone <span style={{ color: '#E8713A' }}>*</span>
                </label>
                <p style={{ fontFamily: PD, fontSize: '12px', color: '#9B8B7A', marginBottom: '8px' }}>
                  The one you actually pick up ;)
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '10px' }}>
                  <select
                    onFocus={() => setFocused('country')}
                    onBlur={() => setFocused('')}
                    style={{
                      ...inputStyle('country'),
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232C1810' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center',
                      cursor: 'pointer',
                    }}
                  >
                    <option>India (+91)</option>
                    <option>USA (+1)</option>
                    <option>UK (+44)</option>
                    <option>UAE (+971)</option>
                    <option>Australia (+61)</option>
                    <option>Canada (+1)</option>
                    <option>France (+33)</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('phone')}
                    placeholder="+91"
                  />
                </div>
              </div>

              {/* Send button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleSend}
                  style={{
                    padding: '14px 48px',
                    background: '#2C1810',
                    color: '#FFF8EC',
                    border: 'none',
                    borderRadius: '100px',
                    fontFamily: PD,
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    transition: 'transform 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
