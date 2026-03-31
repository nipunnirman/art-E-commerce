import React from 'react';
import { Award, Star, Quote } from 'lucide-react';

const testimonials = [
  { quote: "The quality and authenticity of the artworks exceeded my expectations. Truly a premium experience.", author: "Sarah Johnson", role: "Art Collector", initial: "S" },
  { quote: "Found the perfect piece for my living room. The curation and customer service are exceptional.", author: "Michael Chen", role: "Interior Designer", initial: "M" },
  { quote: "As a fellow creative, I'm thrilled to collect work from such a prestigious portfolio.", author: "Isabella Martinez", role: "Art Collector", initial: "I" },
];

const LovedByCollectors = () => {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }} className="section-padding">
      {/* Section mist */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', marginBottom: '28px',
          width: '64px', height: '64px',
          background: 'rgba(59,130,246,0.12)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(147,197,253,0.22)',
          borderRadius: '20px',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(59,130,246,0.2)',
        }}>
          <Award size={28} color="#93C5FD" />
        </div>

        <h2 className="heading-section" style={{ marginBottom: '14px' }}>Loved by Art Collectors</h2>
        <p style={{ color: 'rgba(255,255,255,0.44)', marginBottom: '60px', fontSize: '17px' }}>
          See what our community has to say
        </p>

        <div className="grid-responsive grid-cols-3" style={{ alignItems: 'stretch', gap: '16px' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '24px',
              padding: '36px',
              textAlign: 'left',
              display: 'flex', flexDirection: 'column',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: 'all 0.3s ease',
              position: 'relative', overflow: 'hidden',
            }}
              onMouseOver={e => { e.currentTarget.style.border = '1px solid rgba(147,197,253,0.22)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.10)'; }}
              onMouseOut={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08)'; }}
            >
              {/* Top gloss */}
              <div style={{ position: 'absolute', top: 0, left: '25%', right: '25%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(147,197,253,0.3), transparent)' }} />

              {/* Quote icon */}
              <div style={{ marginBottom: '16px', opacity: 0.3 }}>
                <Quote size={32} color="#93C5FD" />
              </div>

              <div className="flex gap-1" style={{ marginBottom: '20px' }}>
                {[1,2,3,4,5].map(s => <Star key={s} fill="#FCD34D" color="#FCD34D" size={16} />)}
              </div>

              <p style={{
                fontStyle: 'italic', fontSize: '16px', fontWeight: '400',
                color: 'rgba(255,255,255,0.72)', marginBottom: '28px',
                flex: 1, lineHeight: '1.7',
              }}>"{t.quote}"</p>

              <div className="flex items-center gap-3" style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(37,99,235,0.3))',
                  border: '1px solid rgba(147,197,253,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#93C5FD', fontWeight: '700', fontFamily: "'Sora', sans-serif", fontSize: '17px',
                }}>{t.initial}</div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: 'rgba(255,255,255,0.88)', fontFamily: "'Sora', sans-serif" }}>{t.author}</div>
                  <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', fontWeight: '500' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LovedByCollectors;
