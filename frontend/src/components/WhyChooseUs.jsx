import React from 'react';
import { Sparkles, ShieldCheck, Truck } from 'lucide-react';

const features = [
  { icon: <Sparkles size={24} color="#93C5FD" />, title: 'Curated Excellence', desc: 'Every artwork is carefully selected and verified for exceptional quality and artistic merit.', grad: 'linear-gradient(135deg,rgba(59,130,246,0.18),rgba(99,102,241,0.08))', glow: 'rgba(59,130,246,0.25)', num: '01' },
  { icon: <ShieldCheck size={24} color="#93C5FD" />, title: 'Authenticity Guaranteed', desc: 'Every piece comes with a certificate of authenticity and detailed provenance.', grad: 'linear-gradient(135deg,rgba(37,99,235,0.18),rgba(59,130,246,0.08))', glow: 'rgba(37,99,235,0.25)', num: '02' },
  { icon: <Truck size={24} color="#93C5FD" />, title: 'White-Glove Delivery', desc: 'Professional packaging and fully insured worldwide shipping for your investment.', grad: 'linear-gradient(135deg,rgba(99,102,241,0.18),rgba(59,130,246,0.08))', glow: 'rgba(99,102,241,0.25)', num: '03' },
];

const WhyChooseUs = () => (
  <section className="container section-padding" style={{ textAlign: 'center' }}>
    <div style={{ height: '1px', marginBottom: '60px', background: 'linear-gradient(90deg,transparent,rgba(59,130,246,0.5),rgba(147,197,253,0.4),rgba(59,130,246,0.5),transparent)' }} />

    <h2 className="heading-section" style={{ marginBottom: '14px' }}>Why Collect With Us</h2>
    <p style={{ color: 'rgba(255,255,255,0.46)', marginBottom: '52px', fontSize: '16px', maxWidth: '520px', margin: '0 auto 52px', lineHeight: '1.7' }}>
      Committed to bringing you exceptional art experiences with unmatched service
    </p>

    {/* Desktop: 3-col grid */}
    <div className="wcu-desktop grid-responsive grid-cols-3" style={{ gap: '16px' }}>
      {features.map((item, idx) => (
        <div key={idx} className="feature-card" style={{
          padding: 'clamp(28px,4vw,44px) clamp(20px,3vw,32px)',
          background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          position: 'relative', overflow: 'hidden',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(147,197,253,0.3),transparent)' }} />
          <div style={{ position: 'absolute', top: -40, right: -40, width: '120px', height: '120px', background: `radial-gradient(circle,${item.glow} 0%,transparent 70%)`, borderRadius: '50%' }} />
          <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: item.grad, border: '1px solid rgba(147,197,253,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: `0 8px 24px ${item.glow}` }}>
            {item.icon}
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: 'rgba(255,255,255,0.92)', fontFamily: "'Sora',sans-serif" }}>{item.title}</h3>
          <p style={{ color: 'rgba(255,255,255,0.46)', lineHeight: '1.65', fontSize: '14px' }}>{item.desc}</p>
        </div>
      ))}
    </div>

    {/* Mobile: horizontal numbered cards */}
    <div className="wcu-mobile">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {features.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '20px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px',
            textAlign: 'left',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(147,197,253,0.25),transparent)' }} />
            {/* Number */}
            <div style={{
              fontFamily: "'Sora',sans-serif", fontSize: '36px', fontWeight: '900',
              color: 'rgba(59,130,246,0.15)', lineHeight: 1, flexShrink: 0,
              letterSpacing: '-0.04em', minWidth: '48px',
            }}>{item.num}</div>
            {/* Icon + text */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: item.grad, border: '1px solid rgba(147,197,253,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.cloneElement(item.icon, { size: 16 })}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'rgba(255,255,255,0.90)', fontFamily: "'Sora',sans-serif" }}>{item.title}</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.55', fontSize: '13px', margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ height: '1px', marginTop: '60px', background: 'linear-gradient(90deg,transparent,rgba(59,130,246,0.5),rgba(147,197,253,0.4),rgba(59,130,246,0.5),transparent)' }} />

    <style>{`
      .wcu-desktop { display: grid; }
      .wcu-mobile { display: none; }
      .feature-card:hover {
        transform: translateY(-10px);
        background: rgba(255,255,255,0.08) !important;
        border-color: rgba(147,197,253,0.25) !important;
        box-shadow: 0 24px 56px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12) !important;
      }
      @media (max-width: 768px) {
        .wcu-desktop { display: none !important; }
        .wcu-mobile { display: block; }
      }
    `}</style>
  </section>
);

export default WhyChooseUs;
