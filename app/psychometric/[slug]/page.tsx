'use client';

import { useParams, useRouter, notFound } from 'next/navigation';

const PD  = "'Playfair Display', Georgia, serif";
const SANS = "'DM Sans', system-ui, sans-serif";

/* ── WhatsApp link ──────────────────────────────────────────────────
   Uses wa.me with pre-filled message per test name.
   ────────────────────────────────────────────────────────────────── */
const WA_NUMBER = '919172771653';
const buildWaUrl = (testTitle: string) => {
  const msg = `Hi What the Grad team! 👋\n\nI've just completed the payment for the ${testTitle} on your website. Could you please share the test link with me?\n\nExcited to get started! 😊`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
};

/* ── QR image path ──────────────────────────────────────────────────
   Drop your UPI / bank QR code image into  public/images/qr-payment.png
   ────────────────────────────────────────────────────────────────── */
const QR_IMAGE = '/images/qr-payment.png';

// ── test data ──────────────────────────────────────────────────────
interface TestData {
  title: string;
  label: string;
  price: string;
  forWhom: string;
  shortDesc: string;
  longDesc: string;
  includes: string[];
  tag: string;
  emoji: string;
  accent: string;
  bg: string;
}

const TESTS: Record<string, TestData> = {
  'class-2-7': {
    title: 'Career Analysis for Classes 2 to 7',
    label: 'Class 2 – 7',
    price: '₹1,999',
    forWhom: 'Students in Classes 2 to 7 and their parents',
    shortDesc: "Discover your child's natural strengths through Multiple Intelligence mapping — before the world tells them who to be.",
    longDesc: "This assessment uses the theory of Multiple Intelligences to identify your child's natural cognitive strengths. Rather than waiting for board exams to define their path, it helps parents and educators understand how a child learns best — and what kind of career direction fits them early on.",
    includes: [
      'Multiple Intelligence Assessment',
      'Personalised strength-mapping report',
      'Parent + student counselling session',
      'Age-appropriate career direction insights',
      'Learning style recommendations',
    ],
    tag: 'Multiple Intelligence Assessment',
    emoji: '🧒',
    accent: '#E8735A',
    bg: '#FDE8D8',
  },
  'class-8-10': {
    title: 'Career Analysis for Classes 8, 9 & 10',
    label: 'Class 8 – 10',
    price: '₹2,999',
    forWhom: 'Students in Classes 8 to 10 choosing subjects and streams',
    shortDesc: 'Find the most suitable career path and subjects before the board exam pressure sets in — with data, not guesswork.',
    longDesc: 'This test maps your aptitudes and interests to the right stream and subject combination before you lock in for boards. It includes a career path analysis so you know where each choice actually leads — not just for Class 11, but for college and beyond.',
    includes: [
      'Career Path + Subject Mapping',
      'Stream selection guidance',
      'Aptitude and interest profiling',
      'Post-board career road map',
      'Personalised report with counselling',
    ],
    tag: 'Career Path + Subject Mapping',
    emoji: '📚',
    accent: '#5C3D6B',
    bg: '#EDE8F6',
  },
  'class-11-12': {
    title: 'Career Analysis for Classes 11 & 12',
    label: 'Class 11 – 12',
    price: '₹3,999',
    forWhom: 'Students in Classes 11 and 12 planning college and career',
    shortDesc: 'Your stream is chosen — now chart the full road map. Career path, college options, and a step-by-step execution plan.',
    longDesc: "You've already picked your stream. Now it's about choosing the right college, the right course, and building a plan that actually gets you there. This assessment maps your strengths to specific career paths and gives you a detailed execution plan — entrance exams, application timelines, and backup options included.",
    includes: [
      'Career Road Map + Execution Plan',
      'College and course shortlisting',
      'Entrance exam planning',
      'Aptitude-career alignment report',
      'Follow-up counselling session',
    ],
    tag: 'Career Road Map + Execution Plan',
    emoji: '🎯',
    accent: '#D4A843',
    bg: '#FFF4E0',
  },
  'graduates': {
    title: 'Career Analysis for Graduates',
    label: 'Graduates',
    price: '₹4,999',
    forWhom: 'Recent graduates and final-year students unsure about next steps',
    shortDesc: 'Degree in hand, direction unclear? Map the most suitable career path and get a detailed execution plan built around you.',
    longDesc: "You've finished your degree — or you're about to — and you're not sure what comes next. This assessment identifies career paths aligned with your strengths, interests and qualifications, and gives you a concrete plan: what to apply for, where to upskill, and how to position yourself in the job market.",
    includes: [
      'Career Road Map + Execution Plan',
      'Post-graduation career path analysis',
      'Higher education vs job market guidance',
      'Skills gap identification',
      'Personalised report with counselling',
    ],
    tag: 'Career Road Map + Execution Plan',
    emoji: '🎓',
    accent: '#2E7D32',
    bg: '#E8F5E9',
  },
  'professionals': {
    title: 'Career Analysis for Professionals',
    label: 'Professionals',
    price: '₹6,999',
    forWhom: 'Early and mid-career professionals feeling stuck or considering a switch',
    shortDesc: 'Early or mid-career and feeling stuck? Get counselling built for professionals — with a clear, actionable execution plan.',
    longDesc: "You're working, but something feels off. Maybe you're bored, burnt out, or just not sure this is the right career for you. This assessment is designed specifically for working professionals — it maps where you are, identifies what would suit you better, and gives you a plan to get there without starting from scratch.",
    includes: [
      'Early & Mid-Career Counselling',
      'Career satisfaction and alignment analysis',
      'Transition planning (switch vs upskill)',
      'Industry and role recommendations',
      'Actionable execution plan with timeline',
    ],
    tag: 'Early & Mid-Career Counselling',
    emoji: '💼',
    accent: '#E8735A',
    bg: '#FDE8D8',
  },
  'professionals-industry': {
    title: 'Career Assessment for Professionals',
    label: 'Professionals · Industry',
    price: '₹6,999',
    forWhom: 'Professionals seeking industry-specific, multi-dimensional career guidance',
    shortDesc: 'Industry-specific and multi-dimensional. Discover the best opportunities within your current field — or find your path to a new one.',
    longDesc: "This is the most comprehensive professional assessment we offer. It goes beyond general career mapping and digs into your specific industry — the roles that fit your profile, the gaps you need to close, and whether pivoting to a different sector is worth it. Multi-dimensional and data-driven.",
    includes: [
      'Industry-Specific Career Assessment',
      'Multi-dimensional profiling',
      'In-sector and cross-sector opportunities',
      'Role-fit analysis with market demand',
      'Detailed career transition road map',
    ],
    tag: 'Industry-Specific · Recommended ✦',
    emoji: '🏢',
    accent: '#5C3D6B',
    bg: '#EDE8F6',
  },
  'graduates-course': {
    title: 'Career Assessment for Graduates',
    label: 'Graduates · Course',
    price: '₹4,999',
    forWhom: 'Graduates looking for course-specific, multi-dimensional career guidance',
    shortDesc: 'Course-specific and multi-dimensional. Identify careers aligned with your degree — or discover how to transition into something entirely new.',
    longDesc: "This assessment is tailored to your specific degree and coursework. It identifies careers you're already qualified for, highlights where your skills transfer to unexpected fields, and maps out exactly how to get from where you are to where you want to be — whether that's within your discipline or outside it.",
    includes: [
      'Course-Specific Career Assessment',
      'Multi-dimensional profiling',
      'Degree-to-career alignment mapping',
      'Cross-discipline transition opportunities',
      'Personalised execution plan',
    ],
    tag: 'Course-Specific · Recommended ✦',
    emoji: '📋',
    accent: '#D4A843',
    bg: '#FFF4E0',
  },
};

export default function PsychometricPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const test = TESTS[slug];
  if (!test) { notFound(); return null; }

  const waUrl = buildWaUrl(test.title);

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8EC', fontFamily: PD }}>
      {/* ── nav ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px',
        borderBottom: '1px solid rgba(44,24,16,0.08)',
        position: 'sticky', top: 0,
        background: 'rgba(255,248,236,0.95)',
        backdropFilter: 'blur(10px)', zIndex: 100,
      }}>
        <span onClick={() => router.push('/')} style={{ cursor: 'pointer', fontSize: '18px', fontWeight: '700', color: '#2C1810' }}>
          What The Grad
        </span>
        <button
          onClick={() => router.push('/contact')}
          style={{
            background: '#2C1810', color: '#FFF8EC', border: 'none',
            borderRadius: '100px', padding: '10px 24px',
            fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: PD,
          }}
        >
          Book now
        </button>
      </nav>

      {/* ── breadcrumb ── */}
      <div style={{ padding: '20px 48px', fontSize: '13px', color: '#9B8B7A', fontFamily: PD }}>
        <span onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>Home</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span onClick={() => router.push('/#psychometric')} style={{ cursor: 'pointer' }}>Psychometric Tests</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#2C1810' }}>{test.label}</span>
      </div>

      {/* ── main content ── */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 48px 80px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start',
      }}>

        {/* ─── LEFT: test info ─── */}
        <div style={{ paddingTop: '10px' }}>
          <div style={{
            display: 'inline-block', background: test.bg, color: test.accent,
            fontFamily: SANS, fontSize: '11px', fontWeight: '700',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '100px', marginBottom: '16px',
          }}>
            {test.label}
          </div>

          <h1 style={{
            fontSize: '38px', fontWeight: '700', color: '#2C1810',
            letterSpacing: '-0.02em', lineHeight: '1.15',
            marginBottom: '16px', fontFamily: PD,
          }}>
            {test.title}
          </h1>

          <p style={{
            fontSize: '14px', color: '#9B8B7A', fontStyle: 'italic',
            marginBottom: '24px', fontFamily: PD,
          }}>
            For: {test.forWhom}
          </p>

          <p style={{
            fontSize: '16px', color: '#5C4A3A', lineHeight: '1.7',
            marginBottom: '16px', fontFamily: PD,
          }}>
            {test.shortDesc}
          </p>

          <p style={{
            fontSize: '16px', color: '#5C4A3A', lineHeight: '1.7',
            marginBottom: '28px', fontFamily: PD,
          }}>
            {test.longDesc}
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#2C1810', marginBottom: '16px', fontFamily: PD }}>
            What&apos;s included
          </h3>
          {test.includes.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: test.accent, fontSize: '16px', marginTop: '2px', flexShrink: 0 }}>•</span>
              <span style={{ fontSize: '15px', color: '#5C4A3A', lineHeight: '1.6', fontFamily: PD }}>{item}</span>
            </div>
          ))}

          <div style={{
            background: `${test.bg}80`, borderRadius: '16px',
            padding: '20px 24px', margin: '28px 0',
            borderLeft: `3px solid ${test.accent}`,
          }}>
            <h4 style={{ fontFamily: PD, fontSize: '14px', fontWeight: '700', color: '#2C1810', marginBottom: '10px' }}>
              How it works
            </h4>
            {[
              'Complete the payment using the QR code',
              'Click "I have paid!" and message us on WhatsApp',
              'We verify your payment and send the test link',
              'Take the test and receive your personalised report',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '7px' }}>
                <span style={{
                  color: '#FFF8EC', background: test.accent,
                  fontSize: '11px', fontWeight: '700',
                  width: '20px', height: '20px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '2px', fontFamily: SANS,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: '14px', color: '#5C4A3A', lineHeight: '1.6', fontFamily: PD }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT: QR + pay ─── */}
        <div style={{
          position: 'sticky', top: '100px',
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '36px 32px',
          boxShadow: '0 4px 24px rgba(44,24,16,0.08), 0 1px 4px rgba(44,24,16,0.04)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>{test.emoji}</div>

          <h3 style={{ fontFamily: PD, fontSize: '20px', fontWeight: '700', color: '#2C1810', marginBottom: '4px' }}>
            {test.label}
          </h3>
          <p style={{ fontFamily: PD, fontSize: '13px', color: '#9B8B7A', marginBottom: '20px' }}>
            Psychometric Assessment
          </p>

          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '36px', fontWeight: '700', color: '#2C1810', fontFamily: PD }}>
              {test.price}
            </span>
            <span style={{ fontSize: '14px', color: '#9B8B7A', marginLeft: '8px', fontFamily: PD }}>
              one-time
            </span>
          </div>

          {/* ── QR code ── */}
          <div style={{
            width: '220px', height: '220px',
            margin: '0 auto 20px',
            borderRadius: '16px',
            border: '2px dashed rgba(44,24,16,0.12)',
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#FFFEF8',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={QR_IMAGE}
              alt="Scan to pay"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                // if image hasn't been added yet, show placeholder text
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = 'none';
                if (el.parentElement) {
                  el.parentElement.innerHTML = '<div style="padding:20px;text-align:center;color:#9B8B7A;font-size:13px;font-family:Playfair Display,serif;">QR code<br/>coming soon</div>';
                }
              }}
            />
          </div>

          <p style={{
            fontFamily: SANS, fontSize: '12px', color: '#9B8B7A',
            marginBottom: '24px', lineHeight: '1.5',
          }}>
            Scan the QR code with any UPI app to pay
          </p>

          {/* ── divider ── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            margin: '0 0 24px',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(44,24,16,0.08)' }} />
            <span style={{ fontFamily: SANS, fontSize: '11px', color: '#9B8B7A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              after payment
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(44,24,16,0.08)' }} />
          </div>

          {/* ── I have paid button ── */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              padding: '16px 32px',
              background: '#25D366',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '100px',
              fontFamily: PD,
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              textDecoration: 'none',
              textAlign: 'center',
              transition: 'background 0.2s, transform 0.15s',
              boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#1DA851';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.02)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#25D366';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
            }}
          >
            I have paid! →
          </a>

          <p style={{
            fontFamily: PD, fontSize: '12px', color: '#9B8B7A',
            marginTop: '12px', lineHeight: '1.5',
          }}>
            You&apos;ll be redirected to WhatsApp to confirm your payment. We&apos;ll verify and share the test link within minutes.
          </p>

          {/* ── trust note ── */}
          <div style={{
            background: 'rgba(37,211,102,0.06)',
            borderRadius: '12px', padding: '14px 16px',
            marginTop: '20px',
            display: 'flex', gap: '10px', alignItems: 'flex-start',
            textAlign: 'left',
          }}>
            <span style={{ fontSize: '16px', flexShrink: 0 }}>🔒</span>
            <p style={{ fontFamily: PD, fontSize: '12px', color: '#5C4A3A', lineHeight: '1.5' }}>
              Your payment is verified manually by our team. The test link is sent directly to you on WhatsApp — usually within 10 minutes during business hours.
            </p>
          </div>
        </div>
      </div>

      {/* ── mobile layout override ── */}
      <style>{`
        @media (max-width: 768px) {
          /* stack the grid vertically on mobile */
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 0 20px 60px !important;
          }
          /* un-sticky the payment card on mobile */
          div[style*="sticky"] {
            position: relative !important;
            top: auto !important;
          }
          h1 { font-size: 28px !important; }
        }
      `}</style>
    </div>
  );
}
