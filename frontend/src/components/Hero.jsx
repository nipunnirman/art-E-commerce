import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import React from 'react';
import heroImgMain from '../assets/home/img3.jpg';
import heroImgSec1 from '../assets/home/sell1.JPG';
import heroImgSec2 from '../assets/home/IMG_4285.JPG';

const Hero = () => {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Mist orbs behind hero */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%',
        width: '520px', height: '520px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(99,102,241,0.06) 50%, transparent 75%)',
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        animation: 'mistPulse 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '-5%', left: '10%',
        width: '320px', height: '320px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)',
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        animation: 'mistPulse 12s ease-in-out infinite reverse',
      }} />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${10 + i * 15}%`,
          bottom: '0',
          width: `${3 + (i % 3)}px`,
          height: `${3 + (i % 3)}px`,
          borderRadius: '50%',
          background: 'rgba(147,197,253,0.5)',
          zIndex: 0,
          animation: `particleRise ${8 + i * 2}s ease-in-out ${i * 1.5}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      <div className="container flex md-flex-col items-center justify-between gap-8 section-padding" style={{ zIndex: 1 }}>
        {/* Left content */}
        <div className="md-w-full" style={{ maxWidth: '560px', width: '100%', zIndex: 1 }}>
          <div className="badge-pill" style={{ marginBottom: '28px' }}>
            <Sparkles size={14} />
            Exclusive Solo Artist Portfolio
          </div>

          <h1 className="heading-hero" style={{ marginBottom: '28px' }}>
            Art That Speaks{' '}
            <br className="md-hide" />
            <span style={{
              position: 'relative', display: 'inline-block',
              background: 'linear-gradient(135deg, #93C5FD 0%, #60A5FA 40%, #3B82F6 80%, #818CF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Through My Pencil
              <svg className="md-hide" style={{ position: 'absolute', bottom: '-12px', left: 0, width: '100%', height: '14px' }} viewBox="0 0 300 10" fill="none">
                <path d="M2 8C60 3 180 2 298 8" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#93C5FD" />
                    <stop offset="0.5" stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#818CF8" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,0.58)',
            marginBottom: '44px', lineHeight: '1.75', fontWeight: '400',
          }}>
            Every stroke tells a story. Discover unique original artworks that transform spaces, provoke thought, and touch hearts.
          </p>

          <div className="flex sm-flex-col items-center gap-4" style={{ marginBottom: '56px' }}>
            <button className="btn btn-primary flex items-center justify-center gap-2 sm-w-full" style={{ padding: '16px 32px', fontSize: '15px' }}>
              Explore Collection
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline sm-w-full" style={{ padding: '16px 32px', fontSize: '15px' }}>
              Learn My Story
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0',
            padding: '24px 28px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(147,197,253,0.14)',
            borderRadius: '20px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
          }} className="sm-flex-col sm-items-start">
            {[
              { value: '50+', label: 'Original\nArtworks' },
              { value: '100%', label: 'Authentic\nOriginals' },
              { value: '2K+', label: 'Happy\nCollectors' },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div className="md-hide" style={{
                    width: '1px', height: '40px', margin: '0 28px',
                    background: 'linear-gradient(180deg, transparent, rgba(147,197,253,0.3), transparent)',
                  }} />
                )}
                <div className="flex items-center gap-3">
                  <div style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '30px', fontWeight: '800',
                    background: 'linear-gradient(135deg, #93C5FD, #60A5FA)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{stat.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: '13px', fontWeight: '500', lineHeight: 1.3, whiteSpace: 'pre-line' }}>{stat.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right images */}
        <div className="md-w-full" style={{ width: '46%', position: 'relative', zIndex: 1 }}>
          {/* Glow behind images */}
          <div style={{
            position: 'absolute', inset: '-20px',
            background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.2) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(20px)',
            animation: 'mistPulse 6s ease-in-out infinite',
            zIndex: 0,
          }} />
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px',
            transform: 'rotate(2deg)', transition: 'transform 0.5s ease',
            position: 'relative', zIndex: 1,
          }} className="hero-grid"
            onMouseOver={e => e.currentTarget.style.transform = 'rotate(0deg)'}
            onMouseOut={e => e.currentTarget.style.transform = 'rotate(2deg)'}
          >
            <div style={{
              gridRow: 'span 2', borderRadius: '24px', minHeight: '440px',
              backgroundImage: `url(${heroImgMain})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              boxShadow: '0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, transparent 60%)',
                borderRadius: '24px',
              }} />
            </div>
            <div style={{ display: 'grid', gap: '14px' }}>
              {[
                heroImgSec1,
                heroImgSec2,
              ].map((url, i) => (
                <div key={i} style={{
                  borderRadius: '20px', minHeight: '212px',
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(${i === 0 ? '45deg' : '225deg'}, rgba(59,130,246,0.12) 0%, transparent 60%)`,
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mistPulse {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes particleRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-60vh) translateX(20px); opacity: 0; }
        }
        @media (max-width: 768px) {
          .hero-grid { transform: rotate(0deg) !important; grid-template-columns: 1fr !important; }
          .hero-grid > div:first-child { min-height: 280px !important; }
          .hero-grid > div:nth-child(2) { grid-template-columns: repeat(2, 1fr); }
          .hero-grid > div:nth-child(2) > div { min-height: 140px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
