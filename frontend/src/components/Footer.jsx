import React from 'react';
import { Palette, Twitter, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{
    background: 'rgba(2,8,24,0.85)',
    backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
    borderTop: '1px solid rgba(147,197,253,0.12)',
    marginTop: '40px', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '200px', background: 'radial-gradient(ellipse,rgba(59,130,246,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      {/* Desktop layout */}
      <div className="footer-desktop" style={{ padding: 'clamp(40px,8vw,80px) 0 48px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px' }}>
        <div>
          <Link to="/" className="flex items-center gap-2" style={{ fontFamily: "'Sora',sans-serif", fontWeight: '800', fontSize: '18px', color: 'rgba(255,255,255,0.90)', letterSpacing: '-0.02em', display: 'inline-flex' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.4)', flexShrink: 0, overflow: 'hidden' }}>
              <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            Through My Pencil
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.38)', maxWidth: '280px', lineHeight: '1.65', fontSize: '14px', marginTop: '16px' }}>
            Exclusive Solo Artist Portfolio. Transforming spaces with exceptional original art experiences.
          </p>
          <div className="flex gap-3" style={{ marginTop: '20px' }}>
            {[Twitter, Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" style={{ color: 'rgba(255,255,255,0.45)', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
                onMouseOver={e => { e.currentTarget.style.color = '#93C5FD'; e.currentTarget.style.borderColor = 'rgba(147,197,253,0.3)'; e.currentTarget.style.background = 'rgba(59,130,246,0.12)'; }}
                onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              ><Icon size={18} /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '20px', color: 'rgba(255,255,255,0.70)', fontFamily: "'Sora',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>Explore</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[['/', 'Home'], ['/products', 'Portfolio & Store'], ['/login', 'Account'], ['/admin', 'Admin Dashboard']].map(([path, label]) => (
              <Link key={path} to={path} style={{ color: path === '/admin' ? '#60A5FA' : 'rgba(255,255,255,0.40)', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseOver={e => e.target.style.color = 'rgba(255,255,255,0.80)'}
                onMouseOut={e => e.target.style.color = path === '/admin' ? '#60A5FA' : 'rgba(255,255,255,0.40)'}
              >{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '20px', color: 'rgba(255,255,255,0.70)', fontFamily: "'Sora',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>Legal</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Terms of Service', 'Privacy Policy', 'Shipping & Returns'].map(label => (
              <a key={label} href="#" style={{ color: 'rgba(255,255,255,0.40)', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseOver={e => e.target.style.color = 'rgba(255,255,255,0.80)'}
                onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.40)'}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="footer-mobile" style={{ padding: '36px 0 40px' }}>
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <Link to="/" className="flex items-center gap-2" style={{ fontFamily: "'Sora',sans-serif", fontWeight: '800', fontSize: '16px', color: 'rgba(255,255,255,0.90)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            Through My Pencil
          </Link>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[Twitter, Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links — 2 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 16px', marginBottom: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: '700', marginBottom: '14px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Sora',sans-serif" }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['/', 'Home'], ['/products', 'Portfolio'], ['/login', 'Account'], ['/admin', 'Admin']].map(([path, label]) => (
                <Link key={path} to={path} style={{ color: 'rgba(255,255,255,0.40)', fontSize: '14px' }}>{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: '700', marginBottom: '14px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Sora',sans-serif" }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Terms', 'Privacy', 'Shipping'].map(label => (
                <a key={label} href="#" style={{ color: 'rgba(255,255,255,0.40)', fontSize: '14px' }}>{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: '24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
        <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '12px' }}>© {new Date().getFullYear()} Through My Pencil. All rights reserved.</p>
      </div>
    </div>

    <style>{`
      .footer-desktop { display: grid; }
      .footer-mobile { display: none; }
      @media (max-width: 768px) {
        .footer-desktop { display: none !important; }
        .footer-mobile { display: block !important; }
      }
    `}</style>
  </footer>
);

export default Footer;
