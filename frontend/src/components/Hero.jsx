import { ArrowRight, Sparkles } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import heroImgMain from '../assets/home/img3.jpg';
import heroImgSec1 from '../assets/home/sell1.JPG';
import heroImgSec2 from '../assets/home/IMG_4285.JPG';

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  const strValue = String(value);
  const numericValue = parseInt(strValue.replace(/[^0-9]/g, ''), 10);
  const suffix = strValue.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (isNaN(end)) return;
    const duration = 2000;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [numericValue]);

  return <>{count}{suffix}</>;
};

const Hero = () => {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Desktop orbs */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%',
        width: '520px', height: '520px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(99,102,241,0.06) 50%, transparent 75%)',
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        animation: 'mistPulse 8s ease-in-out infinite',
      }} />

      {/* ─── DESKTOP LAYOUT ─── */}
      <div className="hero-desktop container flex items-center justify-between gap-8 section-padding" style={{ zIndex: 1 }}>
        <div style={{ maxWidth: '560px', width: '100%', zIndex: 1 }}>
          <div className="badge-pill" style={{ marginBottom: '24px' }}>
            <Sparkles size={14} /> Exclusive Solo Artist Portfolio
          </div>
          <h1 className="heading-hero" style={{ marginBottom: '20px' }}>
            Art That Speaks{' '}
            <br />
            <span style={{
              position: 'relative', display: 'inline-block',
              background: 'linear-gradient(135deg, #93C5FD 0%, #60A5FA 40%, #3B82F6 80%, #818CF8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Through My Pencil
              <svg style={{ position: 'absolute', bottom: '-12px', left: 0, width: '100%', height: '14px' }} viewBox="0 0 300 10" fill="none">
                <path d="M2 8C60 3 180 2 298 8" stroke="url(#lg1)" strokeWidth="2.5" strokeLinecap="round" />
                <defs><linearGradient id="lg1" x1="0" y1="0" x2="300" y2="0">
                  <stop stopColor="#93C5FD" /><stop offset="0.5" stopColor="#3B82F6" /><stop offset="1" stopColor="#818CF8" />
                </linearGradient></defs>
              </svg>
            </span>
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.58)', marginBottom: '44px', lineHeight: '1.75' }}>
            Every stroke tells a story. Discover unique original artworks that transform spaces, provoke thought, and touch hearts.
          </p>
          <div className="flex items-center gap-4" style={{ marginBottom: '56px' }}>
            <button className="btn btn-primary flex items-center gap-2" style={{ padding: '16px 32px', fontSize: '15px' }}>
              Explore Collection <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '15px' }}>
              Learn My Story
            </button>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center',
            padding: '24px 28px',
            background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)',
            border: '1px solid rgba(147,197,253,0.14)', borderRadius: '20px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
          }}>
            {[{ value: '50+', label: 'Original\nArtworks' }, { value: '100%', label: 'Authentic\nOriginals' }, { value: '2K+', label: 'Happy\nCollectors' }].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ width: '1px', height: '40px', margin: '0 28px', background: 'linear-gradient(180deg, transparent, rgba(147,197,253,0.3), transparent)' }} />}
                <div className="flex items-center gap-3">
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '30px', fontWeight: '800', background: 'linear-gradient(135deg,#93C5FD,#60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}><AnimatedNumber value={stat.value} /></div>
                  <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: '13px', fontWeight: '500', lineHeight: 1.3, whiteSpace: 'pre-line' }}>{stat.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ width: '46%', position: 'relative', zIndex: 1 }}>
          <div style={{
            position: 'absolute', inset: '-20px',
            background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.2) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(20px)', animation: 'mistPulse 6s ease-in-out infinite', zIndex: 0,
          }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '14px', transform: 'rotate(2deg)', transition: 'transform 0.5s ease', position: 'relative', zIndex: 1 }}
            onMouseOver={e => e.currentTarget.style.transform = 'rotate(0deg)'}
            onMouseOut={e => e.currentTarget.style.transform = 'rotate(2deg)'}
          >
            <div style={{ gridRow: 'span 2', borderRadius: '24px', minHeight: '440px', backgroundImage: `url(${heroImgMain})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, transparent 60%)', borderRadius: '24px' }} />
            </div>
            <div style={{ display: 'grid', gap: '14px' }}>
              {[heroImgSec1, heroImgSec2].map((url, i) => (
                <div key={i} style={{ borderRadius: '20px', minHeight: '212px', backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 12px 32px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(${i === 0 ? '45deg' : '225deg'}, rgba(59,130,246,0.12) 0%, transparent 60%)` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE LAYOUT ─── */}
      <div className="hero-mobile">
        {/* Full-bleed hero image with cinematic overlay */}
        <div style={{ position: 'relative', height: '70vh', minHeight: '480px', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${heroImgMain})`,
            backgroundSize: 'cover', backgroundPosition: 'center top',
          }} />
          {/* Multi-layer cinematic overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(2,8,24,0.3) 0%, rgba(2,8,24,0.15) 30%, rgba(2,8,24,0.7) 70%, rgba(2,8,24,1) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(2,8,24,0.5) 0%, transparent 60%)',
          }} />

          {/* Badge top left */}
          <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px',
              background: 'rgba(59,130,246,0.2)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(147,197,253,0.3)',
              borderRadius: '100px',
              fontSize: '11px', fontWeight: '700', color: '#93C5FD',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: "'Sora', sans-serif",
            }}>
              <Sparkles size={11} /> Solo Artist
            </div>
          </div>

          {/* Floating small images — top right */}
          <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
            {[heroImgSec1, heroImgSec2].map((url, i) => (
              <div key={i} style={{
                width: '72px', height: '90px', borderRadius: '12px',
                backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.12)',
                animation: `floatCard ${3 + i * 1.5}s ease-in-out ${i * 0.5}s infinite`,
              }} />
            ))}
          </div>

          {/* Text content at bottom of image */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 20px 28px' }}>
            <h1 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(36px, 10vw, 52px)',
              fontWeight: '800',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              color: '#fff',
              marginBottom: '10px',
            }}>
              Art That{' '}
              <span style={{
                background: 'linear-gradient(135deg, #93C5FD, #60A5FA, #818CF8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Speaks</span>
              <br />Through My Pencil
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6', maxWidth: '300px' }}>
              Every stroke tells a story. Discover unique original artworks.
            </p>
          </div>
        </div>

        {/* CTA + Stats section below image */}
        <div style={{ padding: '24px 20px 40px', background: 'var(--bg-deep)' }}>
          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
            <button className="btn btn-primary flex items-center justify-center gap-2" style={{
              flex: 1, padding: '15px 20px', fontSize: '15px', borderRadius: '16px',
            }}>
              Explore <ArrowRight size={16} />
            </button>
            <button className="btn btn-outline" style={{
              flex: 1, padding: '15px 20px', fontSize: '15px', borderRadius: '16px',
            }}>
              My Story
            </button>
          </div>

          {/* Stats — horizontal scroll cards */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { value: '50+', label: 'Artworks', },
              { value: '100%', label: 'Authentic', },
              { value: '2K+', label: 'Collectors', },
            ].map((stat, i) => (
              <div key={i} style={{
                flex: 1,
                padding: '16px 12px',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(147,197,253,0.14)',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}>
                {stat.icon && <div style={{ fontSize: '18px', marginBottom: '4px' }}>{stat.icon}</div>}
                <div style={{
                  fontFamily: "'Sora',sans-serif", fontSize: '22px', fontWeight: '800',
                  background: 'linear-gradient(135deg,#93C5FD,#60A5FA)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  lineHeight: 1,
                }}><AnimatedNumber value={stat.value} /></div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontWeight: '600', marginTop: '4px', letterSpacing: '0.04em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mistPulse {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes floatCard {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .hero-mobile { display: none; }
        .hero-desktop { display: flex; }
        @media (max-width: 768px) {
          .hero-mobile { display: block; }
          .hero-desktop { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
