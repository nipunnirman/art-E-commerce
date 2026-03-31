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

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header style={{
        background: scrolled ? 'rgba(2,8,24,0.85)' : 'rgba(2,8,24,0.4)',
        backdropFilter: 'blur(28px) saturate(200%)',
        WebkitBackdropFilter: 'blur(28px) saturate(200%)',
        borderBottom: scrolled ? '1px solid rgba(147,197,253,0.18)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
        position: 'sticky', top: 0, zIndex: 100,
        transition: 'all 0.4s ease',
      }}>
        <div className="container flex items-center justify-between" style={{ height: '68px' }}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" style={{
            fontFamily: "'Sora',sans-serif", fontWeight: '800', fontSize: '18px',
            letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.95)',
          }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(59,130,246,0.45)',
              flexShrink: 0,
            }}>
              <Palette size={18} color="white" />
            </div>
            <span className="nav-logo-text">Through My Pencil</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-desktop flex items-center gap-8">
            {['/', '/products'].map((path, i) => (
              <Link key={i} to={path} style={{
                color: 'rgba(255,255,255,0.60)', fontSize: '15px', fontWeight: '500',
                transition: 'color 0.2s', fontFamily: "'Sora',sans-serif",
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
              background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease', backdropFilter: 'blur(12px)',
            }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.22)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.12)'; }}
            >
              <ShoppingCart size={20} color="#93C5FD" />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)',
                  color: 'white', fontSize: '11px', fontWeight: '700',
                  width: '20px', height: '20px', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{cartCount}</span>
              )}
            </button>
          </nav>

          {/* Mobile right icons */}
          <div className="nav-mobile-icons flex items-center gap-2">
            <button onClick={() => setIsCartOpen(true)} style={{
              position: 'relative', padding: '9px', borderRadius: '11px',
              background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.28)',
              display: 'flex', alignItems: 'center',
            }}>
              <ShoppingCart size={20} color="#93C5FD" />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-5px',
                  background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)',
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
              padding: '9px', borderRadius: '12px',
              color: isMenuOpen ? '#93C5FD' : 'rgba(255,255,255,0.7)',
            }}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu — rendered outside header so it covers everything */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(2,6,20,0.97)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        display: 'flex', flexDirection: 'column',
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        overflowY: 'auto',
      }} className="nav-mobile-menu">
        {/* Menu header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(147,197,253,0.10)',
        }}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2" style={{
            fontFamily: "'Sora',sans-serif", fontWeight: '800', fontSize: '16px',
            color: 'rgba(255,255,255,0.90)', letterSpacing: '-0.02em',
          }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Palette size={16} color="white" />
            </div>
            Through My Pencil
          </Link>
          <button onClick={() => setIsMenuOpen(false)} style={{
            padding: '9px', borderRadius: '12px',
            border: '1px solid rgba(147,197,253,0.2)',
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.7)',
            display: 'flex',
          }}>
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <div style={{ padding: '40px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[['/', 'Home'], ['/products', 'Portfolio & Store']].map(([path, label], i) => (
            <Link key={path} to={path} onClick={() => setIsMenuOpen(false)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.90)', fontSize: '26px', fontWeight: '800',
              fontFamily: "'Sora',sans-serif", letterSpacing: '-0.02em',
              animation: isMenuOpen ? `slideInRight 0.4s ease ${0.1 + i * 0.06}s both` : 'none',
            }}>
              {label}
              <span style={{ color: 'rgba(147,197,253,0.4)', fontSize: '20px' }}>→</span>
            </Link>
          ))}
        </div>

        {/* Bottom auth section */}
        <div style={{
          padding: '24px 28px 48px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          {isLoggedIn ? (
            <>
              <div style={{
                padding: '16px 20px',
                background: 'rgba(147,197,253,0.07)',
                border: '1px solid rgba(147,197,253,0.15)',
                borderRadius: '16px',
                fontSize: '14px', color: 'rgba(255,255,255,0.55)', textAlign: 'center',
              }}>
                Signed in as <strong style={{ color: '#93C5FD' }}>{user?.name}</strong>
              </div>
              <button onClick={handleLogout} style={{
                padding: '16px', fontSize: '16px', borderRadius: '16px',
                border: '1px solid rgba(252,165,165,0.2)', color: '#FCA5A5', fontWeight: '600',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'rgba(252,165,165,0.07)',
              }}>
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-primary flex items-center justify-center gap-2"
              style={{ padding: '17px', fontSize: '16px', borderRadius: '16px' }}>
              <User size={18} /> Login / Create Account
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile-icons { display: none; }
        .nav-mobile-menu { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-icons { display: flex !important; }
          .nav-mobile-menu { display: flex !important; }
          .nav-logo-text { font-size: 15px; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
