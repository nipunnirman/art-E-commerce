import React from 'react';
import { Palette, Twitter, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(2,8,24,0.85)',
      backdropFilter: 'blur(32px)',
      WebkitBackdropFilter: 'blur(32px)',
      borderTop: '1px solid rgba(147,197,253,0.12)',
      marginTop: '40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Footer glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '200px',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container section-padding" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }} className="footer-grid">
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '4px' }} className="footer-brand">
            <Link to="/" className="flex items-center gap-2" style={{
              fontFamily: "'Sora', sans-serif", fontWeight: '800',
              fontSize: '18px', color: 'rgba(255,255,255,0.90)',
              letterSpacing: '-0.02em',
            }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(59,130,246,0.4)',
                flexShrink: 0,
              }}>
                <Palette size={18} color="white" />
              </div>
              Through My Pencil
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.38)', maxWidth: '280px', lineHeight: '1.65', fontSize: '14px', marginTop: '12px' }}>
              Exclusive Solo Artist Portfolio. Transforming spaces with exceptional, original art experiences.
            </p>
            <div className="flex gap-3" style={{ marginTop: '20px' }}>
              {[Twitter, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" style={{
                  color: 'rgba(255,255,255,0.45)', padding: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  minWidth: '40px', minHeight: '40px',
                }}
                  onMouseOver={e => { e.currentTarget.style.color = '#93C5FD'; e.currentTarget.style.borderColor = 'rgba(147,197,253,0.3)'; e.currentTarget.style.background = 'rgba(59,130,246,0.12)'; }}
                  onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px', color: 'rgba(255,255,255,0.70)', fontFamily: "'Sora', sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase' }}>Explore</h4>
            {[['/', 'Home'], ['/products', 'Portfolio & Store'], ['/login', 'Account'], ['/admin', 'Admin Dashboard']].map(([path, label]) => (
              <Link key={path} to={path} style={{
                color: path === '/admin' ? '#60A5FA' : 'rgba(255,255,255,0.40)',
                fontSize: '14px', transition: 'color 0.2s',
                padding: '2px 0',
              }}
                onMouseOver={e => e.target.style.color = 'rgba(255,255,255,0.80)'}
                onMouseOut={e => e.target.style.color = path === '/admin' ? '#60A5FA' : 'rgba(255,255,255,0.40)'}
              >{label}</Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px', color: 'rgba(255,255,255,0.70)', fontFamily: "'Sora', sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase' }}>Legal</h4>
            {['Terms of Service', 'Privacy Policy', 'Shipping Returns'].map(label => (
              <a key={label} href="#" style={{ color: 'rgba(255,255,255,0.40)', fontSize: '14px', transition: 'color 0.2s', padding: '2px 0' }}
                onMouseOver={e => e.target.style.color = 'rgba(255,255,255,0.80)'}
                onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.40)'}
              >{label}</a>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: '32px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>
            © {new Date().getFullYear()} Through My Pencil. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-brand {
            grid-column: 1 / -1 !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
