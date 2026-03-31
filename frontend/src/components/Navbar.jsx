import { Palette, User, ShoppingCart, Menu, X, LogOut, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header style={{
      background: scrolled
        ? 'rgba(2, 8, 24, 0.75)'
        : 'rgba(2, 8, 24, 0.4)',
      backdropFilter: 'blur(28px) saturate(200%)',
      WebkitBackdropFilter: 'blur(28px) saturate(200%)',
      borderBottom: scrolled
        ? '1px solid rgba(147, 197, 253, 0.18)'
        : '1px solid rgba(255,255,255,0.06)',
      boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)' : 'none',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'all 0.4s ease',
    }}>
      <div className="container flex items-center justify-between" style={{ height: '76px' }}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: '800',
          fontSize: '19px',
          letterSpacing: '-0.03em',
          color: 'rgba(255,255,255,0.95)',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(59,130,246,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}>
            <Palette size={20} color="white" />
          </div>
          <span>Through My Pencil</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="flex items-center gap-8 md-hide">
          {['/', '/products'].map((path, i) => (
            <Link key={i} to={path} style={{
              color: 'rgba(255,255,255,0.60)',
              fontSize: '15px', fontWeight: '500',
              transition: 'color 0.2s', fontFamily: "'Sora', sans-serif",
            }}
              onMouseOver={e => e.target.style.color = 'rgba(255,255,255,0.95)'}
              onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.60)'}
            >{i === 0 ? 'Home' : 'Portfolio'}</Link>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.50)', fontWeight: '500' }}>
                Hi, <strong style={{ color: '#93C5FD' }}>{user?.name}</strong>
              </span>
              <button onClick={handleLogout} className="btn btn-outline btn-sm flex items-center gap-2"
                style={{ color: '#FCA5A5', borderColor: 'rgba(252,165,165,0.25)' }}>
                <LogOut size={15} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm flex items-center gap-2" style={{ padding: '10px 20px' }}>
              <User size={15} /> Login
            </Link>
          )}

          <button onClick={() => setIsCartOpen(true)} style={{
            position: 'relative', padding: '10px', borderRadius: '12px',
            background: 'rgba(59,130,246,0.12)',
            border: '1px solid rgba(59,130,246,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(12px)',
          }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.22)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.3)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <ShoppingCart size={20} color="#93C5FD" />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-6px',
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                color: 'white', fontSize: '11px', fontWeight: '700',
                width: '20px', height: '20px', borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(59,130,246,0.5)',
              }}>{cartCount}</span>
            )}
          </button>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-3 mobile-only-btn">
          <button onClick={() => setIsCartOpen(true)} style={{
            position: 'relative', padding: '9px', borderRadius: '11px',
            background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.28)',
          }}>
            <ShoppingCart size={20} color="#93C5FD" />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-5px', right: '-5px',
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                color: 'white', fontSize: '11px', fontWeight: '700',
                width: '18px', height: '18px', borderRadius: '9px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{cartCount}</span>
            )}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{
            border: '1px solid rgba(147,197,253,0.22)',
            background: isMenuOpen ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.06)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '10px', borderRadius: '12px',
            color: isMenuOpen ? '#93C5FD' : 'rgba(255,255,255,0.7)',
          }}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div style={{
        position: 'absolute', top: '76px', left: 0, right: 0,
        height: isMenuOpen ? 'calc(100vh - 76px)' : '0',
        background: 'rgba(2,8,24,0.92)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        borderTop: '1px solid rgba(147,197,253,0.12)',
      }}>
        <div style={{
          padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '32px', height: '100%',
          opacity: isMenuOpen ? 1 : 0, transition: 'opacity 0.3s ease 0.1s',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[['/', 'Home'], ['/products', 'Portfolio & Store']].map(([path, label]) => (
              <Link key={path} to={path} onClick={() => setIsMenuOpen(false)} style={{
                color: 'rgba(255,255,255,0.85)', fontSize: '24px', fontWeight: '700',
                fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em',
              }}>{label}</Link>
            ))}
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '40px' }}>
            {isLoggedIn ? (
              <>
                <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.50)', textAlign: 'center' }}>
                  Signed in as <strong style={{ color: '#93C5FD' }}>{user?.name}</strong>
                </div>
                <button onClick={handleLogout} className="btn" style={{
                  padding: '16px', fontSize: '17px',
                  border: '1px solid rgba(252,165,165,0.25)', borderRadius: '14px',
                  color: '#FCA5A5', fontWeight: '600',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: 'rgba(252,165,165,0.08)',
                }}>
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-primary flex items-center justify-center gap-2" style={{ padding: '16px', fontSize: '17px' }}>
                <User size={20} /> Login / Create Account
              </Link>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) { .mobile-only-btn { display: none !important; } }
      `}</style>
    </header>
  );
};

export default Navbar;
