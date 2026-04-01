import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Check, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { isLoggedIn } = useAuth();
  const { addToCart, items } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        if (data.success) setProducts(data.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    if (!isLoggedIn) return navigate('/login');
    addToCart(product);
  };

  return (
    <div className="container section-padding">
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontFamily: "'Sora',sans-serif",
          fontSize: 'clamp(28px,7vw,64px)',
          fontWeight: '800', letterSpacing: '-0.03em',
          color: 'rgba(255,255,255,0.95)', lineHeight: 1.05, marginBottom: '10px',
        }}>All Products</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(14px,2.5vw,17px)' }}>
          Browse my complete collection of original artworks.
        </p>
      </div>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Loading artworks...</div>
        </div>
      )}
      {!loading && products.length === 0 && (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>No artworks found. Check back later!</p>
      )}

      {/* Desktop: 4-col grid */}
      <div className="products-desktop grid-responsive grid-cols-4" style={{ gap: '16px' }}>
        {products.map(product => {
          const productId = product._id || product.id;
          const inCart = items.some(i => (i._id || i.id) === productId);
          return (
            <div key={productId} className="product-card" style={{ borderRadius: '20px', border: '1px solid rgba(255,255,255,0.09)', backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '10px', paddingBottom: 0 }}>
                <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: '12px', backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 60%,rgba(2,8,24,0.5) 100%)' }} />
                  <button style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(2,8,24,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)' }}>
                    <Heart size={16} />
                  </button>
                </div>
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: '11px', color: '#60A5FA', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '6px', textTransform: 'uppercase' }}>{product.tag}</div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '4px', color: 'rgba(255,255,255,0.92)', fontFamily: "'Sora',sans-serif" }}>{product.title}</h3>
                <div style={{ flex: 1 }} />
                <div className="flex items-center justify-between" style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: 'rgba(255,255,255,0.95)', fontFamily: "'Sora',sans-serif" }}>Rs. {product.price}</div>
                  <button onClick={() => handleAdd(product)} style={{ padding: '9px 16px', borderRadius: '10px', background: inCart ? 'linear-gradient(135deg,#16a34a,#15803d)' : 'linear-gradient(135deg,#3B82F6,#1D4ED8)', color: 'white', border: 'none', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'Sora',sans-serif", boxShadow: inCart ? '0 4px 12px rgba(22,163,74,0.35)' : '0 4px 12px rgba(59,130,246,0.35)' }}>
                    {inCart ? <><Check size={14} /> Added</> : <><ShoppingCart size={14} /> Add</>}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: 2-col tight grid */}
      <div className="products-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
        {products.map(product => {
          const productId = product._id || product.id;
          const inCart = items.some(i => (i._id || i.id) === productId);
          return (
            <div key={productId} style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 55%,rgba(2,8,24,0.8) 100%)' }} />
                  <button style={{ position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(2,8,24,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)' }}>
                    <Heart size={13} />
                  </button>
                  {/* Price overlay at bottom of image */}
                  <div style={{ position: 'absolute', bottom: '8px', left: '10px' }}>
                    <div style={{ fontSize: '17px', fontWeight: '800', color: '#fff', fontFamily: "'Sora',sans-serif", textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>Rs. {product.price}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '10px 12px 12px' }}>
                <div style={{ fontSize: '9px', color: '#60A5FA', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '3px', textTransform: 'uppercase' }}>{product.tag}</div>
                <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.90)', fontFamily: "'Sora',sans-serif", marginBottom: '10px', lineHeight: '1.3' }}>{product.title}</h3>
                <button onClick={() => handleAdd(product)} style={{ width: '100%', padding: '9px', borderRadius: '10px', background: inCart ? 'linear-gradient(135deg,#16a34a,#15803d)' : 'linear-gradient(135deg,#3B82F6,#1D4ED8)', color: 'white', border: 'none', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontFamily: "'Sora',sans-serif" }}>
                  {inCart ? <><Check size={12} /> Added</> : <><ShoppingCart size={12} /> Add to Cart</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .products-desktop { display: grid; }
        .products-mobile { display: none !important; }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); border-color: rgba(147,197,253,0.2); }
        @media (max-width: 768px) {
          .products-desktop { display: none !important; }
          .products-mobile { display: grid !important; }
        }
      `}</style>
    </div>
  );
};

export default Products;
