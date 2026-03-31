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
        if (data.success) {
          setProducts(data.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to fetch featured products', err);
      }
    };
    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    if (!isLoggedIn) return navigate('/login');
    addToCart(product);
  };

  return (
    <section className="container section-padding">
      <div className="flex sm-flex-col sm-items-start items-end justify-between gap-4" style={{ marginBottom: '36px' }}>
        <div>
          <h2 className="heading-section" style={{ marginBottom: '12px' }}>Featured Collection</h2>
          <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '17px' }}>Handpicked masterpieces for discerning collectors</p>
        </div>
        <Link to="/products" className="btn btn-outline flex items-center gap-2" style={{ whiteSpace: 'nowrap' }}>
          View Portfolio <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid-responsive grid-cols-4" style={{ gap: '14px' }}>
        {products.map(product => {
          const productId = product._id || product.id;
          const inCart = items.some(i => (i._id || i.id) === productId);
          return (
            <div key={productId} className="product-card" style={{
              borderRadius: '22px',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.09)',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              position: 'relative',
            }}>
              {/* Top gloss */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(147,197,253,0.3), transparent)',
                zIndex: 2,
              }} />

              {/* Image */}
              <div style={{ padding: '12px', paddingBottom: 0 }}>
                <div style={{
                  width: '100%', aspectRatio: '4/5', borderRadius: '14px',
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {/* Image overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(2,8,24,0.6) 100%)',
                    borderRadius: '14px',
                  }} />
                  <button style={{
                    position: 'absolute', top: '10px', right: '10px',
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'rgba(2,8,24,0.5)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.3s ease',
                  }}
                    onMouseOver={e => { e.currentTarget.style.color = '#F472B6'; e.currentTarget.style.borderColor = 'rgba(244,114,182,0.4)'; }}
                    onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                  >
                    <Heart size={16} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{
                  fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em',
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #93C5FD, #60A5FA)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  fontFamily: "'Sora', sans-serif",
                }}>{product.tag}</div>

                <h3 style={{
                  fontSize: '18px', fontWeight: '700', marginBottom: '4px',
                  color: 'rgba(255,255,255,0.90)',
                  fontFamily: "'Sora', sans-serif", letterSpacing: '-0.01em',
                }}>{product.title}</h3>
                <div style={{ flex: 1 }} />

                <div className="flex items-center justify-between" style={{
                  marginTop: '16px', paddingTop: '16px',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{
                    fontSize: '20px', fontWeight: '800',
                    fontFamily: "'Sora', sans-serif",
                    background: 'linear-gradient(135deg, #fff, #93C5FD)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>${product.price}</div>
                  <button
                    onClick={() => handleAdd(product)}
                    className="btn btn-sm flex items-center justify-center gap-2"
                    style={{
                      borderRadius: '10px',
                      background: inCart
                        ? 'linear-gradient(135deg, #16a34a, #15803d)'
                        : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                      color: 'white',
                      boxShadow: inCart
                        ? '0 4px 16px rgba(22,163,74,0.4)'
                        : '0 4px 16px rgba(59,130,246,0.4)',
                      border: 'none',
                    }}
                  >
                    {inCart ? <><Check size={14} /> Added</> : <><ShoppingCart size={14} /> Add</>}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-10px) scale(1.01);
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(147,197,253,0.28) !important;
          box-shadow: 0 24px 56px rgba(0,0,0,0.4), 0 0 40px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.12) !important;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCollection;
