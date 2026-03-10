import { Palette, User, ShoppingCart, Menu, X, LogOut } from 'lucide-react';
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
      borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'all 0.3s ease'
    }}>
      <div className="container flex items-center justify-between" style={{ height: '80px' }}>
        <Link to="/" className="flex items-center gap-2" style={{ fontWeight: '800', fontSize: '20px', letterSpacing: '-0.02em' }}>
          <Palette color="var(--primary)" size={32} />
          <span>Through My Pencil</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-8 md-hide">
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--text-main)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Home</Link>
          <Link to="/products" style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: '600' }}>Products</Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>Hi, <strong style={{ color: 'var(--text-main)' }}>{user?.name}</strong></span>
              <button onClick={handleLogout} className="btn btn-outline btn-sm flex items-center gap-2" style={{ padding: '8px 16px', color: '#EF4444', borderColor: '#FEE2E2' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm flex items-center gap-2" style={{ padding: '10px 20px' }}>
              <User size={16} /> Login
            </Link>
          )}

          <button onClick={() => setIsCartOpen(true)} style={{ color: 'var(--text-main)', padding: '8px', borderRadius: '50%', backgroundColor: 'var(--bg-pink-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <ShoppingCart size={20} color="var(--primary)" />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '11px', fontWeight: '700', width: '20px', height: '20px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
            )}
          </button>
        </nav>

        {/* Mobile: cart + hamburger */}
        <div className="flex items-center gap-4 mobile-only-btn">
          <button onClick={() => setIsCartOpen(true)} style={{ position: 'relative', padding: '8px', borderRadius: '50%', backgroundColor: 'var(--bg-pink-light)' }}>
            <ShoppingCart size={20} color="var(--primary)" />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '11px', fontWeight: '700', width: '20px', height: '20px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ border: 'none', background: isMenuOpen ? 'var(--bg-pink-light)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '12px', color: isMenuOpen ? 'var(--primary)' : 'var(--text-main)' }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Full Screen Overlay */}
      <div style={{ position: 'absolute', top: '80px', left: 0, right: 0, height: isMenuOpen ? 'calc(100vh - 80px)' : '0', backgroundColor: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: isMenuOpen ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : 'none' }}>
        <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '32px', height: '100%', opacity: isMenuOpen ? 1 : 0, transition: 'opacity 0.3s ease 0.1s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-main)', fontSize: '24px', fontWeight: '700' }}>Home</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-main)', fontSize: '24px', fontWeight: '700' }}>Portfolio & Store</Link>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '40px' }}>
            {isLoggedIn ? (
              <>
                <div style={{ fontSize: '16px', color: 'var(--text-muted)', textAlign: 'center' }}>Signed in as <strong style={{ color: 'var(--text-main)' }}>{user?.name}</strong></div>
                <button onClick={handleLogout} className="btn" style={{ padding: '16px', fontSize: '18px', border: '2px solid #FEE2E2', borderRadius: '12px', color: '#EF4444', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-primary flex items-center justify-center gap-2" style={{ padding: '16px', fontSize: '18px' }}>
                <User size={20} /> Login / Create Account
              </Link>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
            .mobile-only-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
