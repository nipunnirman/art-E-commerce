import React from 'react';
import { Award, Star, Quote } from 'lucide-react';

const testimonials = [
  { quote: "The quality and authenticity of the artworks exceeded my expectations. Truly a premium experience.", author: "Sarah Johnson", role: "Art Collector", initial: "S" },
  { quote: "Found the perfect piece for my living room. The curation and customer service are exceptional.", author: "Michael Chen", role: "Interior Designer", initial: "M" },
  { quote: "As a fellow creative, I'm thrilled to collect work from such a prestigious portfolio.", author: "Isabella Martinez", role: "Art Collector", initial: "I" },
];

const LovedByCollectors = () => (
  <section style={{ position: 'relative', overflow: 'hidden' }} className="section-padding">
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(37,99,235,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

    <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'inline-flex', marginBottom: '24px', width: '56px', height: '56px', background: 'rgba(59,130,246,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(147,197,253,0.22)', borderRadius: '18px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.2)' }}>
        <Award size={26} color="#93C5FD" />
      </div>
      <h2 className="heading-section" style={{ marginBottom: '12px' }}>Loved by Art Collectors</h2>
      <p style={{ color: 'rgba(255,255,255,0.44)', marginBottom: '48px', fontSize: '16px' }}>See what our community has to say</p>

      {/* Desktop */}
      <div className="lbc-desktop grid-responsive grid-cols-3" style={{ alignItems: 'stretch', gap: '16px' }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.09)', borderRadius: '24px',
            padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden',
          }}
            onMouseOver={e => { e.currentTarget.style.border = '1px solid rgba(147,197,253,0.22)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
            onMouseOut={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ position: 'absolute', top: 0, left: '25%', right: '25%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(147,197,253,0.3),transparent)' }} />
            <div style={{ marginBottom: '14px', opacity: 0.3 }}><Quote size={28} color="#93C5FD" /></div>
            <div className="flex gap-1" style={{ marginBottom: '18px' }}>{[1,2,3,4,5].map(s => <Star key={s} fill="#FCD34D" color="#FCD34D" size={15} />)}</div>
            <p style={{ fontStyle: 'italic', fontSize: '15px', color: 'rgba(255,255,255,0.72)', marginBottom: '24px', flex: 1, lineHeight: '1.7' }}>"{t.quote}"</p>
            <div className="flex items-center gap-3" style={{ paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg,rgba(59,130,246,0.3),rgba(37,99,235,0.3))', border: '1px solid rgba(147,197,253,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93C5FD', fontWeight: '700', fontFamily: "'Sora',sans-serif", fontSize: '16px' }}>{t.initial}</div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: 'rgba(255,255,255,0.88)', fontFamily: "'Sora',sans-serif" }}>{t.author}</div>
                <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: stacked minimal cards */}
      <div className="lbc-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', padding: '20px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(147,197,253,0.2),transparent)' }} />
            {/* Stars + author row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,rgba(59,130,246,0.25),rgba(37,99,235,0.25))', border: '1px solid rgba(147,197,253,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93C5FD', fontWeight: '800', fontFamily: "'Sora',sans-serif", fontSize: '15px' }}>{t.initial}</div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: 'rgba(255,255,255,0.88)', fontFamily: "'Sora',sans-serif" }}>{t.author}</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>{t.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2px' }}>{[1,2,3,4,5].map(s => <Star key={s} fill="#FCD34D" color="#FCD34D" size={12} />)}</div>
            </div>
            <p style={{ fontStyle: 'italic', fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.65', margin: 0 }}>"{t.quote}"</p>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      .lbc-desktop { display: grid; }
      .lbc-mobile { display: none !important; }
      @media (max-width: 768px) {
        .lbc-desktop { display: none !important; }
        .lbc-mobile { display: flex !important; }
      }
    `}</style>
  </section>
);

export default LovedByCollectors;
