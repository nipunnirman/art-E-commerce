import React, { useState, useEffect } from 'react';
import { ShoppingCart, ArrowRight, Heart, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const FeaturedCollection = () => {
  const { isLoggedIn } = useAuth();
  const { addToCart, items } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        if (data.success) setProducts(data.data.slice(0, 4));
      } catch (err) { console.error(err); }
    };
    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    if (!isLoggedIn) return navigate('/login');
    addToCart(product);
  };

  return (
    <section className="container section-padding">
      <div className="fc-header flex items-end justify-between gap-4" style={{ marginBottom: '36px' }}>
        <div>
          <h2 className="heading-section" style={{ marginBottom: '10px' }}>Featured Collection</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px' }}>Handpicked masterpieces for discerning collectors</p>
        </div>
        <Link to="/products" className="btn btn-outline flex items-center gap-2" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Desktop: 4-col grid */}
      <div className="fc-grid-desktop grid-responsive grid-cols-4" style={{ gap: '16px' }}>
        {products.map(product => {
          const productId = product._id || product.id;
          const inCart = items.some(i => (i._id || i.id) === productId);
          return (
            <div key={productId} className="product-card" style={{
              borderRadius: '20px', background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.09)',
              transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)', position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(147,197,253,0.3),transparent)', zIndex: 2 }} />
              <div style={{ padding: '10px', paddingBottom: 0 }}>
                <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: '12px', backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%,rgba(2,8,24,0.6) 100%)' }} />
                  <button style={{ position: 'absolute', top: '8px', right: '8px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(2,8,24,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)' }}>
                    <Heart size={14} />
                  </button>
                </div>
              </div>
              <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '6px', background: 'linear-gradient(135deg,#93C5FD,#60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: "'Sora',sans-serif" }}>{product.tag}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px', color: 'rgba(255,255,255,0.90)', fontFamily: "'Sora',sans-serif" }}>{product.title}</h3>
                <div style={{ flex: 1 }} />
                <div className="flex items-center justify-between" style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '18px', fontWeight: '800', fontFamily: "'Sora',sans-serif", background: 'linear-gradient(135deg,#fff,#93C5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>${product.price}</div>
                  <button onClick={() => handleAdd(product)} className="btn btn-sm flex items-center gap-1" style={{ borderRadius: '8px', background: inCart ? 'linear-gradient(135deg,#16a34a,#15803d)' : 'linear-gradient(135deg,#3B82F6,#1D4ED8)', color: 'white', border: 'none', boxShadow: inCart ? '0 4px 12px rgba(22,163,74,0.4)' : '0 4px 12px rgba(59,130,246,0.4)' }}>
                    {inCart ? <><Check size={13} /> Added</> : <><ShoppingCart size={13} /> Add</>}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="fc-grid-mobile">
        <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '12px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
          {products.map(product => {
            const productId = product._id || product.id;
            const inCart = items.some(i => (i._id || i.id) === productId);
            return (
              <div key={productId} style={{
                minWidth: '220px', maxWidth: '220px', flexShrink: 0,
                borderRadius: '20px', background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.09)',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                scrollSnapAlign: 'start',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}>
                <div style={{ padding: '10px', paddingBottom: 0 }}>
                  <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '12px', backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden' }}>
                    <button style={{ position: 'absolute', top: '8px', right: '8px', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(2,8,24,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)' }}>
                      <Heart size={13} />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '14px' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '4px', background: 'linear-gradient(135deg,#93C5FD,#60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{product.tag}</div>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', color: 'rgba(255,255,255,0.90)', fontFamily: "'Sora',sans-serif" }}>{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <div style={{ fontSize: '17px', fontWeight: '800', fontFamily: "'Sora',sans-serif", background: 'linear-gradient(135deg,#fff,#93C5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>${product.price}</div>
                    <button onClick={() => handleAdd(product)} style={{ padding: '8px 14px', borderRadius: '10px', background: inCart ? 'linear-gradient(135deg,#16a34a,#15803d)' : 'linear-gradient(135deg,#3B82F6,#1D4ED8)', color: 'white', border: 'none', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'Sora',sans-serif" }}>
                      {inCart ? <><Check size={13} /> Added</> : <><ShoppingCart size={13} /> Add</>}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {/* See all card */}
          <Link to="/products" style={{
            minWidth: '140px', flexShrink: 0,
            borderRadius: '20px',
            background: 'rgba(59,130,246,0.07)',
            border: '1px solid rgba(59,130,246,0.2)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '12px', textDecoration: 'none', scrollSnapAlign: 'start',
            color: '#93C5FD',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRight size={22} color="#93C5FD" />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', fontFamily: "'Sora',sans-serif" }}>View All</span>
          </Link>
        </div>
        {/* Scroll indicator dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
          {products.map((_, i) => (
            <div key={i} style={{ width: i === 0 ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === 0 ? '#3B82F6' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>

      <style>{`
        .fc-grid-desktop { display: grid; }
        .fc-grid-mobile { display: none; }
        .fc-header { flex-direction: row; align-items: flex-end; }
        .product-card:hover {
          transform: translateY(-8px) scale(1.01);
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(147,197,253,0.28) !important;
          box-shadow: 0 20px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12) !important;
        }
        @media (max-width: 768px) {
          .fc-grid-desktop { display: none !important; }
          .fc-grid-mobile { display: block; }
          .fc-header { flex-direction: column !important; align-items: flex-start !important; }
          .fc-grid-mobile > div:first-child { scrollbar-width: none; }
          .fc-grid-mobile > div:first-child::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </section>
  );
};

export default FeaturedCollection;
