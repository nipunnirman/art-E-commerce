import React from 'react';
import { Sparkles, ShieldCheck, Truck } from 'lucide-react';

const features = [
  {
    icon: <Sparkles size={26} color="#93C5FD" />,
    title: 'Curated Excellence',
    desc: 'Every artwork is carefully selected and verified to ensure exceptional quality and artistic merit.',
    grad: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.08) 100%)',
    glow: 'rgba(59,130,246,0.25)',
  },
  {
    icon: <ShieldCheck size={26} color="#93C5FD" />,
    title: 'Authenticity Guaranteed',
    desc: 'Every piece comes with a certificate of authenticity and detailed provenance documentation.',
    grad: 'linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(59,130,246,0.08) 100%)',
    glow: 'rgba(37,99,235,0.25)',
  },
  {
    icon: <Truck size={26} color="#93C5FD" />,
    title: 'White-Glove Delivery',
    desc: 'Professional packaging and fully insured worldwide shipping to protect your investment.',
    grad: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(59,130,246,0.08) 100%)',
    glow: 'rgba(99,102,241,0.25)',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="container section-padding" style={{ textAlign: 'center' }}>
      {/* Glow divider top */}
      <div style={{
        height: '1px', marginBottom: '80px',
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(147,197,253,0.4), rgba(59,130,246,0.5), transparent)',
      }} />

      <h2 className="heading-section" style={{ marginBottom: '16px' }}>Why Collect With Us</h2>
      <p style={{
        color: 'rgba(255,255,255,0.46)', marginBottom: '64px', fontSize: '17px',
        maxWidth: '560px', margin: '0 auto 64px auto', lineHeight: '1.7',
      }}>
        We're committed to bringing you exceptional art experiences with unmatched service
      </p>

      <div className="grid-responsive grid-cols-3">
        {features.map((item, idx) => (
          <div key={idx} className="feature-card" style={{
            padding: '44px 32px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            position: 'relative', overflow: 'hidden',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
          }}>
            {/* Top gloss */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(147,197,253,0.3), transparent)',
            }} />
            {/* Corner accent */}
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: '120px', height: '120px',
              background: `radial-gradient(circle, ${item.glow} 0%, transparent 70%)`,
              borderRadius: '50%',
            }} />

            {/* Icon container */}
            <div style={{
              width: '68px', height: '68px', borderRadius: '20px',
              background: item.grad,
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(147,197,253,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '28px',
              boxShadow: `0 8px 24px ${item.glow}`,
            }}>
              {item.icon}
            </div>

            <h3 style={{
              fontSize: '19px', fontWeight: '700', marginBottom: '14px',
              color: 'rgba(255,255,255,0.92)',
              fontFamily: "'Sora', sans-serif", letterSpacing: '-0.01em',
            }}>{item.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.46)', lineHeight: '1.65', fontSize: '15px' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Glow divider bottom */}
      <div style={{
        height: '1px', marginTop: '80px',
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(147,197,253,0.4), rgba(59,130,246,0.5), transparent)',
      }} />

      <style>{`
        .feature-card:hover {
          transform: translateY(-10px);
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(147,197,253,0.25) !important;
          box-shadow: 0 24px 56px rgba(0,0,0,0.3), 0 0 40px rgba(59,130,246,0.10), inset 0 1px 0 rgba(255,255,255,0.12) !important;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
