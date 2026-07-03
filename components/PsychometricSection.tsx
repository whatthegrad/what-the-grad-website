'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ── brand fonts matching the rest of the site ──────────────────────────────
const PD   = 'Playfair Display, Georgia, serif';   // headlines (replaces Fraunces)
const SANS = 'DM Sans, system-ui, sans-serif';      // body      (replaces Sora)
const HAND = 'Caveat, cursive';                     // handwritten (kept)

// ── card data (exact from HTML) ────────────────────────────────────────────
interface Assessment {
  label: string;
  labelBg: string;
  labelColor: string;
  washiColor: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  scene: string;
}

const ASSESSMENTS: Assessment[] = [
  {
    label: 'Class 2 – 7',
    labelBg: '#FDE8D8', labelColor: '#C4562A',
    washiColor: 'rgba(232,115,90,0.5)',
    title: 'Career Analysis for Classes 2 to 7',
    desc: "Discover your child's natural strengths through Multiple Intelligence mapping — before the world tells them who to be.",
    tag: 'Multiple Intelligence Assessment', tagColor: '#E8735A',
    scene: `<svg viewBox="0 0 230 172" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="230" height="172" fill="#FEF6EE"/>
      <circle cx="40" cy="60" r="28" fill="#F5C842" opacity="0.35"/>
      <circle cx="190" cy="40" r="20" fill="#E8735A" opacity="0.25"/>
      <circle cx="115" cy="86" r="38" fill="#FDE8D8" opacity="0.8"/>
      <text x="115" y="100" textAnchor="middle" fontSize="38">🧠</text>
      <path d="M30 140 Q60 120 90 135 Q115 148 140 130 Q165 115 200 132 L200 172 L30 172Z" fill="#FAD9C0" opacity="0.6"/>
      <path d="M0 155 Q50 142 115 150 Q175 158 230 145 L230 172 L0 172Z" fill="#F5C4A0" opacity="0.5"/>
      <circle cx="55" cy="125" r="5" fill="#E8735A" opacity="0.4"/>
      <circle cx="170" cy="118" r="4" fill="#D4A843" opacity="0.4"/>
      <path d="M95 55 L100 45 L105 55 L115 55 L107 62 L110 72 L100 66 L90 72 L93 62 L85 55Z" fill="#F5C842" opacity="0.7"/>
    </svg>`,
  },
  {
    label: 'Class 8 – 10',
    labelBg: '#EDE8F6', labelColor: '#3D1F6E',
    washiColor: 'rgba(92,61,107,0.45)',
    title: 'Career Analysis for Classes 8, 9 & 10',
    desc: 'Find the most suitable career path and subjects before the board exam pressure sets in — with data, not guesswork.',
    tag: 'Career Path + Subject Mapping', tagColor: '#5C3D6B',
    scene: `<svg viewBox="0 0 230 172" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="230" height="172" fill="#F5F0FC"/>
      <rect x="18" y="100" width="22" height="55" rx="2" fill="#5C3D6B" opacity="0.5"/>
      <rect x="50" y="80" width="22" height="75" rx="2" fill="#7A5BA0" opacity="0.55"/>
      <rect x="82" y="58" width="22" height="97" rx="2" fill="#5C3D6B" opacity="0.65"/>
      <rect x="114" y="38" width="22" height="117" rx="2" fill="#D4A843" opacity="0.7"/>
      <rect x="146" y="22" width="22" height="133" rx="2" fill="#5C3D6B" opacity="0.75"/>
      <rect x="178" y="10" width="22" height="145" rx="2" fill="#E8735A" opacity="0.65"/>
      <polyline points="29,98 61,78 93,56 125,36 157,20 189,8" stroke="#E8735A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="29" cy="98" r="3.5" fill="#E8735A"/>
      <circle cx="61" cy="78" r="3.5" fill="#E8735A"/>
      <circle cx="93" cy="56" r="3.5" fill="#E8735A"/>
      <circle cx="125" cy="36" r="3.5" fill="#E8735A"/>
      <circle cx="157" cy="20" r="3.5" fill="#E8735A"/>
      <circle cx="189" cy="8" r="3.5" fill="#E8735A"/>
      <line x1="18" y1="155" x2="212" y2="155" stroke="#5C3D6B" strokeWidth="1" opacity="0.2"/>
      <line x1="18" y1="10" x2="18" y2="155" stroke="#5C3D6B" strokeWidth="1" opacity="0.2"/>
    </svg>`,
  },
  {
    label: 'Class 11 – 12',
    labelBg: '#FFF4E0', labelColor: '#9A6800',
    washiColor: 'rgba(212,168,67,0.55)',
    title: 'Career Analysis for Classes 11 & 12',
    desc: 'Your stream is chosen — now chart the full road map. Career path, college options, and a step-by-step execution plan.',
    tag: 'Career Road Map + Execution Plan', tagColor: '#D4A843',
    scene: `<svg viewBox="0 0 230 172" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="230" height="172" fill="#FFFBEE"/>
      <rect x="0" y="130" width="230" height="42" fill="#C8DFC8" opacity="0.5"/>
      <rect x="0" y="148" width="230" height="24" fill="#A8C8A8" opacity="0.45"/>
      <polygon points="115,18 35,130 195,130" fill="#5C7A5C" opacity="0.8"/>
      <polygon points="115,18 65,130 165,130" fill="#4A6B4A" opacity="0.88"/>
      <polygon points="115,18 85,130 145,130" fill="#3D5E3D" opacity="0.92"/>
      <line x1="115" y1="2" x2="115" y2="18" stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="115" y="0" width="20" height="11" rx="1.5" fill="#D4A843"/>
      <path d="M0 148 Q58 138 115 143 Q172 148 230 140 L230 172 L0 172Z" fill="#8FAF8F" opacity="0.4"/>
      <circle cx="42" cy="50" r="4" fill="#D4A843" opacity="0.35"/>
      <circle cx="185" cy="62" r="3" fill="#E8735A" opacity="0.3"/>
      <circle cx="170" cy="38" r="5" fill="#D4A843" opacity="0.3"/>
    </svg>`,
  },
  {
    label: 'Graduates',
    labelBg: '#E8F5E9', labelColor: '#1B5E20',
    washiColor: 'rgba(46,125,50,0.38)',
    title: 'Career Analysis for Graduates',
    desc: 'Degree in hand, direction unclear? Map the most suitable career path and get a detailed execution plan built around you.',
    tag: 'Career Road Map + Execution Plan', tagColor: '#2E7D32',
    scene: `<svg viewBox="0 0 230 172" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="230" height="172" fill="#F0F8F0"/>
      <circle cx="48" cy="86" r="42" fill="#A8D8A8" opacity="0.3"/>
      <circle cx="115" cy="86" r="42" fill="#5C3D6B" opacity="0.18"/>
      <circle cx="182" cy="86" r="42" fill="#D4A843" opacity="0.25"/>
      <circle cx="48" cy="86" r="28" fill="#A8D8A8" opacity="0.4"/>
      <circle cx="115" cy="86" r="28" fill="#7A5BA0" opacity="0.22"/>
      <circle cx="182" cy="86" r="28" fill="#D4A843" opacity="0.32"/>
      <ellipse cx="115" cy="86" rx="14" ry="14" fill="#fff" opacity="0.6"/>
      <text x="115" y="92" textAnchor="middle" fontSize="14" fill="#3D2A0A" opacity="0.8">🎓</text>
      <path d="M20 155 Q80 142 115 148 Q150 154 210 144 L230 172 L0 172Z" fill="#C8DFC8" opacity="0.35"/>
    </svg>`,
  },
  {
    label: 'Professionals',
    labelBg: '#FDE8D8', labelColor: '#8B2500',
    washiColor: 'rgba(232,115,90,0.48)',
    title: 'Career Analysis for Professionals',
    desc: 'Early or mid-career and feeling stuck? Get counselling built for professionals — with a clear, actionable execution plan.',
    tag: 'Early & Mid-Career Counselling', tagColor: '#E8735A',
    scene: `<svg viewBox="0 0 230 172" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="230" height="172" fill="#FEF3EE"/>
      <rect x="25" y="55" width="80" height="95" rx="4" fill="#E8735A" opacity="0.2"/>
      <rect x="30" y="60" width="70" height="85" rx="3" fill="#fff" opacity="0.7"/>
      <line x1="38" y1="78" x2="92" y2="78" stroke="#E8735A" strokeWidth="1.5" opacity="0.5"/>
      <line x1="38" y1="90" x2="92" y2="90" stroke="#E8735A" strokeWidth="1.5" opacity="0.4"/>
      <line x1="38" y1="102" x2="75" y2="102" stroke="#E8735A" strokeWidth="1.5" opacity="0.35"/>
      <line x1="38" y1="114" x2="85" y2="114" stroke="#E8735A" strokeWidth="1.5" opacity="0.3"/>
      <circle cx="65" cy="48" r="18" fill="#E8735A" opacity="0.7"/>
      <circle cx="65" cy="44" r="10" fill="#fff" opacity="0.6"/>
      <ellipse cx="65" cy="60" rx="14" ry="8" fill="#E8735A" opacity="0.5"/>
      <path d="M125 86 L185 50 L195 86 L185 122 Z" fill="#D4A843" opacity="0.25"/>
      <path d="M130 86 L185 55 L192 86 L185 117 Z" fill="#D4A843" opacity="0.35"/>
      <polyline points="125,120 145,95 165,108 185,72 205,85" stroke="#5C3D6B" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="185" cy="72" r="4" fill="#5C3D6B" opacity="0.8"/>
    </svg>`,
  },
  {
    label: 'Professionals · Industry',
    labelBg: '#EDE8F6', labelColor: '#3D1F6E',
    washiColor: 'rgba(92,61,107,0.5)',
    title: 'Career Assessment for Professionals',
    desc: 'Industry-specific and multi-dimensional. Discover the best opportunities within your current field — or find your path to a new one.',
    tag: 'Industry-Specific · Recommended ✦', tagColor: '#5C3D6B',
    scene: `<svg viewBox="0 0 230 172" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="230" height="172" fill="#F2EEF8"/>
      <circle cx="115" cy="86" r="60" fill="none" stroke="#5C3D6B" strokeWidth="1" opacity="0.15"/>
      <circle cx="115" cy="86" r="44" fill="none" stroke="#5C3D6B" strokeWidth="1" opacity="0.2"/>
      <circle cx="115" cy="86" r="28" fill="none" stroke="#5C3D6B" strokeWidth="1" opacity="0.25"/>
      <circle cx="115" cy="86" r="12" fill="#5C3D6B" opacity="0.7"/>
      <line x1="115" y1="26" x2="115" y2="146" stroke="#5C3D6B" strokeWidth="0.8" opacity="0.15"/>
      <line x1="55" y1="86" x2="175" y2="86" stroke="#5C3D6B" strokeWidth="0.8" opacity="0.15"/>
      <circle cx="115" cy="42" r="7" fill="#E8735A" opacity="0.85"/>
      <circle cx="159" cy="86" r="7" fill="#D4A843" opacity="0.85"/>
      <circle cx="115" cy="130" r="7" fill="#5C3D6B" opacity="0.75"/>
      <circle cx="71" cy="86" r="7" fill="#E8735A" opacity="0.75"/>
      <circle cx="148" cy="53" r="5" fill="#D4A843" opacity="0.65"/>
      <circle cx="148" cy="119" r="5" fill="#5C3D6B" opacity="0.6"/>
      <circle cx="82" cy="53" r="5" fill="#E8735A" opacity="0.6"/>
      <circle cx="82" cy="119" r="5" fill="#D4A843" opacity="0.6"/>
      <polygon points="115,80 121,86 115,92 109,86" fill="#fff" opacity="0.9"/>
    </svg>`,
  },
  {
    label: 'Graduates · Course',
    labelBg: '#FFF4E0', labelColor: '#9A6800',
    washiColor: 'rgba(212,168,67,0.5)',
    title: 'Career Assessment for Graduates',
    desc: 'Course-specific and multi-dimensional. Identify careers aligned with your degree — or discover how to transition into something entirely new.',
    tag: 'Course-Specific · Recommended ✦', tagColor: '#D4A843',
    scene: `<svg viewBox="0 0 230 172" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="230" height="172" fill="#FFFBEE"/>
      <rect x="18" y="30" width="58" height="78" rx="3" fill="#D4A843" opacity="0.18"/>
      <rect x="22" y="34" width="50" height="70" rx="2" fill="#fff" opacity="0.65"/>
      <rect x="28" y="42" width="38" height="4" rx="1" fill="#D4A843" opacity="0.5"/>
      <rect x="28" y="52" width="30" height="3" rx="1" fill="#D4A843" opacity="0.35"/>
      <rect x="28" y="60" width="34" height="3" rx="1" fill="#D4A843" opacity="0.3"/>
      <rect x="28" y="68" width="26" height="3" rx="1" fill="#D4A843" opacity="0.25"/>
      <rect x="86" y="18" width="58" height="90" rx="3" fill="#E8735A" opacity="0.18"/>
      <rect x="90" y="22" width="50" height="82" rx="2" fill="#fff" opacity="0.65"/>
      <rect x="96" y="32" width="38" height="4" rx="1" fill="#E8735A" opacity="0.5"/>
      <rect x="96" y="42" width="30" height="3" rx="1" fill="#E8735A" opacity="0.35"/>
      <rect x="96" y="52" width="34" height="3" rx="1" fill="#E8735A" opacity="0.3"/>
      <rect x="96" y="62" width="22" height="3" rx="1" fill="#E8735A" opacity="0.25"/>
      <rect x="96" y="72" width="28" height="3" rx="1" fill="#E8735A" opacity="0.2"/>
      <rect x="154" y="30" width="58" height="78" rx="3" fill="#5C3D6B" opacity="0.18"/>
      <rect x="158" y="34" width="50" height="70" rx="2" fill="#fff" opacity="0.65"/>
      <rect x="164" y="42" width="38" height="4" rx="1" fill="#5C3D6B" opacity="0.45"/>
      <rect x="164" y="52" width="30" height="3" rx="1" fill="#5C3D6B" opacity="0.3"/>
      <rect x="164" y="60" width="34" height="3" rx="1" fill="#5C3D6B" opacity="0.25"/>
      <polyline points="47,108 115,140 183,108" stroke="#D4A843" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
      <circle cx="47" cy="108" r="3" fill="#D4A843" opacity="0.7"/>
      <circle cx="115" cy="140" r="5" fill="#E8735A" opacity="0.8"/>
      <circle cx="183" cy="108" r="3" fill="#5C3D6B" opacity="0.7"/>
      <path d="M0 155 Q58 145 115 150 Q172 155 230 148 L230 172 L0 172Z" fill="#FAE8C0" opacity="0.35"/>
    </svg>`,
  },
];

const CARD_W   = 230;
const CARD_MX  = 28;
const CARD_STEP = CARD_W + CARD_MX * 2;

export default function PsychometricSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);

  const currentOffsetRef  = useRef(0);
  const targetOffsetRef   = useRef(0);
  const isDraggingRef     = useRef(false);
  const dragStartXRef     = useRef(0);
  const dragStartOffRef   = useRef(0);
  const velocityRef       = useRef(0);
  const lastXRef          = useRef(0);
  const lastTimeRef       = useRef(0);
  const rafIdRef          = useRef<number | null>(null);
  const sparklesRef       = useRef<Array<{x:number;y:number;size:number;color:string;vx:number;vy:number;life:number}>>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  // ── helpers ──────────────────────────────────────────────────────────────
  const getTargetOffset = useCallback((index: number) => {
    const vw = viewportRef.current?.offsetWidth ?? 0;
    return vw / 2 - CARD_W / 2 - CARD_MX - index * CARD_STEP;
  }, []);

  const updateCardScales = useCallback(() => {
    const vw = viewportRef.current?.offsetWidth ?? 0;
    const viewCentre = -currentOffsetRef.current + vw / 2 - CARD_MX;
    ASSESSMENTS.forEach((_, i) => {
      const el = document.getElementById(`wtg-card-${i}`);
      if (!el) return;
      const cardCentre = i * CARD_STEP + CARD_W / 2;
      const dist = Math.abs(cardCentre - viewCentre);
      const t = Math.min(dist / (CARD_STEP * 1.5), 1);
      el.style.transform = `scale(${1 - t * 0.18}) rotateZ(${(cardCentre - viewCentre) * 0.006}deg)`;
      el.style.opacity   = String(1 - t * 0.5);
      el.style.filter    = t > 0.1 ? `blur(${t * 1.8}px) brightness(${1 - t * 0.06})` : 'none';
    });
  }, []);

  const startRaf = useCallback(() => {
    if (rafIdRef.current) return;
    const animate = () => {
      currentOffsetRef.current += (targetOffsetRef.current - currentOffsetRef.current) * 0.1;
      if (trackRef.current) trackRef.current.style.transform = `translateX(${currentOffsetRef.current}px)`;
      updateCardScales();
      if (Math.abs(targetOffsetRef.current - currentOffsetRef.current) < 0.05) {
        currentOffsetRef.current = targetOffsetRef.current;
        if (trackRef.current) trackRef.current.style.transform = `translateX(${currentOffsetRef.current}px)`;
        updateCardScales();
        rafIdRef.current = null;
      } else {
        rafIdRef.current = requestAnimationFrame(animate);
      }
    };
    rafIdRef.current = requestAnimationFrame(animate);
  }, [updateCardScales]);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(ASSESSMENTS.length - 1, index));
    targetOffsetRef.current = getTargetOffset(clamped);
    setActiveIndex(clamped);
    startRaf();
  }, [getTargetOffset, startRaf]);

  const snapToNearest = useCallback(() => {
    const vw = viewportRef.current?.offsetWidth ?? 0;
    const centreOffset = vw / 2 - CARD_W / 2 - CARD_MX;
    const rawIndex = (centreOffset - targetOffsetRef.current) / CARD_STEP;
    goTo(Math.round(rawIndex));
  }, [goTo]);

  // ── drag events ──────────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('.wtg-nav-btn') || t.closest('.wtg-dot')) return;
      isDraggingRef.current = true;
      dragStartXRef.current = e.clientX;
      dragStartOffRef.current = currentOffsetRef.current;
      velocityRef.current = 0; lastXRef.current = e.clientX; lastTimeRef.current = Date.now();
      if (rafIdRef.current) { cancelAnimationFrame(rafIdRef.current); rafIdRef.current = null; }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const now = Date.now(), dt = now - lastTimeRef.current;
      if (dt > 0) velocityRef.current = (e.clientX - lastXRef.current) / dt * 16;
      lastXRef.current = e.clientX; lastTimeRef.current = now;
      currentOffsetRef.current = dragStartOffRef.current + (e.clientX - dragStartXRef.current);
      targetOffsetRef.current  = currentOffsetRef.current;
      if (trackRef.current) trackRef.current.style.transform = `translateX(${currentOffsetRef.current}px)`;
      updateCardScales();
    };
    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      targetOffsetRef.current = currentOffsetRef.current + velocityRef.current * 4;
      snapToNearest();
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('.wtg-nav-btn') || t.closest('.wtg-dot')) return;
      isDraggingRef.current = true;
      dragStartXRef.current = e.touches[0].clientX;
      dragStartOffRef.current = currentOffsetRef.current;
      velocityRef.current = 0; lastXRef.current = e.touches[0].clientX; lastTimeRef.current = Date.now();
      if (rafIdRef.current) { cancelAnimationFrame(rafIdRef.current); rafIdRef.current = null; }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const now = Date.now(), dt = now - lastTimeRef.current;
      if (dt > 0) velocityRef.current = (e.touches[0].clientX - lastXRef.current) / dt * 16;
      lastXRef.current = e.touches[0].clientX; lastTimeRef.current = now;
      currentOffsetRef.current = dragStartOffRef.current + (e.touches[0].clientX - dragStartXRef.current);
      targetOffsetRef.current  = currentOffsetRef.current;
      if (trackRef.current) trackRef.current.style.transform = `translateX(${currentOffsetRef.current}px)`;
      updateCardScales();
    };
    const onTouchEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      targetOffsetRef.current = currentOffsetRef.current + velocityRef.current * 4;
      snapToNearest();
    };

    section.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    const onResize = () => goTo(activeIndex);
    window.addEventListener('resize', onResize);

    return () => {
      section.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      section.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
    };
  }, [updateCardScales, snapToNearest, goTo, activeIndex]);

  // ── sparkle canvas ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = section.offsetWidth; canvas.height = section.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      if (isDraggingRef.current) return;
      const r = section.getBoundingClientRect();
      for (let i = 0; i < 2; i++) {
        sparklesRef.current.push({
          x: e.clientX - r.left + (Math.random() - 0.5) * 10,
          y: e.clientY - r.top  + (Math.random() - 0.5) * 10,
          size: Math.random() * 3.5 + 1.5,
          color: ['#D4A843', '#E8735A', '#5C3D6B'][Math.floor(Math.random() * 3)],
          vx: (Math.random() - 0.5) * 1.2,
          vy: Math.random() * -1.5 - 0.3,
          life: 1,
        });
      }
    };
    section.addEventListener('mousemove', onMove);

    let animId: number;
    const animateSparkles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparklesRef.current = sparklesRef.current.filter(s => s.life > 0);
      sparklesRef.current.forEach(s => {
        s.x += s.vx; s.y += s.vy; s.life -= 0.032;
        ctx.save();
        ctx.globalAlpha = s.life * 0.9;
        ctx.fillStyle = s.color;
        ctx.font = `${s.size * 2.2}px serif`;
        ctx.fillText('✦', s.x, s.y);
        ctx.restore();
      });
      animId = requestAnimationFrame(animateSparkles);
    };
    animateSparkles();

    return () => {
      window.removeEventListener('resize', resize);
      section.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ── initial position ─────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => goTo(0), 60);
    return () => clearTimeout(t);
  }, [goTo]);

  // ── render ───────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="psychometric"
      style={{
        width: '100%',
        minHeight: 640,
        // butter-yellow gingham — exactly from HTML
        backgroundColor: '#FFFEF8',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(240,210,100,0.18) 28px, rgba(240,210,100,0.18) 44px, transparent 44px, transparent 56px, rgba(240,210,100,0.10) 56px, rgba(240,210,100,0.10) 60px),
          repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(240,210,100,0.18) 28px, rgba(240,210,100,0.18) 44px, transparent 44px, transparent 56px, rgba(240,210,100,0.10) 56px, rgba(240,210,100,0.10) 60px)
        `,
        backgroundSize: '60px 60px',
        position: 'relative',
        overflow: 'hidden',
        padding: '44px 0 52px',
        cursor: 'grab',
        // top + bottom fades to blend with neighbouring sections
      }}
    >
      {/* top fade — blends from hero/services blue into gingham */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:160, background:'linear-gradient(to bottom, #D6E8F5 0%, rgba(214,232,245,0) 100%)', pointerEvents:'none', zIndex:4 }}/>
      {/* bottom fade — blends gingham back into services blue */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:160, background:'linear-gradient(to top, #D6E8F5 0%, rgba(214,232,245,0) 100%)', pointerEvents:'none', zIndex:4 }}/>

      {/* sparkle canvas */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:2 }}/>

      {/* corner doodles */}
      <svg style={{ position:'absolute', top:16, left:16, width:80, height:80, opacity:0.18, pointerEvents:'none', zIndex:3 }} viewBox="0 0 80 80" fill="none">
        <path d="M10 70 Q40 10 70 70" stroke="#D4A843" strokeWidth="1.5" fill="none" strokeDasharray="4 3"/>
        <circle cx="10" cy="70" r="3" fill="#E8735A"/>
        <circle cx="70" cy="70" r="3" fill="#E8735A"/>
      </svg>
      <svg style={{ position:'absolute', bottom:24, right:16, width:90, height:60, opacity:0.18, pointerEvents:'none', zIndex:3 }} viewBox="0 0 90 60" fill="none">
        <path d="M5 50 Q45 5 85 50" stroke="#5C3D6B" strokeWidth="1.5" fill="none" strokeDasharray="3 4"/>
      </svg>
      <svg style={{ position:'absolute', top:55, right:70, pointerEvents:'none', zIndex:3 }} viewBox="0 0 60 60" width="60" height="60">
        <text x="5"  y="20" fontSize="14" fill="#D4A843" opacity="0.4">✦</text>
        <text x="35" y="45" fontSize="10" fill="#E8735A" opacity="0.3">✦</text>
      </svg>
      <svg style={{ position:'absolute', top:70, left:55, pointerEvents:'none', zIndex:3 }} viewBox="0 0 60 60" width="60" height="60">
        <text x="38" y="18" fontSize="13" fill="#D4A843" opacity="0.38">✦</text>
      </svg>

      {/* header */}
      <div style={{ textAlign:'center', position:'relative', zIndex:10, marginBottom:36, padding:'0 24px', pointerEvents:'none' }}>
        <h2 style={{ fontFamily:PD, fontSize:'clamp(24px,4vw,34px)', fontWeight:700, color:'#3D2A0A', lineHeight:1.2, marginBottom:8 }}>
          Find your assessment ✦
        </h2>
        <p style={{ fontFamily:PD, fontSize:'clamp(15px,2vw,18px)', color:'#E8735A', fontStyle:'italic', fontWeight:400 }}>
          Every stage of life needs a different kind of clarity.
        </p>
      </div>

      {/* carousel viewport */}
      <div ref={viewportRef} style={{ position:'relative', zIndex:10, width:'100%', height:460, overflow:'hidden' }}>
        <div ref={trackRef} style={{ position:'absolute', top:0, height:'100%', display:'flex', alignItems:'center', willChange:'transform' }}>
          {ASSESSMENTS.map((a, i) => (
            <div
              key={a.label + i}
              id={`wtg-card-${i}`}
              style={{
                position: 'relative',
                width: CARD_W,
                flexShrink: 0,
                margin: `0 ${CARD_MX}px`,
                background: '#FFFFFF',
                borderRadius: 3,
                padding: '14px 14px 54px',
                boxShadow: '0 4px 10px rgba(80,50,10,0.10), 0 16px 40px rgba(80,50,10,0.12), 0 2px 4px rgba(80,50,10,0.06)',
                userSelect: 'none',
                pointerEvents: 'none',
                transition: 'box-shadow 0.3s',
              }}
            >
              {/* washi tape */}
              <div style={{
                position:'absolute', top:-11, left:'50%',
                transform:'translateX(-50%) rotate(-2deg)',
                width:56, height:18, borderRadius:2,
                background: a.washiColor, zIndex:5, opacity:0.75,
              }}/>

              {/* SVG scene */}
              <div
                style={{ width:'100%', aspectRatio:'4/3', borderRadius:2, overflow:'hidden', marginBottom:12, display:'block' }}
                dangerouslySetInnerHTML={{ __html: a.scene }}
              />

              {/* card body */}
              <div style={{ textAlign:'center' }}>
                <span style={{
                  display:'inline-block', fontFamily:SANS,
                  fontSize:8, fontWeight:700, letterSpacing:'0.08em',
                  textTransform:'uppercase', padding:'3px 8px',
                  borderRadius:20, marginBottom:8,
                  background: a.labelBg, color: a.labelColor,
                }}>
                  {a.label}
                </span>
                <div style={{ fontFamily:PD, fontSize:13, fontWeight:600, color:'#3D2A0A', lineHeight:1.35, marginBottom:7 }}>
                  {a.title}
                </div>
                <div style={{ fontFamily:PD, fontSize:9.5, color:'#7A5C30', lineHeight:1.6, fontStyle:'italic', marginBottom:8 }}>
                  &ldquo;{a.desc}&rdquo;
                </div>
                <div style={{ fontFamily:SANS, fontSize:8.5, fontWeight:600, letterSpacing:'0.04em', textTransform:'uppercase', display:'flex', alignItems:'center', justifyContent:'center', gap:4, color: a.tagColor }}>
                  ✦ {a.tag}
                </div>
              </div>

              {/* polaroid caption */}
              <div style={{ position:'absolute', bottom:10, left:14, right:14, textAlign:'center' }}>
                <span style={{ fontFamily:PD, fontSize:13, fontWeight:600, color:'#3D2A0A', display:'block', lineHeight:1.3 }}>
                  {a.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* navigation */}
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:20, marginTop:28, position:'relative', zIndex:10 }}>
        <button
          className="wtg-nav-btn"
          onClick={() => goTo(activeIndex - 1)}
          style={{
            width:38, height:38, borderRadius:'50%',
            border:'1.5px solid rgba(212,168,67,0.45)',
            background:'rgba(255,255,255,0.92)', color:'#3D2A0A',
            fontSize:15, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.2s ease', fontFamily:SANS,
          }}
          onMouseEnter={e => { const b = e.currentTarget; b.style.background='#D4A843'; b.style.borderColor='#D4A843'; b.style.color='#fff'; b.style.transform='scale(1.08)'; }}
          onMouseLeave={e => { const b = e.currentTarget; b.style.background='rgba(255,255,255,0.92)'; b.style.borderColor='rgba(212,168,67,0.45)'; b.style.color='#3D2A0A'; b.style.transform='scale(1)'; }}
        >
          ←
        </button>

        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          {ASSESSMENTS.map((_, i) => (
            <button
              key={i}
              className="wtg-dot"
              onClick={() => goTo(i)}
              style={{
                width:7, height:7, borderRadius:'50%', border:'none', padding:0, cursor:'pointer',
                background: i === activeIndex ? '#D4A843' : 'rgba(212,168,67,0.3)',
                transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)',
                transition:'all 0.35s ease',
              }}
            />
          ))}
        </div>

        <button
          className="wtg-nav-btn"
          onClick={() => goTo(activeIndex + 1)}
          style={{
            width:38, height:38, borderRadius:'50%',
            border:'1.5px solid rgba(212,168,67,0.45)',
            background:'rgba(255,255,255,0.92)', color:'#3D2A0A',
            fontSize:15, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.2s ease', fontFamily:SANS,
          }}
          onMouseEnter={e => { const b = e.currentTarget; b.style.background='#D4A843'; b.style.borderColor='#D4A843'; b.style.color='#fff'; b.style.transform='scale(1.08)'; }}
          onMouseLeave={e => { const b = e.currentTarget; b.style.background='rgba(255,255,255,0.92)'; b.style.borderColor='rgba(212,168,67,0.45)'; b.style.color='#3D2A0A'; b.style.transform='scale(1)'; }}
        >
          →
        </button>
      </div>
    </section>
  );
}
